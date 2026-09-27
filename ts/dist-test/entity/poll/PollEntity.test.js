"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PollEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.Poll();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'poll.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "polls": { "a": true, "h": "Polls", "n": "polls", "r": false, "sh": "Array of Polls", "t": "`$ARRAY`", "key$": "polls", "index$": 0 }, "total_records": { "a": true, "h": "Total Records", "n": "total_records", "r": false, "sh": "The number of all records available across pages", "t": "`$INTEGER`", "key$": "total_records", "index$": 1 } }, "name": "poll", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /meetings/{meetingId}/polls", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "meeting_id", "or": "meeting_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/meetings/{meetingId}/polls", "q": { "exist": ["meeting_id"] }, "r": { "param": { "meetingId": "meeting_id" } }, "s": [{ "lit": "meetings" }, { "var": "meeting_id" }, { "lit": "polls" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /webinars/{webinarId}/polls", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "webinar_id", "or": "webinar_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/webinars/{webinarId}/polls", "q": { "exist": ["webinar_id"] }, "r": { "param": { "webinarId": "webinar_id" } }, "s": [{ "lit": "webinars" }, { "var": "webinar_id" }, { "lit": "polls" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.meeting"], ["$.main.kit.entity.webinar"]] }, "key$": "poll", "name__orig": "poll", "Name": "Poll", "name_": "poll", "name-": "poll", "NAME": "POLL", "index$": 18 }, { "active": true, "entity": "poll", "key$": "BasicPollFlow", "kind": "basic", "name": "BasicPollFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "webinar_id": "webinar01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "poll_ref01" } }], "index$": 0 }] }, 'Poll', { "GET /meetings/{meetingId}/polls": { "protocol": "http", "parameters": [{ "in": "path", "name": "meetingId", "description": "The meeting ID", "type": "integer", "required": true, "x-ref": "#/parameters/MeetingId", "index$": 0 }] }, "GET /webinars/{webinarId}/polls": { "protocol": "http", "parameters": [{ "in": "path", "name": "webinarId", "description": "The webinar ID", "type": "integer", "required": true, "x-ref": "#/parameters/WebinarId", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let poll_ref01_data = Object.values(setup.data.existing.poll)[0];
        // LIST
        const poll_ref01_ent = client.Poll();
        const poll_ref01_match = {};
        poll_ref01_match['webinar_id'] = setup.idmap['webinar01'];
        const poll_ref01_list = (await poll_ref01_ent.list(poll_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/poll/PollTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['poll01', 'poll02', 'poll03', 'meeting01', 'meeting02', 'meeting03', 'webinar01', 'webinar02', 'webinar03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_POLL_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_POLL_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_POLL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ZoomSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ZOOM_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ZOOM_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PollEntity.test.js.map