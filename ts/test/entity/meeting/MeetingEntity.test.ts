
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ZoomSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (maybeSkipControl(t, 'entityOp', 'meeting.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ZOOM_TEST_MEETING_ENTID JSON to run live')
      return
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
    const meeting_ref01_match: any = {}
    meeting_ref01_match['user_id'] = setup.idmap['user01']

    const meeting_ref01_list = (await meeting_ref01_ent.list(meeting_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(meeting_ref01_list, { id: meeting_ref01_data.id })))


    // UPDATE
    const meeting_ref01_data_up0: any = {}
    meeting_ref01_data_up0.id = meeting_ref01_data.id

    const meeting_ref01_markdef_up0 = { name: 'agenda', value: 'Mark01-meeting_ref01_' + setup.now }
    ;(meeting_ref01_data_up0 as any)[meeting_ref01_markdef_up0.name] = meeting_ref01_markdef_up0.value

    const meeting_ref01_resdata_up0 = (await meeting_ref01_ent.update(meeting_ref01_data_up0)).data()
    assert(meeting_ref01_resdata_up0.id === meeting_ref01_data_up0.id)

    assert((meeting_ref01_resdata_up0 as any)[meeting_ref01_markdef_up0.name] === meeting_ref01_markdef_up0.value)


    // LOAD
    const meeting_ref01_match_dt0: any = {}
    meeting_ref01_match_dt0.id = meeting_ref01_data.id
    const meeting_ref01_data_dt0 = (await meeting_ref01_ent.load(meeting_ref01_match_dt0)).data()
    assert(meeting_ref01_data_dt0.id === meeting_ref01_data.id)


    // REMOVE
    const meeting_ref01_match_rm0: any = { id: meeting_ref01_data.id }
    await meeting_ref01_ent.remove(meeting_ref01_match_rm0)
  

    // LIST
    const meeting_ref01_match_rt0: any = {}
    meeting_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const meeting_ref01_list_rt0 = (await meeting_ref01_ent.list(meeting_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(meeting_ref01_list_rt0, { id: meeting_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['ZOOM_TEST_MEETING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ZOOM_TEST_MEETING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': 'NONE',
  })

  idmap = env['ZOOM_TEST_MEETING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  if (live) {
    client = new ZoomSDK(merge([
      {
        apikey: env.ZOOM_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
