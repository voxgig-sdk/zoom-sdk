package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/zoom-sdk/go"
	"github.com/voxgig-sdk/zoom-sdk/go/core"

	vs "github.com/voxgig-sdk/zoom-sdk/go/utility/struct"
)

func TestMeetingRegistrantListEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.MeetingRegistrantList(nil)
		if ent == nil {
			t.Fatal("expected non-nil MeetingRegistrantListEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := meeting_registrant_listBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "meeting_registrant_list." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		meetingRegistrantListRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.meeting_registrant_list")))
		var meetingRegistrantListRef01Data map[string]any
		if len(meetingRegistrantListRef01DataRaw) > 0 {
			meetingRegistrantListRef01Data = core.ToMapAny(meetingRegistrantListRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = meetingRegistrantListRef01Data

		// LOAD
		meetingRegistrantListRef01Ent := client.MeetingRegistrantList(nil)
		meetingRegistrantListRef01MatchDt0 := map[string]any{
			"id": meetingRegistrantListRef01Data["id"],
		}
		meetingRegistrantListRef01DataDt0Loaded, err := meetingRegistrantListRef01Ent.Load(meetingRegistrantListRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		meetingRegistrantListRef01DataDt0LoadResult := core.ToMapAny(entityData(meetingRegistrantListRef01DataDt0Loaded))
		if meetingRegistrantListRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if meetingRegistrantListRef01DataDt0LoadResult["id"] != meetingRegistrantListRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func meeting_registrant_listBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "meeting_registrant_list", "MeetingRegistrantListTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read meeting_registrant_list test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse meeting_registrant_list test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"meeting_registrant_list01", "meeting_registrant_list02", "meeting_registrant_list03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ZOOM_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["ZOOM_APIKEY"],
			},
			extraOpts,
		})
		client = sdk.NewZoomSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ZOOM_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ZOOM_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
