// Zoom Ts SDK

import { AccountEntity } from './entity/AccountEntity'
import { AccountPlanEntity } from './entity/AccountPlanEntity'
import { AccountSettingEntity } from './entity/AccountSettingEntity'
import { BillingEntity } from './entity/BillingEntity'
import { CloudRecordingEntity } from './entity/CloudRecordingEntity'
import { DashboardEntity } from './entity/DashboardEntity'
import { DeviceEntity } from './entity/DeviceEntity'
import { DomainsListEntity } from './entity/DomainsListEntity'
import { GroupEntity } from './entity/GroupEntity'
import { GroupMemberListEntity } from './entity/GroupMemberListEntity'
import { ImChatEntity } from './entity/ImChatEntity'
import { ImGroupEntity } from './entity/ImGroupEntity'
import { ImGroupListEntity } from './entity/ImGroupListEntity'
import { MeetingEntity } from './entity/MeetingEntity'
import { MeetingInstanceEntity } from './entity/MeetingInstanceEntity'
import { MeetingInvitationEntity } from './entity/MeetingInvitationEntity'
import { MeetingRegistrantListEntity } from './entity/MeetingRegistrantListEntity'
import { PacEntity } from './entity/PacEntity'
import { PollEntity } from './entity/PollEntity'
import { QosEntity } from './entity/QosEntity'
import { RecordingEntity } from './entity/RecordingEntity'
import { RecordingSettingEntity } from './entity/RecordingSettingEntity'
import { ReportEntity } from './entity/ReportEntity'
import { TrackingFieldEntity } from './entity/TrackingFieldEntity'
import { TspEntity } from './entity/TspEntity'
import { UserEntity } from './entity/UserEntity'
import { UserAssistantsListEntity } from './entity/UserAssistantsListEntity'
import { UserPermissionEntity } from './entity/UserPermissionEntity'
import { UserSchedulersListEntity } from './entity/UserSchedulersListEntity'
import { UserSettingEntity } from './entity/UserSettingEntity'
import { WebhookEntity } from './entity/WebhookEntity'
import { WebinarEntity } from './entity/WebinarEntity'
import { WebinarInstanceEntity } from './entity/WebinarInstanceEntity'
import { WebinarPanelistListEntity } from './entity/WebinarPanelistListEntity'
import { WebinarRegistrantListEntity } from './entity/WebinarRegistrantListEntity'
import { ZoomRoomListEntity } from './entity/ZoomRoomListEntity'

