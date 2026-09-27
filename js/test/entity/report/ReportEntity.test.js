
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { ZoomSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('ReportEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Report()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"duration":{"a":true,"h":"Duration","n":"duration","r":false,"sh":"Meeting duration","t":"`$INTEGER`","key$":"duration","index$":0},"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"Participant email","t":"`$STRING`","key$":"email","index$":1},"end_time":{"a":true,"fo":"date-time","h":"End Time","n":"end_time","r":false,"sh":"Meeting end time","t":"`$STRING`","key$":"end_time","index$":2},"from":{"a":true,"fo":"date","h":"From","n":"from","r":false,"sh":"Start date for this report","t":"`$STRING`","key$":"from","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Meeting ID","t":"`$INTEGER`","key$":"id","index$":4},"meetings":{"a":true,"h":"Meetings","n":"meetings","r":false,"sh":"Array of meeting objects","t":"`$ARRAY`","key$":"meetings","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Participant display name","t":"`$STRING`","key$":"name","index$":6},"next_page_token":{"a":true,"h":"Next Page Token","n":"next_page_token","r":false,"sh":"Next page token is used to paginate through large result sets.","t":"`$STRING`","key$":"next_page_token","index$":7},"page_count":{"a":true,"h":"Page Count","n":"page_count","r":false,"sh":"The number of items returned on this page","t":"`$INTEGER`","key$":"page_count","index$":8},"page_size":{"a":true,"h":"Page Size","n":"page_size","r":false,"sh":"The number of records returned within a single API call.","t":"`$INTEGER`","key$":"page_size","index$":9},"participants":{"a":true,"h":"Participants","n":"participants","r":false,"sh":"Array of meeting participant objects","t":"`$ARRAY`","key$":"participants","index$":10},"participants_count":{"a":true,"h":"Participants Count","n":"participants_count","r":false,"sh":"Number of meeting participants","t":"`$INTEGER`","key$":"participants_count","index$":11},"question_details":{"a":true,"h":"Question Details","n":"question_details","r":false,"sh":"Array of questions from user","t":"`$ARRAY`","key$":"question_details","index$":12},"start_time":{"a":true,"fo":"date-time","h":"Start Time","n":"start_time","r":false,"sh":"Meeting start time","t":"`$STRING`","key$":"start_time","index$":13},"to":{"a":true,"fo":"date","h":"To","n":"to","r":false,"sh":"End date for this report","t":"`$STRING`","key$":"to","index$":14},"topic":{"a":true,"h":"Topic","n":"topic","r":false,"sh":"Meeting topic","t":"`$STRING`","key$":"topic","index$":15},"total_minutes":{"a":true,"h":"Total Minutes","n":"total_minutes","r":false,"sh":"Number of meeting minutes","t":"`$INTEGER`","key$":"total_minutes","index$":16},"total_records":{"a":true,"h":"Total Records","n":"total_records","r":false,"sh":"The number of all records available across pages","t":"`$INTEGER`","key$":"total_records","index$":17},"tracking_fields":{"a":true,"h":"Tracking Fields","n":"tracking_fields","r":false,"sh":"Tracking fields","t":"`$ARRAY`","key$":"tracking_fields","index$":18},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Meeting type","t":"`$INTEGER`","key$":"type","index$":19},"user_email":{"a":true,"h":"User Email","n":"user_email","r":false,"sh":"User email","t":"`$STRING`","key$":"user_email","index$":20},"user_name":{"a":true,"h":"User Name","n":"user_name","r":false,"sh":"User display name","t":"`$STRING`","key$":"user_name","index$":21},"uuid":{"a":true,"fo":"uuid","h":"Uuid","n":"uuid","r":false,"sh":"Meeting UUID","t":"`$STRING`","key$":"uuid","index$":22}},"id":{"field":"id","name":"id"},"name":"report","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /report/users/{userId}/meetings","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3}]},"k":"http","m":"GET","o":"/report/users/{userId}/meetings","q":{"exist":["from","next_page_token","page_size","to","user_id"]},"r":{"param":{"userId":"user_id"}},"s":[{"lit":"report"},{"lit":"users"},{"var":"user_id"},{"lit":"meetings"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /report/telephone","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":4}]},"k":"http","m":"GET","o":"/report/telephone","q":{"$action":"telephone","exist":["from","page_number","page_size","to","type"]},"r":{},"s":[{"lit":"report"},{"lit":"telephone"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1},{"a":true,"co":{"id":"GET /report/users","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_number","or":"page_number","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":3},{"a":true,"k":"query","n":"type","or":"type","r":false,"t":"`$ANY`","index$":4}]},"k":"http","m":"GET","o":"/report/users","q":{"$action":"user","exist":["from","page_number","page_size","to","type"]},"r":{},"s":[{"lit":"report"},{"lit":"users"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":2},{"a":true,"co":{"id":"GET /report/meetings/{meetingId}/participants","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/report/meetings/{meetingId}/participants","q":{"exist":["meeting_id","next_page_token","page_size"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"report"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"participants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":3},{"a":true,"co":{"id":"GET /report/webinars/{webinarId}/participants","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"next_page_token","or":"next_page_token","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"page_size","or":"page_size","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/report/webinars/{webinarId}/participants","q":{"exist":["next_page_token","page_size","webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"report"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"participants"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":4},{"a":true,"co":{"id":"GET /report/cloud_recording","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"from","or":"from","r":true,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"to","or":"to","r":true,"t":"`$ANY`","index$":1}]},"k":"http","m":"GET","o":"/report/cloud_recording","q":{"$action":"cloud_recording","exist":["from","to"]},"r":{},"s":[{"lit":"report"},{"lit":"cloud_recording"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":5},{"a":true,"co":{"id":"GET /report/daily","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"month","or":"month","r":false,"t":"`$ANY`","index$":0},{"a":true,"k":"query","n":"year","or":"year","r":false,"t":"`$ANY`","index$":1}]},"k":"http","m":"GET","o":"/report/daily","q":{"$action":"daily","exist":["month","year"]},"r":{},"s":[{"lit":"report"},{"lit":"daily"}],"t":{"req":"`reqdata`","res":"`body.dates`"},"index$":6},{"a":true,"co":{"id":"GET /report/meetings/{meetingId}/polls","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/report/meetings/{meetingId}/polls","q":{"exist":["meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"report"},{"lit":"meetings"},{"var":"meeting_id"},{"lit":"polls"}],"t":{"req":"`reqdata`","res":"`body.questions`"},"index$":7},{"a":true,"co":{"id":"GET /report/webinars/{webinarId}/polls","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/report/webinars/{webinarId}/polls","q":{"exist":["webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"report"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"polls"}],"t":{"req":"`reqdata`","res":"`body.questions`"},"index$":8},{"a":true,"co":{"id":"GET /report/webinars/{webinarId}/qa","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/report/webinars/{webinarId}/qa","q":{"exist":["webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"report"},{"lit":"webinars"},{"var":"webinar_id"},{"lit":"qa"}],"t":{"req":"`reqdata`","res":"`body.questions`"},"index$":9}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /report/meetings/{meetingId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"meeting_id","or":"meeting_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/report/meetings/{meetingId}","q":{"exist":["meeting_id"]},"r":{"param":{"meetingId":"meeting_id"}},"s":[{"lit":"report"},{"lit":"meetings"},{"var":"meeting_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /report/webinars/{webinarId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"webinar_id","or":"webinar_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/report/webinars/{webinarId}","q":{"exist":["webinar_id"]},"r":{"param":{"webinarId":"webinar_id"}},"s":[{"lit":"report"},{"lit":"webinars"},{"var":"webinar_id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[["$.main.kit.entity.meeting"],["$.main.kit.entity.user"],["$.main.kit.entity.webinar"]]},"key$":"report","name__orig":"report","Name":"Report","name_":"report","name-":"report","NAME":"REPORT","index$":22}, {"active":true,"entity":"report","key$":"BasicReportFlow","kind":"basic","name":"BasicReportFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"webinar_id":"webinar01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"report_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"report_ref01","srcdatavar":"report_ref01_data","suffix":"_dt0"},"m":{"id":"report01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-report_ref01"}}],"index$":1}]}, 'Report', {"GET /report/users/{userId}/meetings":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":4}]},"GET /report/telephone":{"protocol":"http","parameters":[{"in":"query","name":"type","description":"Audio type","type":"string","enum":[1],"x-enum-descriptions":["Toll-free Call-in & Call-out"],"default":1,"index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"page_number","description":"Current page number of returned records","type":"integer","default":1,"x-ref":"#/parameters/PageNumber","index$":4}]},"GET /report/users":{"protocol":"http","parameters":[{"in":"query","name":"type","description":"Active hosts or inactive hosts","type":"string","enum":["active","inactive"],"x-enum-descriptions":["Active hosts","Inactive hosts"],"index$":0},{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":1},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":2},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":3},{"in":"query","name":"page_number","description":"Current page number of returned records","type":"integer","default":1,"x-ref":"#/parameters/PageNumber","index$":4}]},"GET /report/meetings/{meetingId}/participants":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":1},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":2}]},"GET /report/webinars/{webinarId}/participants":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0},{"in":"query","name":"page_size","description":"The number of records returned within a single API call","type":"integer","default":30,"maximum":300,"x-ref":"#/parameters/PageSize","index$":1},{"in":"query","name":"next_page_token","description":"Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.","type":"string","x-ref":"#/parameters/NextPageToken","index$":2}]},"GET /report/cloud_recording":{"protocol":"http","parameters":[{"in":"query","name":"from","description":"Start Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/FromDate","index$":0},{"in":"query","name":"to","description":"End Date","type":"string","format":"date","required":true,"x-ref":"#/parameters/ToDate","index$":1}]},"GET /report/daily":{"protocol":"http","parameters":[{"in":"query","name":"year","description":"Year for this report","type":"integer","index$":0},{"in":"query","name":"month","description":"Month for this report","type":"integer","index$":1}]},"GET /report/meetings/{meetingId}/polls":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0}]},"GET /report/webinars/{webinarId}/polls":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0}]},"GET /report/webinars/{webinarId}/qa":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0}]},"GET /report/meetings/{meetingId}":{"protocol":"http","parameters":[{"in":"path","name":"meetingId","description":"The meeting ID or meeting UUID. If given meeting ID, will take the last meeting instance.","type":"string","required":true,"x-ref":"#/parameters/MeetingId4Metrics","index$":0}]},"GET /report/webinars/{webinarId}":{"protocol":"http","parameters":[{"in":"path","name":"webinarId","description":"The webinar ID or webinar UUID. If given webinar ID, will take the last webinar instance.","type":"string","required":true,"x-ref":"#/parameters/WebinarId4Metrics","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let report_ref01_data = Object.values(setup.data.existing.report)[0]

    // LIST
    const report_ref01_ent = client.Report()
    const report_ref01_match = {}
    report_ref01_match['webinar_id'] = setup.idmap['webinar01']

    const report_ref01_list = (await report_ref01_ent.list(report_ref01_match)).map((e) => e.data())


    // LOAD
    const report_ref01_match_dt0 = {}
    report_ref01_match_dt0.id = report_ref01_data.id
    const report_ref01_data_dt0 = (await report_ref01_ent.load(report_ref01_match_dt0)).data()
    assert(report_ref01_data_dt0.id === report_ref01_data.id)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/report/ReportTestData.json')

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
    ['report01','report02','report03','meeting01','meeting02','meeting03','user01','user02','user03','webinar01','webinar02','webinar03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_REPORT_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_REPORT_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_REPORT_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
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
  
