# Billing entity test

import json
import os
import time

import pytest

from zoom_sdk.utility.voxgig_struct import voxgig_struct as vs
from zoom_sdk import ZoomSDK
from zoom_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestBillingEntity:

    def test_should_create_instance(self):
        testsdk = ZoomSDK.test(None, None)
        ent = testsdk.Billing(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _billing_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "billing." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set ZOOM_TEST_BILLING_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        billing_ref01_ent = client.Billing(None)
        billing_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.billing"), "billing_ref01"))
        billing_ref01_data["account_id"] = setup["idmap"]["account01"]

        billing_ref01_data = helpers.to_map(runner.entity_data(billing_ref01_ent.create(billing_ref01_data, None)))
        assert billing_ref01_data is not None

        # UPDATE
        billing_ref01_data_up0_up = {
        }

        billing_ref01_markdef_up0_name = "address"
        billing_ref01_markdef_up0_value = "Mark01-billing_ref01_" + str(setup["now"])
        billing_ref01_data_up0_up[billing_ref01_markdef_up0_name] = billing_ref01_markdef_up0_value

        billing_ref01_resdata_up0 = helpers.to_map(runner.entity_data(billing_ref01_ent.update(billing_ref01_data_up0_up, None)))
        assert billing_ref01_resdata_up0 is not None
        assert billing_ref01_resdata_up0[billing_ref01_markdef_up0_name] == billing_ref01_markdef_up0_value

        # LOAD
        billing_ref01_match_dt0 = {}
        billing_ref01_data_dt0_loaded = billing_ref01_ent.load(billing_ref01_match_dt0, None)
        assert billing_ref01_data_dt0_loaded is not None



def _billing_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/billing/BillingTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ZoomSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["billing01", "billing02", "billing03", "account01", "account02", "account03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "ZOOM_TEST_BILLING_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ZOOM_TEST_BILLING_ENTID": idmap,
        "ZOOM_TEST_LIVE": "FALSE",
        "ZOOM_TEST_EXPLAIN": "FALSE",
        "ZOOM_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ZOOM_TEST_BILLING_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ZOOM_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            # FIRST, so the generated fields below win: sdk-test-control.json's
            # test.client.options adds to the live client, it does not
            # redirect it.
            runner.live_client_options(),
            {
                "apikey": env.get("ZOOM_APIKEY"),
            },
            extra or {},
        ])
        client = ZoomSDK(helpers.to_map(merged_opts))

    _live = env.get("ZOOM_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("ZOOM_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
