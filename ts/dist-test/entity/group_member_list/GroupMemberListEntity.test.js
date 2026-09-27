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
(0, node_test_1.describe)('GroupMemberListEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.GroupMemberList();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'group_member_list.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "members": { "a": true, "h": "Members", "n": "members", "r": false, "sh": "List of Group member objects", "t": "`$ARRAY`", "key$": "members", "index$": 1 }, "page_count": { "a": true, "h": "Page Count", "n": "page_count", "r": false, "sh": "The number of items returned on this page", "t": "`$INTEGER`", "key$": "page_count", "index$": 2 }, "page_number": { "a": true, "h": "Page Number", "n": "page_number", "r": false, "sh": "The page number of current results", "t": "`$INTEGER`", "key$": "page_number", "index$": 3 }, "page_size": { "a": true, "h": "Page Size", "n": "page_size", "r": false, "sh": "The number of records returned within a single API call", "t": "`$INTEGER`", "key$": "page_size", "index$": 4 }, "total_records": { "a": true, "h": "Total Records", "n": "total_records", "r": false, "sh": "The number of all records available across pages", "t": "`$INTEGER`", "key$": "total_records", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "group_member_list", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /groups/{groupId}/members", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "page_number", "or": "page_number", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/groups/{groupId}/members", "q": { "$action": "members", "exist": ["id", "page_number", "page_size"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "groups" }, { "var": "id" }, { "lit": "members" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "GET /im/groups/{groupId}/members", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "page_number", "or": "page_number", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/im/groups/{groupId}/members", "q": { "$action": "members", "exist": ["id", "page_number", "page_size"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "id" }, { "lit": "members" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "group_member_list", "name__orig": "group_member_list", "Name": "GroupMemberList", "name_": "group_member_list", "name-": "group-member-list", "NAME": "GROUP_MEMBER_LIST", "index$": 9 }, { "active": true, "entity": "group_member_list", "key$": "BasicGroupMemberListFlow", "kind": "basic", "name": "BasicGroupMemberListFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "group_id": "group01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "group_member_list_ref01" } }], "index$": 0 }] }, 'GroupMemberList', { "GET /groups/{groupId}/members": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }, { "in": "query", "name": "page_size", "description": "The number of records returned within a single API call", "type": "integer", "default": 30, "maximum": 300, "x-ref": "#/parameters/PageSize", "index$": 1 }, { "in": "query", "name": "page_number", "description": "Current page number of returned records", "type": "integer", "default": 1, "x-ref": "#/parameters/PageNumber", "index$": 2 }] }, "GET /im/groups/{groupId}/members": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }, { "in": "query", "name": "page_size", "description": "The number of records returned within a single API call", "type": "integer", "default": 30, "maximum": 300, "x-ref": "#/parameters/PageSize", "index$": 1 }, { "in": "query", "name": "page_number", "description": "Current page number of returned records", "type": "integer", "default": 1, "x-ref": "#/parameters/PageNumber", "index$": 2 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let group_member_list_ref01_data = Object.values(setup.data.existing.group_member_list)[0];
        // LIST
        const group_member_list_ref01_ent = client.GroupMemberList();
        const group_member_list_ref01_match = {};
        group_member_list_ref01_match['group_id'] = setup.idmap['group01'];
        const group_member_list_ref01_list = (await group_member_list_ref01_ent.list(group_member_list_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/group_member_list/GroupMemberListTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['group_member_list01', 'group_member_list02', 'group_member_list03', 'group01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_GROUP_MEMBER_LIST_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_GROUP_MEMBER_LIST_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_GROUP_MEMBER_LIST_ENTID'];
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
//# sourceMappingURL=GroupMemberListEntity.test.js.map