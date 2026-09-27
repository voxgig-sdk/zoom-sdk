

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


describe('WebinarPanelistListEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.WebinarPanelistList()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'webinar_panelist_list.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"panelists":{"a":true,"h":"Panelists","n":"panelists","r":false,"sh":"List of Panelist objects","t":"`$ARRAY`","key$":"panelists","index$":1},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"Total records","t":"`$INTEGER`","key$":"total_records","index$":2}},"id":{"field":"id","name":"id"},"name":"webinar_panelist_list","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /webinars/{webinarId}/panelists","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/webinars/{webinarId}/panelists","q":{"$action":"panelists","exist":["id"]},"r":{"param":{"webinarId":"id"}},"s":[{"lit":"webinars"},{"var":"id"},{"lit":"panelists"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"webinar_panelist_list","name__orig":"webinar_panelist_list","Name":"WebinarPanelistList","name_":"webinar_panelist_list","name-":"webinar-panelist-list","NAME":"WEBINAR_PANELIST_LIST","index$":33}, {"active":true,"entity":"webinar_panelist_list","key$":"BasicWebinarPanelistListFlow","kind":"basic","name":"BasicWebinarPanelistListFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"webinar_id":"webinar01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"webinar_panelist_list_ref01"}}],"index$":0}]}, 'WebinarPanelistList', {"GET /webinars/{webinarId}/panelists":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID","type":"integer","required":true,"x-ref":"#/parameters/WebinarId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let webinar_panelist_list_ref01_data = Object.values(setup.data.existing.webinar_panelist_list)[0] as any

    // LIST
    const webinar_panelist_list_ref01_ent = client.WebinarPanelistList()
    const webinar_panelist_list_ref01_match: any = {}
    webinar_panelist_list_ref01_match['webinar_id'] = setup.idmap['webinar01']

    const webinar_panelist_list_ref01_list = (await webinar_panelist_list_ref01_ent.list(webinar_panelist_list_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/webinar_panelist_list/WebinarPanelistListTestData.json')

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
    ['webinar_panelist_list01','webinar_panelist_list02','webinar_panelist_list03','webinar01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_WEBINAR_PANELIST_LIST_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_WEBINAR_PANELIST_LIST_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_WEBINAR_PANELIST_LIST_ENTID']
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
  
