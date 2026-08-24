# Zoom SDK utility: make_context

from projectname_sdk.core.context import ZoomContext


def make_context_util(ctxmap, basectx):
    return ZoomContext(ctxmap, basectx)
