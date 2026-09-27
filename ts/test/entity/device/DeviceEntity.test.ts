

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


describe('DeviceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Device()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'device.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"devices":{"a":true,"h":"Devices","n":"devices","r":false,"sh":"List of H.323/SIP Device objects","t":"`$ARRAY`","key$":"devices","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"page_count":{"a":true,"h":"Page Count","n":"page_count","r":false,"sh":"The number of items returned on this page","t":"`$INTEGER`","key$":"page_count","index$":2},"page_number":{"a":true,"h":"Page Number","n":"page_number","r":false,"sh":"The page number of current results","t":"`$INTEGER`","key$":"page_number","index$":3},"page_size":{"a":true,"h":"Page Size","n":"page_size","r":false,"sh":"The number of records returned within a single API call","t":"`$INTEGER`","key$":"page_size","index$":4},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":5}},"id":{"field":"id","name":"id"},"name":"device","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /h323/devices","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"POST","o":"/h323/devices","q":{"exist":["body"]},"r":{},"s":[{"lit":"h323"},{"lit":"devices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /h323/devices","source":"swagger2","version":2},"g":{},"k":"http","m":"GET","o":"/h323/devices","q":{},"r":{},"s":[{"lit":"h323"},{"lit":"devices"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /h323/devices/{deviceId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"DELETE","o":"/h323/devices/{deviceId}","q":{"exist":["id"]},"r":{"param":{"deviceId":"id"}},"s":[{"lit":"h323"},{"lit":"devices"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /h323/devices/{deviceId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"device_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"PATCH","o":"/h323/devices/{deviceId}","q":{"exist":["body","id"]},"r":{"param":{"deviceId":"id"}},"s":[{"lit":"h323"},{"lit":"devices"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"device","name__orig":"device","Name":"Device","name_":"device","name-":"device","NAME":"DEVICE","index$":6}, {"active":true,"entity":"device","key$":"BasicDeviceFlow","kind":"basic","name":"BasicDeviceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"device_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"device_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"device_ref01","srcdatavar":"device_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-device_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"device_ref01","suffix":"_rm0"},"m":{"id":"device01"},"o":"remove","s":[],"v":[],"index$":3},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"device_ref01"}}],"index$":4}]}, 'Device', {"POST /h323/devices":{"protocol":"http","parameters":[{"in":"body","name":"body","required":true,"description":"H.323/SIP Device","schema":{"type":"object","title":"The H.323/SIP device object.","description":"The H.323/SIP device object.","required":["name","protocol","ip","encryption"],"properties":{"name":{"description":"Device name","maxLength":64,"type":"string"},"protocol":{"description":"Device protocol","enum":["H.323","SIP"],"type":"string","x-enum-descriptions":["H.323","SIP"]},"ip":{"description":"Device Ip","type":"string"},"encryption":{"description":"Device encryption","enum":["auto","yes","no"],"type":"string","x-enum-descriptions":["auto","yes","no"]}},"x-ref":"#/definitions/Device"},"index$":0}]},"GET /h323/devices":{"protocol":"http","parameters":[]},"DELETE /h323/devices/{deviceId}":{"protocol":"http","parameters":[{"in":"path","name":"deviceId","description":"The device ID","type":"string","required":true,"x-ref":"#/parameters/DeviceId","index$":0}]},"PATCH /h323/devices/{deviceId}":{"protocol":"http","parameters":[{"in":"path","name":"deviceId","description":"The device ID","type":"string","required":true,"x-ref":"#/parameters/DeviceId","index$":0},{"in":"body","name":"body","required":true,"schema":{"type":"object","title":"The H.323/SIP device object.","description":"The H.323/SIP device object.","required":["name","protocol","ip","encryption"],"properties":{"name":{"description":"Device name","maxLength":64,"type":"string"},"protocol":{"description":"Device protocol","enum":["H.323","SIP"],"type":"string","x-enum-descriptions":["H.323","SIP"]},"ip":{"description":"Device Ip","type":"string"},"encryption":{"description":"Device encryption","enum":["auto","yes","no"],"type":"string","x-enum-descriptions":["auto","yes","no"]}},"x-ref":"#/definitions/Device"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const device_ref01_ent = client.Device()
    let device_ref01_data = setup.data.new.device['device_ref01']

    device_ref01_data = (await device_ref01_ent.create(device_ref01_data)).data()
    assert(null != device_ref01_data.id)


    // LIST
    const device_ref01_match: any = {}

    const device_ref01_list = (await device_ref01_ent.list(device_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(device_ref01_list, { id: device_ref01_data.id })))


    // UPDATE
    const device_ref01_data_up0: any = {}
    device_ref01_data_up0.id = device_ref01_data.id

    const device_ref01_resdata_up0 = (await device_ref01_ent.update(device_ref01_data_up0)).data()
    assert(device_ref01_resdata_up0.id === device_ref01_data_up0.id)


    // REMOVE
    const device_ref01_match_rm0: any = { id: device_ref01_data.id }
    await device_ref01_ent.remove(device_ref01_match_rm0)
  

    // LIST
    const device_ref01_match_rt0: any = {}

    const device_ref01_list_rt0 = (await device_ref01_ent.list(device_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(device_ref01_list_rt0, { id: device_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/device/DeviceTestData.json')

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
    ['device01','device02','device03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_DEVICE_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_DEVICE_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_DEVICE_ENTID']
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
  
