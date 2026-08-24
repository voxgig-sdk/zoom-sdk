<?php
declare(strict_types=1);

// Zoom SDK utility: prepare_body

class ZoomPrepareBody
{
    public static function call(ZoomContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
