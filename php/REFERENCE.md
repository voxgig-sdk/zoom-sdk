# Zoom PHP SDK Reference

Complete API reference for the Zoom PHP SDK.


## ZoomSDK

### Constructor

```php
require_once __DIR__ . '/zoom_sdk.php';

$client = new ZoomSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ZoomSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ZoomSDK::test();
```


### Instance Methods

#### `Account($data = null)`

Create a new `AccountEntity` instance. Pass `null` for no initial data.

#### `AccountPlan($data = null)`

Create a new `AccountPlanEntity` instance. Pass `null` for no initial data.

#### `AccountSetting($data = null)`

Create a new `AccountSettingEntity` instance. Pass `null` for no initial data.

#### `Billing($data = null)`

Create a new `BillingEntity` instance. Pass `null` for no initial data.

#### `CloudRecording($data = null)`

Create a new `CloudRecordingEntity` instance. Pass `null` for no initial data.

#### `Dashboard($data = null)`

Create a new `DashboardEntity` instance. Pass `null` for no initial data.

#### `Device($data = null)`

Create a new `DeviceEntity` instance. Pass `null` for no initial data.

#### `DomainsList($data = null)`

Create a new `DomainsListEntity` instance. Pass `null` for no initial data.

#### `Group($data = null)`

Create a new `GroupEntity` instance. Pass `null` for no initial data.

#### `GroupMemberList($data = null)`

Create a new `GroupMemberListEntity` instance. Pass `null` for no initial data.

#### `ImChat($data = null)`

Create a new `ImChatEntity` instance. Pass `null` for no initial data.

#### `ImGroup($data = null)`

Create a new `ImGroupEntity` instance. Pass `null` for no initial data.

#### `ImGroupList($data = null)`

Create a new `ImGroupListEntity` instance. Pass `null` for no initial data.

#### `Meeting($data = null)`

Create a new `MeetingEntity` instance. Pass `null` for no initial data.

#### `MeetingInstance($data = null)`

Create a new `MeetingInstanceEntity` instance. Pass `null` for no initial data.

#### `MeetingInvitation($data = null)`

Create a new `MeetingInvitationEntity` instance. Pass `null` for no initial data.

#### `MeetingRegistrantList($data = null)`

Create a new `MeetingRegistrantListEntity` instance. Pass `null` for no initial data.

#### `Pac($data = null)`

Create a new `PacEntity` instance. Pass `null` for no initial data.

#### `Poll($data = null)`

Create a new `PollEntity` instance. Pass `null` for no initial data.

#### `Qos($data = null)`

Create a new `QosEntity` instance. Pass `null` for no initial data.

#### `Recording($data = null)`

Create a new `RecordingEntity` instance. Pass `null` for no initial data.

#### `RecordingSetting($data = null)`

Create a new `RecordingSettingEntity` instance. Pass `null` for no initial data.

#### `Report($data = null)`

Create a new `ReportEntity` instance. Pass `null` for no initial data.

#### `TrackingField($data = null)`

Create a new `TrackingFieldEntity` instance. Pass `null` for no initial data.

#### `Tsp($data = null)`

Create a new `TspEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `UserAssistantsList($data = null)`

Create a new `UserAssistantsListEntity` instance. Pass `null` for no initial data.

#### `UserPermission($data = null)`

Create a new `UserPermissionEntity` instance. Pass `null` for no initial data.

#### `UserSchedulersList($data = null)`

Create a new `UserSchedulersListEntity` instance. Pass `null` for no initial data.

#### `UserSetting($data = null)`

Create a new `UserSettingEntity` instance. Pass `null` for no initial data.

#### `Webhook($data = null)`

Create a new `WebhookEntity` instance. Pass `null` for no initial data.

#### `Webinar($data = null)`

Create a new `WebinarEntity` instance. Pass `null` for no initial data.

#### `WebinarInstance($data = null)`

Create a new `WebinarInstanceEntity` instance. Pass `null` for no initial data.

#### `WebinarPanelistList($data = null)`

Create a new `WebinarPanelistListEntity` instance. Pass `null` for no initial data.

#### `WebinarRegistrantList($data = null)`

Create a new `WebinarRegistrantListEntity` instance. Pass `null` for no initial data.

#### `ZoomRoomList($data = null)`

Create a new `ZoomRoomListEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ZoomUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AccountEntity

