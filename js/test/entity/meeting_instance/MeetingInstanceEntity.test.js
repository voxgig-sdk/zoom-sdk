
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


describe('MeetingInstanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.MeetingInstance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"meetings":{"a":true,"h":"Meetings","n":"meetings","r":false,"sh":"List of ended meeting instances.","t":"`$ARRAY`","key$":"meetings","index$":0}},"name":"meeting_instance","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /past_meetings/{meetingId}/instances","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"past_meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/past_meetings/{meetingId}/instances","q":{"exist":["past_meeting_id"]},"r":{"param":{"meetingId":"past_meeting_id"}},"s":[{"lit":"past_meetings"},{"var":"past_meeting_id"},{"lit":"instances"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"meeting_instance","name__orig":"meeting_instance","Name":"MeetingInstance","name_":"meeting_instance","name-":"meeting-instance","NAME":"MEETING_INSTANCE","index$":14}, {"active":true,"entity":"meeting_instance","key$":"BasicMeetingInstanceFlow","kind":"basic","name":"BasicMeetingInstanceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"past_meeting_id":"past_meeting01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"meeting_instance_ref01"}}],"index$":0}]}, 'MeetingInstance', {"GET /past_meetings/{meetingId}/instances":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID","type":"integer","required":true,"x-ref":"#/parameters/MeetingId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let meeting_instance_ref01_data = Object.values(setup.data.existing.meeting_instance)[0]

    // LIST
    const meeting_instance_ref01_ent = client.MeetingInstance()
    const meeting_instance_ref01_match = {}
    meeting_instance_ref01_match['past_meeting_id'] = setup.idmap['past_meeting01']

    const meeting_instance_ref01_list = (await meeting_instance_ref01_ent.list(meeting_instance_ref01_match)).map((e) => e.data())


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/meeting_instance/MeetingInstanceTestData.json')

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
    ['meeting_instance01','meeting_instance02','meeting_instance03','past_meeting01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_MEETING_INSTANCE_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_MEETING_INSTANCE_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_MEETING_INSTANCE_ENTID']
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
  
