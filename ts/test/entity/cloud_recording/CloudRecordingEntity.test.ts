

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


describe('CloudRecordingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.CloudRecording()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ZOOM_TEST_LIVE
    for (const op of ['update', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cloud_recording.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0}},"id":{"field":"id","name":"id"},"name":"cloud_recording","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /meetings/{meetingId}/recordings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/meetings/{meetingId}/recordings","q":{"exist":["meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"patch":{"input":"data","name":"patch","points":[{"a":true,"co":{"id":"PATCH /meetings/{meetingId}/recordings/settings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"PATCH","o":"/meetings/{meetingId}/recordings/settings","q":{"exist":["body","meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"},{"lit":"settings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"patch"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /meetings/{meetingId}/recordings/{recordingId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"recording_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"action","or":"action","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"DELETE","o":"/meetings/{meetingId}/recordings/{recordingId}","q":{"exist":["action","id","meeting_id"]},"r":{"param":{"meetingId":"meeting_id","recordingId":"id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"DELETE /meetings/{meetingId}/recordings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"action","or":"action","r":false,"t":"`$ANY`","index$":0}]},"k":"http","m":"DELETE","o":"/meetings/{meetingId}/recordings","q":{"exist":["action","meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PUT /meetings/{meetingId}/recordings/{recordingId}/status","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"recording_id","or":"recording_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"PUT","o":"/meetings/{meetingId}/recordings/{recordingId}/status","q":{"$action":"status","exist":["body","meeting_id","recording_id"]},"r":{"param":{"meetingId":"meeting_id","recordingId":"recording_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"},{"var":"recording_id"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PUT /meetings/{meetingId}/recordings/status","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"PUT","o":"/meetings/{meetingId}/recordings/status","q":{"exist":["body","meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"meetings"},{"var":"meeting_id"},{"lit":"recordings"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.meeting"],["$.main.kit.entity.meeting","$.main.kit.entity.recording"]]},"key$":"cloud_recording","name__orig":"cloud_recording","Name":"CloudRecording","name_":"cloud_recording","name-":"cloud-recording","NAME":"CLOUD_RECORDING","index$":4}, {"active":true,"entity":"cloud_recording","key$":"BasicCloudRecordingFlow","kind":"basic","name":"BasicCloudRecordingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"cloud_recording_ref01","srcdatavar":"cloud_recording_ref01_data","suffix":"_up0"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cloud_recording_ref01"}}],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"cloud_recording_ref01","srcdatavar":"cloud_recording_ref01_data","suffix":"_dt0"},"m":{"id":"cloud_recording01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cloud_recording_ref01"}}],"index$":1}]}, 'CloudRecording', {"GET /meetings/{meetingId}/recordings":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0}]},"PATCH /meetings/{meetingId}/recordings/settings":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0},{"in":"body","name":"body","required":true,"description":"Meeting recording Settings","schema":{"title":"Recording settings","type":"object","properties":{"share_recording":{"description":"Determine if the meeting recording is shared","enum":["publicly","internally","none"],"key$":"share_recording","type":"string","x-enum-descriptions":["Publicly","Internally(account members only)","None"]},"viewer_download":{"description":"Host video","key$":"viewer_download","type":"boolean"},"password":{"description":"Password protect","key$":"password","type":"string"},"on_demand":{"description":"Registration required","key$":"on_demand","type":"boolean"},"approval_type":{"description":"Approval type","enum":[0,1,2],"key$":"approval_type","type":"integer","x-enum-descriptions":["Registrants can watch the recording directly after registration","Registrants will receive emails then watch the recording after you approve the registration","Disabled"]},"send_email_to_host":{"description":"Send an email to host when someone registers","key$":"send_email_to_host","type":"boolean"},"show_social_share_buttons":{"description":"Show social share buttons on registration page","key$":"show_social_share_buttons","type":"boolean"}},"x-ref":"#/definitions/RecordingSettings"},"index$":1}]},"DELETE /meetings/{meetingId}/recordings/{recordingId}":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0},{"in":"path","name":"recordingId","description":"The recording ID","type":"string","required":true,"x-ref":"#/parameters/RecordingId","index$":1},{"in":"query","name":"action","description":"The recording delete action","type":"string","default":"trash","enum":["trash","delete"],"x-enum-descriptions":["move recording to trash","delete recording permanently"],"x-ref":"#/parameters/RecordingDeleteAction","index$":2}]},"DELETE /meetings/{meetingId}/recordings":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0},{"in":"query","name":"action","description":"The recording delete action","type":"string","default":"trash","enum":["trash","delete"],"x-enum-descriptions":["move recording to trash","delete recording permanently"],"x-ref":"#/parameters/RecordingDeleteAction","index$":1}]},"PUT /meetings/{meetingId}/recordings/{recordingId}/status":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0},{"in":"path","name":"recordingId","description":"The recording ID","type":"string","required":true,"x-ref":"#/parameters/RecordingId","index$":1},{"in":"body","name":"body","required":true,"schema":{"properties":{"action":{"type":"string","enum":["recover"],"x-enum-descriptions":["recover meeting recording"]}}},"index$":2}]},"PUT /meetings/{meetingId}/recordings/status":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Recording","index$":0},{"in":"body","name":"body","required":true,"schema":{"properties":{"action":{"type":"string","enum":["recover"],"x-enum-descriptions":["recover meeting recording"]}}},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cloud_recording_ref01_data = Object.values(setup.data.existing.cloud_recording)[0] as any

    // UPDATE
    const cloud_recording_ref01_ent = client.CloudRecording()
    const cloud_recording_ref01_data_up0: any = {}
    cloud_recording_ref01_data_up0.id = cloud_recording_ref01_data.id

    const cloud_recording_ref01_resdata_up0 = (await cloud_recording_ref01_ent.update(cloud_recording_ref01_data_up0)).data()
    assert(cloud_recording_ref01_resdata_up0.id === cloud_recording_ref01_data_up0.id)


    // LOAD
    const cloud_recording_ref01_match_dt0: any = {}
    cloud_recording_ref01_match_dt0.id = cloud_recording_ref01_data.id
    const cloud_recording_ref01_data_dt0 = (await cloud_recording_ref01_ent.load(cloud_recording_ref01_match_dt0)).data()
    assert(cloud_recording_ref01_data_dt0.id === cloud_recording_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cloud_recording/CloudRecordingTestData.json')

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
    ['cloud_recording01','cloud_recording02','cloud_recording03','meeting01','meeting02','meeting03','recording01','recording02','recording03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_CLOUD_RECORDING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_CLOUD_RECORDING_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_CLOUD_RECORDING_ENTID']
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
  