```php
$account = $client->Account();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `array` | No | List of Account objects |
| `id` | `string` | No |  |
| `meeting_connectors` | `string` | No | Meeting Connector, multiple values separated by comma |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `pay_mode` | `string` | No | Payee |
| `room_connectors` | `string` | No | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `bool` | No | Enable Share Meeting Connector |
| `share_rc` | `bool` | No | Enable Share Virtual Room Connector |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Account()->create([
  "body" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Account()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Account()->load(["id" => "account_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Account()->remove(["id" => "account_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Account()->update([
  "id" => "account_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountEntity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AccountPlanEntity

```php
$account_plan = $client->AccountPlan();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `plan_audio` | `array` | No | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `array` | Yes | Account base plan object |
| `plan_large_meeting` | `array` | No | Additional Large Meeting Plans |
| `plan_recording` | `string` | No | Additional Cloud Recording Plan |
| `plan_room_connector` | `array` | No | Account plan object |
| `plan_webinar` | `array` | No | Additional Webinar Plans |
| `plan_zoom_rooms` | `array` | No | Account plan object |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->AccountPlan()->create([
  "id" => null, // string
  "body" => null, // mixed
  "plan_base" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->AccountPlan()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountPlanEntity`

Create a new `AccountPlanEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AccountSettingEntity

```php
$account_setting = $client->AccountSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `array` | No | Account Settings: Notification |
| `feature` | `array` | No | Account Settings: Feature |
| `id` | `string` | No |  |
| `in_meeting` | `array` | No | Account Settings: In Meeting |
| `integration` | `array` | No | Account Settings: Integration |
| `recording` | `array` | No | Account Settings: Recording |
| `schedule_meting` | `array` | No | Account Settings: Schedule Meeting |
| `security` | `array` | No | Account Settings: Security |
| `telephony` | `array` | No | Account Settings: Telephony |
| `zoom_rooms` | `array` | No | Account Settings: Zoom Rooms |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->AccountSetting()->load(["id" => "account_setting_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AccountSettingEntity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BillingEntity

```php
$billing = $client->Billing();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `string` | Yes | Billing Contact's address |
| `apt` | `string` | No | Billing Contact's apartment/suite |
| `city` | `string` | Yes | Billing Contact's city |
| `country` | `string` | Yes | Billing Contact's country |
| `email` | `string` | Yes | Billing Contact's email address |
| `first_name` | `string` | Yes | Billing Contact's first name |
| `last_name` | `string` | Yes | Billing Contact's last name |
| `phone_number` | `string` | Yes | Billing Contact's phone number |
| `state` | `string` | Yes | Billing Contact's state |
| `zip` | `string` | Yes | Billing Contact's zip/postal code |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Billing()->create([
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Billing()->load(["account_id" => "account_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Billing()->update([
  "account_id" => "account_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BillingEntity`

Create a new `BillingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CloudRecordingEntity

```php
$cloud_recording = $client->CloudRecording();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CloudRecording()->load(["meeting_id" => "meeting_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->CloudRecording()->remove(["meeting_id" => "meeting_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->CloudRecording()->update([
  "meeting_id" => "meeting_id",
  "body" => "body",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CloudRecordingEntity`

Create a new `CloudRecordingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DashboardEntity

```php
$dashboard = $client->Dashboard();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_type` | `string` | No | Zoom Room email type |
| `calender_name` | `string` | No | Zoom Calendar name |
| `camera` | `string` | No | Zoom Room camera |
| `crc_ports_usage` | `array` | No |  |
| `device_ip` | `string` | No | Zoom Room device IP |
| `email` | `string` | No | Zoom Room email |
| `from` | `string` | No | Start date for this report |
| `id` | `string` | No | Zoom Room ID |
| `last_start_time` | `string` | No | Zoom Room last start time |
| `live_meeting` | `array` | No | Meeting metric details |
| `meetings` | `array` | No | Array of meeting objects |
| `microphone` | `string` | No | Zoom Room microphone |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `array` | No | Array of user objects |
| `past_meetings` | `array` | No |  |
| `room_name` | `string` | No | Zoom Room name |
| `speaker` | `string` | No | Zoom Room speaker |
| `status` | `string` | No | Zoom Room status |
| `to` | `string` | No | End date for this report |
| `total_records` | `int` | No | The number of all records available across pages |
| `users` | `array` | No |  |
| `webinars` | `array` | No | Array of webinar objects |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Dashboard()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Dashboard()->load(["zoomroom_id" => "zoomroom_id", "from" => "from", "to" => "to"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DashboardEntity`

Create a new `DashboardEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DeviceEntity

```php
$device = $client->Device();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `devices` | `array` | No | List of H.323/SIP Device objects |
| `id` | `string` | No |  |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Device()->create([
  "body" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Device()->list();
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Device()->remove(["id" => "id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Device()->update([
  "id" => "id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DeviceEntity`

Create a new `DeviceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DomainsListEntity

```php
$domains_list = $client->DomainsList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | Domain Name |
| `status` | `string` | No | Domain Status |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DomainsList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DomainsListEntity`

Create a new `DomainsListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GroupEntity

```php
$group = $client->Group();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |
| `name` | `string` | No | Group name |
| `total_members` | `int` | No | Total number of members in this group |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Group()->create([
  "body" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Group()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Group()->load(["id" => "group_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Group()->remove(["id" => "group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Group()->update([
  "id" => "group_id",
  "body" => "body",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GroupEntity`

Create a new `GroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GroupMemberListEntity

```php
$group_member_list = $client->GroupMemberList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `members` | `array` | No | List of Group member objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->GroupMemberList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GroupMemberListEntity`

Create a new `GroupMemberListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImChatEntity

```php
$im_chat = $client->ImChat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start date |
| `messages` | `array` | No | Array of session objects |
| `next_page_token` | `string` | No | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | No | The amount of records returns within a single API call. |
| `session_id` | `string` | No | IM Chat session ID |
| `sessions` | `array` | No | Array of session objects |
| `to` | `string` | No | End date |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ImChat()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ImChat()->load(["session_id" => "session_id", "from" => "from", "to" => "to"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImChatEntity`

Create a new `ImChatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImGroupEntity

```php
$im_group = $client->ImGroup();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ImGroup()->create([
  "body" => null, // mixed
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ImGroup()->load(["id" => "im_group_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->ImGroup()->remove(["id" => "im_group_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->ImGroup()->update([
  "id" => "im_group_id",
  "body" => "body",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImGroupEntity`

Create a new `ImGroupEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ImGroupListEntity

```php
$im_group_list = $client->ImGroupList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `array` | No | List of Group objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ImGroupList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ImGroupListEntity`

Create a new `ImGroupListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeetingEntity

```php
$meeting = $client->Meeting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `string` | No | Agenda |
| `created_at` | `string` | No | Create time |
| `duration` | `string` | No | Meeting duration |
| `email` | `string` | No | User email |
| `end_time` | `string` | No | Meeting end time |
| `h323_password` | `string` | No | H.323/SIP room system password |
| `has_3rd_party_audio` | `bool` | No |  |
| `has_pstn` | `bool` | No |  |
| `has_recording` | `bool` | No |  |
| `has_screen_share` | `bool` | No |  |
| `has_sip` | `bool` | No |  |
| `has_video` | `bool` | No |  |
| `has_voip` | `bool` | No |  |
| `host` | `string` | No | User display name |
| `host_id` | `string` | No | ID of the user set as host of meeting |
| `id` | `string` | No | Meeting Poll ID |
| `join_url` | `string` | No | Join url |
| `meetings` | `array` | No | List of Meeting objects |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `occurrences` | `array` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Meeting participant count |
| `participants_count` | `int` | No | Number of meeting participants |
| `password` | `string` | No | Meeting password |
| `questions` | `array` | No | Array of Polls |
| `settings` | `array` | No | Meeting Settings |
| `start_time` | `string` | No | Meeting start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Meeting Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `array` | No | Tracking fields |
| `type` | `int` | No | Meeting Type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Meeting()->create([
  "user_id" => null, // string
  "body" => null, // mixed
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Meeting()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Meeting()->load(["id" => "meeting_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Meeting()->remove(["id" => "meeting_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Meeting()->update([
  "id" => "meeting_id",
  "poll_id" => "poll_id",
  "body" => "body",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingEntity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeetingInstanceEntity

```php
$meeting_instance = $client->MeetingInstance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meetings` | `array` | No | List of ended meeting instances. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->MeetingInstance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingInstanceEntity`

Create a new `MeetingInstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeetingInvitationEntity

```php
$meeting_invitation = $client->MeetingInvitation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `invitation` | `string` | No | Meeting invitation |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MeetingInvitation()->load(["id" => "meeting_invitation_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingInvitationEntity`

Create a new `MeetingInvitationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MeetingRegistrantListEntity

```php
$meeting_registrant_list = $client->MeetingRegistrantList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MeetingRegistrantList()->load(["id" => "meeting_registrant_list_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingRegistrantListEntity`

Create a new `MeetingRegistrantListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PacEntity

```php
$pac = $client->Pac();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `conference_id` | `int` | No | Conference ID |
| `dedicated_dial_in_number` | `array` | Yes | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `array` | Yes | List of Global Dial In Numbers |
| `listen_only_password` | `string` | No | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | No | Participant Password, numeric value, length is less than 6 |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Pac()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PacEntity`

Create a new `PacEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PollEntity

```php
$poll = $client->Poll();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `polls` | `array` | No | Array of Polls |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Poll()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PollEntity`

Create a new `PollEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## QosEntity

```php
$qos = $client->Qos();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_input` | `array` | No | Quality of Service object |
| `as_output` | `array` | No | Quality of Service object |
| `audio_input` | `array` | No | Quality of Service object |
| `audio_output` | `array` | No | Quality of Service object |
| `cpu_usage` | `mixed` | No |  |
| `date_time` | `string` | No | Datetime of QOS |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of items per page |
| `participants` | `array` | No | Array of user objects |
| `total_records` | `int` | No | The number of all records available across pages |
| `video_input` | `array` | No | Quality of Service object |
| `video_output` | `array` | No | Quality of Service object |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Qos()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Qos()->load(["participant_id" => "participant_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): QosEntity`

Create a new `QosEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecordingEntity

```php
$recording = $client->Recording();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start Date, |
| `meetings` | `array` | No | List of Recording |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `to` | `string` | No | End Date |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Recording()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecordingEntity`

Create a new `RecordingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RecordingSettingEntity

```php
$recording_setting = $client->RecordingSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approval_type` | `int` | No | Approval type |
| `on_demand` | `bool` | No | Registration required |
| `password` | `string` | No | Password protect |
| `send_email_to_host` | `bool` | No | Send an email to host when someone registers |
| `share_recording` | `string` | No | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `bool` | No | Show social share buttons on registration page |
| `viewer_download` | `bool` | No | Host video |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->RecordingSetting()->load(["meeting_id" => "meeting_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RecordingSettingEntity`

Create a new `RecordingSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReportEntity

```php
$report = $client->Report();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Meeting duration |
| `email` | `string` | No | Participant email |
| `end_time` | `string` | No | Meeting end time |
| `from` | `string` | No | Start date for this report |
| `id` | `int` | No | Meeting ID |
| `meetings` | `array` | No | Array of meeting objects |
| `name` | `string` | No | Participant display name |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `array` | No | Array of meeting participant objects |
| `participants_count` | `int` | No | Number of meeting participants |
| `question_details` | `array` | No | Array of questions from user |
| `start_time` | `string` | No | Meeting start time |
| `to` | `string` | No | End date for this report |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `array` | No | Tracking fields |
| `type` | `int` | No | Meeting type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Report()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Report()->load(["meeting_id" => "meeting_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReportEntity`

Create a new `ReportEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrackingFieldEntity

```php
$tracking_field = $client->TrackingField();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `field` | `string` | No | Tracking Field Name |
| `id` | `string` | No | Tracking Field ID |
| `recommended_values` | `array` | No | Array of recommended values |
| `required` | `bool` | No | Tracking Field Required |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `array` | No | Array of Tracking Fields |
| `visible` | `bool` | No | Tracking Field Visible |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->TrackingField()->create([
  "body" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->TrackingField()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->TrackingField()->load(["id" => "tracking_field_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->TrackingField()->remove(["id" => "tracking_field_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->TrackingField()->update([
  "id" => "tracking_field_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrackingFieldEntity`

Create a new `TrackingFieldEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TspEntity

```php
$tsp = $client->Tsp();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Country Code |
| `conference_code` | `string` | Yes | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `array` | Yes | List of Dial In Numbers |
| `id` | `string` | No |  |
| `leader_pin` | `string` | Yes | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | No | Dial-in number, length is less than 16 |
| `type` | `string` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Tsp()->create([
  "user_id" => null, // string
  "body" => null, // array
  "conference_code" => null, // string
  "dial_in_numbers" => null, // array
  "leader_pin" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Tsp()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Tsp()->load(["id" => "tsp_id", "user_id" => "user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Tsp()->remove(["id" => "tsp_id", "user_id" => "user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Tsp()->update([
  "id" => "tsp_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TspEntity`

Create a new `TspEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->User();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `string` | No |  |
| `cms_user_id` | `string` | No |  |
| `created_at` | `string` | No | User create time |
| `dept` | `string` | No | Department |
| `email` | `string` | Yes | User's email address |
| `first_name` | `string` | No | User's first name |
| `group_ids` | `array` | No |  |
| `host_key` | `string` | No |  |
| `id` | `string` | No | User ID |
| `im_group_ids` | `array` | No |  |
| `language` | `string` | No |  |
| `last_client_version` | `string` | No | User last login client version |
| `last_login_time` | `string` | No | User last login time |
| `last_name` | `string` | No | User's last name |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `personal_meeting_url` | `string` | No |  |
| `pic_url` | `string` | No |  |
| `pmi` | `string` | No | Personal Meeting ID |
| `timezone` | `string` | No | Time Zone |
| `total_records` | `int` | No | The number of all records available across pages |
| `type` | `int` | Yes | User's type |
| `use_pmi` | `bool` | No |  |
| `users` | `array` | No | List of User objects |
| `vanity_url` | `string` | No |  |
| `verified` | `int` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->User()->create([
  "body" => null, // array
  "email" => null, // string
  "type" => null, // int
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->User()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->User()->load(["id" => "user_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->User()->remove(["id" => "user_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->User()->update([
  "id" => "user_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserAssistantsListEntity

```php
$user_assistants_list = $client->UserAssistantsList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->UserAssistantsList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserAssistantsListEntity`

Create a new `UserAssistantsListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserPermissionEntity

```php
$user_permission = $client->UserPermission();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `permissions` | `array` | No | List of user permissions |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->UserPermission()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserPermissionEntity`

Create a new `UserPermissionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserSchedulersListEntity

```php
$user_schedulers_list = $client->UserSchedulersList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->UserSchedulersList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserSchedulersListEntity`

Create a new `UserSchedulersListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## UserSettingEntity

```php
$user_setting = $client->UserSetting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `array` | No |  |
| `feature` | `array` | No |  |
| `id` | `string` | No |  |
| `in_meeting` | `array` | No |  |
| `recording` | `array` | No |  |
| `schedule_meeting` | `array` | No |  |
| `telephony` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->UserSetting()->load(["id" => "user_setting_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): UserSettingEntity`

Create a new `UserSettingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebhookEntity

```php
$webhook = $client->Webhook();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_password` | `string` | Yes | Webhook auth password |
| `auth_user` | `string` | Yes | Webhook auth user name |
| `created_at` | `string` | No | Webhook create time |
| `events` | `array` | Yes | List of events objects. |
| `id` | `string` | No |  |
| `total_records` | `int` | No | The number of all records available across pages |
| `url` | `string` | Yes | Webhook endpoint |
| `webhook_id` | `string` | No | Webhook Id |
| `webhooks` | `array` | No | List of Webhook objects |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Webhook()->create([
  "body" => null, // array
  "auth_password" => null, // string
  "auth_user" => null, // string
  "events" => null, // array
  "url" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Webhook()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Webhook()->load(["id" => "webhook_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Webhook()->remove(["id" => "webhook_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Webhook()->update([
  "id" => "webhook_id",
  "body" => [],
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebhookEntity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebinarEntity

```php
$webinar = $client->Webinar();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `string` | No | Webinar agenda |
| `created_at` | `string` | No | Create time |
| `duration` | `string` | No | Webinar duration |
| `email` | `string` | No | User email |
| `end_time` | `string` | No | Webinar end time |
| `has_3rd_party_audio` | `bool` | No |  |
| `has_pstn` | `bool` | No |  |
| `has_recording` | `bool` | No |  |
| `has_screen_share` | `bool` | No |  |
| `has_sip` | `bool` | No |  |
| `has_video` | `bool` | No |  |
| `has_voip` | `bool` | No |  |
| `host` | `string` | No | User display name |
| `host_id` | `string` | No | ID of the user set as host of webinar |
| `id` | `string` | No | Webinar Poll ID |
| `join_url` | `string` | No | Join url |
| `occurrences` | `array` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Webinar participant count |
| `questions` | `array` | No | Array of Polls |
| `settings` | `array` | No | Webinar Settings |
| `start_time` | `string` | No | Webinar start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Webinar Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Webinar topic |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `array` | No | Tracking fields |
| `type` | `int` | No | Webinar Type |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Webinar UUID |
| `webinars` | `array` | No | List of Webinar objects |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Webinar()->create([
  "user_id" => null, // string
  "body" => null, // array
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Webinar()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Webinar()->load(["id" => "webinar_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Webinar()->remove(["id" => "webinar_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Webinar()->update([
  "id" => "webinar_id",
  "poll_id" => "poll_id",
  "body" => "body",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebinarEntity`

Create a new `WebinarEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebinarInstanceEntity

```php
$webinar_instance = $client->WebinarInstance();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webinars` | `array` | No | List of ended webinar instances. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->WebinarInstance()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebinarInstanceEntity`

Create a new `WebinarInstanceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebinarPanelistListEntity

```php
$webinar_panelist_list = $client->WebinarPanelistList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `panelists` | `array` | No | List of Panelist objects |
| `total_records` | `int` | No | Total records |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->WebinarPanelistList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebinarPanelistListEntity`

Create a new `WebinarPanelistListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WebinarRegistrantListEntity

```php
$webinar_registrant_list = $client->WebinarRegistrantList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->WebinarRegistrantList()->load(["id" => "webinar_registrant_list_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WebinarRegistrantListEntity`

Create a new `WebinarRegistrantListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ZoomRoomListEntity

```php
$zoom_room_list = $client->ZoomRoomList();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |
| `zoom_rooms` | `array` | No | Array of Zoom Rooms |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ZoomRoomList()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ZoomRoomListEntity`

Create a new `ZoomRoomListEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `debug` | 0.0.1 | Debug capture |
| `idempotency` | 0.0.1 | Idempotency |
| `metrics` | 0.0.1 | Metrics |
| `paging` | 0.0.1 | Paging |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new ZoomSDK([
  "feature" => [
    "debug" => ["active" => true],
    "idempotency" => ["active" => true],
    "metrics" => ["active" => true],
    "paging" => ["active" => true],
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`debug`, `idempotency`, `metrics`, `paging`, `test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `debug`

Debug capture.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

| Option | Type |
|---|---|
| `now` | function |
| `onEntry` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.debug.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `idempotency`

Idempotency.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

| Option | Type |
|---|---|
| `keygen` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.idempotency.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `metrics`

Metrics.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `now` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.metrics.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `paging`

Paging.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

| Option | Type |
|---|---|
| `limit` | number |
| `ops` | list |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.paging.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Inactive by default: leaving it out costs nothing at runtime.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

