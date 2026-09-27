
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


describe('TspEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
  afterEach(liveDelay('ZOOM_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Tsp()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"Country Code","t":"`$STRING`","key$":"code","index$":0},"conference_code":{"a":true,"h":"Conference Code","n":"conference_code","r":true,"sh":"Conference code, numeric value, length is less than 16.","t":"`$STRING`","key$":"conference_code","index$":1},"dial_in_numbers":{"a":true,"h":"Dial In Numbers","n":"dial_in_numbers","r":true,"sh":"List of Dial In Numbers","t":"`$ARRAY`","key$":"dial_in_numbers","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"leader_pin":{"a":true,"h":"Leader Pin","n":"leader_pin","r":true,"sh":"Leader PIN, numeric value, length is less than 16.","t":"`$STRING`","key$":"leader_pin","index$":4},"number":{"a":true,"h":"Number","n":"number","r":false,"sh":"Dial-in number, length is less than 16","t":"`$STRING`","key$":"number","index$":5},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$STRING`","key$":"type","index$":6}},"id":{"field":"id","name":"id"},"name":"tsp","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /users/{userId}/tsp","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"POST","o":"/users/{userId}/tsp","q":{"exist":["body","user_id"]},"r":{"param":{"userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"tsp"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /users/{userId}/tsp","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/users/{userId}/tsp","q":{"exist":["user_id"]},"r":{"param":{"userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"tsp"}],"t":{"req":"`reqdata`","res":"`body.tsp_accounts`"},"index$":0},{"a":true,"co":{"id":"GET /tsp","source":"swagger2","version":2},"g":{},"k":"http","m":"GET","o":"/tsp","q":{},"r":{},"s":[{"lit":"tsp"}],"t":{"req":"`reqdata`","res":"`body.dial_in_numbers`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /users/{userId}/tsp/{tspId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tsp_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/users/{userId}/tsp/{tspId}","q":{"exist":["id","user_id"]},"r":{"param":{"tspId":"id","userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"tsp"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"a":true,"co":{"id":"DELETE /users/{userId}/tsp/{tspId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tsp_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":1}]},"k":"http","m":"DELETE","o":"/users/{userId}/tsp/{tspId}","q":{"exist":["id","user_id"]},"r":{"param":{"tspId":"id","userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"tsp"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"a":true,"co":{"id":"PATCH /users/{userId}/tsp/{tspId}","source":"swagger2","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"tsp_id","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"param","n":"user_id","or":"user_id","r":true,"t":"`$STRING`","index$":1}],"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$OBJECT`","index$":0}]},"k":"http","m":"PATCH","o":"/users/{userId}/tsp/{tspId}","q":{"exist":["body","id","user_id"]},"r":{"param":{"tspId":"id","userId":"user_id"}},"s":[{"lit":"users"},{"var":"user_id"},{"lit":"tsp"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"PATCH /tsp","source":"swagger2","version":2},"g":{"query":[{"a":true,"k":"query","n":"body","or":"body","r":true,"t":"`$ANY`","index$":0}]},"k":"http","m":"PATCH","o":"/tsp","q":{"exist":["body"]},"r":{},"s":[{"lit":"tsp"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"update"}},"relations":{"ancestors":[["$.main.kit.entity.user"]]},"key$":"tsp","name__orig":"tsp","Name":"Tsp","name_":"tsp","name-":"tsp","NAME":"TSP","index$":24}, {"active":true,"entity":"tsp","key$":"BasicTspFlow","kind":"basic","name":"BasicTspFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"tsp_ref01"},"m":{"user_id":"user01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"tsp_ref01"}}],"index$":1},{"a":true,"d":{},"i":{"ref":"tsp_ref01","srcdatavar":"tsp_ref01_data","suffix":"_up0","textfield":"code"},"m":{},"o":"update","s":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tsp_ref01"}}],"v":[],"index$":2},{"a":true,"d":{},"i":{"ref":"tsp_ref01","srcdatavar":"tsp_ref01_data","suffix":"_dt0"},"m":{"id":"tsp01","user_id":"user01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-tsp_ref01"}}],"index$":3},{"a":true,"d":{},"i":{"ref":"tsp_ref01","suffix":"_rm0"},"m":{"id":"tsp01","user_id":"user01"},"o":"remove","s":[],"v":[],"index$":4},{"a":true,"d":{},"i":{"suffix":"_rt0"},"m":{},"o":"list","s":[],"v":[{"apply":"ItemNotExists","def":{"ref":"tsp_ref01"}}],"index$":5}]}, 'Tsp', {"POST /users/{userId}/tsp":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"in":"body","name":"body","required":true,"description":"TSP Account","schema":{"type":"object","title":"TSP Accounts List","description":"List of TSP Accounts","required":["conference_code","leader_pin"],"properties":{"conference_code":{"description":"Conference code, numeric value, length is less than 16.","maxLength":16,"minLength":1,"type":"string","key$":"conference_code"},"leader_pin":{"description":"Leader PIN, numeric value, length is less than 16.","maxLength":16,"minLength":1,"type":"string","key$":"leader_pin"},"dial_in_numbers":{"description":"List of Dial In Numbers","items":{"properties":{"code":{"description":"Country Code","maxLength":6,"type":"string"},"country_label":{"description":"Country Label, if passed, will display in place of code.","maxLength":10,"type":"string"},"number":{"description":"Dial-in number, length is less than 16.","maxLength":16,"minLength":1,"type":"string"},"type":{"description":"Dial-in number type.","enum":["toll","tollfree","media_link"],"type":"string","x-enum-descriptions":["Toll number <br/>","Toll free number <br/>","Media link phone number <br/>"]}}},"required":["number"],"type":"array","key$":"dial_in_numbers"}},"x-ref":"#/definitions/TSP"},"index$":1}]},"GET /users/{userId}/tsp":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0}]},"GET /tsp":{"protocol":"http","parameters":[]},"GET /users/{userId}/tsp/{tspId}":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"name":"tspId","description":"TSP account index","in":"path","type":"string","required":true,"x-ref":"#/parameters/TSPId","index$":1}]},"DELETE /users/{userId}/tsp/{tspId}":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"name":"tspId","description":"TSP account index","in":"path","type":"string","required":true,"x-ref":"#/parameters/TSPId","index$":1}]},"PATCH /users/{userId}/tsp/{tspId}":{"protocol":"http","parameters":[{"in":"path","name":"userId","description":"The user ID or email address","type":"string","required":true,"x-ref":"#/parameters/UserId","index$":0},{"name":"tspId","description":"TSP account index","in":"path","type":"string","required":true,"x-ref":"#/parameters/TSPId","index$":1},{"in":"body","name":"body","required":true,"description":"TSP Account","schema":{"type":"object","title":"TSP Accounts List","description":"List of TSP Accounts","required":["conference_code","leader_pin"],"properties":{"conference_code":{"description":"Conference code, numeric value, length is less than 16.","maxLength":16,"minLength":1,"type":"string","key$":"conference_code"},"leader_pin":{"description":"Leader PIN, numeric value, length is less than 16.","maxLength":16,"minLength":1,"type":"string","key$":"leader_pin"},"dial_in_numbers":{"description":"List of Dial In Numbers","items":{"properties":{"code":{"description":"Country Code","maxLength":6,"type":"string"},"country_label":{"description":"Country Label, if passed, will display in place of code.","maxLength":10,"type":"string"},"number":{"description":"Dial-in number, length is less than 16.","maxLength":16,"minLength":1,"type":"string"},"type":{"description":"Dial-in number type.","enum":["toll","tollfree","media_link"],"type":"string","x-enum-descriptions":["Toll number <br/>","Toll free number <br/>","Media link phone number <br/>"]}}},"required":["number"],"type":"array","key$":"dial_in_numbers"}},"x-ref":"#/definitions/TSP"},"index$":2}]},"PATCH /tsp":{"protocol":"http","parameters":[{"in":"body","name":"body","required":true,"description":"TSP Account","schema":{"properties":{"tsp_provider":{"type":"string","description":"3rd party audio conferencing provider"},"enable":{"type":"boolean","description":"Enable 3rd party audio conferencing for account users"}}},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const tsp_ref01_ent = client.Tsp()
    let tsp_ref01_data = setup.data.new.tsp['tsp_ref01']
    tsp_ref01_data['user_id'] = setup.idmap['user01']

    tsp_ref01_data = (await tsp_ref01_ent.create(tsp_ref01_data)).data()
    assert(null != tsp_ref01_data.id)


    // LIST
    const tsp_ref01_match = {}

    const tsp_ref01_list = (await tsp_ref01_ent.list(tsp_ref01_match)).map((e) => e.data())

    assert(!isempty(select(tsp_ref01_list, { id: tsp_ref01_data.id })))


    // UPDATE
    const tsp_ref01_data_up0 = {}
    tsp_ref01_data_up0.id = tsp_ref01_data.id

    const tsp_ref01_markdef_up0 = { name: 'code', value: 'Mark01-tsp_ref01_' + setup.now }
    tsp_ref01_data_up0 [tsp_ref01_markdef_up0.name] = tsp_ref01_markdef_up0.value

    const tsp_ref01_resdata_up0 = (await tsp_ref01_ent.update(tsp_ref01_data_up0)).data()
    assert(tsp_ref01_resdata_up0.id === tsp_ref01_data_up0.id)

    assert(tsp_ref01_resdata_up0[tsp_ref01_markdef_up0.name] === tsp_ref01_markdef_up0.value)


    // LOAD
    const tsp_ref01_match_dt0 = {}
    tsp_ref01_match_dt0.id = tsp_ref01_data.id
    const tsp_ref01_data_dt0 = (await tsp_ref01_ent.load(tsp_ref01_match_dt0)).data()
    assert(tsp_ref01_data_dt0.id === tsp_ref01_data.id)


    // REMOVE
    const tsp_ref01_match_rm0 = {}
    tsp_ref01_match_rm0.id = tsp_ref01_data.id
    await tsp_ref01_ent.remove(tsp_ref01_match_rm0)
  

    // LIST
    const tsp_ref01_match_rt0 = {}

    const tsp_ref01_list_rt0 = (await tsp_ref01_ent.list(tsp_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(tsp_ref01_list_rt0, { id: tsp_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/tsp/TspTestData.json')

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
    ['tsp01','tsp02','tsp03','user01','user02','user03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ZOOM_TEST_TSP_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': '',
  })

  idmap = env['ZOOM_TEST_TSP_ENTID']

  const live = 'TRUE' === env.ZOOM_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ZOOM_TEST_TSP_ENTID']
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
  
