

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


describe('WebinarInstanceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.WebinarInstance()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webinar_instance.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"webinars":{"a":true,"h":"Webinars","n":"webinars","r":false,"sh":"List of ended webinar instances.","t":"`$ARRAY`","key$":"webinars","index$":0}},"name":"webinar_instance","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /past_webinars/{webinarId}/instances","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"past_webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/past_webinars/{webinarId}/instances","q":{"exist":["past_webinar_id"]},"r":{"param":{"webinarId":"past_webinar_id"}},"s":[{"lit":"past_webinars"},{"var":"past_webinar_id"},{"lit":"instances"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"webinar_instance","name__orig":"webinar_instance","Name":"WebinarInstance","name_":"webinar_instance","name-":"webinar-instance","NAME":"WEBINAR_INSTANCE","index$":32}, {"active":true,"entity":"webinar_instance","key$":"BasicWebinarInstanceFlow","kind":"basic","name":"BasicWebinarInstanceFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"past_webinar_id":"past_webinar01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webinar_instance_ref01"}}],"index$":0}]}, 'WebinarInstance', {"GET /past_webinars/{webinarId}/instances":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID","type":"integer","required":true,"x-ref":"#/parameters/WebinarId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let webinar_instance_ref01_data = Object.values(setup.data.existing.webinar_instance)[0] as any

    // LIST
    const webinar_instance_ref01_ent = client.WebinarInstance()
    const webinar_instance_ref01_match: any = {}
    webinar_instance_ref01_match['past_webinar_id'] = setup.idmap['past_webinar01']

    const webinar_instance_ref01_list = (await webinar_instance_ref01_ent.list(webinar_instance_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webinar_instance/WebinarInstanceTestData.json')

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
    ['webinar_instance01','webinar_instance02','webinar_instance03','past_webinar01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_WEBINAR_INSTANCE_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_WEBINAR_INSTANCE_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_WEBINAR_INSTANCE_ENTID']
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
  
