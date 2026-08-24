
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { ZoomSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ZoomSDK.test()
    equal(null !== testsdk, true)
  })

})