export type * from './ZoomTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ZoomEntityBase } from './ZoomEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class ZoomSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
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
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('ZoomSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('ZoomSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('ZoomSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Account().list()` / `client.Account().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Account(entopts?: Record<string, any>) {
    const self = this
    return new AccountEntity(self, entopts)
  }


  // Entity access: `client.AccountPlan().list()` / `client.AccountPlan().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountPlan(entopts?: Record<string, any>) {
    const self = this
    return new AccountPlanEntity(self, entopts)
  }


  // Entity access: `client.AccountSetting().list()` / `client.AccountSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  AccountSetting(entopts?: Record<string, any>) {
    const self = this
    return new AccountSettingEntity(self, entopts)
  }


  // Entity access: `client.Billing().list()` / `client.Billing().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Billing(entopts?: Record<string, any>) {
    const self = this
    return new BillingEntity(self, entopts)
  }


  // Entity access: `client.CloudRecording().list()` / `client.CloudRecording().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  CloudRecording(entopts?: Record<string, any>) {
    const self = this
    return new CloudRecordingEntity(self, entopts)
  }


  // Entity access: `client.Dashboard().list()` / `client.Dashboard().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Dashboard(entopts?: Record<string, any>) {
    const self = this
    return new DashboardEntity(self, entopts)
  }


  // Entity access: `client.Device().list()` / `client.Device().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Device(entopts?: Record<string, any>) {
    const self = this
    return new DeviceEntity(self, entopts)
  }


  // Entity access: `client.DomainsList().list()` / `client.DomainsList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  DomainsList(entopts?: Record<string, any>) {
    const self = this
    return new DomainsListEntity(self, entopts)
  }


  // Entity access: `client.Group().list()` / `client.Group().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Group(entopts?: Record<string, any>) {
    const self = this
    return new GroupEntity(self, entopts)
  }


  // Entity access: `client.GroupMemberList().list()` / `client.GroupMemberList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  GroupMemberList(entopts?: Record<string, any>) {
    const self = this
    return new GroupMemberListEntity(self, entopts)
  }


  // Entity access: `client.ImChat().list()` / `client.ImChat().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ImChat(entopts?: Record<string, any>) {
    const self = this
    return new ImChatEntity(self, entopts)
  }


  // Entity access: `client.ImGroup().list()` / `client.ImGroup().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ImGroup(entopts?: Record<string, any>) {
    const self = this
    return new ImGroupEntity(self, entopts)
  }


  // Entity access: `client.ImGroupList().list()` / `client.ImGroupList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ImGroupList(entopts?: Record<string, any>) {
    const self = this
    return new ImGroupListEntity(self, entopts)
  }


  // Entity access: `client.Meeting().list()` / `client.Meeting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Meeting(entopts?: Record<string, any>) {
    const self = this
    return new MeetingEntity(self, entopts)
  }


  // Entity access: `client.MeetingInstance().list()` / `client.MeetingInstance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MeetingInstance(entopts?: Record<string, any>) {
    const self = this
    return new MeetingInstanceEntity(self, entopts)
  }


  // Entity access: `client.MeetingInvitation().list()` / `client.MeetingInvitation().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MeetingInvitation(entopts?: Record<string, any>) {
    const self = this
    return new MeetingInvitationEntity(self, entopts)
  }


  // Entity access: `client.MeetingRegistrantList().list()` / `client.MeetingRegistrantList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  MeetingRegistrantList(entopts?: Record<string, any>) {
    const self = this
    return new MeetingRegistrantListEntity(self, entopts)
  }


  // Entity access: `client.Pac().list()` / `client.Pac().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Pac(entopts?: Record<string, any>) {
    const self = this
    return new PacEntity(self, entopts)
  }


  // Entity access: `client.Poll().list()` / `client.Poll().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Poll(entopts?: Record<string, any>) {
    const self = this
    return new PollEntity(self, entopts)
  }


  // Entity access: `client.Qos().list()` / `client.Qos().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Qos(entopts?: Record<string, any>) {
    const self = this
    return new QosEntity(self, entopts)
  }


  // Entity access: `client.Recording().list()` / `client.Recording().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Recording(entopts?: Record<string, any>) {
    const self = this
    return new RecordingEntity(self, entopts)
  }


  // Entity access: `client.RecordingSetting().list()` / `client.RecordingSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RecordingSetting(entopts?: Record<string, any>) {
    const self = this
    return new RecordingSettingEntity(self, entopts)
  }


  // Entity access: `client.Report().list()` / `client.Report().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Report(entopts?: Record<string, any>) {
    const self = this
    return new ReportEntity(self, entopts)
  }


  // Entity access: `client.TrackingField().list()` / `client.TrackingField().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TrackingField(entopts?: Record<string, any>) {
    const self = this
    return new TrackingFieldEntity(self, entopts)
  }


  // Entity access: `client.Tsp().list()` / `client.Tsp().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Tsp(entopts?: Record<string, any>) {
    const self = this
    return new TspEntity(self, entopts)
  }


  // Entity access: `client.User().list()` / `client.User().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  User(entopts?: Record<string, any>) {
    const self = this
    return new UserEntity(self, entopts)
  }


  // Entity access: `client.UserAssistantsList().list()` / `client.UserAssistantsList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserAssistantsList(entopts?: Record<string, any>) {
    const self = this
    return new UserAssistantsListEntity(self, entopts)
  }


  // Entity access: `client.UserPermission().list()` / `client.UserPermission().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserPermission(entopts?: Record<string, any>) {
    const self = this
    return new UserPermissionEntity(self, entopts)
  }


  // Entity access: `client.UserSchedulersList().list()` / `client.UserSchedulersList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserSchedulersList(entopts?: Record<string, any>) {
    const self = this
    return new UserSchedulersListEntity(self, entopts)
  }


  // Entity access: `client.UserSetting().list()` / `client.UserSetting().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  UserSetting(entopts?: Record<string, any>) {
    const self = this
    return new UserSettingEntity(self, entopts)
  }


  // Entity access: `client.Webhook().list()` / `client.Webhook().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Webhook(entopts?: Record<string, any>) {
    const self = this
    return new WebhookEntity(self, entopts)
  }


  // Entity access: `client.Webinar().list()` / `client.Webinar().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Webinar(entopts?: Record<string, any>) {
    const self = this
    return new WebinarEntity(self, entopts)
  }


  // Entity access: `client.WebinarInstance().list()` / `client.WebinarInstance().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebinarInstance(entopts?: Record<string, any>) {
    const self = this
    return new WebinarInstanceEntity(self, entopts)
  }


  // Entity access: `client.WebinarPanelistList().list()` / `client.WebinarPanelistList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebinarPanelistList(entopts?: Record<string, any>) {
    const self = this
    return new WebinarPanelistListEntity(self, entopts)
  }


  // Entity access: `client.WebinarRegistrantList().list()` / `client.WebinarRegistrantList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WebinarRegistrantList(entopts?: Record<string, any>) {
    const self = this
    return new WebinarRegistrantListEntity(self, entopts)
  }


  // Entity access: `client.ZoomRoomList().list()` / `client.ZoomRoomList().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  ZoomRoomList(entopts?: Record<string, any>) {
    const self = this
    return new ZoomRoomListEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ZoomSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ZoomSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Zoom' }
  }

  toString() {
    return 'Zoom ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ZoomSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  ZoomEntityBase,

  ZoomSDK,
  SDK,
}


