<?php
declare(strict_types=1);

// Zoom SDK base feature

class ZoomBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ZoomContext $ctx, array $options): void {}
    public function PostConstruct(ZoomContext $ctx): void {}
    public function PostConstructEntity(ZoomContext $ctx): void {}
    public function SetData(ZoomContext $ctx): void {}
    public function GetData(ZoomContext $ctx): void {}
    public function GetMatch(ZoomContext $ctx): void {}
    public function SetMatch(ZoomContext $ctx): void {}
    public function PrePoint(ZoomContext $ctx): void {}
    public function PreSpec(ZoomContext $ctx): void {}
    public function PreRequest(ZoomContext $ctx): void {}
    public function PreResponse(ZoomContext $ctx): void {}
    public function PreResult(ZoomContext $ctx): void {}
    public function PreDone(ZoomContext $ctx): void {}
    public function PreUnexpected(ZoomContext $ctx): void {}
}
