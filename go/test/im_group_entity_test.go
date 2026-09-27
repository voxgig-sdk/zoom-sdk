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

func TestImGroupEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ImGroup(nil)
		if ent == nil {
			t.Fatal("expected non-nil ImGroupEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := im_groupBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "im_group." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_IM_GROUP_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		imGroupRef01Ent := client.ImGroup(nil)
		imGroupRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "im_group"}), "im_group_ref01"))
		imGroupRef01Data["group_id"] = setup.idmap["group01"]

		imGroupRef01DataResult, err := imGroupRef01Ent.Create(imGroupRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		imGroupRef01Data = core.ToMapAny(entityData(imGroupRef01DataResult))
		if imGroupRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if imGroupRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// UPDATE
		imGroupRef01DataUp0Up := map[string]any{
			"id": imGroupRef01Data["id"],
		}

		imGroupRef01ResdataUp0Result, err := imGroupRef01Ent.Update(imGroupRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		imGroupRef01ResdataUp0 := core.ToMapAny(entityData(imGroupRef01ResdataUp0Result))
		if imGroupRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if imGroupRef01ResdataUp0["id"] != imGroupRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		imGroupRef01MatchDt0 := map[string]any{
			"id": imGroupRef01Data["id"],
		}
		imGroupRef01DataDt0Loaded, err := imGroupRef01Ent.Load(imGroupRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		imGroupRef01DataDt0LoadResult := core.ToMapAny(entityData(imGroupRef01DataDt0Loaded))
		if imGroupRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if imGroupRef01DataDt0LoadResult["id"] != imGroupRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		imGroupRef01MatchRm0 := map[string]any{
			"id": imGroupRef01Data["id"],
		}
		_, err = imGroupRef01Ent.Remove(imGroupRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

	})
}

func im_groupBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "im_group", "ImGroupTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read im_group test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse im_group test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"im_group01", "im_group02", "im_group03", "group01", "group02", "group03"},
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
	entidEnvRaw := os.Getenv("ZOOM_TEST_IM_GROUP_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_IM_GROUP_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_IM_GROUP_ENTID"])
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
