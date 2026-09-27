

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


describe('MeetingRegistrantListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.MeetingRegistrantList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'meeting_registrant_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"meeting_registrant_list","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /meetings/{meetingId}/registrants","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"occurrence_id","or":"occurrence_id","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$ANY`","index$":3}]},"k":"http","m":"GET","o":"/meetings/{meetingId}/registrants","q":{"$action":"registrants","exist":["id","occurrence_id","page_number","page_size","status"]},"r":{"param":{"meetingId":"id"}},"s":[{"lit":"meetings"},{"var":"id"},{"lit":"registrants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"meeting_registrant_list","name__orig":"meeting_registrant_list","Name":"MeetingRegistrantList","name_":"meeting_registrant_list","name-":"meeting-registrant-list","NAME":"MEETING_REGISTRANT_LIST","index$":16}, {"active":true,"entity":"meeting_registrant_list","key$":"BasicMeetingRegistrantListFlow","kind":"basic","name":"BasicMeetingRegistrantListFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"meeting_registrant_list_ref01","srcdatavar":"meeting_registrant_list_ref01_data","suffix":"_dt0"},"m":{"id":"meeting_registrant_list01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-meeting_registrant_list_ref01"}}],"index$":0}]}, 'MeetingRegistrantList', {"GET /meetings/{meetingId}/registrants":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID","type":"integer","required":true,"x-ref":"#/parameters/MeetingId","index$":0},{"in":"query","name":"occurrence_id","description":"The meeting occurrence ID","type":"string","x-ref":"#/parameters/OccurrenceId","index$":1},{"in":"query","name":"status","description":"The registrant status","type":"string","default":"approved","enum":["pending","approved","denied"],"x-enum-descriptions":["registrants status is pending","registrants status is approved","registrants status is denied"],"x-ref":"#/parameters/RegistrantStatus","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"page_number","description":"Current page number of returned records","type":"integer","default":1,"x-ref":"#/parameters/PageNumber","index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let meeting_registrant_list_ref01_data = Object.values(setup.data.existing.meeting_registrant_list)[0] as any

    // LOAD
    const meeting_registrant_list_ref01_ent = client.MeetingRegistrantList()
    const meeting_registrant_list_ref01_match_dt0: any = {}
    meeting_registrant_list_ref01_match_dt0.id = meeting_registrant_list_ref01_data.id
    const meeting_registrant_list_ref01_data_dt0 = (await meeting_registrant_list_ref01_ent.load(meeting_registrant_list_ref01_match_dt0)).data()
    assert(meeting_registrant_list_ref01_data_dt0.id === meeting_registrant_list_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/meeting_registrant_list/MeetingRegistrantListTestData.json')

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
    ['meeting_registrant_list01','meeting_registrant_list02','meeting_registrant_list03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_MEETING_REGISTRANT_LIST_ENTID']
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
  
