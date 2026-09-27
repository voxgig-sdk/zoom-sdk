
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ZoomSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ZoomSDK.test()
    equal(testsdk instanceof ZoomSDK, true,
      'ZoomSDK.test() must return a client synchronously')
  })

})
