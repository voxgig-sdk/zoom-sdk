package sdktest

import (
	"encoding/json"
	"fmt"
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

func TestMeetingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Meeting(nil)
		if ent == nil {
			t.Fatal("expected non-nil MeetingEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"meeting": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Meeting(nil).Stream("list", nil, nil) {
			seen = append(seen, item)
		}
		if len(seen) != 3 {
			t.Fatalf("expected 3 streamed items, got %d", len(seen))
		}

		// Inbound: streaming active -> yields each item from the feature iterator.
		hasStreaming := false
		if fm, ok := core.SharedConfig()["feature"].(map[string]any); ok {
			_, hasStreaming = fm["streaming"]
		}
		if hasStreaming {
			streamSdk := sdk.TestSDK(seed, map[string]any{
				"feature": map[string]any{"streaming": map[string]any{"active": true}},
			})
			var got []any
			for item := range streamSdk.Meeting(nil).Stream("list", nil, nil) {
				if sub, ok := item.([]any); ok {
					got = append(got, sub...)
				} else {
					got = append(got, item)
				}
			}
			if len(got) != 3 {
				t.Fatalf("expected 3 items via streaming feature, got %d", len(got))
			}
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := meetingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "meeting." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_MEETING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		meetingRef01Ent := client.Meeting(nil)
		meetingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "meeting"}, setup.data), "meeting_ref01"))
		meetingRef01Data["user_id"] = setup.idmap["user01"]

		meetingRef01DataResult, err := meetingRef01Ent.Create(meetingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		meetingRef01Data = core.ToMapAny(entityData(meetingRef01DataResult))
		if meetingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if meetingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		meetingRef01Match := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		meetingRef01ListResult, err := meetingRef01Ent.List(meetingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		meetingRef01List, meetingRef01ListOk := meetingRef01ListResult.([]any)
		if !meetingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", meetingRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(meetingRef01List), map[string]any{"id": meetingRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		meetingRef01DataUp0Up := map[string]any{
			"id": meetingRef01Data["id"],
		}

		meetingRef01MarkdefUp0Name := "agenda"
		meetingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-meeting_ref01_%d", setup.now)
		meetingRef01DataUp0Up[meetingRef01MarkdefUp0Name] = meetingRef01MarkdefUp0Value

		meetingRef01ResdataUp0Result, err := meetingRef01Ent.Update(meetingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		meetingRef01ResdataUp0 := core.ToMapAny(entityData(meetingRef01ResdataUp0Result))
		if meetingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if meetingRef01ResdataUp0["id"] != meetingRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if meetingRef01ResdataUp0[meetingRef01MarkdefUp0Name] != meetingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", meetingRef01MarkdefUp0Name, meetingRef01ResdataUp0[meetingRef01MarkdefUp0Name])
		}

		// LOAD
		meetingRef01MatchDt0 := map[string]any{
			"id": meetingRef01Data["id"],
		}
		meetingRef01DataDt0Loaded, err := meetingRef01Ent.Load(meetingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		meetingRef01DataDt0LoadResult := core.ToMapAny(entityData(meetingRef01DataDt0Loaded))
		if meetingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if meetingRef01DataDt0LoadResult["id"] != meetingRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		meetingRef01MatchRm0 := map[string]any{
			"id": meetingRef01Data["id"],
		}
		_, err = meetingRef01Ent.Remove(meetingRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		meetingRef01MatchRt0 := map[string]any{
			"user_id": setup.idmap["user01"],
		}

		meetingRef01ListRt0Result, err := meetingRef01Ent.List(meetingRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		meetingRef01ListRt0, meetingRef01ListRt0Ok := meetingRef01ListRt0Result.([]any)
		if !meetingRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", meetingRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(meetingRef01ListRt0), map[string]any{"id": meetingRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func meetingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "meeting", "MeetingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read meeting test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse meeting test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"meeting01", "meeting02", "meeting03", "user01", "user02", "user03"},
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
	entidEnvRaw := os.Getenv("ZOOM_TEST_MEETING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_MEETING_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_MEETING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ZOOM_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ZOOM_APIKEY"],
			},
			extra,
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
