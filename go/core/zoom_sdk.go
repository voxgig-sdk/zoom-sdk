package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/zoom-sdk/go/utility/struct"
)

type ZoomSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewZoomSDK(options map[string]any) *ZoomSDK {
	sdk := &ZoomSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := SharedConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath(sdk.options, []any{"feature", "test", "active"}) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath(sdk.options, []any{"__derived__", "featureorder"}).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *ZoomSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *ZoomSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *ZoomSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *ZoomSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *ZoomSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *ZoomSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *ZoomSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath(sdk.options, []any{"allow", "op"}).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("ZoomSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *ZoomSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

func (sdk *ZoomSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath(res, []any{"data", "errors"}).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("ZoomSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Account returns a Account entity bound to this client.
// Idiomatic usage: client.Account(nil).List(nil, nil) or
// client.Account(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Account(data map[string]any) ZoomEntity {
	return NewAccountEntityFunc(sdk, data)
}


// AccountPlan returns a AccountPlan entity bound to this client.
// Idiomatic usage: client.AccountPlan(nil).List(nil, nil) or
// client.AccountPlan(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) AccountPlan(data map[string]any) ZoomEntity {
	return NewAccountPlanEntityFunc(sdk, data)
}


// AccountSetting returns a AccountSetting entity bound to this client.
// Idiomatic usage: client.AccountSetting(nil).List(nil, nil) or
// client.AccountSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) AccountSetting(data map[string]any) ZoomEntity {
	return NewAccountSettingEntityFunc(sdk, data)
}


// Billing returns a Billing entity bound to this client.
// Idiomatic usage: client.Billing(nil).List(nil, nil) or
// client.Billing(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Billing(data map[string]any) ZoomEntity {
	return NewBillingEntityFunc(sdk, data)
}


// CloudRecording returns a CloudRecording entity bound to this client.
// Idiomatic usage: client.CloudRecording(nil).List(nil, nil) or
// client.CloudRecording(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) CloudRecording(data map[string]any) ZoomEntity {
	return NewCloudRecordingEntityFunc(sdk, data)
}


// Dashboard returns a Dashboard entity bound to this client.
// Idiomatic usage: client.Dashboard(nil).List(nil, nil) or
// client.Dashboard(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Dashboard(data map[string]any) ZoomEntity {
	return NewDashboardEntityFunc(sdk, data)
}


// Device returns a Device entity bound to this client.
// Idiomatic usage: client.Device(nil).List(nil, nil) or
// client.Device(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Device(data map[string]any) ZoomEntity {
	return NewDeviceEntityFunc(sdk, data)
}


// DomainsList returns a DomainsList entity bound to this client.
// Idiomatic usage: client.DomainsList(nil).List(nil, nil) or
// client.DomainsList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) DomainsList(data map[string]any) ZoomEntity {
	return NewDomainsListEntityFunc(sdk, data)
}


// Group returns a Group entity bound to this client.
// Idiomatic usage: client.Group(nil).List(nil, nil) or
// client.Group(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Group(data map[string]any) ZoomEntity {
	return NewGroupEntityFunc(sdk, data)
}


// GroupMemberList returns a GroupMemberList entity bound to this client.
// Idiomatic usage: client.GroupMemberList(nil).List(nil, nil) or
// client.GroupMemberList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) GroupMemberList(data map[string]any) ZoomEntity {
	return NewGroupMemberListEntityFunc(sdk, data)
}


// ImChat returns a ImChat entity bound to this client.
// Idiomatic usage: client.ImChat(nil).List(nil, nil) or
// client.ImChat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) ImChat(data map[string]any) ZoomEntity {
	return NewImChatEntityFunc(sdk, data)
}


// ImGroup returns a ImGroup entity bound to this client.
// Idiomatic usage: client.ImGroup(nil).List(nil, nil) or
// client.ImGroup(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) ImGroup(data map[string]any) ZoomEntity {
	return NewImGroupEntityFunc(sdk, data)
}


// ImGroupList returns a ImGroupList entity bound to this client.
// Idiomatic usage: client.ImGroupList(nil).List(nil, nil) or
// client.ImGroupList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) ImGroupList(data map[string]any) ZoomEntity {
	return NewImGroupListEntityFunc(sdk, data)
}


// Meeting returns a Meeting entity bound to this client.
// Idiomatic usage: client.Meeting(nil).List(nil, nil) or
// client.Meeting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Meeting(data map[string]any) ZoomEntity {
	return NewMeetingEntityFunc(sdk, data)
}


// MeetingInstance returns a MeetingInstance entity bound to this client.
// Idiomatic usage: client.MeetingInstance(nil).List(nil, nil) or
// client.MeetingInstance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) MeetingInstance(data map[string]any) ZoomEntity {
	return NewMeetingInstanceEntityFunc(sdk, data)
}


// MeetingInvitation returns a MeetingInvitation entity bound to this client.
// Idiomatic usage: client.MeetingInvitation(nil).List(nil, nil) or
// client.MeetingInvitation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) MeetingInvitation(data map[string]any) ZoomEntity {
	return NewMeetingInvitationEntityFunc(sdk, data)
}


// MeetingRegistrantList returns a MeetingRegistrantList entity bound to this client.
// Idiomatic usage: client.MeetingRegistrantList(nil).List(nil, nil) or
// client.MeetingRegistrantList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) MeetingRegistrantList(data map[string]any) ZoomEntity {
	return NewMeetingRegistrantListEntityFunc(sdk, data)
}


