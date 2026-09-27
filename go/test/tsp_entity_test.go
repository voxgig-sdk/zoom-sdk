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

func TestTspEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Tsp(nil)
		if ent == nil {
			t.Fatal("expected non-nil TspEntity")
		}
	})

	// Feature #4: the entity Stream(action, ...) method runs the op pipeline and
	// returns a channel over result items. With the streaming feature active it
	// yields the feature's incremental output; otherwise it falls back to the
	// materialised list so Stream always yields.
	t.Run("stream", func(t *testing.T) {
		seed := map[string]any{
			"entity": map[string]any{
				"tsp": map[string]any{
					"s1": map[string]any{"id": "s1"},
					"s2": map[string]any{"id": "s2"},
					"s3": map[string]any{"id": "s3"},
				},
			},
		}

		// Fallback: streaming inactive -> yields the materialised list items.
		base := sdk.TestSDK(seed, nil)
		var seen []any
		for item := range base.Tsp(nil).Stream("list", nil, nil) {
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
			for item := range streamSdk.Tsp(nil).Stream("list", nil, nil) {
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
		setup := tspBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "tsp." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_TSP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		tspRef01Ent := client.Tsp(nil)
		tspRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "tsp"}), "tsp_ref01"))
		tspRef01Data["user_id"] = setup.idmap["user01"]

		tspRef01DataResult, err := tspRef01Ent.Create(tspRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		tspRef01Data = core.ToMapAny(entityData(tspRef01DataResult))
		if tspRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if tspRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		tspRef01Match := map[string]any{}

		tspRef01ListResult, err := tspRef01Ent.List(tspRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		tspRef01List, tspRef01ListOk := tspRef01ListResult.([]any)
		if !tspRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", tspRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(tspRef01List), map[string]any{"id": tspRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// UPDATE
		tspRef01DataUp0Up := map[string]any{
			"id": tspRef01Data["id"],
		}

		tspRef01MarkdefUp0Name := "code"
		tspRef01MarkdefUp0Value := fmt.Sprintf("Mark01-tsp_ref01_%d", setup.now)
		tspRef01DataUp0Up[tspRef01MarkdefUp0Name] = tspRef01MarkdefUp0Value

		tspRef01ResdataUp0Result, err := tspRef01Ent.Update(tspRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		tspRef01ResdataUp0 := core.ToMapAny(entityData(tspRef01ResdataUp0Result))
		if tspRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if tspRef01ResdataUp0["id"] != tspRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}
		if tspRef01ResdataUp0[tspRef01MarkdefUp0Name] != tspRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", tspRef01MarkdefUp0Name, tspRef01ResdataUp0[tspRef01MarkdefUp0Name])
		}

		// LOAD
		tspRef01MatchDt0 := map[string]any{
			"id": tspRef01Data["id"],
		}
		tspRef01DataDt0Loaded, err := tspRef01Ent.Load(tspRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		tspRef01DataDt0LoadResult := core.ToMapAny(entityData(tspRef01DataDt0Loaded))
		if tspRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if tspRef01DataDt0LoadResult["id"] != tspRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		tspRef01MatchRm0 := map[string]any{
			"id": tspRef01Data["id"],
		}
		_, err = tspRef01Ent.Remove(tspRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		tspRef01MatchRt0 := map[string]any{}

		tspRef01ListRt0Result, err := tspRef01Ent.List(tspRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		tspRef01ListRt0, tspRef01ListRt0Ok := tspRef01ListRt0Result.([]any)
		if !tspRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", tspRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(tspRef01ListRt0), map[string]any{"id": tspRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func tspBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "tsp", "TspTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read tsp test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse tsp test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"tsp01", "tsp02", "tsp03", "user01", "user02", "user03"},
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
	entidEnvRaw := os.Getenv("ZOOM_TEST_TSP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_TSP_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_TSP_ENTID"])
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
