<?php
declare(strict_types=1);

// Typed models for the Zoom SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Meeting entity data model. */
class Meeting
{
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?int $duration = null;
    public ?string $host_id = null;
    public ?bool $host_video = null;
    public ?int $id = null;
    public ?bool $join_before_host = null;
    public ?string $join_url = null;
    public ?bool $mute_upon_entry = null;
    public ?bool $participant_video = null;
    public ?string $password = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public string $topic;
    public ?int $type = null;
    public ?string $uuid = null;
    public ?bool $waiting_room = null;
}

/** Request payload for Meeting#load. */
class MeetingLoadMatch
{
    public int $id;
}

/** Request payload for Meeting#list. */
class MeetingListMatch
{
    public string $user_id;
}

/** Request payload for Meeting#create. */
class MeetingCreateData
{
    public string $user_id;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?int $duration = null;
    public ?string $host_id = null;
    public ?bool $host_video = null;
    public ?int $id = null;
    public ?bool $join_before_host = null;
    public ?string $join_url = null;
    public ?bool $mute_upon_entry = null;
    public ?bool $participant_video = null;
    public ?string $password = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public string $topic;
    public ?int $type = null;
    public ?string $uuid = null;
    public ?bool $waiting_room = null;
}

/** Request payload for Meeting#update. */
class MeetingUpdateData
{
    public int $id;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?int $duration = null;
    public ?string $host_id = null;
    public ?bool $host_video = null;
    public ?bool $join_before_host = null;
    public ?string $join_url = null;
    public ?bool $mute_upon_entry = null;
    public ?bool $participant_video = null;
    public ?string $password = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $topic = null;
    public ?int $type = null;
    public ?string $uuid = null;
    public ?bool $waiting_room = null;
}

/** Request payload for Meeting#remove. */
class MeetingRemoveMatch
{
    public int $id;
}

