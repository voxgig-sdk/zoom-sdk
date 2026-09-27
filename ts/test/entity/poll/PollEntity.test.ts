

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


describe('PollEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Poll()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'poll.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"polls":{"a":true,"h":"Polls","n":"polls","r":false,"sh":"Array of Polls","t":"`$ARRAY`","key$":"polls","index$":0},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":1}},"name":"poll","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /meetings/{meetingId}/polls","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/meetings/{meetingId}/polls","q":{"exist":["meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"polls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /webinars/{webinarId}/polls","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/webinars/{webinarId}/polls","q":{"exist":["webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"webinars"},{"var":"webinar_id"},{"lit":"polls"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.meeting"],["$.main.kit.entity.webinar"]]},"key$":"poll","name__orig":"poll","Name":"Poll","name_":"poll","name-":"poll","NAME":"POLL","index$":18}, {"active":true,"entity":"poll","key$":"BasicPollFlow","kind":"basic","name":"BasicPollFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"webinar_id":"webinar01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"poll_ref01"}}],"index$":0}]}, 'Poll', {"GET /meetings/{meetingId}/polls":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID","type":"integer","required":true,"x-ref":"#/parameters/MeetingId","index$":0}]},"GET /webinars/{webinarId}/polls":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID","type":"integer","required":true,"x-ref":"#/parameters/WebinarId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let poll_ref01_data = Object.values(setup.data.existing.poll)[0] as any

    // LIST
    const poll_ref01_ent = client.Poll()
    const poll_ref01_match: any = {}
    poll_ref01_match['webinar_id'] = setup.idmap['webinar01']

    const poll_ref01_list = (await poll_ref01_ent.list(poll_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/poll/PollTestData.json')

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
    ['poll01','poll02','poll03','meeting01','meeting02','meeting03','webinar01','webinar02','webinar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_POLL_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_POLL_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_POLL_ENTID']
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
  