// Pac returns a Pac entity bound to this client.
// Idiomatic usage: client.Pac(nil).List(nil, nil) or
// client.Pac(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Pac(data map[string]any) ZoomEntity {
	return NewPacEntityFunc(sdk, data)
}


// Poll returns a Poll entity bound to this client.
// Idiomatic usage: client.Poll(nil).List(nil, nil) or
// client.Poll(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Poll(data map[string]any) ZoomEntity {
	return NewPollEntityFunc(sdk, data)
}


// Qos returns a Qos entity bound to this client.
// Idiomatic usage: client.Qos(nil).List(nil, nil) or
// client.Qos(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Qos(data map[string]any) ZoomEntity {
	return NewQosEntityFunc(sdk, data)
}


// Recording returns a Recording entity bound to this client.
// Idiomatic usage: client.Recording(nil).List(nil, nil) or
// client.Recording(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Recording(data map[string]any) ZoomEntity {
	return NewRecordingEntityFunc(sdk, data)
}


// RecordingSetting returns a RecordingSetting entity bound to this client.
// Idiomatic usage: client.RecordingSetting(nil).List(nil, nil) or
// client.RecordingSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) RecordingSetting(data map[string]any) ZoomEntity {
	return NewRecordingSettingEntityFunc(sdk, data)
}


// Report returns a Report entity bound to this client.
// Idiomatic usage: client.Report(nil).List(nil, nil) or
// client.Report(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Report(data map[string]any) ZoomEntity {
	return NewReportEntityFunc(sdk, data)
}


// TrackingField returns a TrackingField entity bound to this client.
// Idiomatic usage: client.TrackingField(nil).List(nil, nil) or
// client.TrackingField(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) TrackingField(data map[string]any) ZoomEntity {
	return NewTrackingFieldEntityFunc(sdk, data)
}


// Tsp returns a Tsp entity bound to this client.
// Idiomatic usage: client.Tsp(nil).List(nil, nil) or
// client.Tsp(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Tsp(data map[string]any) ZoomEntity {
	return NewTspEntityFunc(sdk, data)
}


// User returns a User entity bound to this client.
// Idiomatic usage: client.User(nil).List(nil, nil) or
// client.User(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) User(data map[string]any) ZoomEntity {
	return NewUserEntityFunc(sdk, data)
}


// UserAssistantsList returns a UserAssistantsList entity bound to this client.
// Idiomatic usage: client.UserAssistantsList(nil).List(nil, nil) or
// client.UserAssistantsList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) UserAssistantsList(data map[string]any) ZoomEntity {
	return NewUserAssistantsListEntityFunc(sdk, data)
}


// UserPermission returns a UserPermission entity bound to this client.
// Idiomatic usage: client.UserPermission(nil).List(nil, nil) or
// client.UserPermission(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) UserPermission(data map[string]any) ZoomEntity {
	return NewUserPermissionEntityFunc(sdk, data)
}


// UserSchedulersList returns a UserSchedulersList entity bound to this client.
// Idiomatic usage: client.UserSchedulersList(nil).List(nil, nil) or
// client.UserSchedulersList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) UserSchedulersList(data map[string]any) ZoomEntity {
	return NewUserSchedulersListEntityFunc(sdk, data)
}


// UserSetting returns a UserSetting entity bound to this client.
// Idiomatic usage: client.UserSetting(nil).List(nil, nil) or
// client.UserSetting(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) UserSetting(data map[string]any) ZoomEntity {
	return NewUserSettingEntityFunc(sdk, data)
}


// Webhook returns a Webhook entity bound to this client.
// Idiomatic usage: client.Webhook(nil).List(nil, nil) or
// client.Webhook(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Webhook(data map[string]any) ZoomEntity {
	return NewWebhookEntityFunc(sdk, data)
}


// Webinar returns a Webinar entity bound to this client.
// Idiomatic usage: client.Webinar(nil).List(nil, nil) or
// client.Webinar(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) Webinar(data map[string]any) ZoomEntity {
	return NewWebinarEntityFunc(sdk, data)
}


// WebinarInstance returns a WebinarInstance entity bound to this client.
// Idiomatic usage: client.WebinarInstance(nil).List(nil, nil) or
// client.WebinarInstance(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) WebinarInstance(data map[string]any) ZoomEntity {
	return NewWebinarInstanceEntityFunc(sdk, data)
}


// WebinarPanelistList returns a WebinarPanelistList entity bound to this client.
// Idiomatic usage: client.WebinarPanelistList(nil).List(nil, nil) or
// client.WebinarPanelistList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) WebinarPanelistList(data map[string]any) ZoomEntity {
	return NewWebinarPanelistListEntityFunc(sdk, data)
}


// WebinarRegistrantList returns a WebinarRegistrantList entity bound to this client.
// Idiomatic usage: client.WebinarRegistrantList(nil).List(nil, nil) or
// client.WebinarRegistrantList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) WebinarRegistrantList(data map[string]any) ZoomEntity {
	return NewWebinarRegistrantListEntityFunc(sdk, data)
}


// ZoomRoomList returns a ZoomRoomList entity bound to this client.
// Idiomatic usage: client.ZoomRoomList(nil).List(nil, nil) or
// client.ZoomRoomList(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *ZoomSDK) ZoomRoomList(data map[string]any) ZoomEntity {
	return NewZoomRoomListEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *ZoomSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewZoomSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
