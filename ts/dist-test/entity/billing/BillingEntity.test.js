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
(0, node_test_1.describe)('BillingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.Billing();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['create', 'update', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'billing.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "address": { "a": true, "h": "Address", "n": "address", "r": true, "sh": "Billing Contact's address", "t": "`$STRING`", "key$": "address", "index$": 0 }, "apt": { "a": true, "h": "Apt", "n": "apt", "r": false, "sh": "Billing Contact's apartment/suite", "t": "`$STRING`", "key$": "apt", "index$": 1 }, "city": { "a": true, "h": "City", "n": "city", "r": true, "sh": "Billing Contact's city", "t": "`$STRING`", "key$": "city", "index$": 2 }, "country": { "a": true, "h": "Country", "n": "country", "r": true, "sh": "Billing Contact's country", "t": "`$STRING`", "key$": "country", "index$": 3 }, "email": { "a": true, "h": "Email", "n": "email", "r": true, "sh": "Billing Contact's email address", "t": "`$STRING`", "key$": "email", "index$": 4 }, "first_name": { "a": true, "h": "First Name", "n": "first_name", "r": true, "sh": "Billing Contact's first name", "t": "`$STRING`", "key$": "first_name", "index$": 5 }, "last_name": { "a": true, "h": "Last Name", "n": "last_name", "r": true, "sh": "Billing Contact's last name", "t": "`$STRING`", "key$": "last_name", "index$": 6 }, "phone_number": { "a": true, "h": "Phone Number", "n": "phone_number", "r": true, "sh": "Billing Contact's phone number", "t": "`$STRING`", "key$": "phone_number", "index$": 7 }, "state": { "a": true, "h": "State", "n": "state", "r": true, "sh": "Billing Contact's state", "t": "`$STRING`", "key$": "state", "index$": 8 }, "zip": { "a": true, "h": "Zip", "n": "zip", "r": true, "sh": "Billing Contact's zip/postal code", "t": "`$STRING`", "key$": "zip", "index$": 9 } }, "name": "billing", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /accounts/{accountId}/plans/addons", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/accounts/{accountId}/plans/addons", "q": { "exist": ["account_id", "body"] }, "r": { "param": { "accountId": "account_id" } }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "plans" }, { "lit": "addons" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /accounts/{accountId}/billing", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/accounts/{accountId}/billing", "q": { "exist": ["account_id"] }, "r": { "param": { "accountId": "account_id" } }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "billing" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "patch": { "input": "data", "name": "patch", "points": [{ "a": true, "co": { "id": "PATCH /accounts/{accountId}/billing", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/accounts/{accountId}/billing", "q": { "exist": ["account_id", "body"] }, "r": { "param": { "accountId": "account_id" } }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "billing" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "patch" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PUT /accounts/{accountId}/plans/addons", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/accounts/{accountId}/plans/addons", "q": { "exist": ["account_id", "body"] }, "r": { "param": { "accountId": "account_id" } }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "plans" }, { "lit": "addons" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PUT /accounts/{accountId}/plans/base", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "account_id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "PUT", "o": "/accounts/{accountId}/plans/base", "q": { "exist": ["account_id", "body"] }, "r": { "param": { "accountId": "account_id" } }, "s": [{ "lit": "accounts" }, { "var": "account_id" }, { "lit": "plans" }, { "lit": "base" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.account"]] }, "key$": "billing", "name__orig": "billing", "Name": "Billing", "name_": "billing", "name-": "billing", "NAME": "BILLING", "index$": 3 }, { "active": true, "entity": "billing", "key$": "BasicBillingFlow", "kind": "basic", "name": "BasicBillingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "billing_ref01" }, "m": { "account_id": "account01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "billing_ref01", "srcdatavar": "billing_ref01_data", "suffix": "_up0", "textfield": "address" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "billing_ref01", "srcdatavar": "billing_ref01_data", "suffix": "_dt0" }, "m": { "id": "billing01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-billing_ref01" } }], "index$": 2 }] }, 'Billing', { "POST /accounts/{accountId}/plans/addons": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "type": "object", "description": "Account plan object", "required": ["type", "hosts"], "properties": { "type": { "type": "string", "description": "Account <a href=\"#plans\">plan type</a>" }, "hosts": { "type": "integer", "description": "Account plan number of hosts" } }, "x-ref": "#/definitions/AccountPlanRequired" }, "index$": 1 }] }, "GET /accounts/{accountId}/billing": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }] }, "PATCH /accounts/{accountId}/billing": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "type": "object", "description": "Billing Contact object", "properties": { "first_name": { "type": "string", "description": "Billing Contact's first name" }, "last_name": { "type": "string", "description": "Billing Contact's last name" }, "email": { "type": "string", "description": "Billing Contact's email address" }, "phone_number": { "type": "string", "description": "Billing Contact's phone number" }, "address": { "type": "string", "description": "Billing Contact's address" }, "apt": { "type": "string", "description": "Billing Contact's apartment/suite" }, "city": { "type": "string", "description": "Billing Contact's city" }, "state": { "type": "string", "description": "Billing Contact's state" }, "zip": { "type": "string", "description": "Billing Contact's zip/postal code" }, "country": { "type": "string", "description": "Billing Contact's country" } }, "x-ref": "#/definitions/BillingContact" }, "index$": 1 }] }, "PUT /accounts/{accountId}/plans/addons": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "type": "object", "description": "Account plan object", "required": ["type", "hosts"], "properties": { "type": { "type": "string", "description": "Account <a href=\"#plans\">plan type</a>" }, "hosts": { "type": "integer", "description": "Account plan number of hosts" } }, "x-ref": "#/definitions/AccountPlanRequired" }, "index$": 1 }] }, "PUT /accounts/{accountId}/plans/base": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "type": "object", "description": "Account base plan object", "required": ["type", "hosts"], "properties": { "type": { "description": "Account base <a href=\"#plans\">plan type</a>", "type": "string" }, "hosts": { "description": "Account base plan number of hosts. For a Pro Plan, please select a value between 1 and 9. For a Business Plan, please select a value between 10 and 49. For a Education Plan, please select a value between 20 and 149. For a Free Trial Plan, please select a value between 1 and 9999.", "type": "integer" } }, "x-ref": "#/definitions/AccountPlanBaseRequired" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const billing_ref01_ent = client.Billing();
        let billing_ref01_data = setup.data.new.billing['billing_ref01'];
        billing_ref01_data['account_id'] = setup.idmap['account01'];
        billing_ref01_data = (await billing_ref01_ent.create(billing_ref01_data)).data();
        (0, node_assert_1.default)(null != billing_ref01_data);
        // UPDATE
        const billing_ref01_data_up0 = {};
        const billing_ref01_markdef_up0 = { name: 'address', value: 'Mark01-billing_ref01_' + setup.now };
        billing_ref01_data_up0[billing_ref01_markdef_up0.name] = billing_ref01_markdef_up0.value;
        const billing_ref01_resdata_up0 = (await billing_ref01_ent.update(billing_ref01_data_up0)).data();
        (0, node_assert_1.default)(null != billing_ref01_resdata_up0);
        (0, node_assert_1.default)(billing_ref01_resdata_up0[billing_ref01_markdef_up0.name] === billing_ref01_markdef_up0.value);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/billing/BillingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['billing01', 'billing02', 'billing03', 'account01', 'account02', 'account03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_BILLING_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_BILLING_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_BILLING_ENTID'];
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
//# sourceMappingURL=BillingEntity.test.js.map