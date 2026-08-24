<?php
declare(strict_types=1);

// Zoom SDK exists test

require_once __DIR__ . '/../zoom_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ZoomSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
