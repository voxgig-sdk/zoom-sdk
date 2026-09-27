
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


describe('AccountSettingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.AccountSetting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"email_notification":{"a":true,"h":"Email Notification","n":"email_notification","r":false,"sh":"Account Settings: Notification","t":"`$OBJECT`","key$":"email_notification","index$":0},"feature":{"a":true,"h":"Feature","n":"feature","r":false,"sh":"Account Settings: Feature","t":"`$OBJECT`","key$":"feature","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2},"in_meeting":{"a":true,"h":"In Meeting","n":"in_meeting","r":false,"sh":"Account Settings: In Meeting","t":"`$OBJECT`","key$":"in_meeting","index$":3},"integration":{"a":true,"h":"Integration","n":"integration","r":false,"sh":"Account Settings: Integration","t":"`$OBJECT`","key$":"integration","index$":4},"recording":{"a":true,"h":"Recording","n":"recording","r":false,"sh":"Account Settings: Recording","t":"`$OBJECT`","key$":"recording","index$":5},"schedule_meting":{"a":true,"h":"Schedule Meting","n":"schedule_meting","r":false,"sh":"Account Settings: Schedule Meeting","t":"`$OBJECT`","key$":"schedule_meting","index$":6},"security":{"a":true,"h":"Security","n":"security","r":false,"sh":"Account Settings: Security","t":"`$OBJECT`","key$":"security","index$":7},"telephony":{"a":true,"h":"Telephony","n":"telephony","r":false,"sh":"Account Settings: Telephony","t":"`$OBJECT`","key$":"telephony","index$":8},"zoom_rooms":{"a":true,"h":"Zoom Rooms","n":"zoom_rooms","r":false,"sh":"Account Settings: Zoom Rooms","t":"`$OBJECT`","key$":"zoom_rooms","index$":9}},"id":{"field":"id","name":"id"},"name":"account_setting","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /accounts/{accountId}/settings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"account_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/accounts/{accountId}/settings","q":{"exist":["id"]},"r":{"param":{"accountId":"id"}},"s":[{"lit":"accounts"},{"var":"id"},{"lit":"settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"account_setting","name__orig":"account_setting","Name":"AccountSetting","name_":"account_setting","name-":"account-setting","NAME":"ACCOUNT_SETTING","index$":2}, {"active":true,"entity":"account_setting","key$":"BasicAccountSettingFlow","kind":"basic","name":"BasicAccountSettingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"account_setting_ref01","srcdatavar":"account_setting_ref01_data","suffix":"_dt0"},"m":{"id":"account_setting01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-account_setting_ref01"}}],"index$":0}]}, 'AccountSetting', {"GET /accounts/{accountId}/settings":{"protocol":"http","parameters":[{"in":"path","name":"accountId","description":"The account ID","type":"string","required":true,"x-ref":"#/parameters/AccountId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let account_setting_ref01_data = Object.values(setup.data.existing.account_setting)[0]

    // LOAD
    const account_setting_ref01_ent = client.AccountSetting()
    const account_setting_ref01_match_dt0 = {}
    account_setting_ref01_match_dt0.id = account_setting_ref01_data.id
    const account_setting_ref01_data_dt0 = (await account_setting_ref01_ent.load(account_setting_ref01_match_dt0)).data()
    assert(account_setting_ref01_data_dt0.id === account_setting_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/account_setting/AccountSettingTestData.json')

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
    ['account_setting01','account_setting02','account_setting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_ACCOUNT_SETTING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_ACCOUNT_SETTING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_ACCOUNT_SETTING_ENTID']
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
  
