# Zoom PHP SDK



The PHP SDK for the Zoom API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Account()` — with named operations (`list`/`load`/`create`/`update`/`remove`/`patch`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/zoom-sdk/releases](https://github.com/voxgig-sdk/zoom-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'zoom_sdk.php';

$client = new ZoomSDK([
    "apikey" => getenv("ZOOM_APIKEY"),
]);
```

### 2. List account records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $accounts = $client->Account()->list();
    foreach ($accounts as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["accounts"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a billing

Billing is nested under account, so provide the `account_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Billing record (throws on error).
    $billing = $client->Billing()->load(["account_id" => "example_account_id"]);
    print_r($billing->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created Account record.
$created = $client->Account()->create(["body" => []]);

// Update — index the record via data_get() ($created->data_get()["id"]).
$client->Account()->update(["id" => $created->data_get()["id"], "body" => [], "accounts" => []]);

// Remove
$client->Account()->remove(["id" => $created->data_get()["id"]]);
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $usersetting = $client->UserSetting()->load(["id" => "example_id"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ZoomSDK::test([
    "entity" => ["webhook" => ["test01" => ["id" => "test01"]]],
]);

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$webhook = $client->Webhook()->list();
print_r(array_map(fn($item) => $item->data_get(), $webhook));
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ZoomSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ZOOM_TEST_LIVE=TRUE
ZOOM_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ZoomSDK

```php
require_once 'zoom_sdk.php';
$client = new ZoomSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ZoomSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ZoomSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Account` | `($data): AccountEntity` | Create an Account entity instance. |
| `AccountPlan` | `($data): AccountPlanEntity` | Create an AccountPlan entity instance. |
| `AccountSetting` | `($data): AccountSettingEntity` | Create an AccountSetting entity instance. |
| `Billing` | `($data): BillingEntity` | Create a Billing entity instance. |
| `CloudRecording` | `($data): CloudRecordingEntity` | Create a CloudRecording entity instance. |
| `Dashboard` | `($data): DashboardEntity` | Create a Dashboard entity instance. |
| `Device` | `($data): DeviceEntity` | Create a Device entity instance. |
| `DomainsList` | `($data): DomainsListEntity` | Create a DomainsList entity instance. |
| `Group` | `($data): GroupEntity` | Create a Group entity instance. |
| `GroupMemberList` | `($data): GroupMemberListEntity` | Create a GroupMemberList entity instance. |
| `ImChat` | `($data): ImChatEntity` | Create an ImChat entity instance. |
| `ImGroup` | `($data): ImGroupEntity` | Create an ImGroup entity instance. |
| `ImGroupList` | `($data): ImGroupListEntity` | Create an ImGroupList entity instance. |
| `Meeting` | `($data): MeetingEntity` | Create a Meeting entity instance. |
| `MeetingInstance` | `($data): MeetingInstanceEntity` | Create a MeetingInstance entity instance. |
| `MeetingInvitation` | `($data): MeetingInvitationEntity` | Create a MeetingInvitation entity instance. |
| `MeetingRegistrantList` | `($data): MeetingRegistrantListEntity` | Create a MeetingRegistrantList entity instance. |
| `Pac` | `($data): PacEntity` | Create a Pac entity instance. |
| `Poll` | `($data): PollEntity` | Create a Poll entity instance. |
| `Qos` | `($data): QosEntity` | Create a Qos entity instance. |
| `Recording` | `($data): RecordingEntity` | Create a Recording entity instance. |
| `RecordingSetting` | `($data): RecordingSettingEntity` | Create a RecordingSetting entity instance. |
| `Report` | `($data): ReportEntity` | Create a Report entity instance. |
| `TrackingField` | `($data): TrackingFieldEntity` | Create a TrackingField entity instance. |
| `Tsp` | `($data): TspEntity` | Create a Tsp entity instance. |
| `User` | `($data): UserEntity` | Create an User entity instance. |
| `UserAssistantsList` | `($data): UserAssistantsListEntity` | Create an UserAssistantsList entity instance. |
| `UserPermission` | `($data): UserPermissionEntity` | Create an UserPermission entity instance. |
| `UserSchedulersList` | `($data): UserSchedulersListEntity` | Create an UserSchedulersList entity instance. |
| `UserSetting` | `($data): UserSettingEntity` | Create an UserSetting entity instance. |
| `Webhook` | `($data): WebhookEntity` | Create a Webhook entity instance. |
| `Webinar` | `($data): WebinarEntity` | Create a Webinar entity instance. |
| `WebinarInstance` | `($data): WebinarInstanceEntity` | Create a WebinarInstance entity instance. |
| `WebinarPanelistList` | `($data): WebinarPanelistListEntity` | Create a WebinarPanelistList entity instance. |
| `WebinarRegistrantList` | `($data): WebinarRegistrantListEntity` | Create a WebinarRegistrantList entity instance. |
| `ZoomRoomList` | `($data): ZoomRoomListEntity` | Create a ZoomRoomList entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Account

| Field | Description |
| --- | --- |
| `accounts` | List of Account objects |
| `id` |  |
| `meeting_connectors` | Meeting Connector, multiple values separated by comma |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `pay_mode` | Payee |
| `room_connectors` | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | Enable Share Meeting Connector |
| `share_rc` | Enable Share Virtual Room Connector |
| `total_records` | The number of all records available across pages |

Operations: Create, List, Load, Remove, Update.

API path: `/accounts`

#### AccountPlan

| Field | Description |
| --- | --- |
| `id` |  |
| `plan_audio` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | Account base plan object |
| `plan_large_meeting` | Additional Large Meeting Plans |
| `plan_recording` | Additional Cloud Recording Plan |
| `plan_room_connector` | Account plan object |
| `plan_webinar` | Additional Webinar Plans |
| `plan_zoom_rooms` | Account plan object |

Operations: Create, List.

API path: `/accounts/{accountId}/plans`

#### AccountSetting

| Field | Description |
| --- | --- |
| `email_notification` | Account Settings: Notification |
| `feature` | Account Settings: Feature |
| `id` |  |
| `in_meeting` | Account Settings: In Meeting |
| `integration` | Account Settings: Integration |
| `recording` | Account Settings: Recording |
| `schedule_meting` | Account Settings: Schedule Meeting |
| `security` | Account Settings: Security |
| `telephony` | Account Settings: Telephony |
| `zoom_rooms` | Account Settings: Zoom Rooms |

Operations: Load.

API path: `/accounts/{accountId}/settings`

#### Billing

| Field | Description |
| --- | --- |
| `address` | Billing Contact's address |
| `apt` | Billing Contact's apartment/suite |
| `city` | Billing Contact's city |
| `country` | Billing Contact's country |
| `email` | Billing Contact's email address |
| `first_name` | Billing Contact's first name |
| `last_name` | Billing Contact's last name |
| `phone_number` | Billing Contact's phone number |
| `state` | Billing Contact's state |
| `zip` | Billing Contact's zip/postal code |

Operations: Create, Load, Patch, Update.

API path: `/accounts/{accountId}/plans/addons`

#### CloudRecording

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load, Patch, Remove, Update.

API path: `/meetings/{meetingId}/recordings`

#### Dashboard

| Field | Description |
| --- | --- |
| `account_type` | Zoom Room email type |
| `calender_name` | Zoom Calendar name |
| `camera` | Zoom Room camera |
| `crc_ports_usage` |  |
| `device_ip` | Zoom Room device IP |
| `email` | Zoom Room email |
| `from` | Start date for this report |
| `id` | Zoom Room ID |
| `last_start_time` | Zoom Room last start time |
| `live_meeting` | Meeting metric details |
| `meetings` | Array of meeting objects |
| `microphone` | Zoom Room microphone |
| `next_page_token` | Next page token is used to paginate through large result sets. |
| `page_count` | The number of items returned on this page |
| `page_size` | The number of records returned within a single API call. |
| `participants` | Array of user objects |
| `past_meetings` |  |
| `room_name` | Zoom Room name |
| `speaker` | Zoom Room speaker |
| `status` | Zoom Room status |
| `to` | End date for this report |
| `total_records` | The number of all records available across pages |
| `users` |  |
| `webinars` | Array of webinar objects |

Operations: List, Load.

API path: `/metrics/meetings`

#### Device

| Field | Description |
| --- | --- |
| `devices` | List of H.323/SIP Device objects |
| `id` |  |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |

Operations: Create, List, Remove, Update.

API path: `/h323/devices`

#### DomainsList

| Field | Description |
| --- | --- |
| `domain` | Domain Name |
| `status` | Domain Status |

Operations: List.

API path: `/accounts/{accountId}/managed_domains`

#### Group

| Field | Description |
| --- | --- |
| `id` | Group ID |
| `name` | Group name |
| `total_members` | Total number of members in this group |

Operations: Create, List, Load, Remove, Update.

API path: `/groups/{groupId}/members`

#### GroupMemberList

| Field | Description |
| --- | --- |
| `id` |  |
| `members` | List of Group member objects |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |

Operations: List.

API path: `/groups/{groupId}/members`

#### ImChat

| Field | Description |
| --- | --- |
| `from` | Start date |
| `messages` | Array of session objects |
| `next_page_token` | Next page token, used to paginate through large result sets. |
| `page_size` | The amount of records returns within a single API call. |
| `session_id` | IM Chat session ID |
| `sessions` | Array of session objects |
| `to` | End date |

Operations: List, Load.

API path: `/im/chat/sessions`

#### ImGroup

| Field | Description |
| --- | --- |
| `id` | Group ID |

Operations: Create, Load, Remove, Update.

API path: `/im/groups/{groupId}/members`

#### ImGroupList

| Field | Description |
| --- | --- |
| `groups` | List of Group objects |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |

Operations: List.

API path: `/im/groups`

#### Meeting

| Field | Description |
| --- | --- |
| `agenda` | Agenda |
| `created_at` | Create time |
| `duration` | Meeting duration |
| `email` | User email |
| `end_time` | Meeting end time |
| `h323_password` | H.323/SIP room system password |
| `has_3rd_party_audio` |  |
| `has_pstn` |  |
| `has_recording` |  |
| `has_screen_share` |  |
| `has_sip` |  |
| `has_video` |  |
| `has_voip` |  |
| `host` | User display name |
| `host_id` | ID of the user set as host of meeting |
| `id` | Meeting Poll ID |
| `join_url` | Join url |
| `meetings` | List of Meeting objects |
| `next_page_token` | Next page token is used to paginate through large result sets. |
| `occurrences` | Array of occurrence objects |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `participants` | Meeting participant count |
| `participants_count` | Number of meeting participants |
| `password` | Meeting password |
| `questions` | Array of Polls |
| `settings` | Meeting Settings |
| `start_time` | Meeting start time |
| `start_url` | Start url |
| `status` | Status of the Meeting Poll |
| `timezone` | Timezone to format start_time |
| `title` | Poll Title |
| `topic` | Meeting topic |
| `total_minutes` | Number of meeting minutes |
| `total_records` | The number of all records available across pages |
| `tracking_fields` | Tracking fields |
| `type` | Meeting Type |
| `user_email` | User email |
| `user_name` | User display name |
| `user_type` | User type |
| `uuid` | Meeting UUID |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/meetings/{meetingId}/registrants`

#### MeetingInstance

| Field | Description |
| --- | --- |
| `meetings` | List of ended meeting instances. |

Operations: List.

API path: `/past_meetings/{meetingId}/instances`

#### MeetingInvitation

| Field | Description |
| --- | --- |
| `id` |  |
| `invitation` | Meeting invitation |

Operations: Load.

API path: `/meetings/{meetingId}/invitation`

#### MeetingRegistrantList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/meetings/{meetingId}/registrants`

#### Pac

| Field | Description |
| --- | --- |
| `conference_id` | Conference ID |
| `dedicated_dial_in_number` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | List of Global Dial In Numbers |
| `listen_only_password` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | Participant Password, numeric value, length is less than 6 |

Operations: List.

API path: `/users/{userId}/pac`

#### Poll

| Field | Description |
| --- | --- |
| `polls` | Array of Polls |
| `total_records` | The number of all records available across pages |

Operations: List.

API path: `/meetings/{meetingId}/polls`

#### Qos

| Field | Description |
| --- | --- |
| `as_input` | Quality of Service object |
| `as_output` | Quality of Service object |
| `audio_input` | Quality of Service object |
| `audio_output` | Quality of Service object |
| `cpu_usage` |  |
| `date_time` | Datetime of QOS |
| `next_page_token` | Next page token is used to paginate through large result sets. |
| `page_count` | The number of items returned on this page |
| `page_size` | The number of items per page |
| `participants` | Array of user objects |
| `total_records` | The number of all records available across pages |
| `video_input` | Quality of Service object |
| `video_output` | Quality of Service object |

Operations: List, Load.

API path: `/metrics/meetings/{meetingId}/participants/qos`

#### Recording

| Field | Description |
| --- | --- |
| `from` | Start Date, |
| `meetings` | List of Recording |
| `next_page_token` | Next page token is used to paginate through large result sets. |
| `page_count` | The number of items returned on this page |
| `page_size` | The number of records returned within a single API call. |
| `to` | End Date |
| `total_records` | The number of all records available across pages |

Operations: List.

API path: `/users/{userId}/recordings`

#### RecordingSetting

| Field | Description |
| --- | --- |
| `approval_type` | Approval type |
| `on_demand` | Registration required |
| `password` | Password protect |
| `send_email_to_host` | Send an email to host when someone registers |
| `share_recording` | Determine if the meeting recording is shared |
| `show_social_share_buttons` | Show social share buttons on registration page |
| `viewer_download` | Host video |

Operations: Load.

API path: `/meetings/{meetingId}/recordings/settings`

#### Report

| Field | Description |
| --- | --- |
| `duration` | Meeting duration |
| `email` | Participant email |
| `end_time` | Meeting end time |
| `from` | Start date for this report |
| `id` | Meeting ID |
| `meetings` | Array of meeting objects |
| `name` | Participant display name |
| `next_page_token` | Next page token is used to paginate through large result sets. |
| `page_count` | The number of items returned on this page |
| `page_size` | The number of records returned within a single API call. |
| `participants` | Array of meeting participant objects |
| `participants_count` | Number of meeting participants |
| `question_details` | Array of questions from user |
| `start_time` | Meeting start time |
| `to` | End date for this report |
| `topic` | Meeting topic |
| `total_minutes` | Number of meeting minutes |
| `total_records` | The number of all records available across pages |
| `tracking_fields` | Tracking fields |
| `type` | Meeting type |
| `user_email` | User email |
| `user_name` | User display name |
| `uuid` | Meeting UUID |

Operations: List, Load.

API path: `/report/users/{userId}/meetings`

#### TrackingField

| Field | Description |
| --- | --- |
| `field` | Tracking Field Name |
| `id` | Tracking Field ID |
| `recommended_values` | Array of recommended values |
| `required` | Tracking Field Required |
| `total_records` | The number of all records available across pages |
| `tracking_fields` | Array of Tracking Fields |
| `visible` | Tracking Field Visible |

Operations: Create, List, Load, Remove, Update.

API path: `/v2/tracking_fields`

#### Tsp

| Field | Description |
| --- | --- |
| `code` | Country Code |
| `conference_code` | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | List of Dial In Numbers |
| `id` |  |
| `leader_pin` | Leader PIN, numeric value, length is less than 16. |
| `number` | Dial-in number, length is less than 16 |
| `type` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/users/{userId}/tsp`

#### User

| Field | Description |
| --- | --- |
| `account_id` |  |
| `cms_user_id` |  |
| `created_at` | User create time |
| `dept` | Department |
| `email` | User's email address |
| `first_name` | User's first name |
| `group_ids` |  |
| `host_key` |  |
| `id` | User ID |
| `im_group_ids` |  |
| `language` |  |
| `last_client_version` | User last login client version |
| `last_login_time` | User last login time |
| `last_name` | User's last name |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `personal_meeting_url` |  |
| `pic_url` |  |
| `pmi` | Personal Meeting ID |
| `timezone` | Time Zone |
| `total_records` | The number of all records available across pages |
| `type` | User's type |
| `use_pmi` |  |
| `users` | List of User objects |
| `vanity_url` |  |
| `verified` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/users/{userId}/assistants`

#### UserAssistantsList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: List.

API path: `/users/{userId}/assistants`

#### UserPermission

| Field | Description |
| --- | --- |
| `id` |  |
| `permissions` | List of user permissions |

Operations: List.

API path: `/users/{userId}/permissions`

#### UserSchedulersList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: List.

API path: `/users/{userId}/schedulers`

#### UserSetting

| Field | Description |
| --- | --- |
| `email_notification` |  |
| `feature` |  |
| `id` |  |
| `in_meeting` |  |
| `recording` |  |
| `schedule_meeting` |  |
| `telephony` |  |

Operations: Load.

API path: `/users/{userId}/settings`

#### Webhook

| Field | Description |
| --- | --- |
| `auth_password` | Webhook auth password |
| `auth_user` | Webhook auth user name |
| `created_at` | Webhook create time |
| `events` | List of events objects. |
| `id` |  |
| `total_records` | The number of all records available across pages |
| `url` | Webhook endpoint |
| `webhook_id` | Webhook Id |
| `webhooks` | List of Webhook objects |

Operations: Create, List, Load, Remove, Update.

API path: `/webhooks`

#### Webinar

| Field | Description |
| --- | --- |
| `agenda` | Webinar agenda |
| `created_at` | Create time |
| `duration` | Webinar duration |
| `email` | User email |
| `end_time` | Webinar end time |
| `has_3rd_party_audio` |  |
| `has_pstn` |  |
| `has_recording` |  |
| `has_screen_share` |  |
| `has_sip` |  |
| `has_video` |  |
| `has_voip` |  |
| `host` | User display name |
| `host_id` | ID of the user set as host of webinar |
| `id` | Webinar Poll ID |
| `join_url` | Join url |
| `occurrences` | Array of occurrence objects |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `participants` | Webinar participant count |
| `questions` | Array of Polls |
| `settings` | Webinar Settings |
| `start_time` | Webinar start time |
| `start_url` | Start url |
| `status` | Status of the Webinar Poll |
| `timezone` | Timezone to format start_time |
| `title` | Poll Title |
| `topic` | Webinar topic |
| `total_records` | The number of all records available across pages |
| `tracking_fields` | Tracking fields |
| `type` | Webinar Type |
| `user_type` | User type |
| `uuid` | Webinar UUID |
| `webinars` | List of Webinar objects |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/webinars/{webinarId}/registrants`

#### WebinarInstance

| Field | Description |
| --- | --- |
| `webinars` | List of ended webinar instances. |

Operations: List.

API path: `/past_webinars/{webinarId}/instances`

#### WebinarPanelistList

| Field | Description |
| --- | --- |
| `id` |  |
| `panelists` | List of Panelist objects |
| `total_records` | Total records |

Operations: List.

API path: `/webinars/{webinarId}/panelists`

#### WebinarRegistrantList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: Load.

API path: `/webinars/{webinarId}/registrants`

#### ZoomRoomList

| Field | Description |
| --- | --- |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |
| `zoom_rooms` | Array of Zoom Rooms |

Operations: List.

API path: `/metrics/zoomrooms`



## Entities


### Account

Create an instance: `$account = $client->Account();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `array` | List of Account objects |
| `id` | `string` |  |
| `meeting_connectors` | `string` | Meeting Connector, multiple values separated by comma |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `pay_mode` | `string` | Payee |
| `room_connectors` | `string` | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `bool` | Enable Share Meeting Connector |
| `share_rc` | `bool` | Enable Share Virtual Room Connector |
| `total_records` | `int` | The number of all records available across pages |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Account record (throws on error).
$account = $client->Account()->load(["id" => "account_id"]);
```

#### Example: List

```php
// list() returns an array of Account records (throws on error).
$accounts = $client->Account()->list();
```

#### Example: Create

```php
$account = $client->Account()->create([
    "body" => null, // array
]);
```


### AccountPlan

Create an instance: `$account_plan = $client->AccountPlan();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `plan_audio` | `array` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `array` | Account base plan object |
| `plan_large_meeting` | `array` | Additional Large Meeting Plans |
| `plan_recording` | `string` | Additional Cloud Recording Plan |
| `plan_room_connector` | `array` | Account plan object |
| `plan_webinar` | `array` | Additional Webinar Plans |
| `plan_zoom_rooms` | `array` | Account plan object |

#### Example: List

```php
// list() returns an array of AccountPlan records (throws on error).
$account_plans = $client->AccountPlan()->list();
```

#### Example: Create

```php
$account_plan = $client->AccountPlan()->create([
    "id" => null, // string
    "body" => null, // mixed
    "plan_base" => null, // array
]);
```


### AccountSetting

Create an instance: `$account_setting = $client->AccountSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `array` | Account Settings: Notification |
| `feature` | `array` | Account Settings: Feature |
| `id` | `string` |  |
| `in_meeting` | `array` | Account Settings: In Meeting |
| `integration` | `array` | Account Settings: Integration |
| `recording` | `array` | Account Settings: Recording |
| `schedule_meting` | `array` | Account Settings: Schedule Meeting |
| `security` | `array` | Account Settings: Security |
| `telephony` | `array` | Account Settings: Telephony |
| `zoom_rooms` | `array` | Account Settings: Zoom Rooms |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the AccountSetting record (throws on error).
$account_setting = $client->AccountSetting()->load(["id" => "account_setting_id"]);
```


### Billing

Create an instance: `$billing = $client->Billing();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `string` | Billing Contact's address |
| `apt` | `string` | Billing Contact's apartment/suite |
| `city` | `string` | Billing Contact's city |
| `country` | `string` | Billing Contact's country |
| `email` | `string` | Billing Contact's email address |
| `first_name` | `string` | Billing Contact's first name |
| `last_name` | `string` | Billing Contact's last name |
| `phone_number` | `string` | Billing Contact's phone number |
| `state` | `string` | Billing Contact's state |
| `zip` | `string` | Billing Contact's zip/postal code |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Billing record (throws on error).
$billing = $client->Billing()->load(["account_id" => "account_id"]);
```

#### Example: Create

```php
$billing = $client->Billing()->create([
    "account_id" => null, // string
    "body" => null, // array
    "address" => null, // string
    "city" => null, // string
    "country" => null, // string
    "email" => null, // string
    "first_name" => null, // string
    "last_name" => null, // string
    "phone_number" => null, // string
    "state" => null, // string
    "zip" => null, // string
]);
```


### CloudRecording

Create an instance: `$cloud_recording = $client->CloudRecording();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the CloudRecording record (throws on error).
$cloud_recording = $client->CloudRecording()->load(["meeting_id" => "meeting_id"]);
```


### Dashboard

Create an instance: `$dashboard = $client->Dashboard();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_type` | `string` | Zoom Room email type |
| `calender_name` | `string` | Zoom Calendar name |
| `camera` | `string` | Zoom Room camera |
| `crc_ports_usage` | `array` |  |
| `device_ip` | `string` | Zoom Room device IP |
| `email` | `string` | Zoom Room email |
| `from` | `string` | Start date for this report |
| `id` | `string` | Zoom Room ID |
| `last_start_time` | `string` | Zoom Room last start time |
| `live_meeting` | `array` | Meeting metric details |
| `meetings` | `array` | Array of meeting objects |
| `microphone` | `string` | Zoom Room microphone |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `array` | Array of user objects |
| `past_meetings` | `array` |  |
| `room_name` | `string` | Zoom Room name |
| `speaker` | `string` | Zoom Room speaker |
| `status` | `string` | Zoom Room status |
| `to` | `string` | End date for this report |
| `total_records` | `int` | The number of all records available across pages |
| `users` | `array` |  |
| `webinars` | `array` | Array of webinar objects |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Dashboard record (throws on error).
$dashboard = $client->Dashboard()->load(["zoomroom_id" => "zoomroom_id", "from" => "from", "to" => "to"]);
```

#### Example: List

```php
// list() returns an array of Dashboard records (throws on error).
$dashboards = $client->Dashboard()->list();
```


### Device

Create an instance: `$device = $client->Device();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `devices` | `array` | List of H.323/SIP Device objects |
| `id` | `string` |  |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```php
// list() returns an array of Device records (throws on error).
$devices = $client->Device()->list();
```

#### Example: Create

```php
$device = $client->Device()->create([
    "body" => null, // array
]);
```


### DomainsList

Create an instance: `$domains_list = $client->DomainsList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Domain Name |
| `status` | `string` | Domain Status |

#### Example: List

```php
// list() returns an array of DomainsList records (throws on error).
$domains_lists = $client->DomainsList()->list();
```


### Group

Create an instance: `$group = $client->Group();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Group ID |
| `name` | `string` | Group name |
| `total_members` | `int` | Total number of members in this group |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Group record (throws on error).
$group = $client->Group()->load(["id" => "group_id"]);
```

#### Example: List

```php
// list() returns an array of Group records (throws on error).
$groups = $client->Group()->list();
```

#### Example: Create

```php
$group = $client->Group()->create([
    "body" => null, // mixed
]);
```


### GroupMemberList

Create an instance: `$group_member_list = $client->GroupMemberList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `members` | `array` | List of Group member objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```php
// list() returns an array of GroupMemberList records (throws on error).
$group_member_lists = $client->GroupMemberList()->list();
```


### ImChat

Create an instance: `$im_chat = $client->ImChat();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start date |
| `messages` | `array` | Array of session objects |
| `next_page_token` | `string` | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | The amount of records returns within a single API call. |
| `session_id` | `string` | IM Chat session ID |
| `sessions` | `array` | Array of session objects |
| `to` | `string` | End date |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ImChat record (throws on error).
$im_chat = $client->ImChat()->load(["session_id" => "session_id", "from" => "from", "to" => "to"]);
```

#### Example: List

```php
// list() returns an array of ImChat records (throws on error).
$im_chats = $client->ImChat()->list();
```


### ImGroup

Create an instance: `$im_group = $client->ImGroup();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Group ID |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ImGroup record (throws on error).
$im_group = $client->ImGroup()->load(["id" => "im_group_id"]);
```

#### Example: Create

```php
$im_group = $client->ImGroup()->create([
    "body" => null, // mixed
]);
```


### ImGroupList

Create an instance: `$im_group_list = $client->ImGroupList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `groups` | `array` | List of Group objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```php
// list() returns an array of ImGroupList records (throws on error).
$im_group_lists = $client->ImGroupList()->list();
```


### Meeting

Create an instance: `$meeting = $client->Meeting();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda` | `string` | Agenda |
| `created_at` | `string` | Create time |
| `duration` | `string` | Meeting duration |
| `email` | `string` | User email |
| `end_time` | `string` | Meeting end time |
| `h323_password` | `string` | H.323/SIP room system password |
| `has_3rd_party_audio` | `bool` |  |
| `has_pstn` | `bool` |  |
| `has_recording` | `bool` |  |
| `has_screen_share` | `bool` |  |
| `has_sip` | `bool` |  |
| `has_video` | `bool` |  |
| `has_voip` | `bool` |  |
| `host` | `string` | User display name |
| `host_id` | `string` | ID of the user set as host of meeting |
| `id` | `string` | Meeting Poll ID |
| `join_url` | `string` | Join url |
| `meetings` | `array` | List of Meeting objects |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `occurrences` | `array` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Meeting participant count |
| `participants_count` | `int` | Number of meeting participants |
| `password` | `string` | Meeting password |
| `questions` | `array` | Array of Polls |
| `settings` | `array` | Meeting Settings |
| `start_time` | `string` | Meeting start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Meeting Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `array` | Tracking fields |
| `type` | `int` | Meeting Type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `user_type` | `string` | User type |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Meeting record (throws on error).
$meeting = $client->Meeting()->load(["id" => "meeting_id"]);
```

#### Example: List

```php
// list() returns an array of Meeting records (throws on error).
$meetings = $client->Meeting()->list();
```

#### Example: Create

```php
$meeting = $client->Meeting()->create([
    "user_id" => null, // string
    "body" => null, // mixed
]);
```


### MeetingInstance

Create an instance: `$meeting_instance = $client->MeetingInstance();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetings` | `array` | List of ended meeting instances. |

#### Example: List

```php
// list() returns an array of MeetingInstance records (throws on error).
$meeting_instances = $client->MeetingInstance()->list();
```


### MeetingInvitation

Create an instance: `$meeting_invitation = $client->MeetingInvitation();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `string` | Meeting invitation |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MeetingInvitation record (throws on error).
$meeting_invitation = $client->MeetingInvitation()->load(["id" => "meeting_invitation_id"]);
```


### MeetingRegistrantList

Create an instance: `$meeting_registrant_list = $client->MeetingRegistrantList();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MeetingRegistrantList record (throws on error).
$meeting_registrant_list = $client->MeetingRegistrantList()->load(["id" => "meeting_registrant_list_id"]);
```


### Pac

Create an instance: `$pac = $client->Pac();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `conference_id` | `int` | Conference ID |
| `dedicated_dial_in_number` | `array` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `array` | List of Global Dial In Numbers |
| `listen_only_password` | `string` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | Participant Password, numeric value, length is less than 6 |

#### Example: List

```php
// list() returns an array of Pac records (throws on error).
$pacs = $client->Pac()->list();
```


### Poll

Create an instance: `$poll = $client->Poll();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `polls` | `array` | Array of Polls |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```php
// list() returns an array of Poll records (throws on error).
$polls = $client->Poll()->list();
```


### Qos

Create an instance: `$qos = $client->Qos();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_input` | `array` | Quality of Service object |
| `as_output` | `array` | Quality of Service object |
| `audio_input` | `array` | Quality of Service object |
| `audio_output` | `array` | Quality of Service object |
| `cpu_usage` | `mixed` |  |
| `date_time` | `string` | Datetime of QOS |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of items per page |
| `participants` | `array` | Array of user objects |
| `total_records` | `int` | The number of all records available across pages |
| `video_input` | `array` | Quality of Service object |
| `video_output` | `array` | Quality of Service object |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Qos record (throws on error).
$qos = $client->Qos()->load(["participant_id" => "participant_id"]);
```

#### Example: List

```php
// list() returns an array of Qos records (throws on error).
$qoss = $client->Qos()->list();
```


### Recording

Create an instance: `$recording = $client->Recording();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start Date, |
| `meetings` | `array` | List of Recording |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `to` | `string` | End Date |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```php
// list() returns an array of Recording records (throws on error).
$recordings = $client->Recording()->list();
```


### RecordingSetting

Create an instance: `$recording_setting = $client->RecordingSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approval_type` | `int` | Approval type |
| `on_demand` | `bool` | Registration required |
| `password` | `string` | Password protect |
| `send_email_to_host` | `bool` | Send an email to host when someone registers |
| `share_recording` | `string` | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `bool` | Show social share buttons on registration page |
| `viewer_download` | `bool` | Host video |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the RecordingSetting record (throws on error).
$recording_setting = $client->RecordingSetting()->load(["meeting_id" => "meeting_id"]);
```


### Report

Create an instance: `$report = $client->Report();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Meeting duration |
| `email` | `string` | Participant email |
| `end_time` | `string` | Meeting end time |
| `from` | `string` | Start date for this report |
| `id` | `int` | Meeting ID |
| `meetings` | `array` | Array of meeting objects |
| `name` | `string` | Participant display name |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `array` | Array of meeting participant objects |
| `participants_count` | `int` | Number of meeting participants |
| `question_details` | `array` | Array of questions from user |
| `start_time` | `string` | Meeting start time |
| `to` | `string` | End date for this report |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `array` | Tracking fields |
| `type` | `int` | Meeting type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Report record (throws on error).
$report = $client->Report()->load(["meeting_id" => "meeting_id"]);
```

#### Example: List

```php
// list() returns an array of Report records (throws on error).
$reports = $client->Report()->list();
```


### TrackingField

Create an instance: `$tracking_field = $client->TrackingField();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `field` | `string` | Tracking Field Name |
| `id` | `string` | Tracking Field ID |
| `recommended_values` | `array` | Array of recommended values |
| `required` | `bool` | Tracking Field Required |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `array` | Array of Tracking Fields |
| `visible` | `bool` | Tracking Field Visible |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TrackingField record (throws on error).
$tracking_field = $client->TrackingField()->load(["id" => "tracking_field_id"]);
```

#### Example: List

```php
// list() returns an array of TrackingField records (throws on error).
$tracking_fields = $client->TrackingField()->list();
```

#### Example: Create

```php
$tracking_field = $client->TrackingField()->create([
    "body" => null, // array
]);
```


### Tsp

Create an instance: `$tsp = $client->Tsp();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Country Code |
| `conference_code` | `string` | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `array` | List of Dial In Numbers |
| `id` | `string` |  |
| `leader_pin` | `string` | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | Dial-in number, length is less than 16 |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Tsp record (throws on error).
$tsp = $client->Tsp()->load(["id" => "tsp_id", "user_id" => "user_id"]);
```

#### Example: List

```php
// list() returns an array of Tsp records (throws on error).
$tsps = $client->Tsp()->list();
```

#### Example: Create

```php
$tsp = $client->Tsp()->create([
    "user_id" => null, // string
    "body" => null, // array
    "conference_code" => null, // string
    "dial_in_numbers" => null, // array
    "leader_pin" => null, // string
]);
```


### User

Create an instance: `$user = $client->User();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `cms_user_id` | `string` |  |
| `created_at` | `string` | User create time |
| `dept` | `string` | Department |
| `email` | `string` | User's email address |
| `first_name` | `string` | User's first name |
| `group_ids` | `array` |  |
| `host_key` | `string` |  |
| `id` | `string` | User ID |
| `im_group_ids` | `array` |  |
| `language` | `string` |  |
| `last_client_version` | `string` | User last login client version |
| `last_login_time` | `string` | User last login time |
| `last_name` | `string` | User's last name |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `personal_meeting_url` | `string` |  |
| `pic_url` | `string` |  |
| `pmi` | `string` | Personal Meeting ID |
| `timezone` | `string` | Time Zone |
| `total_records` | `int` | The number of all records available across pages |
| `type` | `int` | User's type |
| `use_pmi` | `bool` |  |
| `users` | `array` | List of User objects |
| `vanity_url` | `string` |  |
| `verified` | `int` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the User record (throws on error).
$user = $client->User()->load(["id" => "user_id"]);
```

#### Example: List

```php
// list() returns an array of User records (throws on error).
$users = $client->User()->list();
```

#### Example: Create

```php
$user = $client->User()->create([
    "body" => null, // array
    "email" => null, // string
    "type" => null, // int
]);
```


### UserAssistantsList

Create an instance: `$user_assistants_list = $client->UserAssistantsList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```php
// list() returns an array of UserAssistantsList records (throws on error).
$user_assistants_lists = $client->UserAssistantsList()->list();
```


### UserPermission

Create an instance: `$user_permission = $client->UserPermission();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `permissions` | `array` | List of user permissions |

#### Example: List

```php
// list() returns an array of UserPermission records (throws on error).
$user_permissions = $client->UserPermission()->list();
```


### UserSchedulersList

Create an instance: `$user_schedulers_list = $client->UserSchedulersList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```php
// list() returns an array of UserSchedulersList records (throws on error).
$user_schedulers_lists = $client->UserSchedulersList()->list();
```


### UserSetting

Create an instance: `$user_setting = $client->UserSetting();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `array` |  |
| `feature` | `array` |  |
| `id` | `string` |  |
| `in_meeting` | `array` |  |
| `recording` | `array` |  |
| `schedule_meeting` | `array` |  |
| `telephony` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the UserSetting record (throws on error).
$user_setting = $client->UserSetting()->load(["id" => "user_setting_id"]);
```


### Webhook

Create an instance: `$webhook = $client->Webhook();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_password` | `string` | Webhook auth password |
| `auth_user` | `string` | Webhook auth user name |
| `created_at` | `string` | Webhook create time |
| `events` | `array` | List of events objects. |
| `id` | `string` |  |
| `total_records` | `int` | The number of all records available across pages |
| `url` | `string` | Webhook endpoint |
| `webhook_id` | `string` | Webhook Id |
| `webhooks` | `array` | List of Webhook objects |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Webhook record (throws on error).
$webhook = $client->Webhook()->load(["id" => "webhook_id"]);
```

#### Example: List

```php
// list() returns an array of Webhook records (throws on error).
$webhooks = $client->Webhook()->list();
```

#### Example: Create

```php
$webhook = $client->Webhook()->create([
    "body" => null, // array
    "auth_password" => null, // string
    "auth_user" => null, // string
    "events" => null, // array
    "url" => null, // string
]);
```


### Webinar

Create an instance: `$webinar = $client->Webinar();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda` | `string` | Webinar agenda |
| `created_at` | `string` | Create time |
| `duration` | `string` | Webinar duration |
| `email` | `string` | User email |
| `end_time` | `string` | Webinar end time |
| `has_3rd_party_audio` | `bool` |  |
| `has_pstn` | `bool` |  |
| `has_recording` | `bool` |  |
| `has_screen_share` | `bool` |  |
| `has_sip` | `bool` |  |
| `has_video` | `bool` |  |
| `has_voip` | `bool` |  |
| `host` | `string` | User display name |
| `host_id` | `string` | ID of the user set as host of webinar |
| `id` | `string` | Webinar Poll ID |
| `join_url` | `string` | Join url |
| `occurrences` | `array` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Webinar participant count |
| `questions` | `array` | Array of Polls |
| `settings` | `array` | Webinar Settings |
| `start_time` | `string` | Webinar start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Webinar Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Webinar topic |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `array` | Tracking fields |
| `type` | `int` | Webinar Type |
| `user_type` | `string` | User type |
| `uuid` | `string` | Webinar UUID |
| `webinars` | `array` | List of Webinar objects |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Webinar record (throws on error).
$webinar = $client->Webinar()->load(["id" => "webinar_id"]);
```

#### Example: List

```php
// list() returns an array of Webinar records (throws on error).
$webinars = $client->Webinar()->list();
```

#### Example: Create

```php
$webinar = $client->Webinar()->create([
    "user_id" => null, // string
    "body" => null, // array
]);
```


### WebinarInstance

Create an instance: `$webinar_instance = $client->WebinarInstance();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `webinars` | `array` | List of ended webinar instances. |

#### Example: List

```php
// list() returns an array of WebinarInstance records (throws on error).
$webinar_instances = $client->WebinarInstance()->list();
```


### WebinarPanelistList

Create an instance: `$webinar_panelist_list = $client->WebinarPanelistList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `panelists` | `array` | List of Panelist objects |
| `total_records` | `int` | Total records |

#### Example: List

```php
// list() returns an array of WebinarPanelistList records (throws on error).
$webinar_panelist_lists = $client->WebinarPanelistList()->list();
```


### WebinarRegistrantList

Create an instance: `$webinar_registrant_list = $client->WebinarRegistrantList();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WebinarRegistrantList record (throws on error).
$webinar_registrant_list = $client->WebinarRegistrantList()->load(["id" => "webinar_registrant_list_id"]);
```


### ZoomRoomList

Create an instance: `$zoom_room_list = $client->ZoomRoomList();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |
| `zoom_rooms` | `array` | Array of Zoom Rooms |

#### Example: List

```php
// list() returns an array of ZoomRoomList records (throws on error).
$zoom_room_lists = $client->ZoomRoomList()->list();
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Debug capture |
| [`idempotency`](#idempotency) | Idempotency |
| [`metrics`](#metrics) | Metrics |
| [`paging`](#paging) | Paging |
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Debug capture.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Metrics.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Paging.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Debug capture
- **IdempotencyFeature**: Idempotency
- **MetricsFeature**: Metrics
- **PagingFeature**: Paging
- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── zoom_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`zoom_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$usersetting = $client->UserSetting();
$usersetting->load(["id" => "example_id"]);

// $usersetting->data_get() now returns the usersetting data from the last load
// $usersetting->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
