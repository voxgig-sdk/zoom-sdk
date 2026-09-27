# ImGroup entity test

import json
import os
import time

import pytest

from zoom_sdk.utility.voxgig_struct import voxgig_struct as vs
from zoom_sdk import ZoomSDK
from zoom_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestImGroupEntity:

    def test_should_create_instance(self):
        testsdk = ZoomSDK.test(None, None)
        ent = testsdk.ImGroup(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _im_group_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "im_group." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set ZOOM_TEST_IM_GROUP_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        im_group_ref01_ent = client.ImGroup(None)
        im_group_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.im_group"), "im_group_ref01"))
        im_group_ref01_data["group_id"] = setup["idmap"]["group01"]

        im_group_ref01_data = helpers.to_map(runner.entity_data(im_group_ref01_ent.create(im_group_ref01_data, None)))
        assert im_group_ref01_data is not None
        assert im_group_ref01_data["id"] is not None

        # UPDATE
        im_group_ref01_data_up0_up = {
            "id": im_group_ref01_data["id"],
        }

        im_group_ref01_resdata_up0 = helpers.to_map(runner.entity_data(im_group_ref01_ent.update(im_group_ref01_data_up0_up, None)))
        assert im_group_ref01_resdata_up0 is not None
        assert im_group_ref01_resdata_up0["id"] == im_group_ref01_data_up0_up["id"]

        # LOAD
        im_group_ref01_match_dt0 = {
            "id": im_group_ref01_data["id"],
        }
        im_group_ref01_data_dt0_loaded = im_group_ref01_ent.load(im_group_ref01_match_dt0, None)
        im_group_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(im_group_ref01_data_dt0_loaded))
        assert im_group_ref01_data_dt0_load_result is not None
        assert im_group_ref01_data_dt0_load_result["id"] == im_group_ref01_data["id"]

        # REMOVE
        im_group_ref01_match_rm0 = {
            "id": im_group_ref01_data["id"],
        }
        im_group_ref01_ent.remove(im_group_ref01_match_rm0, None)



def _im_group_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/im_group/ImGroupTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ZoomSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["im_group01", "im_group02", "im_group03", "group01", "group02", "group03"],
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
        "ZOOM_TEST_IM_GROUP_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ZOOM_TEST_IM_GROUP_ENTID": idmap,
        "ZOOM_TEST_LIVE": "FALSE",
        "ZOOM_TEST_EXPLAIN": "FALSE",
        "ZOOM_APIKEY": "",
    })

    idmap_resolved = helpers.to_map(
        env.get("ZOOM_TEST_IM_GROUP_ENTID"))
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
