

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ZoomSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DashboardEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Dashboard()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'dashboard.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"account_type":{"a":true,"h":"Account Type","n":"account_type","r":false,"sh":"Zoom Room email type","t":"`$STRING`","key$":"account_type","index$":0},"calender_name":{"a":true,"h":"Calender Name","n":"calender_name","r":false,"sh":"Zoom Calendar name","t":"`$STRING`","key$":"calender_name","index$":1},"camera":{"a":true,"h":"Camera","n":"camera","r":false,"sh":"Zoom Room camera","t":"`$STRING`","key$":"camera","index$":2},"crc_ports_usage":{"a":true,"h":"Crc Ports Usage","n":"crc_ports_usage","r":false,"t":"`$ARRAY`","key$":"crc_ports_usage","index$":3},"device_ip":{"a":true,"h":"Device Ip","n":"device_ip","r":false,"sh":"Zoom Room device IP","t":"`$STRING`","key$":"device_ip","index$":4},"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"Zoom Room email","t":"`$STRING`","key$":"email","index$":5},"from":{"a":true,"fo":"date","h":"From","n":"from","r":false,"sh":"Start date for this report","t":"`$STRING`","key$":"from","index$":6},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Zoom Room ID","t":"`$STRING`","key$":"id","index$":7},"last_start_time":{"a":true,"h":"Last Start Time","n":"last_start_time","r":false,"sh":"Zoom Room last start time","t":"`$STRING`","key$":"last_start_time","index$":8},"live_meeting":{"a":true,"h":"Live Meeting","n":"live_meeting","r":false,"sh":"Meeting metric details","t":"`$OBJECT`","key$":"live_meeting","index$":9},"meetings":{"a":true,"h":"Meetings","n":"meetings","r":false,"sh":"Array of meeting objects","t":"`$ARRAY`","key$":"meetings","index$":10},"microphone":{"a":true,"h":"Microphone","n":"microphone","r":false,"sh":"Zoom Room microphone","t":"`$STRING`","key$":"microphone","index$":11},"next_page_token":{"a":true,"h":"Next Page Token","n":"next_page_token","r":false,"sh":"Next page token is used to paginate through large result sets.","t":"`$STRING`","key$":"next_page_token","index$":12},"page_count":{"a":true,"h":"Page Count","n":"page_count","r":false,"sh":"The number of items returned on this page","t":"`$INTEGER`","key$":"page_count","index$":13},"page_size":{"a":true,"h":"Page Size","n":"page_size","r":false,"sh":"The number of records returned within a single API call.","t":"`$INTEGER`","key$":"page_size","index$":14},"participants":{"a":true,"h":"Participants","n":"participants","r":false,"sh":"Array of user objects","t":"`$ARRAY`","key$":"participants","index$":15},"past_meetings":{"a":true,"h":"Past Meetings","n":"past_meetings","r":false,"t":"`$OBJECT`","key$":"past_meetings","index$":16},"room_name":{"a":true,"h":"Room Name","n":"room_name","r":false,"sh":"Zoom Room name","t":"`$STRING`","key$":"room_name","index$":17},"speaker":{"a":true,"h":"Speaker","n":"speaker","r":false,"sh":"Zoom Room speaker","t":"`$STRING`","key$":"speaker","index$":18},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Zoom Room status","t":"`$STRING`","key$":"status","index$":19},"to":{"a":true,"fo":"date","h":"To","n":"to","r":false,"sh":"End date for this report","t":"`$STRING`","key$":"to","index$":20},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":21},"users":{"a":true,"h":"Users","n":"users","r":false,"t":"`$ARRAY`","key$":"users","index$":22},"webinars":{"a":true,"h":"Webinars","n":"webinars","r":false,"sh":"Array of webinar objects","t":"`$ARRAY`","key$":"webinars","index$":23}},"id":{"field":"id","name":"id"},"name":"dashboard","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /metrics/meetings","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":4}]},"k":"http","m":"GET","o":"/metrics/meetings","q":{"exist":["from","next_page_token","page_size","to","type"]},"r":{},"s":[{"lit":"metrics"},{"lit":"meetings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /metrics/webinars","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":4}]},"k":"http","m":"GET","o":"/metrics/webinars","q":{"exist":["from","next_page_token","page_size","to","type"]},"r":{},"s":[{"lit":"metrics"},{"lit":"webinars"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /metrics/im","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3}]},"k":"http","m":"GET","o":"/metrics/im","q":{"exist":["from","next_page_token","page_size","to"]},"r":{},"s":[{"lit":"metrics"},{"lit":"im"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /metrics/meetings/{meetingId}/participants","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/meetings/{meetingId}/participants","q":{"exist":["meeting_id","next_page_token","page_size","type"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"metrics"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"participants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /metrics/meetings/{meetingId}/participants/sharing","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/meetings/{meetingId}/participants/sharing","q":{"exist":["meeting_id","next_page_token","page_size","type"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"metrics"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"participants"},{"lit":"sharing"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /metrics/webinars/{webinarId}/participants","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/webinars/{webinarId}/participants","q":{"exist":["next_page_token","page_size","type","webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"metrics"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"participants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /metrics/webinars/{webinarId}/participants/sharing","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/webinars/{webinarId}/participants/sharing","q":{"exist":["next_page_token","page_size","type","webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"metrics"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"participants"},{"lit":"sharing"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":6},{"a":true,"co":{"id":"GET /metrics/crc","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":1}]},"k":"http","m":"GET","o":"/metrics/crc","q":{"exist":["from","to"]},"r":{},"s":[{"lit":"metrics"},{"lit":"crc"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":7}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /metrics/zoomrooms/{zoomroomId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"zoomroom_id","or":"zoomroom_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3}]},"k":"http","m":"GET","o":"/metrics/zoomrooms/{zoomroomId}","q":{"exist":["from","page_number","page_size","to","zoomroom_id"]},"r":{"param":{"zoomroomId":"zoomroom_id"}},"s":[{"lit":"metrics"},{"lit":"zoomrooms"},{"var":"zoomroom_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.meeting"],["$.main.kit.entity.webinar"]]},"key$":"dashboard","name__orig":"dashboard","Name":"Dashboard","name_":"dashboard","name-":"dashboard","NAME":"DASHBOARD","index$":5}, {"active":true,"entity":"dashboard","key$":"BasicDashboardFlow","kind":"basic","name":"BasicDashboardFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"dashboard_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"dashboard_ref01","srcdatavar":"dashboard_ref01_data","suffix":"_dt0"},"m":{"id":"dashboard01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-dashboard_ref01"}}],"index$":1}]}, 'Dashboard', {"GET /metrics/meetings":{"protocol":"http","parameters":[{"in":"query","name":"type","description":"The meeting type","type":"string","default":"live","enum":["past","pastOne","live"],"x-enum-descriptions":["past meetings","past one user meetings","live meetings"],"x-ref":"#/parameters/MeetingTypePast","index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":4}]},"GET /metrics/webinars":{"protocol":"http","parameters":[{"in":"query","name":"type","description":"The webinar type","type":"string","default":"live","enum":["past","pastOne","live"],"x-enum-descriptions":["past meetings","past one user meetings","live meetings"],"x-ref":"#/parameters/WebinarTypePast","index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":4}]},"GET /metrics/im":{"protocol":"http","parameters":[{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":0},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":1},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":3}]},"GET /metrics/meetings/{meetingId}/participants":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0},{"in":"query","name":"type","description":"The meeting type","type":"string","default":"live","enum":["past","pastOne","live"],"x-enum-descriptions":["past meeting","past one user meeting","live meeting"],"x-ref":"#/parameters/MeetingTypePast3","index$":1},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":3}]},"GET /metrics/meetings/{meetingId}/participants/sharing":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0},{"in":"query","name":"type","description":"The meeting type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past meeting","live meeting"],"x-ref":"#/parameters/MeetingTypePast2","index$":1},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/PageToken","index$":3}]},"GET /metrics/webinars/{webinarId}/participants":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0},{"in":"query","name":"type","description":"The webinar type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past webinar","live webinar"],"x-ref":"#/parameters/WebinarTypePast2","index$":1},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":3}]},"GET /metrics/webinars/{webinarId}/participants/sharing":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0},{"in":"query","name":"type","description":"The webinar type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past webinar","live webinar"],"x-ref":"#/parameters/WebinarTypePast2","index$":1},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/PageToken","index$":3}]},"GET /metrics/crc":{"protocol":"http","parameters":[{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":0},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":1}]},"GET /metrics/zoomrooms/{zoomroomId}":{"protocol":"http","parameters":[{"in":"path","name":"zoomroomId","description":"The Zoom Room ID","type":"string","required":true,"x-ref":"#/parameters/ZoomRoomId","index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"page_number","description":"Current page number of returned records","type":"integer","default":1,"x-ref":"#/parameters/PageNumber","index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let dashboard_ref01_data = Object.values(setup.data.existing.dashboard)[0] as any

    // LIST
    const dashboard_ref01_ent = client.Dashboard()
    const dashboard_ref01_match: any = {}

    const dashboard_ref01_list = (await dashboard_ref01_ent.list(dashboard_ref01_match)).map((e: any) => e.data())


    // LOAD
    const dashboard_ref01_match_dt0: any = {}
    dashboard_ref01_match_dt0.id = dashboard_ref01_data.id
    const dashboard_ref01_data_dt0 = (await dashboard_ref01_ent.load(dashboard_ref01_match_dt0)).data()
    assert(dashboard_ref01_data_dt0.id === dashboard_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/dashboard/DashboardTestData.json')

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
    ['dashboard01','dashboard02','dashboard03','meeting01','meeting02','meeting03','webinar01','webinar02','webinar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_DASHBOARD_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_DASHBOARD_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_DASHBOARD_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
