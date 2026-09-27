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

func TestCloudRecordingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.CloudRecording(nil)
		if ent == nil {
			t.Fatal("expected non-nil CloudRecordingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := cloud_recordingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "cloud_recording." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_CLOUD_RECORDING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		cloudRecordingRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.cloud_recording")))
		var cloudRecordingRef01Data map[string]any
		if len(cloudRecordingRef01DataRaw) > 0 {
			cloudRecordingRef01Data = core.ToMapAny(cloudRecordingRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = cloudRecordingRef01Data

		// UPDATE
		cloudRecordingRef01Ent := client.CloudRecording(nil)
		cloudRecordingRef01DataUp0Up := map[string]any{
			"id": cloudRecordingRef01Data["id"],
		}

		cloudRecordingRef01ResdataUp0Result, err := cloudRecordingRef01Ent.Update(cloudRecordingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		cloudRecordingRef01ResdataUp0 := core.ToMapAny(entityData(cloudRecordingRef01ResdataUp0Result))
		if cloudRecordingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if cloudRecordingRef01ResdataUp0["id"] != cloudRecordingRef01DataUp0Up["id"] {
			t.Fatal("expected update result id to match")
		}

		// LOAD
		cloudRecordingRef01MatchDt0 := map[string]any{
			"id": cloudRecordingRef01Data["id"],
		}
		cloudRecordingRef01DataDt0Loaded, err := cloudRecordingRef01Ent.Load(cloudRecordingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		cloudRecordingRef01DataDt0LoadResult := core.ToMapAny(entityData(cloudRecordingRef01DataDt0Loaded))
		if cloudRecordingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if cloudRecordingRef01DataDt0LoadResult["id"] != cloudRecordingRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func cloud_recordingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "cloud_recording", "CloudRecordingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read cloud_recording test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse cloud_recording test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"cloud_recording01", "cloud_recording02", "cloud_recording03", "meeting01", "meeting02", "meeting03", "recording01", "recording02", "recording03"},
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
	entidEnvRaw := os.Getenv("ZOOM_TEST_CLOUD_RECORDING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_CLOUD_RECORDING_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_CLOUD_RECORDING_ENTID"])
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
