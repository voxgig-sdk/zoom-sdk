

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


describe('MeetingInvitationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.MeetingInvitation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'meeting_invitation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"invitation":{"a":true,"h":"Invitation","n":"invitation","r":false,"sh":"Meeting invitation","t":"`$STRING`","key$":"invitation","index$":1}},"id":{"field":"id","name":"id"},"name":"meeting_invitation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /meetings/{meetingId}/invitation","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/meetings/{meetingId}/invitation","q":{"exist":["id"]},"r":{"param":{"meetingId":"id"}},"s":[{"lit":"meetings"},{"var":"id"},{"lit":"invitation"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"meeting_invitation","name__orig":"meeting_invitation","Name":"MeetingInvitation","name_":"meeting_invitation","name-":"meeting-invitation","NAME":"MEETING_INVITATION","index$":15}, {"active":true,"entity":"meeting_invitation","key$":"BasicMeetingInvitationFlow","kind":"basic","name":"BasicMeetingInvitationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"meeting_invitation_ref01","srcdatavar":"meeting_invitation_ref01_data","suffix":"_dt0"},"m":{"id":"meeting_invitation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-meeting_invitation_ref01"}}],"index$":0}]}, 'MeetingInvitation', {"GET /meetings/{meetingId}/invitation":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID","type":"integer","required":true,"x-ref":"#/parameters/MeetingId","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let meeting_invitation_ref01_data = Object.values(setup.data.existing.meeting_invitation)[0] as any

    // LOAD
    const meeting_invitation_ref01_ent = client.MeetingInvitation()
    const meeting_invitation_ref01_match_dt0: any = {}
    meeting_invitation_ref01_match_dt0.id = meeting_invitation_ref01_data.id
    const meeting_invitation_ref01_data_dt0 = (await meeting_invitation_ref01_ent.load(meeting_invitation_ref01_match_dt0)).data()
    assert(meeting_invitation_ref01_data_dt0.id === meeting_invitation_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/meeting_invitation/MeetingInvitationTestData.json')

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
    ['meeting_invitation01','meeting_invitation02','meeting_invitation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_MEETING_INVITATION_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_MEETING_INVITATION_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_MEETING_INVITATION_ENTID']
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
  
