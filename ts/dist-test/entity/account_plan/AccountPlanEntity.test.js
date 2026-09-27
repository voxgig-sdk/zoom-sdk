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
(0, node_test_1.describe)('AccountPlanEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.AccountPlan();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'account_plan.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "plan_audio": { "a": true, "h": "Plan Audio", "n": "plan_audio", "r": false, "sh": "Additional Audio Conferencing <a href=\"#plans\">plan type</a>", "t": "`$OBJECT`", "key$": "plan_audio", "index$": 1 }, "plan_base": { "a": true, "h": "Plan Base", "n": "plan_base", "r": true, "sh": "Account base plan object", "t": "`$OBJECT`", "key$": "plan_base", "index$": 2 }, "plan_large_meeting": { "a": true, "h": "Plan Large Meeting", "n": "plan_large_meeting", "r": false, "sh": "Additional Large Meeting Plans", "t": "`$ARRAY`", "key$": "plan_large_meeting", "index$": 3 }, "plan_recording": { "a": true, "h": "Plan Recording", "n": "plan_recording", "r": false, "sh": "Additional Cloud Recording Plan", "t": "`$STRING`", "key$": "plan_recording", "index$": 4 }, "plan_room_connector": { "a": true, "h": "Plan Room Connector", "n": "plan_room_connector", "r": false, "sh": "Account plan object", "t": "`$OBJECT`", "key$": "plan_room_connector", "index$": 5 }, "plan_webinar": { "a": true, "h": "Plan Webinar", "n": "plan_webinar", "r": false, "sh": "Additional Webinar Plans", "t": "`$ARRAY`", "key$": "plan_webinar", "index$": 6 }, "plan_zoom_rooms": { "a": true, "h": "Plan Zoom Rooms", "n": "plan_zoom_rooms", "r": false, "sh": "Account plan object", "t": "`$OBJECT`", "key$": "plan_zoom_rooms", "index$": 7 } }, "id": { "field": "id", "name": "id" }, "name": "account_plan", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /accounts/{accountId}/plans", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/accounts/{accountId}/plans", "q": { "exist": ["body", "id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }, { "lit": "plans" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /accounts/{accountId}/plans", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/accounts/{accountId}/plans", "q": { "exist": ["id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }, { "lit": "plans" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "account_plan", "name__orig": "account_plan", "Name": "AccountPlan", "name_": "account_plan", "name-": "account-plan", "NAME": "ACCOUNT_PLAN", "index$": 1 }, { "active": true, "entity": "account_plan", "key$": "BasicAccountPlanFlow", "kind": "basic", "name": "BasicAccountPlanFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "account_plan_ref01" }, "m": { "account_id": "account01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": { "account_id": "account01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "account_plan_ref01" } }], "index$": 1 }] }, 'AccountPlan', { "POST /accounts/{accountId}/plans": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "allOf": [{ "type": "object", "properties": { "contact": { "type": "object", "description": "Billing Contact object", "required": ["first_name", "last_name", "email", "phone_number", "address", "city", "state", "zip", "country"], "properties": { "first_name": { "description": "Billing Contact's first name", "key$": "first_name", "type": "string" }, "last_name": { "description": "Billing Contact's last name", "key$": "last_name", "type": "string" }, "email": { "description": "Billing Contact's email address", "key$": "email", "type": "string" }, "phone_number": { "description": "Billing Contact's phone number", "key$": "phone_number", "type": "string" }, "address": { "description": "Billing Contact's address", "key$": "address", "type": "string" }, "apt": { "description": "Billing Contact's apartment/suite", "key$": "apt", "type": "string" }, "city": { "description": "Billing Contact's city", "key$": "city", "type": "string" }, "state": { "description": "Billing Contact's state", "key$": "state", "type": "string" }, "zip": { "description": "Billing Contact's zip/postal code", "key$": "zip", "type": "string" }, "country": { "description": "Billing Contact's country", "key$": "country", "type": "string" } }, "x-ref": "#/definitions/BillingContactRequired" } } }, { "type": "object", "description": "Account Plans object", "properties": { "plan_base": { "description": "Account base plan object", "key$": "plan_base", "properties": { "hosts": { "description": "Account base plan number of hosts. For a Pro Plan, please select a value between 1 and 9. For a Business Plan, please select a value between 10 and 49. For a Education Plan, please select a value between 20 and 149. For a Free Trial Plan, please select a value between 1 and 9999.", "type": "integer" }, "type": { "description": "Account base <a href=\"#plans\">plan type</a>", "type": "string" } }, "required": ["type", "hosts"], "type": "object", "x-ref": "#/definitions/AccountPlanBaseRequired" }, "plan_zoom_rooms": { "description": "Account plan object", "key$": "plan_zoom_rooms", "properties": { "hosts": { "description": "Account plan number of hosts", "type": "integer" }, "type": { "description": "Account <a href=\"#plans\">plan type</a>", "type": "string" } }, "type": "object", "x-ref": "#/definitions/AccountPlan" }, "plan_room_connector": { "description": "Account plan object", "key$": "plan_room_connector", "properties": { "hosts": { "description": "Account plan number of hosts", "type": "integer" }, "type": { "description": "Account <a href=\"#plans\">plan type</a>", "type": "string" } }, "type": "object", "x-ref": "#/definitions/AccountPlan" }, "plan_large_meeting": { "description": "Additional Large Meeting Plans", "items": { "description": "Account plan object", "properties": { "hosts": {}, "type": {} }, "type": "object", "x-ref": "#/definitions/AccountPlan" }, "key$": "plan_large_meeting", "type": "array" }, "plan_webinar": { "description": "Additional Webinar Plans", "items": { "description": "Account plan object", "properties": { "hosts": {}, "type": {} }, "type": "object", "x-ref": "#/definitions/AccountPlan" }, "key$": "plan_webinar", "type": "array" }, "plan_recording": { "description": "Additional Cloud Recording Plan", "key$": "plan_recording", "type": "string" }, "plan_audio": { "description": "Additional Audio Conferencing <a href=\"#plans\">plan type</a>", "key$": "plan_audio", "properties": { "callout_countries": { "description": "Call-out countries, multiple value separated by comma", "type": "string" }, "ddi_numbers": { "description": "Dedicated Dial-In Numbers", "type": "integer" }, "premium_countries": { "description": "Premium countries, multiple value separated by comma", "type": "string" }, "tollfree_countries": { "description": "Toll-free countries, multiple value separated by comma", "type": "string" }, "type": { "description": "Additional Audio Conferencing <a href=\"#plans\">plan type</a>", "type": "string" } }, "type": "object" } }, "x-ref": "#/definitions/AccountPlans" }] }, "index$": 1 }] }, "GET /accounts/{accountId}/plans": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const account_plan_ref01_ent = client.AccountPlan();
        let account_plan_ref01_data = setup.data.new.account_plan['account_plan_ref01'];
        account_plan_ref01_data['account_id'] = setup.idmap['account01'];
        account_plan_ref01_data = (await account_plan_ref01_ent.create(account_plan_ref01_data)).data();
        (0, node_assert_1.default)(null != account_plan_ref01_data.id);
        // LIST
        const account_plan_ref01_match = {};
        account_plan_ref01_match['account_id'] = setup.idmap['account01'];
        const account_plan_ref01_list = (await account_plan_ref01_ent.list(account_plan_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(account_plan_ref01_list, { id: account_plan_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/account_plan/AccountPlanTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['account_plan01', 'account_plan02', 'account_plan03', 'account01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_ACCOUNT_PLAN_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_ACCOUNT_PLAN_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_ACCOUNT_PLAN_ENTID'];
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
//# sourceMappingURL=AccountPlanEntity.test.js.map