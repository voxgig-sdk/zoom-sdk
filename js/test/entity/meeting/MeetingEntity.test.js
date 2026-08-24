
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe } = require('node:test')
const assert = require('node:assert')


const { ZoomSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('MeetingEntity', async () => {

  test('instance', async () => {
    const testsdk = ZoomSDK.test()
    const ent = testsdk.Meeting()
    assert(null != ent)
  })


  test('basic', async () => {

    const setup = basicSetup()
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
    const meeting_ref01_match = {}
    meeting_ref01_match['user_id'] = setup.idmap['user01']

    const meeting_ref01_list = (await meeting_ref01_ent.list(meeting_ref01_match)).map((e) => e.data())

    assert(!isempty(select(meeting_ref01_list, { id: meeting_ref01_data.id })))


    // UPDATE
    const meeting_ref01_data_up0 = {}
    meeting_ref01_data_up0.id = meeting_ref01_data.id

    const meeting_ref01_markdef_up0 = { name: 'agenda', value: 'Mark01-meeting_ref01_' + setup.now }
    meeting_ref01_data_up0 [meeting_ref01_markdef_up0.name] = meeting_ref01_markdef_up0.value

    const meeting_ref01_resdata_up0 = (await meeting_ref01_ent.update(meeting_ref01_data_up0)).data()
    assert(meeting_ref01_resdata_up0.id === meeting_ref01_data_up0.id)

    assert(meeting_ref01_resdata_up0[meeting_ref01_markdef_up0.name] === meeting_ref01_markdef_up0.value)


    // LOAD
    const meeting_ref01_match_dt0 = {}
    meeting_ref01_match_dt0.id = meeting_ref01_data.id
    const meeting_ref01_data_dt0 = (await meeting_ref01_ent.load(meeting_ref01_match_dt0)).data()
    assert(meeting_ref01_data_dt0.id === meeting_ref01_data.id)


    // REMOVE
    const meeting_ref01_match_rm0 = {}
    meeting_ref01_match_rm0.id = meeting_ref01_data.id
    await meeting_ref01_ent.remove(meeting_ref01_match_rm0)
  

    // LIST
    const meeting_ref01_match_rt0 = {}
    meeting_ref01_match_rt0['user_id'] = setup.idmap['user01']

    const meeting_ref01_list_rt0 = (await meeting_ref01_ent.list(meeting_ref01_match_rt0)).map((e) => e.data())

    assert(isempty(select(meeting_ref01_list_rt0, { id: meeting_ref01_data.id })))


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

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

  const env = envOverride({
    'ZOOM_TEST_MEETING_ENTID': idmap,
    'ZOOM_TEST_LIVE': 'FALSE',
    'ZOOM_TEST_EXPLAIN': 'FALSE',
    'ZOOM_APIKEY': 'NONE',
  })

  idmap = env['ZOOM_TEST_MEETING_ENTID']

  if ('TRUE' === env.ZOOM_TEST_LIVE) {
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
    now: Date.now(),
  }

  return setup
}
  
