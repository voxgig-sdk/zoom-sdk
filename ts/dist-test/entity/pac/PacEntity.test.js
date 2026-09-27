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
(0, node_test_1.describe)('PacEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.Pac();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pac.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "conference_id": { "a": true, "h": "Conference Id", "n": "conference_id", "r": false, "sh": "Conference ID", "t": "`$INTEGER`", "key$": "conference_id", "index$": 0 }, "dedicated_dial_in_number": { "a": true, "h": "Dedicated Dial In Number", "n": "dedicated_dial_in_number", "r": true, "sh": "List of Dedicated Dial In Numbers", "t": "`$ARRAY`", "key$": "dedicated_dial_in_number", "index$": 1 }, "global_dial_in_numbers": { "a": true, "h": "Global Dial In Numbers", "n": "global_dial_in_numbers", "r": true, "sh": "List of Global Dial In Numbers", "t": "`$ARRAY`", "key$": "global_dial_in_numbers", "index$": 2 }, "listen_only_password": { "a": true, "h": "Listen Only Password", "n": "listen_only_password", "r": false, "sh": "Listen-Only Password, numeric value, length is less than 6", "t": "`$STRING`", "key$": "listen_only_password", "index$": 3 }, "participant_password": { "a": true, "h": "Participant Password", "n": "participant_password", "r": false, "sh": "Participant Password, numeric value, length is less than 6", "t": "`$STRING`", "key$": "participant_password", "index$": 4 } }, "name": "pac", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /users/{userId}/pac", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "user_id", "or": "user_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/users/{userId}/pac", "q": { "exist": ["user_id"] }, "r": { "param": { "userId": "user_id" } }, "s": [{ "lit": "users" }, { "var": "user_id" }, { "lit": "pac" }], "t": { "req": "`reqdata`", "res": "`body.tsp_accounts`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [["$.main.kit.entity.user"]] }, "key$": "pac", "name__orig": "pac", "Name": "Pac", "name_": "pac", "name-": "pac", "NAME": "PAC", "index$": 17 }, { "active": true, "entity": "pac", "key$": "BasicPacFlow", "kind": "basic", "name": "BasicPacFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "user_id": "user01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "pac_ref01" } }], "index$": 0 }] }, 'Pac', { "GET /users/{userId}/pac": { "protocol": "http", "parameters": [{ "in": "path", "name": "userId", "description": "The user ID or email address", "type": "string", "required": true, "x-ref": "#/parameters/UserId", "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pac_ref01_data = Object.values(setup.data.existing.pac)[0];
        // LIST
        const pac_ref01_ent = client.Pac();
        const pac_ref01_match = {};
        pac_ref01_match['user_id'] = setup.idmap['user01'];
        const pac_ref01_list = (await pac_ref01_ent.list(pac_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pac/PacTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pac01', 'pac02', 'pac03', 'user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_PAC_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_PAC_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_PAC_ENTID'];
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
//# sourceMappingURL=PacEntity.test.js.map