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
(0, node_test_1.describe)('UserSettingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.UserSetting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user_setting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "email_notification": { "a": true, "h": "Email Notification", "n": "email_notification", "r": false, "t": "`$OBJECT`", "key$": "email_notification", "index$": 0 }, "feature": { "a": true, "h": "Feature", "n": "feature", "r": false, "t": "`$OBJECT`", "key$": "feature", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 2 }, "in_meeting": { "a": true, "h": "In Meeting", "n": "in_meeting", "r": false, "t": "`$OBJECT`", "key$": "in_meeting", "index$": 3 }, "recording": { "a": true, "h": "Recording", "n": "recording", "r": false, "t": "`$OBJECT`", "key$": "recording", "index$": 4 }, "schedule_meeting": { "a": true, "h": "Schedule Meeting", "n": "schedule_meeting", "r": false, "t": "`$OBJECT`", "key$": "schedule_meeting", "index$": 5 }, "telephony": { "a": true, "h": "Telephony", "n": "telephony", "r": false, "t": "`$OBJECT`", "key$": "telephony", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "user_setting", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /users/{userId}/settings", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "login_type", "or": "login_type", "r": false, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/users/{userId}/settings", "q": { "exist": ["id", "login_type"] }, "r": { "param": { "userId": "id" } }, "s": [{ "lit": "users" }, { "var": "id" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "user_setting", "name__orig": "user_setting", "Name": "UserSetting", "name_": "user_setting", "name-": "user-setting", "NAME": "USER_SETTING", "index$": 29 }, { "active": true, "entity": "user_setting", "key$": "BasicUserSettingFlow", "kind": "basic", "name": "BasicUserSettingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "user_setting_ref01", "srcdatavar": "user_setting_ref01_data", "suffix": "_dt0" }, "m": { "id": "user_setting01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-user_setting_ref01" } }], "index$": 0 }] }, 'UserSetting', { "GET /users/{userId}/settings": { "protocol": "http", "parameters": [{ "in": "path", "name": "userId", "description": "The user ID or email address", "type": "string", "required": true, "x-ref": "#/parameters/UserId", "index$": 0 }, { "in": "query", "name": "login_type", "type": "string", "enum": [0, 1, 99, 100, 101], "x-enum-descriptions": ["Facebook", "Google", "API", "Zoom", "SSO"], "x-ref": "#/parameters/LoginType", "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let user_setting_ref01_data = Object.values(setup.data.existing.user_setting)[0];
        // LOAD
        const user_setting_ref01_ent = client.UserSetting();
        const user_setting_ref01_match_dt0 = {};
        user_setting_ref01_match_dt0.id = user_setting_ref01_data.id;
        const user_setting_ref01_data_dt0 = (await user_setting_ref01_ent.load(user_setting_ref01_match_dt0)).data();
        (0, node_assert_1.default)(user_setting_ref01_data_dt0.id === user_setting_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user_setting/UserSettingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user_setting01', 'user_setting02', 'user_setting03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_USER_SETTING_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_USER_SETTING_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_USER_SETTING_ENTID'];
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
//# sourceMappingURL=UserSettingEntity.test.js.map