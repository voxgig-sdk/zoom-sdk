<?php
declare(strict_types=1);

// Zoom SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ZoomMakeContext
{
    public static function call(array $ctxmap, ?ZoomContext $basectx): ZoomContext
    {
        return new ZoomContext($ctxmap, $basectx);
    }
}
