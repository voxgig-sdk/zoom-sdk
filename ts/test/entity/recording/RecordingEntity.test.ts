

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


describe('RecordingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Recording()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'recording.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"from":{"a":true,"fo":"date","h":"From","n":"from","r":false,"sh":"Start Date,","t":"`$STRING`","key$":"from","index$":0},"meetings":{"a":true,"h":"Meetings","n":"meetings","r":false,"sh":"List of Recording","t":"`$ARRAY`","key$":"meetings","index$":1},"next_page_token":{"a":true,"h":"Next Page Token","n":"next_page_token","r":false,"sh":"Next page token is used to paginate through large result sets.","t":"`$STRING`","key$":"next_page_token","index$":2},"page_count":{"a":true,"h":"Page Count","n":"page_count","r":false,"sh":"The number of items returned on this page","t":"`$INTEGER`","key$":"page_count","index$":3},"page_size":{"a":true,"h":"Page Size","n":"page_size","r":false,"sh":"The number of records returned within a single API call.","t":"`$INTEGER`","key$":"page_size","index$":4},"to":{"a":true,"fo":"date","h":"To","n":"to","r":false,"sh":"End Date","t":"`$STRING`","key$":"to","index$":5},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":6}},"name":"recording","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users/{userId}/recordings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"mc","or":"mc","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":2},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":4},{"a":true,"k":"query","n":"trash","or":"trash","r":false,"t":"`$ANY`","index$":5}]},"k":"http","m":"GET","o":"/users/{userId}/recordings","q":{"exist":["from","mc","next_page_token","page_size","to","trash","user_id"]},"r":{"param":{"userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"recordings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[["$.main.kit.entity.user"]]},"key$":"recording","name__orig":"recording","Name":"Recording","name_":"recording","name-":"recording","NAME":"RECORDING","index$":20}, {"active":true,"entity":"recording","key$":"BasicRecordingFlow","kind":"basic","name":"BasicRecordingFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"user_id":"user01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"recording_ref01"}}],"index$":0}]}, 'Recording', {"GET /users/{userId}/recordings":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":4},{"in":"query","name":"mc","description":"Query mc ","type":"string","default":"false","x-ref":"#/parameters/Mc","index$":5},{"in":"query","name":"trash","description":"Query trash ","type":"boolean","default":"false","x-ref":"#/parameters/Trash","index$":6}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let recording_ref01_data = Object.values(setup.data.existing.recording)[0] as any

    // LIST
    const recording_ref01_ent = client.Recording()
    const recording_ref01_match: any = {}
    recording_ref01_match['user_id'] = setup.idmap['user01']

    const recording_ref01_list = (await recording_ref01_ent.list(recording_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/recording/RecordingTestData.json')

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
    ['recording01','recording02','recording03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_RECORDING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_RECORDING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_RECORDING_ENTID']
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
  
