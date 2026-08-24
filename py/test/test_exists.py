# Zoom SDK exists test

import pytest
from zoom_sdk import ZoomSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ZoomSDK.test(None, None)
        assert testsdk is not None
