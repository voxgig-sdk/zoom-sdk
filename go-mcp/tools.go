package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/modelcontextprotocol/go-sdk/mcp"
	sdk "github.com/voxgig-sdk/zoom-sdk/go"
)

// Args is the common argument shape for both tools. `entity` selects
// the SDK entity to operate on; `query` is the optional reqmatch /
// reqdata map passed through to the SDK. For load, `query` should be
// `{"id": <value>}`. For list, omit `query` or pass an empty map.
type Args struct {
	Entity string         `json:"entity" jsonschema:"account | account_plan | account_setting | billing | cloud_recording | dashboard | device | domains_list | group | group_member_list | im_chat | im_group | im_group_list | meeting | meeting_instance | meeting_invitation | meeting_registrant_list | pac | poll | qos | recording | recording_setting | report | tracking_field | tsp | user | user_assistants_list | user_permission | user_schedulers_list | user_setting | webhook | webinar | webinar_instance | webinar_panelist_list | webinar_registrant_list | zoom_room_list"`
	Query  map[string]any `json:"query,omitempty" jsonschema:"optional match map e.g. {\"id\":1} for load, omit for list"`
}

func registerTools(server *mcp.Server, client *sdk.ZoomSDK) {
	mcp.AddTool(server, &mcp.Tool{
		Name: "zoom_list",
		Description: "List records from Zoom. " +
			"Args: entity (one of the supported SDK entities), query (optional filter map). " +
			"Returns the first page of records as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "list", args)
	})

	mcp.AddTool(server, &mcp.Tool{
		Name: "zoom_load",
		Description: "Load a single record from Zoom. " +
			"Args: entity, query ({\"id\":N} required). Returns the record as JSON.",
	}, func(ctx context.Context, req *mcp.CallToolRequest, args Args) (*mcp.CallToolResult, any, error) {
		return runOp(client, "load", args)
	})
}

func runOp(client *sdk.ZoomSDK, op string, args Args) (*mcp.CallToolResult, any, error) {
	ent, err := entityFor(client, args.Entity)
	if err != nil {
		return toolError(err.Error())
	}

	var result any
	switch op {
	case "list":
		result, err = ent.List(args.Query, nil)
	case "load":
		result, err = ent.Load(args.Query, nil)
	default:
		return toolError(fmt.Sprintf("unknown op %q", op))
	}
	if err != nil {
		return toolError(err.Error())
	}

	// SDK returns *Entity wrappers; unwrap each via .Data() to get a
	// plain map[string]any (or []any of maps for list) suitable for
	// JSON marshalling.
	data := extractData(result)
	body, err := json.MarshalIndent(data, "", "  ")
	if err != nil {
		return toolError(fmt.Sprintf("marshal: %v", err))
	}
	return &mcp.CallToolResult{
		Content: []mcp.Content{
			&mcp.TextContent{Text: string(body)},
		},
	}, data, nil
}

// entityFor dispatches on the lowercase entity name. The generator
// emits one `case "<name>":` per entity defined in the SDK model.
func entityFor(client *sdk.ZoomSDK, name string) (sdk.ZoomEntity, error) {
	switch strings.ToLower(name) {
	case "account":
		return client.Account(nil), nil
	case "account_plan":
		return client.AccountPlan(nil), nil
	case "account_setting":
		return client.AccountSetting(nil), nil
	case "billing":
		return client.Billing(nil), nil
	case "cloud_recording":
		return client.CloudRecording(nil), nil
	case "dashboard":
		return client.Dashboard(nil), nil
	case "device":
		return client.Device(nil), nil
	case "domains_list":
		return client.DomainsList(nil), nil
	case "group":
		return client.Group(nil), nil
	case "group_member_list":
		return client.GroupMemberList(nil), nil
	case "im_chat":
		return client.ImChat(nil), nil
	case "im_group":
		return client.ImGroup(nil), nil
	case "im_group_list":
		return client.ImGroupList(nil), nil
	case "meeting":
		return client.Meeting(nil), nil
	case "meeting_instance":
		return client.MeetingInstance(nil), nil
	case "meeting_invitation":
		return client.MeetingInvitation(nil), nil
	case "meeting_registrant_list":
		return client.MeetingRegistrantList(nil), nil
	case "pac":
		return client.Pac(nil), nil
	case "poll":
		return client.Poll(nil), nil
	case "qos":
		return client.Qos(nil), nil
	case "recording":
		return client.Recording(nil), nil
	case "recording_setting":
		return client.RecordingSetting(nil), nil
	case "report":
		return client.Report(nil), nil
	case "tracking_field":
		return client.TrackingField(nil), nil
	case "tsp":
		return client.Tsp(nil), nil
	case "user":
		return client.User(nil), nil
	case "user_assistants_list":
		return client.UserAssistantsList(nil), nil
	case "user_permission":
		return client.UserPermission(nil), nil
	case "user_schedulers_list":
		return client.UserSchedulersList(nil), nil
	case "user_setting":
		return client.UserSetting(nil), nil
	case "webhook":
		return client.Webhook(nil), nil
	case "webinar":
		return client.Webinar(nil), nil
	case "webinar_instance":
		return client.WebinarInstance(nil), nil
	case "webinar_panelist_list":
		return client.WebinarPanelistList(nil), nil
	case "webinar_registrant_list":
		return client.WebinarRegistrantList(nil), nil
	case "zoom_room_list":
		return client.ZoomRoomList(nil), nil

	}
	return nil, fmt.Errorf("unknown entity %q", name)
}

func extractData(x any) any {
	switch v := x.(type) {
	case sdk.Entity:
		return extractData(v.Data())
	case []any:
		out := make([]any, len(v))
		for i, e := range v {
			out[i] = extractData(e)
		}
		return out
	case map[string]any:
		out := make(map[string]any, len(v))
		for k, vv := range v {
			out[k] = extractData(vv)
		}
		return out
	}
	return x
}

func toolError(msg string) (*mcp.CallToolResult, any, error) {
	return &mcp.CallToolResult{
		IsError: true,
		Content: []mcp.Content{
			&mcp.TextContent{Text: msg},
		},
	}, nil, nil
}
