# Zoom SDK

from zoom_sdk.utility.voxgig_struct import voxgig_struct as vs
from zoom_sdk.core.utility_type import ZoomUtility
from zoom_sdk.core.spec import ZoomSpec
from zoom_sdk.core import helpers

# Load utility registration (populates Utility._registrar)
from zoom_sdk.utility import register

# Load features
from zoom_sdk.feature.base_feature import ZoomBaseFeature
from zoom_sdk.features import _has_feature, _make_feature


class ZoomSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = ZoomUtility()
        self._utility = utility

        from zoom_sdk.config import shared_config
        config = shared_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        # Extension feature INSTANCES come from the RAW construction
        # options - extend is consumed exactly once, here. make_options
        # strips the key before cloning (vs.clone flattens arbitrary
        # objects), so self.options never carries the instances.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        extend = options.get("extend") if isinstance(options, dict) else None
        if not isinstance(extend, list):
            extend = []
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
                    if fopts is not None and fopts.get("active") is True:
                        # An active name with no generated feature class is
                        # legal when an extend-supplied instance carries that
                        # name (station's adopt path): the instance is added
                        # below, positioned by its own __after__ entry, so
                        # skip it here rather than add a BaseFeature stray
                        # that would silently shift feature positions.
                        if not _has_feature(fname) and any(
                            fname == (f.get("name") if isinstance(f, dict)
                                      else getattr(f, "name", None))
                            for f in extend
                        ):
                            continue
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        for f in extend:
            if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return ZoomUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = ZoomSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    # Raw endpoint access is operator-controllable, like every entity op.
    # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
    # either one reaches the same endpoint.
    def direct(self, fetchargs=None):
        if not self._op_allowed("direct"):
            return self._op_denied("direct")

        return self._raw_request(fetchargs)

    # Is this raw-access op permitted by the SDK's allow.op option?
    def _op_allowed(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return isinstance(allow_op, str) and op in allow_op

    def _op_denied(self, op):
        allow_op = vs.getpath(self.options, "allow.op")
        return {
            "ok": False,
            "err": Exception(
                "ZoomSDK: " + op + ": operation not allowed by"
                ' SDK option allow.op value: "' + str(allow_op) + '"'),
        }

    # Ungated request path shared by direct and graphql, each of which checks
    # its own allow.op token first. Private, rather than a flag on fetchargs:
    # a caller-supplied marker would let anyone opt straight back out of the
    # gate by passing it.
    def _raw_request(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }

    # Raw GraphQL access: the pressure valve that makes the generated
    # surface's deliberate omissions (per-call selection sets, typed filter
    # builders, batching, subscriptions) livable — the whole schema stays
    # reachable.
    #
    # Thin wrapper over the same prepare/fetch path direct uses, with the one
    # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
    # as a top-level `errors` array, so status alone would report a failed
    # query as ok.
    #
    # NOTE: like direct, this bypasses the feature pipeline — no retry,
    # ratelimit or paging features apply.
    def graphql(self, query, variables=None, ctrl=None):
        if not self._op_allowed("graphql"):
            return self._op_denied("graphql")

        res = self._raw_request({
            "method": "POST",
            "headers": {"content-type": "application/json"},
            "body": {"query": query, "variables": variables or {}},
            "ctrl": ctrl or {},
        })

        # Errors are read BEFORE any status check: a GraphQL parse or
        # validation failure comes back as HTTP 400 carrying the standard
        # { errors: [...] } body, and the raw path represents a non-2xx as
        # ok:False with no err — so returning early on status would discard
        # the server's own diagnostics, which are the only useful part of
        # that response.
        errors = vs.getpath(res, "data.errors")

        if isinstance(errors, list) and 0 < len(errors):
            first = errors[0] if isinstance(errors[0], dict) else {}
            msg = first.get("message") or "graphql error"
            res["ok"] = False
            res["err"] = Exception("ZoomSDK: graphql: " + str(msg))
            res["graphql"] = errors

        return res


    def Account(self, data=None) -> "AccountEntity":
        """Entity factory: client.Account().list() / client.Account().load({"id": ...})."""
        from zoom_sdk.entity.account_entity import AccountEntity
        return AccountEntity(self, data)


    def AccountPlan(self, data=None) -> "AccountPlanEntity":
        """Entity factory: client.AccountPlan().list() / client.AccountPlan().load({"id": ...})."""
        from zoom_sdk.entity.account_plan_entity import AccountPlanEntity
        return AccountPlanEntity(self, data)


    def AccountSetting(self, data=None) -> "AccountSettingEntity":
        """Entity factory: client.AccountSetting().list() / client.AccountSetting().load({"id": ...})."""
        from zoom_sdk.entity.account_setting_entity import AccountSettingEntity
        return AccountSettingEntity(self, data)


    def Billing(self, data=None) -> "BillingEntity":
        """Entity factory: client.Billing().list() / client.Billing().load({"id": ...})."""
        from zoom_sdk.entity.billing_entity import BillingEntity
        return BillingEntity(self, data)


    def CloudRecording(self, data=None) -> "CloudRecordingEntity":
        """Entity factory: client.CloudRecording().list() / client.CloudRecording().load({"id": ...})."""
        from zoom_sdk.entity.cloud_recording_entity import CloudRecordingEntity
        return CloudRecordingEntity(self, data)


    def Dashboard(self, data=None) -> "DashboardEntity":
        """Entity factory: client.Dashboard().list() / client.Dashboard().load({"id": ...})."""
        from zoom_sdk.entity.dashboard_entity import DashboardEntity
        return DashboardEntity(self, data)


    def Device(self, data=None) -> "DeviceEntity":
        """Entity factory: client.Device().list() / client.Device().load({"id": ...})."""
        from zoom_sdk.entity.device_entity import DeviceEntity
        return DeviceEntity(self, data)


    def DomainsList(self, data=None) -> "DomainsListEntity":
        """Entity factory: client.DomainsList().list() / client.DomainsList().load({"id": ...})."""
        from zoom_sdk.entity.domains_list_entity import DomainsListEntity
        return DomainsListEntity(self, data)


    def Group(self, data=None) -> "GroupEntity":
        """Entity factory: client.Group().list() / client.Group().load({"id": ...})."""
        from zoom_sdk.entity.group_entity import GroupEntity
        return GroupEntity(self, data)


    def GroupMemberList(self, data=None) -> "GroupMemberListEntity":
        """Entity factory: client.GroupMemberList().list() / client.GroupMemberList().load({"id": ...})."""
        from zoom_sdk.entity.group_member_list_entity import GroupMemberListEntity
        return GroupMemberListEntity(self, data)


    def ImChat(self, data=None) -> "ImChatEntity":
        """Entity factory: client.ImChat().list() / client.ImChat().load({"id": ...})."""
        from zoom_sdk.entity.im_chat_entity import ImChatEntity
        return ImChatEntity(self, data)


    def ImGroup(self, data=None) -> "ImGroupEntity":
        """Entity factory: client.ImGroup().list() / client.ImGroup().load({"id": ...})."""
        from zoom_sdk.entity.im_group_entity import ImGroupEntity
        return ImGroupEntity(self, data)


    def ImGroupList(self, data=None) -> "ImGroupListEntity":
        """Entity factory: client.ImGroupList().list() / client.ImGroupList().load({"id": ...})."""
        from zoom_sdk.entity.im_group_list_entity import ImGroupListEntity
        return ImGroupListEntity(self, data)


    def Meeting(self, data=None) -> "MeetingEntity":
        """Entity factory: client.Meeting().list() / client.Meeting().load({"id": ...})."""
        from zoom_sdk.entity.meeting_entity import MeetingEntity
        return MeetingEntity(self, data)


    def MeetingInstance(self, data=None) -> "MeetingInstanceEntity":
        """Entity factory: client.MeetingInstance().list() / client.MeetingInstance().load({"id": ...})."""
        from zoom_sdk.entity.meeting_instance_entity import MeetingInstanceEntity
        return MeetingInstanceEntity(self, data)


    def MeetingInvitation(self, data=None) -> "MeetingInvitationEntity":
        """Entity factory: client.MeetingInvitation().list() / client.MeetingInvitation().load({"id": ...})."""
        from zoom_sdk.entity.meeting_invitation_entity import MeetingInvitationEntity
        return MeetingInvitationEntity(self, data)


    def MeetingRegistrantList(self, data=None) -> "MeetingRegistrantListEntity":
        """Entity factory: client.MeetingRegistrantList().list() / client.MeetingRegistrantList().load({"id": ...})."""
        from zoom_sdk.entity.meeting_registrant_list_entity import MeetingRegistrantListEntity
        return MeetingRegistrantListEntity(self, data)


    def Pac(self, data=None) -> "PacEntity":
        """Entity factory: client.Pac().list() / client.Pac().load({"id": ...})."""
        from zoom_sdk.entity.pac_entity import PacEntity
        return PacEntity(self, data)


    def Poll(self, data=None) -> "PollEntity":
        """Entity factory: client.Poll().list() / client.Poll().load({"id": ...})."""
        from zoom_sdk.entity.poll_entity import PollEntity
        return PollEntity(self, data)


    def Qos(self, data=None) -> "QosEntity":
        """Entity factory: client.Qos().list() / client.Qos().load({"id": ...})."""
        from zoom_sdk.entity.qos_entity import QosEntity
        return QosEntity(self, data)


    def Recording(self, data=None) -> "RecordingEntity":
        """Entity factory: client.Recording().list() / client.Recording().load({"id": ...})."""
        from zoom_sdk.entity.recording_entity import RecordingEntity
        return RecordingEntity(self, data)


    def RecordingSetting(self, data=None) -> "RecordingSettingEntity":
        """Entity factory: client.RecordingSetting().list() / client.RecordingSetting().load({"id": ...})."""
        from zoom_sdk.entity.recording_setting_entity import RecordingSettingEntity
        return RecordingSettingEntity(self, data)


    def Report(self, data=None) -> "ReportEntity":
        """Entity factory: client.Report().list() / client.Report().load({"id": ...})."""
        from zoom_sdk.entity.report_entity import ReportEntity
        return ReportEntity(self, data)


    def TrackingField(self, data=None) -> "TrackingFieldEntity":
        """Entity factory: client.TrackingField().list() / client.TrackingField().load({"id": ...})."""
        from zoom_sdk.entity.tracking_field_entity import TrackingFieldEntity
        return TrackingFieldEntity(self, data)


    def Tsp(self, data=None) -> "TspEntity":
        """Entity factory: client.Tsp().list() / client.Tsp().load({"id": ...})."""
        from zoom_sdk.entity.tsp_entity import TspEntity
        return TspEntity(self, data)


    def User(self, data=None) -> "UserEntity":
        """Entity factory: client.User().list() / client.User().load({"id": ...})."""
        from zoom_sdk.entity.user_entity import UserEntity
        return UserEntity(self, data)


    def UserAssistantsList(self, data=None) -> "UserAssistantsListEntity":
        """Entity factory: client.UserAssistantsList().list() / client.UserAssistantsList().load({"id": ...})."""
        from zoom_sdk.entity.user_assistants_list_entity import UserAssistantsListEntity
        return UserAssistantsListEntity(self, data)


    def UserPermission(self, data=None) -> "UserPermissionEntity":
        """Entity factory: client.UserPermission().list() / client.UserPermission().load({"id": ...})."""
        from zoom_sdk.entity.user_permission_entity import UserPermissionEntity
        return UserPermissionEntity(self, data)


    def UserSchedulersList(self, data=None) -> "UserSchedulersListEntity":
        """Entity factory: client.UserSchedulersList().list() / client.UserSchedulersList().load({"id": ...})."""
        from zoom_sdk.entity.user_schedulers_list_entity import UserSchedulersListEntity
        return UserSchedulersListEntity(self, data)


    def UserSetting(self, data=None) -> "UserSettingEntity":
        """Entity factory: client.UserSetting().list() / client.UserSetting().load({"id": ...})."""
        from zoom_sdk.entity.user_setting_entity import UserSettingEntity
        return UserSettingEntity(self, data)


    def Webhook(self, data=None) -> "WebhookEntity":
        """Entity factory: client.Webhook().list() / client.Webhook().load({"id": ...})."""
        from zoom_sdk.entity.webhook_entity import WebhookEntity
        return WebhookEntity(self, data)


    def Webinar(self, data=None) -> "WebinarEntity":
        """Entity factory: client.Webinar().list() / client.Webinar().load({"id": ...})."""
        from zoom_sdk.entity.webinar_entity import WebinarEntity
        return WebinarEntity(self, data)


    def WebinarInstance(self, data=None) -> "WebinarInstanceEntity":
        """Entity factory: client.WebinarInstance().list() / client.WebinarInstance().load({"id": ...})."""
        from zoom_sdk.entity.webinar_instance_entity import WebinarInstanceEntity
        return WebinarInstanceEntity(self, data)


    def WebinarPanelistList(self, data=None) -> "WebinarPanelistListEntity":
        """Entity factory: client.WebinarPanelistList().list() / client.WebinarPanelistList().load({"id": ...})."""
        from zoom_sdk.entity.webinar_panelist_list_entity import WebinarPanelistListEntity
        return WebinarPanelistListEntity(self, data)


    def WebinarRegistrantList(self, data=None) -> "WebinarRegistrantListEntity":
        """Entity factory: client.WebinarRegistrantList().list() / client.WebinarRegistrantList().load({"id": ...})."""
        from zoom_sdk.entity.webinar_registrant_list_entity import WebinarRegistrantListEntity
        return WebinarRegistrantListEntity(self, data)


    def ZoomRoomList(self, data=None) -> "ZoomRoomListEntity":
        """Entity factory: client.ZoomRoomList().list() / client.ZoomRoomList().load({"id": ...})."""
        from zoom_sdk.entity.zoom_room_list_entity import ZoomRoomListEntity
        return ZoomRoomListEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "ZoomSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from zoom_sdk.entity.account_entity import AccountEntity
    from zoom_sdk.entity.account_plan_entity import AccountPlanEntity
    from zoom_sdk.entity.account_setting_entity import AccountSettingEntity
    from zoom_sdk.entity.billing_entity import BillingEntity
    from zoom_sdk.entity.cloud_recording_entity import CloudRecordingEntity
    from zoom_sdk.entity.dashboard_entity import DashboardEntity
    from zoom_sdk.entity.device_entity import DeviceEntity
    from zoom_sdk.entity.domains_list_entity import DomainsListEntity
    from zoom_sdk.entity.group_entity import GroupEntity
    from zoom_sdk.entity.group_member_list_entity import GroupMemberListEntity
    from zoom_sdk.entity.im_chat_entity import ImChatEntity
    from zoom_sdk.entity.im_group_entity import ImGroupEntity
    from zoom_sdk.entity.im_group_list_entity import ImGroupListEntity
    from zoom_sdk.entity.meeting_entity import MeetingEntity
    from zoom_sdk.entity.meeting_instance_entity import MeetingInstanceEntity
    from zoom_sdk.entity.meeting_invitation_entity import MeetingInvitationEntity
    from zoom_sdk.entity.meeting_registrant_list_entity import MeetingRegistrantListEntity
    from zoom_sdk.entity.pac_entity import PacEntity
    from zoom_sdk.entity.poll_entity import PollEntity
    from zoom_sdk.entity.qos_entity import QosEntity
    from zoom_sdk.entity.recording_entity import RecordingEntity
    from zoom_sdk.entity.recording_setting_entity import RecordingSettingEntity
    from zoom_sdk.entity.report_entity import ReportEntity
    from zoom_sdk.entity.tracking_field_entity import TrackingFieldEntity
    from zoom_sdk.entity.tsp_entity import TspEntity
    from zoom_sdk.entity.user_entity import UserEntity
    from zoom_sdk.entity.user_assistants_list_entity import UserAssistantsListEntity
    from zoom_sdk.entity.user_permission_entity import UserPermissionEntity
    from zoom_sdk.entity.user_schedulers_list_entity import UserSchedulersListEntity
    from zoom_sdk.entity.user_setting_entity import UserSettingEntity
    from zoom_sdk.entity.webhook_entity import WebhookEntity
    from zoom_sdk.entity.webinar_entity import WebinarEntity
    from zoom_sdk.entity.webinar_instance_entity import WebinarInstanceEntity
    from zoom_sdk.entity.webinar_panelist_list_entity import WebinarPanelistListEntity
    from zoom_sdk.entity.webinar_registrant_list_entity import WebinarRegistrantListEntity
    from zoom_sdk.entity.zoom_room_list_entity import ZoomRoomListEntity
