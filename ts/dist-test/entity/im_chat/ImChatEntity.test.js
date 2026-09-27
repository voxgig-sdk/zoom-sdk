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
(0, node_test_1.describe)('ImChatEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.ImChat();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'im_chat.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "from": { "a": true, "fo": "date", "h": "From", "n": "from", "r": false, "sh": "Start date", "t": "`$STRING`", "key$": "from", "index$": 0 }, "messages": { "a": true, "h": "Messages", "n": "messages", "r": false, "sh": "Array of session objects", "t": "`$ARRAY`", "key$": "messages", "index$": 1 }, "next_page_token": { "a": true, "h": "Next Page Token", "n": "next_page_token", "r": false, "sh": "Next page token, used to paginate through large result sets.", "t": "`$STRING`", "key$": "next_page_token", "index$": 2 }, "page_size": { "a": true, "h": "Page Size", "n": "page_size", "r": false, "sh": "The amount of records returns within a single API call.", "t": "`$INTEGER`", "key$": "page_size", "index$": 3 }, "session_id": { "a": true, "h": "Session Id", "n": "session_id", "r": false, "sh": "IM Chat session ID", "t": "`$STRING`", "key$": "session_id", "index$": 4 }, "sessions": { "a": true, "h": "Sessions", "n": "sessions", "r": false, "sh": "Array of session objects", "t": "`$ARRAY`", "key$": "sessions", "index$": 5 }, "to": { "a": true, "fo": "date", "h": "To", "n": "to", "r": false, "sh": "End date", "t": "`$STRING`", "key$": "to", "index$": 6 } }, "name": "im_chat", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /im/chat/sessions", "source": "swagger2", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "from", "or": "from", "r": true, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "next_page_token", "or": "next_page_token", "r": false, "t": "`$ANY`", "index$": 1 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "to", "or": "to", "r": true, "t": "`$ANY`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/im/chat/sessions", "q": { "exist": ["from", "next_page_token", "page_size", "to"] }, "r": {}, "s": [{ "lit": "im" }, { "lit": "chat" }, { "lit": "sessions" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /im/chat/sessions/{sessionId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "session_id", "or": "session_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "from", "or": "from", "r": true, "t": "`$ANY`", "index$": 0 }, { "a": true, "k": "query", "n": "next_page_token", "or": "next_page_token", "r": false, "t": "`$ANY`", "index$": 1 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "to", "or": "to", "r": true, "t": "`$ANY`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/im/chat/sessions/{sessionId}", "q": { "exist": ["from", "next_page_token", "page_size", "session_id", "to"] }, "r": { "param": { "sessionId": "session_id" } }, "s": [{ "lit": "im" }, { "lit": "chat" }, { "lit": "sessions" }, { "var": "session_id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "im_chat", "name__orig": "im_chat", "Name": "ImChat", "name_": "im_chat", "name-": "im-chat", "NAME": "IM_CHAT", "index$": 10 }, { "active": true, "entity": "im_chat", "key$": "BasicImChatFlow", "kind": "basic", "name": "BasicImChatFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "im_chat_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "im_chat_ref01", "srcdatavar": "im_chat_ref01_data", "suffix": "_dt0" }, "m": { "id": "im_chat01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-im_chat_ref01" } }], "index$": 1 }] }, 'ImChat', { "GET /im/chat/sessions": { "protocol": "http", "parameters": [{ "in": "query", "name": "from", "description": "Start Date", "type": "string", "format": "date", "required": true, "x-ref": "#/parameters/FromDate", "index$": 0 }, { "in": "query", "name": "to", "description": "End Date", "type": "string", "format": "date", "required": true, "x-ref": "#/parameters/ToDate", "index$": 1 }, { "in": "query", "name": "page_size", "description": "The number of records returned within a single API call", "type": "integer", "default": 30, "maximum": 300, "x-ref": "#/parameters/PageSize", "index$": 2 }, { "in": "query", "name": "next_page_token", "description": "Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.", "type": "string", "x-ref": "#/parameters/NextPageToken", "index$": 3 }] }, "GET /im/chat/sessions/{sessionId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "sessionId", "description": "IM Chat Session ID", "type": "string", "required": true, "x-ref": "#/parameters/SessionId", "index$": 0 }, { "in": "query", "name": "from", "description": "Start Date", "type": "string", "format": "date", "required": true, "x-ref": "#/parameters/FromDate", "index$": 1 }, { "in": "query", "name": "to", "description": "End Date", "type": "string", "format": "date", "required": true, "x-ref": "#/parameters/ToDate", "index$": 2 }, { "in": "query", "name": "page_size", "description": "The number of records returned within a single API call", "type": "integer", "default": 30, "maximum": 300, "x-ref": "#/parameters/PageSize", "index$": 3 }, { "in": "query", "name": "next_page_token", "description": "Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.", "type": "string", "x-ref": "#/parameters/NextPageToken", "index$": 4 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let im_chat_ref01_data = Object.values(setup.data.existing.im_chat)[0];
        // LIST
        const im_chat_ref01_ent = client.ImChat();
        const im_chat_ref01_match = {};
        const im_chat_ref01_list = (await im_chat_ref01_ent.list(im_chat_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/im_chat/ImChatTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['im_chat01', 'im_chat02', 'im_chat03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_IM_CHAT_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_IM_CHAT_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_IM_CHAT_ENTID'];
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
//# sourceMappingURL=ImChatEntity.test.js.map