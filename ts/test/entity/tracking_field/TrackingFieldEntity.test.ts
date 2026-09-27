

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


describe('TrackingFieldEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.TrackingField()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'tracking_field.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"field":{"a":true,"h":"Field","n":"field","r":false,"sh":"Tracking Field Name","t":"`$STRING`","key$":"field","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Tracking Field ID","t":"`$STRING`","key$":"id","index$":1},"recommended_values":{"a":true,"h":"Recommended Values","n":"recommended_values","r":false,"sh":"Array of recommended values","t":"`$ARRAY`","key$":"recommended_values","index$":2},"required":{"a":true,"h":"Required","n":"required","r":false,"sh":"Tracking Field Required","t":"`$BOOLEAN`","key$":"required","index$":3},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":4},"tracking_fields":{"a":true,"h":"Tracking Fields","n":"tracking_fields","r":false,"sh":"Array of Tracking Fields","t":"`$ARRAY`","key$":"tracking_fields","index$":5},"visible":{"a":true,"h":"Visible","n":"visible","r":false,"sh":"Tracking Field Visible","t":"`$BOOLEAN`","key$":"visible","index$":6}},"id":{"field":"id","name":"id"},"name":"tracking_field","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /v2/tracking_fields","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"POST","o":"/v2/tracking_fields","q":{"exist":["body"]},"r":{},"s":[{"lit":"v2"},{"lit":"tracking_fields"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/tracking_fields","source":"swagger2","version":2},"g":{},"k":"http","m":"GET","o":"/v2/tracking_fields","q":{},"r":{},"s":[{"lit":"v2"},{"lit":"tracking_fields"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /v2/tracking_fields/{fieldId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"field_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/v2/tracking_fields/{fieldId}","q":{"exist":["id"]},"r":{"param":{"fieldId":"id"}},"s":[{"lit":"v2"},{"lit":"tracking_fields"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /v2/tracking_fields/{fieldId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"field_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/v2/tracking_fields/{fieldId}","q":{"exist":["id"]},"r":{"param":{"fieldId":"id"}},"s":[{"lit":"v2"},{"lit":"tracking_fields"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /v2/tracking_fields/{fieldId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"field_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"PATCH","o":"/v2/tracking_fields/{fieldId}","q":{"exist":["body","id"]},"r":{"param":{"fieldId":"id"}},"s":[{"lit":"v2"},{"lit":"tracking_fields"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"tracking_field","name__orig":"tracking_field","Name":"TrackingField","name_":"tracking_field","name-":"tracking-field","NAME":"TRACKING_FIELD","index$":23}, {"active":true,"entity":"tracking_field","key$":"BasicTrackingFieldFlow","kind":"basic","name":"BasicTrackingFieldFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"tracking_field_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tracking_field_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"tracking_field_ref01","srcdatavar":"tracking_field_ref01_data","suffix":"_up0","textfield":"field"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tracking_field_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"tracking_field_ref01","srcdatavar":"tracking_field_ref01_data","suffix":"_dt0"},"m":{"id":"tracking_field01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tracking_field_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"tracking_field_ref01","suffix":"_rm0"},"m":{"id":"tracking_field01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"tracking_field_ref01"}}],"index$":5}]}, 'TrackingField', {"POST /v2/tracking_fields":{"protocol":"http","parameters":[{"in":"body","name":"body","required":true,"description":"Tracking Field","schema":{"type":"object","title":"Tracking Field","description":"Tracking Field","properties":{"field":{"description":"Tracking Field Name","type":"string","key$":"field"},"required":{"description":"Tracking Field Required","type":"boolean","key$":"required"},"visible":{"description":"Tracking Field Visible","type":"boolean","key$":"visible"},"recommended_values":{"description":"Array of recommended values","items":{"type":"string"},"type":"array","key$":"recommended_values"}},"x-ref":"#/definitions/TrackingField"},"index$":0}]},"GET /v2/tracking_fields":{"protocol":"http","parameters":[]},"GET /v2/tracking_fields/{fieldId}":{"protocol":"http","parameters":[{"in":"path","name":"fieldId","description":"The Tracking Field ID","type":"string","required":true,"index$":0}]},"DELETE /v2/tracking_fields/{fieldId}":{"protocol":"http","parameters":[{"in":"path","name":"fieldId","description":"The Tracking Field ID","type":"string","required":true,"index$":0}]},"PATCH /v2/tracking_fields/{fieldId}":{"protocol":"http","parameters":[{"in":"path","name":"fieldId","description":"The Tracking Field ID","type":"string","required":true,"index$":0},{"in":"body","name":"body","required":true,"schema":{"type":"object","title":"Tracking Field","description":"Tracking Field","properties":{"field":{"description":"Tracking Field Name","type":"string","key$":"field"},"required":{"description":"Tracking Field Required","type":"boolean","key$":"required"},"visible":{"description":"Tracking Field Visible","type":"boolean","key$":"visible"},"recommended_values":{"description":"Array of recommended values","items":{"type":"string"},"type":"array","key$":"recommended_values"}},"x-ref":"#/definitions/TrackingField"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const tracking_field_ref01_ent = client.TrackingField()
    let tracking_field_ref01_data = setup.data.new.tracking_field['tracking_field_ref01']

    tracking_field_ref01_data = (await tracking_field_ref01_ent.create(tracking_field_ref01_data)).data()
    assert(null != tracking_field_ref01_data.id)


    // LIST
    const tracking_field_ref01_match: any = {}

    const tracking_field_ref01_list = (await tracking_field_ref01_ent.list(tracking_field_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(tracking_field_ref01_list, { id: tracking_field_ref01_data.id })))


    // UPDATE
    const tracking_field_ref01_data_up0: any = {}
    tracking_field_ref01_data_up0.id = tracking_field_ref01_data.id

    const tracking_field_ref01_markdef_up0 = { name: 'field', value: 'Mark01-tracking_field_ref01_' + setup.now }
    ;(tracking_field_ref01_data_up0 as any)[tracking_field_ref01_markdef_up0.name] = tracking_field_ref01_markdef_up0.value

    const tracking_field_ref01_resdata_up0 = (await tracking_field_ref01_ent.update(tracking_field_ref01_data_up0)).data()
    assert(tracking_field_ref01_resdata_up0.id === tracking_field_ref01_data_up0.id)

    assert((tracking_field_ref01_resdata_up0 as any)[tracking_field_ref01_markdef_up0.name] === tracking_field_ref01_markdef_up0.value)


    // LOAD
    const tracking_field_ref01_match_dt0: any = {}
    tracking_field_ref01_match_dt0.id = tracking_field_ref01_data.id
    const tracking_field_ref01_data_dt0 = (await tracking_field_ref01_ent.load(tracking_field_ref01_match_dt0)).data()
    assert(tracking_field_ref01_data_dt0.id === tracking_field_ref01_data.id)


    // REMOVE
    const tracking_field_ref01_match_rm0: any = { id: tracking_field_ref01_data.id }
    await tracking_field_ref01_ent.remove(tracking_field_ref01_match_rm0)
  

    // LIST
    const tracking_field_ref01_match_rt0: any = {}

    const tracking_field_ref01_list_rt0 = (await tracking_field_ref01_ent.list(tracking_field_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(tracking_field_ref01_list_rt0, { id: tracking_field_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/tracking_field/TrackingFieldTestData.json')

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
    ['tracking_field01','tracking_field02','tracking_field03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_TRACKING_FIELD_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_TRACKING_FIELD_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_TRACKING_FIELD_ENTID']
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
  
