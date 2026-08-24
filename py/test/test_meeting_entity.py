# Meeting entity test

import json
import os
import time

import pytest

from zoom_sdk.utility.voxgig_struct import voxgig_struct as vs
from zoom_sdk import ZoomSDK
from zoom_sdk.core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestMeetingEntity:

    def test_should_create_instance(self):
        testsdk = ZoomSDK.test(None, None)
        ent = testsdk.Meeting(None)
        assert ent is not None

    def test_should_stream(self):
        # Feature #4: the entity stream(action, ...) method runs the op
        # pipeline and yields result items. With the streaming feature active
        # it yields the feature's incremental output; otherwise it falls back
        # to the materialised list so stream always yields.
        seed = {
            "entity": {
                "meeting": {
                    "s1": {"id": "s1"},
                    "s2": {"id": "s2"},
                    "s3": {"id": "s3"},
                }
            }
        }

        # Fallback: streaming inactive -> yields the materialised list items.
        base = ZoomSDK.test(seed, None)
        seen = list(base.Meeting(None).stream("list", None, None))
        assert len(seen) == 3

        # Inbound: streaming active -> yields each item from the feature.
        from zoom_sdk.config import shared_config
        cfg = shared_config()
        if isinstance(cfg.get("feature"), dict) and "streaming" in cfg["feature"]:
            sdk = ZoomSDK.test(
                seed, {"feature": {"streaming": {"active": True}}})
            got = []
            for item in sdk.Meeting(None).stream("list", None, None):
                if isinstance(item, list):
                    got.extend(item)
                else:
                    got.append(item)
            assert len(got) == 3

    def test_should_run_basic_flow(self):
        setup = _meeting_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "update", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "meeting." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set ZOOM_TEST_MEETING_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        meeting_ref01_ent = client.Meeting(None)
        meeting_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.meeting"), "meeting_ref01"))
        meeting_ref01_data["user_id"] = setup["idmap"]["user01"]

        meeting_ref01_data = helpers.to_map(runner.entity_data(meeting_ref01_ent.create(meeting_ref01_data, None)))
        assert meeting_ref01_data is not None
        assert meeting_ref01_data["id"] is not None

        # LIST
        meeting_ref01_match = {
            "user_id": setup["idmap"]["user01"],
        }

        meeting_ref01_list_result = meeting_ref01_ent.list(meeting_ref01_match, None)
        assert isinstance(meeting_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(meeting_ref01_list_result),
            {"id": meeting_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # UPDATE
        meeting_ref01_data_up0_up = {
            "id": meeting_ref01_data["id"],
        }

        meeting_ref01_markdef_up0_name = "agenda"
        meeting_ref01_markdef_up0_value = "Mark01-meeting_ref01_" + str(setup["now"])
        meeting_ref01_data_up0_up[meeting_ref01_markdef_up0_name] = meeting_ref01_markdef_up0_value

        meeting_ref01_resdata_up0 = helpers.to_map(runner.entity_data(meeting_ref01_ent.update(meeting_ref01_data_up0_up, None)))
        assert meeting_ref01_resdata_up0 is not None
        assert meeting_ref01_resdata_up0["id"] == meeting_ref01_data_up0_up["id"]
        assert meeting_ref01_resdata_up0[meeting_ref01_markdef_up0_name] == meeting_ref01_markdef_up0_value

        # LOAD
        meeting_ref01_match_dt0 = {
            "id": meeting_ref01_data["id"],
        }
        meeting_ref01_data_dt0_loaded = meeting_ref01_ent.load(meeting_ref01_match_dt0, None)
        meeting_ref01_data_dt0_load_result = helpers.to_map(runner.entity_data(meeting_ref01_data_dt0_loaded))
        assert meeting_ref01_data_dt0_load_result is not None
        assert meeting_ref01_data_dt0_load_result["id"] == meeting_ref01_data["id"]

        # REMOVE
        meeting_ref01_match_rm0 = {
            "id": meeting_ref01_data["id"],
        }
        meeting_ref01_ent.remove(meeting_ref01_match_rm0, None)

        # LIST
        meeting_ref01_match_rt0 = {
            "user_id": setup["idmap"]["user01"],
        }

        meeting_ref01_list_rt0_result = meeting_ref01_ent.list(meeting_ref01_match_rt0, None)
        assert isinstance(meeting_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(meeting_ref01_list_rt0_result),
            {"id": meeting_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _meeting_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/meeting/MeetingTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = ZoomSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["meeting01", "meeting02", "meeting03", "user01", "user02", "user03"],
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
        "ZOOM_TEST_MEETING_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "ZOOM_TEST_MEETING_ENTID": idmap,
        "ZOOM_TEST_LIVE": "FALSE",
        "ZOOM_TEST_EXPLAIN": "FALSE",
        "ZOOM_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("ZOOM_TEST_MEETING_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("ZOOM_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
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
