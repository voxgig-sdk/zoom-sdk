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
(0, node_test_1.describe)('ImGroupEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.ImGroup();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['create', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'im_group.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Group ID", "t": "`$STRING`", "key$": "id", "index$": 0 } }, "id": { "field": "id", "name": "id" }, "name": "im_group", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /im/groups/{groupId}/members", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/im/groups/{groupId}/members", "q": { "exist": ["body", "group_id"] }, "r": { "param": { "groupId": "group_id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "group_id" }, { "lit": "members" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "POST /im/groups", "source": "swagger2", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/im/groups", "q": { "exist": ["body"] }, "r": {}, "s": [{ "lit": "im" }, { "lit": "groups" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "create" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /im/groups/{groupId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/im/groups/{groupId}", "q": { "exist": ["id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /im/groups/{groupId}/members/{memberId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "group_id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "member_id", "or": "member_id", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "DELETE", "o": "/im/groups/{groupId}/members/{memberId}", "q": { "exist": ["group_id", "member_id"] }, "r": { "param": { "groupId": "group_id", "memberId": "member_id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "group_id" }, { "lit": "members" }, { "var": "member_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "DELETE /im/groups/{groupId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/im/groups/{groupId}", "q": { "exist": ["id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /im/groups/{groupId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "group_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$ANY`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/im/groups/{groupId}", "q": { "exist": ["body", "id"] }, "r": { "param": { "groupId": "id" } }, "s": [{ "lit": "im" }, { "lit": "groups" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "update" } }, "relations": { "ancestors": [["$.main.kit.entity.group"], ["$.main.kit.entity.group"]] }, "key$": "im_group", "name__orig": "im_group", "Name": "ImGroup", "name_": "im_group", "name-": "im-group", "NAME": "IM_GROUP", "index$": 11 }, { "active": true, "entity": "im_group", "key$": "BasicImGroupFlow", "kind": "basic", "name": "BasicImGroupFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "im_group_ref01" }, "m": { "group_id": "group01" }, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "im_group_ref01", "srcdatavar": "im_group_ref01_data", "suffix": "_up0" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-im_group_ref01" } }], "v": [], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "im_group_ref01", "srcdatavar": "im_group_ref01_data", "suffix": "_dt0" }, "m": { "id": "im_group01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-im_group_ref01" } }], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "im_group_ref01", "suffix": "_rm0" }, "m": { "id": "im_group01" }, "o": "remove", "s": [], "v": [], "index$": 3 }] }, 'ImGroup', { "POST /im/groups/{groupId}/members": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "properties": { "members": { "type": "array", "description": "List of IM Group members", "maximum": 10, "items": { "properties": { "id": { "type": "string", "description": "User ID" }, "email": { "type": "string", "description": "User email. If ID given, email is ignored." } } } } } }, "index$": 1 }] }, "POST /im/groups": { "protocol": "http", "parameters": [{ "in": "body", "name": "body", "required": true, "schema": { "properties": { "name": { "type": "string", "description": "Group name, must be unique in one account", "maxLength": 128 }, "type": { "type": "string", "description": "IM Group type", "default": "normal", "enum": ["normal", "shared", "restricted"], "x-enum-descriptions": ["Only members can see the group automatically. Other people can search members in the group.", "All people in the account can see the group and members automatically", "Nobody can see the group or search members except the members in the group"] }, "search_by_domain": { "type": "boolean", "description": "Members can search others in the same email domain" }, "search_by_account": { "type": "boolean", "description": "Members can search others under same account" }, "search_by_ma_account": { "type": "boolean", "description": "Members can search others under same master account, including all sub accounts" } } }, "index$": 0 }] }, "GET /im/groups/{groupId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }] }, "DELETE /im/groups/{groupId}/members/{memberId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }, { "in": "path", "name": "memberId", "description": "The member ID", "type": "string", "required": true, "x-ref": "#/parameters/MemberId", "index$": 1 }] }, "DELETE /im/groups/{groupId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }] }, "PATCH /im/groups/{groupId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "groupId", "description": "The group ID", "type": "string", "required": true, "x-ref": "#/parameters/GroupId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "properties": { "name": { "type": "string", "description": "Group name, must be unique in one account", "maxLength": 128 }, "type": { "type": "string", "description": "IM Group type", "enum": ["normal", "shared", "restricted"], "x-enum-descriptions": ["Only members can see the group automatically. Other people can search members in the group.", "All people in the account can see the group and members automatically", "Nobody can see the group or search members except the members in the group"] }, "search_by_domain": { "type": "boolean", "description": "Members can search others in the same email domain" }, "search_by_account": { "type": "boolean", "description": "Members can search others under same account" }, "search_by_ma_account": { "type": "boolean", "description": "Members can search others under same master account, including all sub accounts" } } }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const im_group_ref01_ent = client.ImGroup();
        let im_group_ref01_data = setup.data.new.im_group['im_group_ref01'];
        im_group_ref01_data['group_id'] = setup.idmap['group01'];
        im_group_ref01_data = (await im_group_ref01_ent.create(im_group_ref01_data)).data();
        (0, node_assert_1.default)(null != im_group_ref01_data.id);
        // UPDATE
        const im_group_ref01_data_up0 = {};
        im_group_ref01_data_up0.id = im_group_ref01_data.id;
        const im_group_ref01_resdata_up0 = (await im_group_ref01_ent.update(im_group_ref01_data_up0)).data();
        (0, node_assert_1.default)(im_group_ref01_resdata_up0.id === im_group_ref01_data_up0.id);
        // LOAD
        const im_group_ref01_match_dt0 = {};
        im_group_ref01_match_dt0.id = im_group_ref01_data.id;
        const im_group_ref01_data_dt0 = (await im_group_ref01_ent.load(im_group_ref01_match_dt0)).data();
        (0, node_assert_1.default)(im_group_ref01_data_dt0.id === im_group_ref01_data.id);
        // REMOVE
        const im_group_ref01_match_rm0 = { id: im_group_ref01_data.id };
        await im_group_ref01_ent.remove(im_group_ref01_match_rm0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/im_group/ImGroupTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['im_group01', 'im_group02', 'im_group03', 'group01', 'group02', 'group03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_IM_GROUP_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_IM_GROUP_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_IM_GROUP_ENTID'];
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
//# sourceMappingURL=ImGroupEntity.test.js.map