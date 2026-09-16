
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


describe('MeetingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Meeting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"agenda","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"created_at","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"duration","req":false,"type":"`$INTEGER`","index$":2},{"active":true,"name":"host_id","req":false,"type":"`$STRING`","index$":3},{"active":true,"name":"host_video","req":false,"type":"`$BOOLEAN`","index$":4},{"active":true,"name":"id","req":false,"type":"`$INTEGER`","index$":5},{"active":true,"name":"join_before_host","req":false,"type":"`$BOOLEAN`","index$":6},{"active":true,"name":"join_url","req":false,"type":"`$STRING`","index$":7},{"active":true,"name":"mute_upon_entry","req":false,"type":"`$BOOLEAN`","index$":8},{"active":true,"name":"participant_video","req":false,"type":"`$BOOLEAN`","index$":9},{"active":true,"name":"password","req":false,"type":"`$STRING`","index$":10},{"active":true,"name":"settings","req":false,"type":"`$OBJECT`","index$":11},{"active":true,"name":"start_time","req":false,"type":"`$STRING`","index$":12},{"active":true,"name":"status","req":false,"type":"`$STRING`","index$":13},{"active":true,"name":"timezone","req":false,"type":"`$STRING`","index$":14},{"active":true,"name":"topic","op":{"list":{"req":false,"type":"`$STRING`"}},"req":true,"type":"`$STRING`","index$":15},{"active":true,"name":"type","req":false,"type":"`$INTEGER`","index$":16},{"active":true,"name":"uuid","req":false,"type":"`$STRING`","index$":17},{"active":true,"name":"waiting_room","req":false,"type":"`$BOOLEAN`","index$":18}],"id":{"field":"id","name":"id"},"name":"meeting","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"user_id","orig":"user_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"POST /users/{userId}/meetings","json":"{\"operationId\":\"createMeeting\",\"parameters\":[{\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agenda\":{\"type\":\"string\"},\"duration\":{\"type\":\"integer\"},\"password\":{\"type\":\"string\"},\"settings\":{\"properties\":{\"host_video\":{\"type\":\"boolean\"},\"join_before_host\":{\"type\":\"boolean\"},\"mute_upon_entry\":{\"type\":\"boolean\"},\"participant_video\":{\"type\":\"boolean\"},\"waiting_room\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start_time\":{\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"topic\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"}},\"required\":[\"topic\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agenda\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"duration\":{\"type\":\"integer\"},\"host_id\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"join_url\":{\"type\":\"string\"},\"settings\":{\"properties\":{\"host_video\":{\"type\":\"boolean\"},\"join_before_host\":{\"type\":\"boolean\"},\"mute_upon_entry\":{\"type\":\"boolean\"},\"participant_video\":{\"type\":\"boolean\"},\"waiting_room\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start_time\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"topic\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"},\"uuid\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The created meeting\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/users/{userId}/meetings","rename":{"param":{"userId":"user_id"}},"segments":[{"lit":"users"},{"var":"user_id"},{"lit":"meetings"}],"select":{"exist":["user_id"]},"transform":{"req":"`reqdata`","res":"`body.settings`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"user_id","orig":"user_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"next_page_token","orig":"next_page_token","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"page_size","orig":"page_size","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"type","orig":"type","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /users/{userId}/meetings","json":"{\"operationId\":\"listMeetings\",\"parameters\":[{\"in\":\"path\",\"name\":\"userId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"type\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"page_size\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"in\":\"query\",\"name\":\"next_page_token\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"meetings\":{\"items\":{\"properties\":{\"agenda\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"duration\":{\"type\":\"integer\"},\"host_id\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"join_url\":{\"type\":\"string\"},\"settings\":{\"properties\":{\"host_video\":{\"type\":\"boolean\"},\"join_before_host\":{\"type\":\"boolean\"},\"mute_upon_entry\":{\"type\":\"boolean\"},\"participant_video\":{\"type\":\"boolean\"},\"waiting_room\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start_time\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"topic\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"},\"uuid\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"next_page_token\":{\"type\":\"string\"},\"page_count\":{\"type\":\"integer\"},\"page_size\":{\"type\":\"integer\"},\"total_records\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"A page of meetings\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/users/{userId}/meetings","rename":{"param":{"userId":"user_id"}},"segments":[{"lit":"users"},{"var":"user_id"},{"lit":"meetings"}],"select":{"exist":["next_page_token","page_size","type","user_id"]},"transform":{"req":"`reqdata`","res":"`body.meetings`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"meeting_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /meetings/{meetingId}","json":"{\"operationId\":\"getMeeting\",\"parameters\":[{\"in\":\"path\",\"name\":\"meetingId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agenda\":{\"type\":\"string\"},\"created_at\":{\"type\":\"string\"},\"duration\":{\"type\":\"integer\"},\"host_id\":{\"type\":\"string\"},\"id\":{\"type\":\"integer\"},\"join_url\":{\"type\":\"string\"},\"settings\":{\"properties\":{\"host_video\":{\"type\":\"boolean\"},\"join_before_host\":{\"type\":\"boolean\"},\"mute_upon_entry\":{\"type\":\"boolean\"},\"participant_video\":{\"type\":\"boolean\"},\"waiting_room\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start_time\":{\"type\":\"string\"},\"status\":{\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"topic\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"},\"uuid\":{\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"The requested meeting\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/meetings/{meetingId}","rename":{"param":{"meetingId":"id"}},"segments":[{"lit":"meetings"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.settings`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"meeting_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"DELETE /meetings/{meetingId}","json":"{\"operationId\":\"deleteMeeting\",\"parameters\":[{\"in\":\"path\",\"name\":\"meetingId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Deleted\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/meetings/{meetingId}","rename":{"param":{"meetingId":"id"}},"segments":[{"lit":"meetings"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"meeting_id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"PATCH /meetings/{meetingId}","json":"{\"operationId\":\"updateMeeting\",\"parameters\":[{\"in\":\"path\",\"name\":\"meetingId\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agenda\":{\"type\":\"string\"},\"duration\":{\"type\":\"integer\"},\"password\":{\"type\":\"string\"},\"settings\":{\"properties\":{\"host_video\":{\"type\":\"boolean\"},\"join_before_host\":{\"type\":\"boolean\"},\"mute_upon_entry\":{\"type\":\"boolean\"},\"participant_video\":{\"type\":\"boolean\"},\"waiting_room\":{\"type\":\"boolean\"}},\"type\":\"object\"},\"start_time\":{\"type\":\"string\"},\"timezone\":{\"type\":\"string\"},\"topic\":{\"type\":\"string\"},\"type\":{\"type\":\"integer\"}},\"required\":[\"topic\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"204\":{\"description\":\"Updated\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"definition\"}","source":"openapi3","version":1},"kind":"http","method":"PATCH","orig":"/meetings/{meetingId}","rename":{"param":{"meetingId":"id"}},"segments":[{"lit":"meetings"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[["user"]]},"key$":"meeting","name__orig":"meeting","Name":"Meeting","name_":"meeting","name-":"meeting","NAME":"MEETING","index$":0}, {"active":true,"entity":"meeting","key$":"BasicMeetingFlow","kind":"basic","name":"BasicMeetingFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"meeting_ref01"},"match":{"user_id":"user01"},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{"user_id":"user01"},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"meeting_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"meeting_ref01","srcdatavar":"meeting_ref01_data","suffix":"_up0","textfield":"agenda"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-meeting_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"meeting_ref01","srcdatavar":"meeting_ref01_data","suffix":"_dt0"},"match":{"id":"meeting01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-meeting_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"meeting_ref01","suffix":"_rm0"},"match":{"id":"meeting01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{"user_id":"user01"},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"meeting_ref01"}}],"index$":5}]}, 'Meeting')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const meeting_ref01_ent = client.Meeting()
    let meeting_ref01_data = setup.data.new.meeting['meeting_ref01']
    meeting_ref01_data['user_id'] = setup.idmap['user01']

    meeting_ref01_data = (await meeting_ref01_ent.create(meeting_ref01_data)).data()
    assert(null != meeting_ref01_data.id)


    // LIST
    const meeting_ref01_match = {}
    meeting_ref01_match['user_id'] = setup.idmap['user01']

    const meeting_ref01_list = (await meeting_ref01_ent.list(meeting_ref01_match)).map((e) => e.data())

    assert(!isempty(select(meeting_ref01_list, { id: meeting_ref01_data.id })))


    // UPDATE
    const meeting_ref01_data_up0 = {}
    meeting_ref01_data_up0.id = meeting_ref01_data.id

    const meeting_ref01_markdef_up0 = { name: 'agenda', value: 'Mark01-meeting_ref01_' + setup.now }
    meeting_ref01_data_up0 [meeting_ref01_markdef_up0.name] = meeting_ref01_markdef_up0.value

    const meeting_ref01_resdata_up0 = (await meeting_ref01_ent.update(meeting_ref01_data_up0)).data()
    assert(meeting_ref01_resdata_up0.id === meeting_ref01_data_up0.id)

    assert(meeting_ref01_resdata_up0[meeting_ref01_markdef_up0.name] === meeting_ref01_markdef_up0.value)


    // LOAD
    const meeting_ref01_match_dt0 = {}
    meeting_ref01_match_dt0.id = meeting_ref01_data.id
    const meeting_ref01_data_dt0 = (await meeting_ref01_ent.load(meeting_ref01_match_dt0)).data()
    assert(meeting_ref01_data_dt0.id === meeting_ref01_data.id)


    // REMOVE
    const meeting_ref01_match_rm0 = {}
    meeting_ref01_match_rm0.id = meeting_ref01_data.id
    await meeting_ref01_ent.remove(meeting_ref01_match_rm0)
  

    // LIST
    const meeting_ref01_match_rt0 = {}
    meeting_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const meeting_ref01_list_rt0 = (await meeting_ref01_ent.list(meeting_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(meeting_ref01_list_rt0, { id: meeting_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/meeting/MeetingTestData.json')

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
    ['meeting01','meeting02','meeting03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_MEETING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_MEETING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_MEETING_ENTID']
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
  
