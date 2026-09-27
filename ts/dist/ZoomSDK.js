"use strict";
// Zoom Ts SDK
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDK = exports.ZoomSDK = exports.ZoomEntityBase = exports.BaseFeature = exports.config = exports.stdutil = void 0;
const AccountEntity_1 = require("./entity/AccountEntity");
const AccountPlanEntity_1 = require("./entity/AccountPlanEntity");
const AccountSettingEntity_1 = require("./entity/AccountSettingEntity");
const BillingEntity_1 = require("./entity/BillingEntity");
const CloudRecordingEntity_1 = require("./entity/CloudRecordingEntity");
const DashboardEntity_1 = require("./entity/DashboardEntity");
const DeviceEntity_1 = require("./entity/DeviceEntity");
const DomainsListEntity_1 = require("./entity/DomainsListEntity");
const GroupEntity_1 = require("./entity/GroupEntity");
const GroupMemberListEntity_1 = require("./entity/GroupMemberListEntity");
const ImChatEntity_1 = require("./entity/ImChatEntity");
const ImGroupEntity_1 = require("./entity/ImGroupEntity");
const ImGroupListEntity_1 = require("./entity/ImGroupListEntity");
const MeetingEntity_1 = require("./entity/MeetingEntity");
const MeetingInstanceEntity_1 = require("./entity/MeetingInstanceEntity");
const MeetingInvitationEntity_1 = require("./entity/MeetingInvitationEntity");
const MeetingRegistrantListEntity_1 = require("./entity/MeetingRegistrantListEntity");
const PacEntity_1 = require("./entity/PacEntity");
const PollEntity_1 = require("./entity/PollEntity");
const QosEntity_1 = require("./entity/QosEntity");
const RecordingEntity_1 = require("./entity/RecordingEntity");
const RecordingSettingEntity_1 = require("./entity/RecordingSettingEntity");
const ReportEntity_1 = require("./entity/ReportEntity");
const TrackingFieldEntity_1 = require("./entity/TrackingFieldEntity");
const TspEntity_1 = require("./entity/TspEntity");
const UserEntity_1 = require("./entity/UserEntity");
const UserAssistantsListEntity_1 = require("./entity/UserAssistantsListEntity");
const UserPermissionEntity_1 = require("./entity/UserPermissionEntity");
const UserSchedulersListEntity_1 = require("./entity/UserSchedulersListEntity");
const UserSettingEntity_1 = require("./entity/UserSettingEntity");
const WebhookEntity_1 = require("./entity/WebhookEntity");
const WebinarEntity_1 = require("./entity/WebinarEntity");
const WebinarInstanceEntity_1 = require("./entity/WebinarInstanceEntity");
const WebinarPanelistListEntity_1 = require("./entity/WebinarPanelistListEntity");
const WebinarRegistrantListEntity_1 = require("./entity/WebinarRegistrantListEntity");
const ZoomRoomListEntity_1 = require("./entity/ZoomRoomListEntity");
const node_util_1 = require("node:util");
const Config_1 = require("./Config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return Config_1.config; } });
const ZoomEntityBase_1 = require("./ZoomEntityBase");
Object.defineProperty(exports, "ZoomEntityBase", { enumerable: true, get: function () { return ZoomEntityBase_1.ZoomEntityBase; } });
const Utility_1 = require("./utility/Utility");
const BaseFeature_1 = require("./feature/base/BaseFeature");
Object.defineProperty(exports, "BaseFeature", { enumerable: true, get: function () { return BaseFeature_1.BaseFeature; } });
const stdutil = new Utility_1.Utility();
exports.stdutil = stdutil;
class ZoomSDK {
    _mode = 'live';
    _options;
    _utility = new Utility_1.Utility();
    _features;
    _rootctx;
    constructor(options) {
        this._rootctx = this._utility.makeContext({
            client: this,
            utility: this._utility,
            config: Config_1.config,
            options,
            shared: new WeakMap()
        });
        this._options = this._utility.makeOptions(this._rootctx);
        const struct = this._utility.struct;
        const getpath = struct.getpath;
        if (true === getpath(this._options.feature, 'test.active')) {
            this._mode = 'test';
        }
        this._rootctx.options = this._options;
        this._features = [];
        const featureAdd = this._utility.featureAdd;
        const featureInit = this._utility.featureInit;
        // Add features in the resolved order (makeOptions puts an explicit
        // array order first, else defaults to test-first). Ordering matters:
        // the `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
        // so `test` must be added before them to sit at the base of the chain.
        const extend = this._options.extend || [];
        const featureorder = getpath(this._options, '__derived__.featureorder') || [];
        for (const fname of featureorder) {
            const fopts = this._options.feature[fname] || {};
            if (fopts.active) {
                // An active name with no generated class is legal when an
                // extend-supplied instance carries that name (station's adopt
                // path): the instance is added below, positioned by its own
                // __after__ entry, so skip it here rather than fail construction.
                if (!this._rootctx.config.hasFeature(fname) &&
                    extend.some((f) => fname === f.name)) {
                    continue;
                }
                featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname));
            }
        }
        for (let f of extend) {
            featureAdd(this._rootctx, f);
        }
        for (let f of this._features) {
            featureInit(this._rootctx, f);
        }
        const featureHook = this._utility.featureHook;
        featureHook(this._rootctx, 'PostConstruct');
    }
    options() {
        return this._utility.struct.clone(this._options);
    }
    utility() {
        return this._utility.struct.clone(this._utility);
    }
    async prepare(fetchargs) {
        const utility = this._utility;
        const struct = utility.struct;
        const clone = struct.clone;
        const { makeContext, makeFetchDef, prepareHeaders, prepareAuth, } = utility;
        fetchargs = fetchargs || {};
        let ctx = makeContext({
            opname: 'prepare',
            ctrl: fetchargs.ctrl || {},
        }, this._rootctx);
        const options = this._options;
        const spec = {
            base: options.base,
            prefix: options.prefix,
            suffix: options.suffix,
            path: fetchargs.path || '',
            method: fetchargs.method || 'GET',
            params: fetchargs.params || {},
            query: fetchargs.query || {},
            headers: prepareHeaders(ctx),
            body: fetchargs.body,
            step: 'start',
        };
        ctx.spec = spec;
        if (fetchargs.headers) {
            const uheaders = fetchargs.headers;
            for (let key in uheaders) {
                spec.headers[key] = uheaders[key];
            }
        }
        const authResult = prepareAuth(ctx);
        if (authResult instanceof Error) {
            return authResult;
        }
        return makeFetchDef(ctx);
    }
    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    // either one reaches the same endpoint.
    async direct(fetchargs) {
        if (!this._options.allow.op.includes('direct')) {
            return {
                ok: false,
                err: new Error('ZoomSDK: direct: operation not allowed by' +
                    ' SDK option allow.op value: "' + this._options.allow.op + '"'),
            };
        }
        return this._rawRequest(fetchargs);
    }
    // Ungated request path shared by direct() and graphql(), each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    async _rawRequest(fetchargs) {
        const utility = this._utility;
        const fetcher = utility.fetcher;
        const makeContext = utility.makeContext;
        const fetchdef = await this.prepare(fetchargs);
        if (fetchdef instanceof Error) {
            return fetchdef;
        }
        let ctx = makeContext({
            opname: 'direct',
            ctrl: (fetchargs || {}).ctrl || {},
        }, this._rootctx);
        try {
            const fetched = await fetcher(ctx, fetchdef.url, fetchdef);
            if (null == fetched) {
                return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') };
            }
            else if (fetched instanceof Error) {
                return { ok: false, err: fetched };
            }
            const status = fetched.status;
            // No body responses (204 No Content, 304 Not Modified) and explicit
            // zero content-length must skip JSON parsing — fetched.json() would
            // throw `Unexpected end of JSON input` on an empty body.
            const headers = fetched.headers;
            const contentLength = headers && 'function' === typeof headers.get
                ? headers.get('content-length')
                : (headers || {})['content-length'];
            const noBody = 204 === status || 304 === status || '0' === String(contentLength);
            let json = undefined;
            if (!noBody) {
                try {
                    json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json;
                }
                catch (parseErr) {
                    // Body wasn't valid JSON — surface the raw response rather than
                    // throwing. data stays undefined; callers can inspect status/headers.
                    json = undefined;
                }
            }
            return {
                ok: status >= 200 && status < 300,
                status,
                headers: fetched.headers,
                data: json,
            };
        }
        catch (err) {
            return { ok: false, err };
        }
    }
    async graphql(query, variables, ctrl) {
        const options = this._options;
        if (!options.allow.op.includes('graphql')) {
            return {
                ok: false,
                err: new Error('ZoomSDK: graphql: operation not allowed by' +
                    ' SDK option allow.op value: "' + options.allow.op + '"'),
            };
        }
        const res = await this._rawRequest({
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: { query, variables: variables || {} },
            ctrl,
        });
        if (res instanceof Error) {
            return res;
        }
        // Errors are read BEFORE any status check: a GraphQL parse or validation
        // failure comes back as HTTP 400 carrying the standard { errors: [...] }
        // body, and the raw path represents a non-2xx as { ok: false } with no
        // err — so returning early on status would discard the server's own
        // diagnostics, which are the only useful part of that response.
        const errors = null == res.data ? undefined : res.data.errors;
        if (null != errors && Array.isArray(errors) && 0 < errors.length) {
            const first = errors[0] || {};
            const err = new Error('ZoomSDK: graphql: ' +
                (first.message || 'graphql error'));
            err.graphql = errors;
            return { ok: false, status: res.status, headers: res.headers, err, data: res.data };
        }
        return res;
    }
    // Entity access: `client.Account().list()` / `client.Account().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Account(entopts) {
        const self = this;
        return new AccountEntity_1.AccountEntity(self, entopts);
    }
    // Entity access: `client.AccountPlan().list()` / `client.AccountPlan().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountPlan(entopts) {
        const self = this;
        return new AccountPlanEntity_1.AccountPlanEntity(self, entopts);
    }
    // Entity access: `client.AccountSetting().list()` / `client.AccountSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    AccountSetting(entopts) {
        const self = this;
        return new AccountSettingEntity_1.AccountSettingEntity(self, entopts);
    }
    // Entity access: `client.Billing().list()` / `client.Billing().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Billing(entopts) {
        const self = this;
        return new BillingEntity_1.BillingEntity(self, entopts);
    }
    // Entity access: `client.CloudRecording().list()` / `client.CloudRecording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    CloudRecording(entopts) {
        const self = this;
        return new CloudRecordingEntity_1.CloudRecordingEntity(self, entopts);
    }
    // Entity access: `client.Dashboard().list()` / `client.Dashboard().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Dashboard(entopts) {
        const self = this;
        return new DashboardEntity_1.DashboardEntity(self, entopts);
    }
    // Entity access: `client.Device().list()` / `client.Device().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Device(entopts) {
        const self = this;
        return new DeviceEntity_1.DeviceEntity(self, entopts);
    }
    // Entity access: `client.DomainsList().list()` / `client.DomainsList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    DomainsList(entopts) {
        const self = this;
        return new DomainsListEntity_1.DomainsListEntity(self, entopts);
    }
    // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Group(entopts) {
        const self = this;
        return new GroupEntity_1.GroupEntity(self, entopts);
    }
    // Entity access: `client.GroupMemberList().list()` / `client.GroupMemberList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    GroupMemberList(entopts) {
        const self = this;
        return new GroupMemberListEntity_1.GroupMemberListEntity(self, entopts);
    }
    // Entity access: `client.ImChat().list()` / `client.ImChat().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImChat(entopts) {
        const self = this;
        return new ImChatEntity_1.ImChatEntity(self, entopts);
    }
    // Entity access: `client.ImGroup().list()` / `client.ImGroup().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImGroup(entopts) {
        const self = this;
        return new ImGroupEntity_1.ImGroupEntity(self, entopts);
    }
    // Entity access: `client.ImGroupList().list()` / `client.ImGroupList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ImGroupList(entopts) {
        const self = this;
        return new ImGroupListEntity_1.ImGroupListEntity(self, entopts);
    }
    // Entity access: `client.Meeting().list()` / `client.Meeting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Meeting(entopts) {
        const self = this;
        return new MeetingEntity_1.MeetingEntity(self, entopts);
    }
    // Entity access: `client.MeetingInstance().list()` / `client.MeetingInstance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeetingInstance(entopts) {
        const self = this;
        return new MeetingInstanceEntity_1.MeetingInstanceEntity(self, entopts);
    }
    // Entity access: `client.MeetingInvitation().list()` / `client.MeetingInvitation().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeetingInvitation(entopts) {
        const self = this;
        return new MeetingInvitationEntity_1.MeetingInvitationEntity(self, entopts);
    }
    // Entity access: `client.MeetingRegistrantList().list()` / `client.MeetingRegistrantList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    MeetingRegistrantList(entopts) {
        const self = this;
        return new MeetingRegistrantListEntity_1.MeetingRegistrantListEntity(self, entopts);
    }
    // Entity access: `client.Pac().list()` / `client.Pac().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Pac(entopts) {
        const self = this;
        return new PacEntity_1.PacEntity(self, entopts);
    }
    // Entity access: `client.Poll().list()` / `client.Poll().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Poll(entopts) {
        const self = this;
        return new PollEntity_1.PollEntity(self, entopts);
    }
    // Entity access: `client.Qos().list()` / `client.Qos().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Qos(entopts) {
        const self = this;
        return new QosEntity_1.QosEntity(self, entopts);
    }
    // Entity access: `client.Recording().list()` / `client.Recording().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Recording(entopts) {
        const self = this;
        return new RecordingEntity_1.RecordingEntity(self, entopts);
    }
    // Entity access: `client.RecordingSetting().list()` / `client.RecordingSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    RecordingSetting(entopts) {
        const self = this;
        return new RecordingSettingEntity_1.RecordingSettingEntity(self, entopts);
    }
    // Entity access: `client.Report().list()` / `client.Report().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Report(entopts) {
        const self = this;
        return new ReportEntity_1.ReportEntity(self, entopts);
    }
    // Entity access: `client.TrackingField().list()` / `client.TrackingField().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    TrackingField(entopts) {
        const self = this;
        return new TrackingFieldEntity_1.TrackingFieldEntity(self, entopts);
    }
    // Entity access: `client.Tsp().list()` / `client.Tsp().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Tsp(entopts) {
        const self = this;
        return new TspEntity_1.TspEntity(self, entopts);
    }
    // Entity access: `client.User().list()` / `client.User().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    User(entopts) {
        const self = this;
        return new UserEntity_1.UserEntity(self, entopts);
    }
    // Entity access: `client.UserAssistantsList().list()` / `client.UserAssistantsList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserAssistantsList(entopts) {
        const self = this;
        return new UserAssistantsListEntity_1.UserAssistantsListEntity(self, entopts);
    }
    // Entity access: `client.UserPermission().list()` / `client.UserPermission().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserPermission(entopts) {
        const self = this;
        return new UserPermissionEntity_1.UserPermissionEntity(self, entopts);
    }
    // Entity access: `client.UserSchedulersList().list()` / `client.UserSchedulersList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserSchedulersList(entopts) {
        const self = this;
        return new UserSchedulersListEntity_1.UserSchedulersListEntity(self, entopts);
    }
    // Entity access: `client.UserSetting().list()` / `client.UserSetting().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    UserSetting(entopts) {
        const self = this;
        return new UserSettingEntity_1.UserSettingEntity(self, entopts);
    }
    // Entity access: `client.Webhook().list()` / `client.Webhook().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Webhook(entopts) {
        const self = this;
        return new WebhookEntity_1.WebhookEntity(self, entopts);
    }
    // Entity access: `client.Webinar().list()` / `client.Webinar().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    Webinar(entopts) {
        const self = this;
        return new WebinarEntity_1.WebinarEntity(self, entopts);
    }
    // Entity access: `client.WebinarInstance().list()` / `client.WebinarInstance().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebinarInstance(entopts) {
        const self = this;
        return new WebinarInstanceEntity_1.WebinarInstanceEntity(self, entopts);
    }
    // Entity access: `client.WebinarPanelistList().list()` / `client.WebinarPanelistList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebinarPanelistList(entopts) {
        const self = this;
        return new WebinarPanelistListEntity_1.WebinarPanelistListEntity(self, entopts);
    }
    // Entity access: `client.WebinarRegistrantList().list()` / `client.WebinarRegistrantList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    WebinarRegistrantList(entopts) {
        const self = this;
        return new WebinarRegistrantListEntity_1.WebinarRegistrantListEntity(self, entopts);
    }
    // Entity access: `client.ZoomRoomList().list()` / `client.ZoomRoomList().load({ id })`.
    // The argument is the entity OPTIONS object (passed to the entity
    // constructor as entopts), not initial entity data.
    ZoomRoomList(entopts) {
        const self = this;
        return new ZoomRoomListEntity_1.ZoomRoomListEntity(self, entopts);
    }
    static test(testoptsarg, sdkoptsarg) {
        const struct = stdutil.struct;
        const setpath = struct.setpath;
        const getdef = struct.getdef;
        const clone = struct.clone;
        const setprop = struct.setprop;
        const sdkopts = getdef(clone(sdkoptsarg), {});
        const testopts = getdef(clone(testoptsarg), {});
        setprop(testopts, 'active', true);
        setpath(sdkopts, 'feature.test', testopts);
        const testsdk = new ZoomSDK(sdkopts);
        testsdk._mode = 'test';
        return testsdk;
    }
    tester(testopts, sdkopts) {
        return ZoomSDK.test(testopts, sdkopts);
    }
    toJSON() {
        return { name: 'Zoom' };
    }
    toString() {
        return 'Zoom ' + this._utility.struct.jsonify(this.toJSON());
    }
    [node_util_1.inspect.custom]() {
        return this.toString();
    }
}
exports.ZoomSDK = ZoomSDK;
const SDK = ZoomSDK;
exports.SDK = SDK;
//# sourceMappingURL=ZoomSDK.js.map