# Zoom SDK feature factory

from zoom_sdk.feature.base_feature import ZoomBaseFeature
from zoom_sdk.feature.debug_feature import ZoomDebugFeature
from zoom_sdk.feature.idempotency_feature import ZoomIdempotencyFeature
from zoom_sdk.feature.metrics_feature import ZoomMetricsFeature
from zoom_sdk.feature.paging_feature import ZoomPagingFeature
from zoom_sdk.feature.ratelimit_feature import ZoomRatelimitFeature
from zoom_sdk.feature.retry_feature import ZoomRetryFeature
from zoom_sdk.feature.test_feature import ZoomTestFeature
from zoom_sdk.feature.timeout_feature import ZoomTimeoutFeature


_FEATURES = {
    "base": lambda: ZoomBaseFeature(),
    "debug": lambda: ZoomDebugFeature(),
    "idempotency": lambda: ZoomIdempotencyFeature(),
    "metrics": lambda: ZoomMetricsFeature(),
    "paging": lambda: ZoomPagingFeature(),
    "ratelimit": lambda: ZoomRatelimitFeature(),
    "retry": lambda: ZoomRetryFeature(),
    "test": lambda: ZoomTestFeature(),
    "timeout": lambda: ZoomTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
