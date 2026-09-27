<?php
declare(strict_types=1);

// Billing entity test

require_once __DIR__ . '/../zoom_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BillingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ZoomSDK::test(null, null);
        $ent = $testsdk->Billing(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = billing_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "update", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "billing." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_BILLING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $billing_ref01_ent = $client->Billing(null);
        $billing_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.billing"), "billing_ref01"));
        $billing_ref01_data["account_id"] = $setup["idmap"]["account01"];

        $billing_ref01_data_result = $billing_ref01_ent->create($billing_ref01_data, null);
        $billing_ref01_data = Helpers::to_map(is_object($billing_ref01_data_result) && method_exists($billing_ref01_data_result, 'data_get') ? $billing_ref01_data_result->data_get() : $billing_ref01_data_result);
        $this->assertNotNull($billing_ref01_data);

        // UPDATE
        $billing_ref01_data_up0_up = [
        ];

        $billing_ref01_markdef_up0_name = "address";
        $billing_ref01_markdef_up0_value = "Mark01-billing_ref01_" . $setup["now"];
        $billing_ref01_data_up0_up[$billing_ref01_markdef_up0_name] = $billing_ref01_markdef_up0_value;

        $billing_ref01_resdata_up0_result = $billing_ref01_ent->update($billing_ref01_data_up0_up, null);
        $billing_ref01_resdata_up0 = Helpers::to_map(is_object($billing_ref01_resdata_up0_result) && method_exists($billing_ref01_resdata_up0_result, 'data_get') ? $billing_ref01_resdata_up0_result->data_get() : $billing_ref01_resdata_up0_result);
        $this->assertNotNull($billing_ref01_resdata_up0);
        $this->assertEquals($billing_ref01_resdata_up0[$billing_ref01_markdef_up0_name], $billing_ref01_markdef_up0_value);

        // LOAD
        $billing_ref01_match_dt0 = [];
        $billing_ref01_data_dt0_loaded = $billing_ref01_ent->load($billing_ref01_match_dt0, null);
        $this->assertNotNull($billing_ref01_data_dt0_loaded);

    }
}

function billing_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/billing/BillingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ZoomSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["billing01", "billing02", "billing03", "account01", "account02", "account03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ZOOM_TEST_BILLING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ZOOM_TEST_BILLING_ENTID" => $idmap,
        "ZOOM_TEST_LIVE" => "FALSE",
        "ZOOM_TEST_EXPLAIN" => "FALSE",
        "ZOOM_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ZOOM_TEST_BILLING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ZOOM_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["ZOOM_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new ZoomSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["ZOOM_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ZOOM_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
