-- Zoom SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("zoom_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local ZoomSDK = {}
ZoomSDK.__index = ZoomSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

ZoomSDK._make_feature = _make_feature


function ZoomSDK.new(options)
  local self = setmetatable({}, ZoomSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: debug
  -- feature: idempotency
  -- feature: metrics
  -- feature: paging
  -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function ZoomSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function ZoomSDK:get_utility()
  return Utility.copy(self._utility)
end


function ZoomSDK:get_root_ctx()
  return self._rootctx
end


function ZoomSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function ZoomSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function ZoomSDK:_op_allowed(op)
  local allow = vs.getpath(self.options, "allow.op")
  return type(allow) == "string" and allow:find(op, 1, true) ~= nil
end


function ZoomSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "ZoomSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function ZoomSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function ZoomSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "ZoomSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Account():list() / client:Account():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Account(data)
  local EntityMod = require("entity.account_entity")
  if data == nil then
    if self._account == nil then
      self._account = EntityMod.new(self, nil)
    end
    return self._account
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AccountPlan():list() / client:AccountPlan():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:AccountPlan(data)
  local EntityMod = require("entity.account_plan_entity")
  if data == nil then
    if self._account_plan == nil then
      self._account_plan = EntityMod.new(self, nil)
    end
    return self._account_plan
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:AccountSetting():list() / client:AccountSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:AccountSetting(data)
  local EntityMod = require("entity.account_setting_entity")
  if data == nil then
    if self._account_setting == nil then
      self._account_setting = EntityMod.new(self, nil)
    end
    return self._account_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Billing():list() / client:Billing():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Billing(data)
  local EntityMod = require("entity.billing_entity")
  if data == nil then
    if self._billing == nil then
      self._billing = EntityMod.new(self, nil)
    end
    return self._billing
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:CloudRecording():list() / client:CloudRecording():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:CloudRecording(data)
  local EntityMod = require("entity.cloud_recording_entity")
  if data == nil then
    if self._cloud_recording == nil then
      self._cloud_recording = EntityMod.new(self, nil)
    end
    return self._cloud_recording
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Dashboard():list() / client:Dashboard():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Dashboard(data)
  local EntityMod = require("entity.dashboard_entity")
  if data == nil then
    if self._dashboard == nil then
      self._dashboard = EntityMod.new(self, nil)
    end
    return self._dashboard
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Device():list() / client:Device():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Device(data)
  local EntityMod = require("entity.device_entity")
  if data == nil then
    if self._device == nil then
      self._device = EntityMod.new(self, nil)
    end
    return self._device
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DomainsList():list() / client:DomainsList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:DomainsList(data)
  local EntityMod = require("entity.domains_list_entity")
  if data == nil then
    if self._domains_list == nil then
      self._domains_list = EntityMod.new(self, nil)
    end
    return self._domains_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Group():list() / client:Group():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Group(data)
  local EntityMod = require("entity.group_entity")
  if data == nil then
    if self._group == nil then
      self._group = EntityMod.new(self, nil)
    end
    return self._group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:GroupMemberList():list() / client:GroupMemberList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:GroupMemberList(data)
  local EntityMod = require("entity.group_member_list_entity")
  if data == nil then
    if self._group_member_list == nil then
      self._group_member_list = EntityMod.new(self, nil)
    end
    return self._group_member_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ImChat():list() / client:ImChat():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:ImChat(data)
  local EntityMod = require("entity.im_chat_entity")
  if data == nil then
    if self._im_chat == nil then
      self._im_chat = EntityMod.new(self, nil)
    end
    return self._im_chat
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ImGroup():list() / client:ImGroup():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:ImGroup(data)
  local EntityMod = require("entity.im_group_entity")
  if data == nil then
    if self._im_group == nil then
      self._im_group = EntityMod.new(self, nil)
    end
    return self._im_group
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ImGroupList():list() / client:ImGroupList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:ImGroupList(data)
  local EntityMod = require("entity.im_group_list_entity")
  if data == nil then
    if self._im_group_list == nil then
      self._im_group_list = EntityMod.new(self, nil)
    end
    return self._im_group_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Meeting():list() / client:Meeting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Meeting(data)
  local EntityMod = require("entity.meeting_entity")
  if data == nil then
    if self._meeting == nil then
      self._meeting = EntityMod.new(self, nil)
    end
    return self._meeting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MeetingInstance():list() / client:MeetingInstance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:MeetingInstance(data)
  local EntityMod = require("entity.meeting_instance_entity")
  if data == nil then
    if self._meeting_instance == nil then
      self._meeting_instance = EntityMod.new(self, nil)
    end
    return self._meeting_instance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MeetingInvitation():list() / client:MeetingInvitation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:MeetingInvitation(data)
  local EntityMod = require("entity.meeting_invitation_entity")
  if data == nil then
    if self._meeting_invitation == nil then
      self._meeting_invitation = EntityMod.new(self, nil)
    end
    return self._meeting_invitation
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:MeetingRegistrantList():list() / client:MeetingRegistrantList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:MeetingRegistrantList(data)
  local EntityMod = require("entity.meeting_registrant_list_entity")
  if data == nil then
    if self._meeting_registrant_list == nil then
      self._meeting_registrant_list = EntityMod.new(self, nil)
    end
    return self._meeting_registrant_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Pac():list() / client:Pac():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Pac(data)
  local EntityMod = require("entity.pac_entity")
  if data == nil then
    if self._pac == nil then
      self._pac = EntityMod.new(self, nil)
    end
    return self._pac
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Poll():list() / client:Poll():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Poll(data)
  local EntityMod = require("entity.poll_entity")
  if data == nil then
    if self._poll == nil then
      self._poll = EntityMod.new(self, nil)
    end
    return self._poll
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Qos():list() / client:Qos():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Qos(data)
  local EntityMod = require("entity.qos_entity")
  if data == nil then
    if self._qos == nil then
      self._qos = EntityMod.new(self, nil)
    end
    return self._qos
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Recording():list() / client:Recording():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Recording(data)
  local EntityMod = require("entity.recording_entity")
  if data == nil then
    if self._recording == nil then
      self._recording = EntityMod.new(self, nil)
    end
    return self._recording
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RecordingSetting():list() / client:RecordingSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:RecordingSetting(data)
  local EntityMod = require("entity.recording_setting_entity")
  if data == nil then
    if self._recording_setting == nil then
      self._recording_setting = EntityMod.new(self, nil)
    end
    return self._recording_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Report():list() / client:Report():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Report(data)
  local EntityMod = require("entity.report_entity")
  if data == nil then
    if self._report == nil then
      self._report = EntityMod.new(self, nil)
    end
    return self._report
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TrackingField():list() / client:TrackingField():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:TrackingField(data)
  local EntityMod = require("entity.tracking_field_entity")
  if data == nil then
    if self._tracking_field == nil then
      self._tracking_field = EntityMod.new(self, nil)
    end
    return self._tracking_field
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Tsp():list() / client:Tsp():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Tsp(data)
  local EntityMod = require("entity.tsp_entity")
  if data == nil then
    if self._tsp == nil then
      self._tsp = EntityMod.new(self, nil)
    end
    return self._tsp
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:User():list() / client:User():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:User(data)
  local EntityMod = require("entity.user_entity")
  if data == nil then
    if self._user == nil then
      self._user = EntityMod.new(self, nil)
    end
    return self._user
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserAssistantsList():list() / client:UserAssistantsList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:UserAssistantsList(data)
  local EntityMod = require("entity.user_assistants_list_entity")
  if data == nil then
    if self._user_assistants_list == nil then
      self._user_assistants_list = EntityMod.new(self, nil)
    end
    return self._user_assistants_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserPermission():list() / client:UserPermission():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:UserPermission(data)
  local EntityMod = require("entity.user_permission_entity")
  if data == nil then
    if self._user_permission == nil then
      self._user_permission = EntityMod.new(self, nil)
    end
    return self._user_permission
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserSchedulersList():list() / client:UserSchedulersList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:UserSchedulersList(data)
  local EntityMod = require("entity.user_schedulers_list_entity")
  if data == nil then
    if self._user_schedulers_list == nil then
      self._user_schedulers_list = EntityMod.new(self, nil)
    end
    return self._user_schedulers_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:UserSetting():list() / client:UserSetting():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:UserSetting(data)
  local EntityMod = require("entity.user_setting_entity")
  if data == nil then
    if self._user_setting == nil then
      self._user_setting = EntityMod.new(self, nil)
    end
    return self._user_setting
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Webhook():list() / client:Webhook():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Webhook(data)
  local EntityMod = require("entity.webhook_entity")
  if data == nil then
    if self._webhook == nil then
      self._webhook = EntityMod.new(self, nil)
    end
    return self._webhook
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Webinar():list() / client:Webinar():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:Webinar(data)
  local EntityMod = require("entity.webinar_entity")
  if data == nil then
    if self._webinar == nil then
      self._webinar = EntityMod.new(self, nil)
    end
    return self._webinar
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebinarInstance():list() / client:WebinarInstance():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:WebinarInstance(data)
  local EntityMod = require("entity.webinar_instance_entity")
  if data == nil then
    if self._webinar_instance == nil then
      self._webinar_instance = EntityMod.new(self, nil)
    end
    return self._webinar_instance
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebinarPanelistList():list() / client:WebinarPanelistList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:WebinarPanelistList(data)
  local EntityMod = require("entity.webinar_panelist_list_entity")
  if data == nil then
    if self._webinar_panelist_list == nil then
      self._webinar_panelist_list = EntityMod.new(self, nil)
    end
    return self._webinar_panelist_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WebinarRegistrantList():list() / client:WebinarRegistrantList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:WebinarRegistrantList(data)
  local EntityMod = require("entity.webinar_registrant_list_entity")
  if data == nil then
    if self._webinar_registrant_list == nil then
      self._webinar_registrant_list = EntityMod.new(self, nil)
    end
    return self._webinar_registrant_list
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ZoomRoomList():list() / client:ZoomRoomList():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function ZoomSDK:ZoomRoomList(data)
  local EntityMod = require("entity.zoom_room_list_entity")
  if data == nil then
    if self._zoom_room_list == nil then
      self._zoom_room_list = EntityMod.new(self, nil)
    end
    return self._zoom_room_list
  end
  return EntityMod.new(self, data)
end




function ZoomSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = ZoomSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return ZoomSDK
