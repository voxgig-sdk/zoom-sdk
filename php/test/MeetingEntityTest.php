<?php
declare(strict_types=1);

// Meeting entity test

require_once __DIR__ . '/../zoom_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MeetingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = ZoomSDK::test(null, null);
        $ent = $testsdk->Meeting(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "meeting" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = ZoomSDK::test($seed, null);
        $seen = iterator_to_array($base->Meeting(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = ZoomConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = ZoomSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Meeting(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = meeting_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create", "list", "update", "load", "remove"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "meeting." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ZOOM_TEST_MEETING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $meeting_ref01_ent = $client->Meeting(null);
        $meeting_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.meeting"), "meeting_ref01"));
        $meeting_ref01_data["user_id"] = $setup["idmap"]["user01"];

        $meeting_ref01_data_result = $meeting_ref01_ent->create($meeting_ref01_data, null);
        $meeting_ref01_data = Helpers::to_map(is_object($meeting_ref01_data_result) && method_exists($meeting_ref01_data_result, 'data_get') ? $meeting_ref01_data_result->data_get() : $meeting_ref01_data_result);
        $this->assertNotNull($meeting_ref01_data);
        $this->assertNotNull($meeting_ref01_data["id"]);

        // LIST
        $meeting_ref01_match = [
            "user_id" => $setup["idmap"]["user01"],
        ];

        $meeting_ref01_list_result = $meeting_ref01_ent->list($meeting_ref01_match, null);
        $this->assertIsArray($meeting_ref01_list_result);

        $found_item = sdk_select(
            Runner::entity_list_to_data($meeting_ref01_list_result),
            ["id" => $meeting_ref01_data["id"]]);
        $this->assertNotEmpty($found_item);

        // UPDATE
        $meeting_ref01_data_up0_up = [
            "id" => $meeting_ref01_data["id"],
        ];

        $meeting_ref01_markdef_up0_name = "agenda";
        $meeting_ref01_markdef_up0_value = "Mark01-meeting_ref01_" . $setup["now"];
        $meeting_ref01_data_up0_up[$meeting_ref01_markdef_up0_name] = $meeting_ref01_markdef_up0_value;

        $meeting_ref01_resdata_up0_result = $meeting_ref01_ent->update($meeting_ref01_data_up0_up, null);
        $meeting_ref01_resdata_up0 = Helpers::to_map(is_object($meeting_ref01_resdata_up0_result) && method_exists($meeting_ref01_resdata_up0_result, 'data_get') ? $meeting_ref01_resdata_up0_result->data_get() : $meeting_ref01_resdata_up0_result);
        $this->assertNotNull($meeting_ref01_resdata_up0);
        $this->assertEquals($meeting_ref01_resdata_up0["id"], $meeting_ref01_data_up0_up["id"]);
        $this->assertEquals($meeting_ref01_resdata_up0[$meeting_ref01_markdef_up0_name], $meeting_ref01_markdef_up0_value);

        // LOAD
        $meeting_ref01_match_dt0 = [
            "id" => $meeting_ref01_data["id"],
        ];
        $meeting_ref01_data_dt0_loaded = $meeting_ref01_ent->load($meeting_ref01_match_dt0, null);
        $meeting_ref01_data_dt0_load_result = Helpers::to_map(is_object($meeting_ref01_data_dt0_loaded) && method_exists($meeting_ref01_data_dt0_loaded, 'data_get') ? $meeting_ref01_data_dt0_loaded->data_get() : $meeting_ref01_data_dt0_loaded);
        $this->assertNotNull($meeting_ref01_data_dt0_load_result);
        $this->assertEquals($meeting_ref01_data_dt0_load_result["id"], $meeting_ref01_data["id"]);

        // REMOVE
        $meeting_ref01_match_rm0 = [
            "id" => $meeting_ref01_data["id"],
        ];
        $meeting_ref01_ent->remove($meeting_ref01_match_rm0, null);

        // LIST
        $meeting_ref01_match_rt0 = [
            "user_id" => $setup["idmap"]["user01"],
        ];

        $meeting_ref01_list_rt0_result = $meeting_ref01_ent->list($meeting_ref01_match_rt0, null);
        $this->assertIsArray($meeting_ref01_list_rt0_result);

        $not_found_item = sdk_select(
            Runner::entity_list_to_data($meeting_ref01_list_rt0_result),
            ["id" => $meeting_ref01_data["id"]]);
        $this->assertEmpty($not_found_item);

    }
}

function meeting_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/meeting/MeetingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = ZoomSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["meeting01", "meeting02", "meeting03", "user01", "user02", "user03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ZOOM_TEST_MEETING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ZOOM_TEST_MEETING_ENTID" => $idmap,
        "ZOOM_TEST_LIVE" => "FALSE",
        "ZOOM_TEST_EXPLAIN" => "FALSE",
        "ZOOM_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ZOOM_TEST_MEETING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ZOOM_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ZOOM_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new ZoomSDK(Helpers::to_map($merged_opts));
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
