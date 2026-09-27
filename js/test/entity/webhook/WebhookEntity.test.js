
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


describe('WebhookEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Webhook()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth_password":{"a":true,"h":"Auth Password","n":"auth_password","r":true,"sh":"Webhook auth password","t":"`$STRING`","key$":"auth_password","index$":0},"auth_user":{"a":true,"h":"Auth User","n":"auth_user","r":true,"sh":"Webhook auth user name","t":"`$STRING`","key$":"auth_user","index$":1},"created_at":{"a":true,"fo":"date-time","h":"Created At","n":"created_at","r":false,"sh":"Webhook create time","t":"`$STRING`","key$":"created_at","index$":2},"events":{"a":true,"h":"Events","n":"events","r":true,"sh":"List of events objects.","t":"`$ARRAY`","key$":"events","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":4},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":5},"url":{"a":true,"h":"Url","n":"url","r":true,"sh":"Webhook endpoint","t":"`$STRING`","key$":"url","index$":6},"webhook_id":{"a":true,"h":"Webhook Id","n":"webhook_id","r":false,"sh":"Webhook Id","t":"`$STRING`","key$":"webhook_id","index$":7},"webhooks":{"a":true,"h":"Webhooks","n":"webhooks","r":false,"sh":"List of Webhook objects","t":"`$ARRAY`","key$":"webhooks","index$":8}},"id":{"field":"id","name":"id"},"name":"webhook","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /webhooks","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"POST","o":"/webhooks","q":{"exist":["body"]},"r":{},"s":[{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /webhooks","source":"swagger2","version":2},"g":{},"k":"http","m":"GET","o":"/webhooks","q":{},"r":{},"s":[{"lit":"webhooks"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /webhooks/{webhookId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/webhooks/{webhookId}","q":{"exist":["id"]},"r":{"param":{"webhookId":"id"}},"s":[{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /webhooks/{webhookId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/webhooks/{webhookId}","q":{"exist":["id"]},"r":{"param":{"webhookId":"id"}},"s":[{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /webhooks/{webhookId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webhook_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"PATCH","o":"/webhooks/{webhookId}","q":{"exist":["body","id"]},"r":{"param":{"webhookId":"id"}},"s":[{"lit":"webhooks"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PATCH /webhooks/options","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"PATCH","o":"/webhooks/options","q":{"$action":"option","exist":["body"]},"r":{},"s":[{"lit":"webhooks"},{"lit":"options"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"webhook","name__orig":"webhook","Name":"Webhook","name_":"webhook","name-":"webhook","NAME":"WEBHOOK","index$":30}, {"active":true,"entity":"webhook","key$":"BasicWebhookFlow","kind":"basic","name":"BasicWebhookFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"webhook_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webhook_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_up0","textfield":"auth_password"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"webhook_ref01","srcdatavar":"webhook_ref01_data","suffix":"_dt0"},"m":{"id":"webhook01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-webhook_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"webhook_ref01","suffix":"_rm0"},"m":{"id":"webhook01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"webhook_ref01"}}],"index$":5}]}, 'Webhook', {"POST /webhooks":{"protocol":"http","parameters":[{"in":"body","name":"body","required":true,"description":"Webhook","schema":{"type":"object","description":"Webhook base object, only available for version 2 webhook","required":["url","auth_user","auth_password","events"],"properties":{"url":{"description":"Webhook endpoint","maxLength":256,"type":"string","key$":"url"},"auth_user":{"description":"Webhook auth user name","maxLength":128,"type":"string","key$":"auth_user"},"auth_password":{"description":"Webhook auth password","maxLength":64,"type":"string","key$":"auth_password"},"events":{"description":"List of events objects.","enum":["meeting_started","meeting_ended","meeting_jbh","meeting_join","recording_completed","participant_joined","participant_left","meeting_registered","recording_transcript_completed"],"items":{"type":"string"},"type":"array","x-enum-descriptions":["The meeting has started.","The meeting has ended.","Attendee has joined a meeting before the host.","Host hasn’t launched the meeting, attendee is waiting.","All the Cloud Recordings have completed processing and is available.","Participant has joined the meeting.","Participant has leaved the meeting.","Attendee registered for a meeting or webinar.","Recording audio transcript files have processed and are available."],"key$":"events"}},"x-ref":"#/definitions/Webhook"},"index$":0}]},"GET /webhooks":{"protocol":"http","parameters":[]},"GET /webhooks/{webhookId}":{"protocol":"http","parameters":[{"in":"path","name":"webhookId","description":"The webhook ID","type":"string","required":true,"x-ref":"#/parameters/WebhookId","index$":0}]},"DELETE /webhooks/{webhookId}":{"protocol":"http","parameters":[{"in":"path","name":"webhookId","description":"The webhook ID","type":"string","required":true,"x-ref":"#/parameters/WebhookId","index$":0}]},"PATCH /webhooks/{webhookId}":{"protocol":"http","parameters":[{"in":"path","name":"webhookId","description":"The webhook ID","type":"string","required":true,"x-ref":"#/parameters/WebhookId","index$":0},{"in":"body","name":"body","required":true,"description":"Webhook","schema":{"type":"object","description":"Webhook base object","properties":{"url":{"type":"string","description":"Webhook endpoint","maxLength":256},"auth_user":{"type":"string","description":"Webhook auth user name","maxLength":128},"auth_password":{"type":"string","description":"Webhook auth password","maxLength":64},"events":{"type":"array","description":"List of events objects","items":{"type":"string"},"enum":["meeting_started","meeting_ended","meeting_jbh","meeting_join","recording_completed","participant_joined","participant_left","meeting_registered","recording_transcript_completed"],"x-enum-descriptions":["The meeting has started.","The meeting has ended.","Attendee has joined a meeting before the host.","Host hasn’t launched the meeting, attendee is waiting.","All the Cloud Recordings has completed processing and is available.","Participant has joined the meeting.","Participant has leaved the meeting.","Attendee registered for a meeting or webinar.","Recording audio transcript files have processed and are available."]}},"x-ref":"#/definitions/WebhookUpdate"},"index$":1}]},"PATCH /webhooks/options":{"protocol":"http","parameters":[{"in":"body","name":"body","required":true,"schema":{"required":["version"],"properties":{"version":{"type":"string","enum":["v1","v2"],"x-enum-descriptions":["Version 1","Version 2"]}}},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const webhook_ref01_ent = client.Webhook()
    let webhook_ref01_data = setup.data.new.webhook['webhook_ref01']

    webhook_ref01_data = (await webhook_ref01_ent.create(webhook_ref01_data)).data()
    assert(null != webhook_ref01_data.id)


    // LIST
    const webhook_ref01_match = {}

    const webhook_ref01_list = (await webhook_ref01_ent.list(webhook_ref01_match)).map((e) => e.data())

    assert(!isempty(select(webhook_ref01_list, { id: webhook_ref01_data.id })))


    // UPDATE
    const webhook_ref01_data_up0 = {}
    webhook_ref01_data_up0.id = webhook_ref01_data.id

    const webhook_ref01_markdef_up0 = { name: 'auth_password', value: 'Mark01-webhook_ref01_' + setup.now }
    webhook_ref01_data_up0 [webhook_ref01_markdef_up0.name] = webhook_ref01_markdef_up0.value

    const webhook_ref01_resdata_up0 = (await webhook_ref01_ent.update(webhook_ref01_data_up0)).data()
    assert(webhook_ref01_resdata_up0.id === webhook_ref01_data_up0.id)

    assert(webhook_ref01_resdata_up0[webhook_ref01_markdef_up0.name] === webhook_ref01_markdef_up0.value)


    // LOAD
    const webhook_ref01_match_dt0 = {}
    webhook_ref01_match_dt0.id = webhook_ref01_data.id
    const webhook_ref01_data_dt0 = (await webhook_ref01_ent.load(webhook_ref01_match_dt0)).data()
    assert(webhook_ref01_data_dt0.id === webhook_ref01_data.id)


    // REMOVE
    const webhook_ref01_match_rm0 = {}
    webhook_ref01_match_rm0.id = webhook_ref01_data.id
    await webhook_ref01_ent.remove(webhook_ref01_match_rm0)
  

    // LIST
    const webhook_ref01_match_rt0 = {}

    const webhook_ref01_list_rt0 = (await webhook_ref01_ent.list(webhook_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(webhook_ref01_list_rt0, { id: webhook_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/webhook/WebhookTestData.json')

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
    ['webhook01','webhook02','webhook03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_WEBHOOK_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_WEBHOOK_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_WEBHOOK_ENTID']
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
  
