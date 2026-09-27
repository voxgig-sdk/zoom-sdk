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
(0, node_test_1.describe)('RecordingSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.RecordingSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'recording_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "approval_type": { "a": true, "h": "Approval Type", "n": "approval_type", "r": false, "sh": "Approval type", "t": "`$INTEGER`", "key$": "approval_type", "index$": 0 }, "on_demand": { "a": true, "h": "On Demand", "n": "on_demand", "r": false, "sh": "Registration required", "t": "`$BOOLEAN`", "key$": "on_demand", "index$": 1 }, "password": { "a": true, "h": "Password", "n": "password", "r": false, "sh": "Password protect", "t": "`$STRING`", "key$": "password", "index$": 2 }, "send_email_to_host": { "a": true, "h": "Send Email To Host", "n": "send_email_to_host", "r": false, "sh": "Send an email to host when someone registers", "t": "`$BOOLEAN`", "key$": "send_email_to_host", "index$": 3 }, "share_recording": { "a": true, "h": "Share Recording", "n": "share_recording", "r": false, "sh": "Determine if the meeting recording is shared", "t": "`$STRING`", "key$": "share_recording", "index$": 4 }, "show_social_share_buttons": { "a": true, "h": "Show Social Share Buttons", "n": "show_social_share_buttons", "r": false, "sh": "Show social share buttons on registration page", "t": "`$BOOLEAN`", "key$": "show_social_share_buttons", "index$": 5 }, "viewer_download": { "a": true, "h": "Viewer Download", "n": "viewer_download", "r": false, "sh": "Host video", "t": "`$BOOLEAN`", "key$": "viewer_download", "index$": 6 } }, "name": "recording_setting", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /meetings/{meetingId}/recordings/settings", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "meeting_id", "or": "meeting_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/meetings/{meetingId}/recordings/settings", "q": { "exist": ["meeting_id"] }, "r": { "param": { "meetingId": "meeting_id" } }, "s": [{ "lit": "meetings" }, { "var": "meeting_id" }, { "lit": "recordings" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["$.main.kit.entity.meeting"]] }, "key$": "recording_setting", "name__orig": "recording_setting", "Name": "RecordingSetting", "name_": "recording_setting", "name-": "recording-setting", "NAME": "RECORDING_SETTING", "index$": 21 }, { "active": true, "entity": "recording_setting", "key$": "BasicRecordingSettingFlow", "kind": "basic", "name": "BasicRecordingSettingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "recording_setting_ref01", "srcdatavar": "recording_setting_ref01_data", "suffix": "_dt0" }, "m": { "id": "recording_setting01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-recording_setting_ref01" } }], "index$": 0 }] }, 'RecordingSetting', { "GET /meetings/{meetingId}/recordings/settings": { "protocol": "http", "parameters": [{ "in": "path", "name": "meetingId", "description": "The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.", "type": "string", "required": true, "x-ref": "#/parameters/MeetingId4Recording", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let recording_setting_ref01_data = Object.values(setup.data.existing.recording_setting)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const recording_setting_ref01_ent = client.RecordingSetting();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/recording_setting/RecordingSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['recording_setting01', 'recording_setting02', 'recording_setting03', 'meeting01', 'meeting02', 'meeting03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_RECORDING_SETTING_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_RECORDING_SETTING_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_RECORDING_SETTING_ENTID'];
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
//# sourceMappingURL=RecordingSettingEntity.test.js.map