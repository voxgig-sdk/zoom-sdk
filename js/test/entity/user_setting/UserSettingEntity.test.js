
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { ZoomSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('UserSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.UserSetting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email_notification":{"a":true,"h":"Email Notification","n":"email_notification","r":false,"t":"`$OBJECT`","key$":"email_notification","index$":0},"feature":{"a":true,"h":"Feature","n":"feature","r":false,"t":"`$OBJECT`","key$":"feature","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"in_meeting":{"a":true,"h":"In Meeting","n":"in_meeting","r":false,"t":"`$OBJECT`","key$":"in_meeting","index$":3},"recording":{"a":true,"h":"Recording","n":"recording","r":false,"t":"`$OBJECT`","key$":"recording","index$":4},"schedule_meeting":{"a":true,"h":"Schedule Meeting","n":"schedule_meeting","r":false,"t":"`$OBJECT`","key$":"schedule_meeting","index$":5},"telephony":{"a":true,"h":"Telephony","n":"telephony","r":false,"t":"`$OBJECT`","key$":"telephony","index$":6}},"id":{"field":"id","name":"id"},"name":"user_setting","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /users/{userId}/settings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"user_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"login_type","or":"login_type","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/users/{userId}/settings","q":{"exist":["id","login_type"]},"r":{"param":{"userId":"id"}},"s":[{"lit":"users"},{"var":"id"},{"lit":"settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"user_setting","name__orig":"user_setting","Name":"UserSetting","name_":"user_setting","name-":"user-setting","NAME":"USER_SETTING","index$":29}, {"active":true,"entity":"user_setting","key$":"BasicUserSettingFlow","kind":"basic","name":"BasicUserSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_setting_ref01","srcdatavar":"user_setting_ref01_data","suffix":"_dt0"},"m":{"id":"user_setting01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-user_setting_ref01"}}],"index$":0}]}, 'UserSetting', {"GET /users/{userId}/settings":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"in":"query","name":"login_type","type":"string","enum":[0,1,99,100,101],"x-enum-descriptions":["Facebook","Google","API","Zoom","SSO"],"x-ref":"#/parameters/LoginType","index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let user_setting_ref01_data = Object.values(setup.data.existing.user_setting)[0]

    // LOAD
    const user_setting_ref01_ent = client.UserSetting()
    const user_setting_ref01_match_dt0 = {}
    user_setting_ref01_match_dt0.id = user_setting_ref01_data.id
    const user_setting_ref01_data_dt0 = (await user_setting_ref01_ent.load(user_setting_ref01_match_dt0)).data()
    assert(user_setting_ref01_data_dt0.id === user_setting_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/user_setting/UserSettingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ZoomSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['user_setting01','user_setting02','user_setting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_USER_SETTING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_USER_SETTING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_USER_SETTING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ZoomSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.ZOOM_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
