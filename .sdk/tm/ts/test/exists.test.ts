
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ZoomSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ZoomSDK.test()
    equal(null !== testsdk, true)
  })

})
