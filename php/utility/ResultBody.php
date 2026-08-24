<?php
declare(strict_types=1);

// Zoom SDK utility: result_body

class ZoomResultBody
{
    public static function call(ZoomContext $ctx): ?ZoomResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
