

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


describe('QosEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Qos()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'qos.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"as_input":{"a":true,"h":"As Input","n":"as_input","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"as_input","index$":0},"as_output":{"a":true,"h":"As Output","n":"as_output","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"as_output","index$":1},"audio_input":{"a":true,"h":"Audio Input","n":"audio_input","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"audio_input","index$":2},"audio_output":{"a":true,"h":"Audio Output","n":"audio_output","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"audio_output","index$":3},"cpu_usage":{"a":true,"h":"Cpu Usage","n":"cpu_usage","r":false,"t":"`$ANY`","key$":"cpu_usage","index$":4},"date_time":{"a":true,"fo":"date-time","h":"Date Time","n":"date_time","r":false,"sh":"Datetime of QOS","t":"`$STRING`","key$":"date_time","index$":5},"next_page_token":{"a":true,"h":"Next Page Token","n":"next_page_token","r":false,"sh":"Next page token is used to paginate through large result sets.","t":"`$STRING`","key$":"next_page_token","index$":6},"page_count":{"a":true,"fo":"int64","h":"Page Count","n":"page_count","r":false,"sh":"The number of items returned on this page","t":"`$INTEGER`","key$":"page_count","index$":7},"page_size":{"a":true,"h":"Page Size","n":"page_size","r":false,"sh":"The number of items per page","t":"`$INTEGER`","key$":"page_size","index$":8},"participants":{"a":true,"h":"Participants","n":"participants","r":false,"sh":"Array of user objects","t":"`$ARRAY`","key$":"participants","index$":9},"total_records":{"a":true,"fo":"int64","h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":10},"video_input":{"a":true,"h":"Video Input","n":"video_input","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"video_input","index$":11},"video_output":{"a":true,"h":"Video Output","n":"video_output","r":false,"sh":"Quality of Service object","t":"`$OBJECT`","key$":"video_output","index$":12}},"name":"qos","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /metrics/meetings/{meetingId}/participants/qos","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/meetings/{meetingId}/participants/qos","q":{"exist":["meeting_id","next_page_token","page_size","type"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"metrics"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"participants"},{"lit":"qos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /metrics/webinars/{webinarId}/participants/qos","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":2}]},"k":"http","m":"GET","o":"/metrics/webinars/{webinarId}/participants/qos","q":{"exist":["next_page_token","page_size","type","webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"metrics"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"participants"},{"lit":"qos"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /metrics/meetings/{meetingId}/participants/{participantId}/qos","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"participant_id","or":"participant_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/metrics/meetings/{meetingId}/participants/{participantId}/qos","q":{"exist":["meeting_id","participant_id","type"]},"r":{"param":{"meetingId":"meeting_id","participantId":"participant_id"}},"s":[{"lit":"metrics"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"participants"},{"var":"participant_id"},{"lit":"qos"}],"t":{"req":"`reqdata`","res":"`body.user_qos`"},"index$":0},{"a":true,"co":{"id":"GET /metrics/webinars/{webinarId}/participants/{participantId}/qos","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"participant_id","or":"participant_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"GET","o":"/metrics/webinars/{webinarId}/participants/{participantId}/qos","q":{"exist":["participant_id","type","webinar_id"]},"r":{"param":{"participantId":"participant_id","webinarId":"webinar_id"}},"s":[{"lit":"metrics"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"participants"},{"var":"participant_id"},{"lit":"qos"}],"t":{"req":"`reqdata`","res":"`body.user_qos`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.meeting"],["$.main.kit.entity.webinar"],["$.main.kit.entity.meeting"],["$.main.kit.entity.webinar"]]},"key$":"qos","name__orig":"qos","Name":"Qos","name_":"qos","name-":"qos","NAME":"QOS","index$":19}, {"active":true,"entity":"qos","key$":"BasicQosFlow","kind":"basic","name":"BasicQosFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"webinar_id":"webinar01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"qos_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"qos_ref01","srcdatavar":"qos_ref01_data","suffix":"_dt0"},"m":{"id":"qos01","webinar_id":"webinar01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-qos_ref01"}}],"index$":1}]}, 'Qos', {"GET /metrics/meetings/{meetingId}/participants/qos":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0},{"in":"query","name":"type","description":"The meeting type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past meeting","live meeting"],"x-ref":"#/parameters/MeetingTypePast2","index$":1},{"in":"query","name":"page_size","description":"Number of items returned per page","type":"integer","default":1,"maximum":10,"x-ref":"#/parameters/PageSize4Qos","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":3}]},"GET /metrics/webinars/{webinarId}/participants/qos":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0},{"in":"query","name":"type","description":"The webinar type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past webinar","live webinar"],"x-ref":"#/parameters/WebinarTypePast2","index$":1},{"in":"query","name":"page_size","description":"Number of items returned per page","type":"integer","default":1,"maximum":10,"x-ref":"#/parameters/PageSize4Qos","index$":2},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":3}]},"GET /metrics/meetings/{meetingId}/participants/{participantId}/qos":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0},{"in":"path","name":"participantId","description":"Participant ID","type":"string","required":true,"x-ref":"#/parameters/ParticipantId","index$":1},{"in":"query","name":"type","description":"The meeting type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past meeting","live meeting"],"x-ref":"#/parameters/MeetingTypePast2","index$":2}]},"GET /metrics/webinars/{webinarId}/participants/{participantId}/qos":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0},{"in":"path","name":"participantId","description":"Participant ID","type":"string","required":true,"x-ref":"#/parameters/ParticipantId","index$":1},{"in":"query","name":"type","description":"The webinar type","type":"string","default":"live","enum":["past","live"],"x-enum-descriptions":["past webinar","live webinar"],"x-ref":"#/parameters/WebinarTypePast2","index$":2}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let qos_ref01_data = Object.values(setup.data.existing.qos)[0] as any

    // LIST
    const qos_ref01_ent = client.Qos()
    const qos_ref01_match: any = {}
    qos_ref01_match['webinar_id'] = setup.idmap['webinar01']

    const qos_ref01_list = (await qos_ref01_ent.list(qos_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/qos/QosTestData.json')

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
    ['qos01','qos02','qos03','meeting01','meeting02','meeting03','webinar01','webinar02','webinar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_QOS_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_QOS_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_QOS_ENTID']
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
  
