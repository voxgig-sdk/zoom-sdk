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

func TestBillingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Billing(nil)
		if ent == nil {
			t.Fatal("expected non-nil BillingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := billingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "update", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "billing." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_BILLING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		billingRef01Ent := client.Billing(nil)
		billingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath(setup.data, []any{"new", "billing"}), "billing_ref01"))
		billingRef01Data["account_id"] = setup.idmap["account01"]

		billingRef01DataResult, err := billingRef01Ent.Create(billingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		billingRef01Data = core.ToMapAny(entityData(billingRef01DataResult))
		if billingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

		// UPDATE
		billingRef01DataUp0Up := map[string]any{
		}

		billingRef01MarkdefUp0Name := "address"
		billingRef01MarkdefUp0Value := fmt.Sprintf("Mark01-billing_ref01_%d", setup.now)
		billingRef01DataUp0Up[billingRef01MarkdefUp0Name] = billingRef01MarkdefUp0Value

		billingRef01ResdataUp0Result, err := billingRef01Ent.Update(billingRef01DataUp0Up, nil)
		if err != nil {
			t.Fatalf("update failed: %v", err)
		}
		billingRef01ResdataUp0 := core.ToMapAny(entityData(billingRef01ResdataUp0Result))
		if billingRef01ResdataUp0 == nil {
			t.Fatal("expected update result to be a map")
		}
		if billingRef01ResdataUp0[billingRef01MarkdefUp0Name] != billingRef01MarkdefUp0Value {
			t.Fatalf("expected %s to be updated, got %v", billingRef01MarkdefUp0Name, billingRef01ResdataUp0[billingRef01MarkdefUp0Name])
		}

		// LOAD
		billingRef01MatchDt0 := map[string]any{}
		billingRef01DataDt0Loaded, err := billingRef01Ent.Load(billingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if billingRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func billingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "billing", "BillingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read billing test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse billing test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"billing01", "billing02", "billing03", "account01", "account02", "account03"},
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
	entidEnvRaw := os.Getenv("ZOOM_TEST_BILLING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ZOOM_TEST_BILLING_ENTID": idmap,
		"ZOOM_TEST_LIVE":      "FALSE",
		"ZOOM_TEST_EXPLAIN":   "FALSE",
		"ZOOM_APIKEY":         "",
	})

	idmapResolved := core.ToMapAny(env["ZOOM_TEST_BILLING_ENTID"])
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
