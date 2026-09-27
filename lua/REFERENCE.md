# Zoom Lua SDK Reference

Complete API reference for the Zoom Lua SDK.


## ZoomSDK

### Constructor

```lua
local sdk = require("zoom_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Account(data)`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `AccountPlan(data)`

Create a new `AccountPlan` entity instance. Pass `nil` for no initial data.

#### `AccountSetting(data)`

Create a new `AccountSetting` entity instance. Pass `nil` for no initial data.

#### `Billing(data)`

Create a new `Billing` entity instance. Pass `nil` for no initial data.

#### `CloudRecording(data)`

Create a new `CloudRecording` entity instance. Pass `nil` for no initial data.

#### `Dashboard(data)`

Create a new `Dashboard` entity instance. Pass `nil` for no initial data.

#### `Device(data)`

Create a new `Device` entity instance. Pass `nil` for no initial data.

#### `DomainsList(data)`

Create a new `DomainsList` entity instance. Pass `nil` for no initial data.

#### `Group(data)`

Create a new `Group` entity instance. Pass `nil` for no initial data.

#### `GroupMemberList(data)`

Create a new `GroupMemberList` entity instance. Pass `nil` for no initial data.

#### `ImChat(data)`

Create a new `ImChat` entity instance. Pass `nil` for no initial data.

#### `ImGroup(data)`

Create a new `ImGroup` entity instance. Pass `nil` for no initial data.

#### `ImGroupList(data)`

Create a new `ImGroupList` entity instance. Pass `nil` for no initial data.

#### `Meeting(data)`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

#### `MeetingInstance(data)`

Create a new `MeetingInstance` entity instance. Pass `nil` for no initial data.

#### `MeetingInvitation(data)`

Create a new `MeetingInvitation` entity instance. Pass `nil` for no initial data.

#### `MeetingRegistrantList(data)`

Create a new `MeetingRegistrantList` entity instance. Pass `nil` for no initial data.

#### `Pac(data)`

Create a new `Pac` entity instance. Pass `nil` for no initial data.

#### `Poll(data)`

Create a new `Poll` entity instance. Pass `nil` for no initial data.

#### `Qos(data)`

Create a new `Qos` entity instance. Pass `nil` for no initial data.

#### `Recording(data)`

Create a new `Recording` entity instance. Pass `nil` for no initial data.

#### `RecordingSetting(data)`

Create a new `RecordingSetting` entity instance. Pass `nil` for no initial data.

#### `Report(data)`

Create a new `Report` entity instance. Pass `nil` for no initial data.

#### `TrackingField(data)`

Create a new `TrackingField` entity instance. Pass `nil` for no initial data.

#### `Tsp(data)`

Create a new `Tsp` entity instance. Pass `nil` for no initial data.

#### `User(data)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `UserAssistantsList(data)`

Create a new `UserAssistantsList` entity instance. Pass `nil` for no initial data.

#### `UserPermission(data)`

Create a new `UserPermission` entity instance. Pass `nil` for no initial data.

#### `UserSchedulersList(data)`

Create a new `UserSchedulersList` entity instance. Pass `nil` for no initial data.

#### `UserSetting(data)`

Create a new `UserSetting` entity instance. Pass `nil` for no initial data.

#### `Webhook(data)`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `Webinar(data)`

Create a new `Webinar` entity instance. Pass `nil` for no initial data.

#### `WebinarInstance(data)`

Create a new `WebinarInstance` entity instance. Pass `nil` for no initial data.

#### `WebinarPanelistList(data)`

Create a new `WebinarPanelistList` entity instance. Pass `nil` for no initial data.

#### `WebinarRegistrantList(data)`

Create a new `WebinarRegistrantList` entity instance. Pass `nil` for no initial data.

#### `ZoomRoomList(data)`

Create a new `ZoomRoomList` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AccountEntity

```lua
local account = client:Account(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `table` | No | List of Account objects |
| `id` | `string` | No |  |
| `meeting_connectors` | `string` | No | Meeting Connector, multiple values separated by comma |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `pay_mode` | `string` | No | Payee |
| `room_connectors` | `string` | No | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `boolean` | No | Enable Share Meeting Connector |
| `share_rc` | `boolean` | No | Enable Share Virtual Room Connector |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Account():create({
  body = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Account():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Account():load({ id = "account_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Account():remove({ id = "account_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Account():update({
  id = "account_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AccountPlanEntity

```lua
local account_plan = client:AccountPlan(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `plan_audio` | `table` | No | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `table` | Yes | Account base plan object |
| `plan_large_meeting` | `table` | No | Additional Large Meeting Plans |
| `plan_recording` | `string` | No | Additional Cloud Recording Plan |
| `plan_room_connector` | `table` | No | Account plan object |
| `plan_webinar` | `table` | No | Additional Webinar Plans |
| `plan_zoom_rooms` | `table` | No | Account plan object |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:AccountPlan():create({
  id = --[[ string ]],
  body = --[[ any ]],
  plan_base = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:AccountPlan():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountPlanEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AccountSettingEntity

```lua
local account_setting = client:AccountSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `table` | No | Account Settings: Notification |
| `feature` | `table` | No | Account Settings: Feature |
| `id` | `string` | No |  |
| `in_meeting` | `table` | No | Account Settings: In Meeting |
| `integration` | `table` | No | Account Settings: Integration |
| `recording` | `table` | No | Account Settings: Recording |
| `schedule_meting` | `table` | No | Account Settings: Schedule Meeting |
| `security` | `table` | No | Account Settings: Security |
| `telephony` | `table` | No | Account Settings: Telephony |
| `zoom_rooms` | `table` | No | Account Settings: Zoom Rooms |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:AccountSetting():load({ id = "account_setting_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BillingEntity

```lua
local billing = client:Billing(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Billing():create({
  account_id = --[[ string ]],
  body = --[[ table ]],
  address = --[[ string ]],
  city = --[[ string ]],
  country = --[[ string ]],
  email = --[[ string ]],
  first_name = --[[ string ]],
  last_name = --[[ string ]],
  phone_number = --[[ string ]],
  state = --[[ string ]],
  zip = --[[ string ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Billing():load({ account_id = "account_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Billing():update({
  account_id = "account_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CloudRecordingEntity

```lua
local cloud_recording = client:CloudRecording(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CloudRecording():load({ meeting_id = "meeting_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:CloudRecording():remove({ meeting_id = "meeting_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:CloudRecording():update({
  meeting_id = "meeting_id",
  body = "body",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CloudRecordingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DashboardEntity

```lua
local dashboard = client:Dashboard(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_type` | `string` | No | Zoom Room email type |
| `calender_name` | `string` | No | Zoom Calendar name |
| `camera` | `string` | No | Zoom Room camera |
| `crc_ports_usage` | `table` | No |  |
| `device_ip` | `string` | No | Zoom Room device IP |
| `email` | `string` | No | Zoom Room email |
| `from` | `string` | No | Start date for this report |
| `id` | `string` | No | Zoom Room ID |
| `last_start_time` | `string` | No | Zoom Room last start time |
| `live_meeting` | `table` | No | Meeting metric details |
| `meetings` | `table` | No | Array of meeting objects |
| `microphone` | `string` | No | Zoom Room microphone |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `participants` | `table` | No | Array of user objects |
| `past_meetings` | `table` | No |  |
| `room_name` | `string` | No | Zoom Room name |
| `speaker` | `string` | No | Zoom Room speaker |
| `status` | `string` | No | Zoom Room status |
| `to` | `string` | No | End date for this report |
| `total_records` | `number` | No | The number of all records available across pages |
| `users` | `table` | No |  |
| `webinars` | `table` | No | Array of webinar objects |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Dashboard():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Dashboard():load({ zoomroom_id = "zoomroom_id", from = "from", to = "to" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DashboardEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DeviceEntity

```lua
local device = client:Device(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `devices` | `table` | No | List of H.323/SIP Device objects |
| `id` | `string` | No |  |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Device():create({
  body = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Device():list()
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Device():remove({ id = "id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Device():update({
  id = "id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeviceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DomainsListEntity

```lua
local domains_list = client:DomainsList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | Domain Name |
| `status` | `string` | No | Domain Status |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DomainsList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainsListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GroupEntity

```lua
local group = client:Group(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |
| `name` | `string` | No | Group name |
| `total_members` | `number` | No | Total number of members in this group |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Group():create({
  body = --[[ any ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Group():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Group():load({ id = "group_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Group():remove({ id = "group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Group():update({
  id = "group_id",
  body = "body",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GroupMemberListEntity

```lua
local group_member_list = client:GroupMemberList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `members` | `table` | No | List of Group member objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:GroupMemberList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupMemberListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImChatEntity

```lua
local im_chat = client:ImChat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start date |
| `messages` | `table` | No | Array of session objects |
| `next_page_token` | `string` | No | Next page token, used to paginate through large result sets. |
| `page_size` | `number` | No | The amount of records returns within a single API call. |
| `session_id` | `string` | No | IM Chat session ID |
| `sessions` | `table` | No | Array of session objects |
| `to` | `string` | No | End date |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ImChat():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ImChat():load({ session_id = "session_id", from = "from", to = "to" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImChatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImGroupEntity

```lua
local im_group = client:ImGroup(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ImGroup():create({
  body = --[[ any ]],
})
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ImGroup():load({ id = "im_group_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:ImGroup():remove({ id = "im_group_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:ImGroup():update({
  id = "im_group_id",
  body = "body",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImGroupEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ImGroupListEntity

```lua
local im_group_list = client:ImGroupList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `table` | No | List of Group objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ImGroupList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImGroupListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeetingEntity

```lua
local meeting = client:Meeting(nil)
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
| `has_3rd_party_audio` | `boolean` | No |  |
| `has_pstn` | `boolean` | No |  |
| `has_recording` | `boolean` | No |  |
| `has_screen_share` | `boolean` | No |  |
| `has_sip` | `boolean` | No |  |
| `has_video` | `boolean` | No |  |
| `has_voip` | `boolean` | No |  |
| `host` | `string` | No | User display name |
| `host_id` | `string` | No | ID of the user set as host of meeting |
| `id` | `string` | No | Meeting Poll ID |
| `join_url` | `string` | No | Join url |
| `meetings` | `table` | No | List of Meeting objects |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `occurrences` | `table` | No | Array of occurrence objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `participants` | `number` | No | Meeting participant count |
| `participants_count` | `number` | No | Number of meeting participants |
| `password` | `string` | No | Meeting password |
| `questions` | `table` | No | Array of Polls |
| `settings` | `table` | No | Meeting Settings |
| `start_time` | `string` | No | Meeting start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Meeting Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `number` | No | Number of meeting minutes |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `table` | No | Tracking fields |
| `type` | `number` | No | Meeting Type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Meeting():create({
  user_id = --[[ string ]],
  body = --[[ any ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Meeting():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Meeting():load({ id = "meeting_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Meeting():remove({ id = "meeting_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Meeting():update({
  id = "meeting_id",
  poll_id = "poll_id",
  body = "body",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeetingInstanceEntity

```lua
local meeting_instance = client:MeetingInstance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meetings` | `table` | No | List of ended meeting instances. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:MeetingInstance():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingInstanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeetingInvitationEntity

```lua
local meeting_invitation = client:MeetingInvitation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `invitation` | `string` | No | Meeting invitation |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MeetingInvitation():load({ id = "meeting_invitation_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingInvitationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MeetingRegistrantListEntity

```lua
local meeting_registrant_list = client:MeetingRegistrantList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MeetingRegistrantList():load({ id = "meeting_registrant_list_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingRegistrantListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PacEntity

```lua
local pac = client:Pac(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `conference_id` | `number` | No | Conference ID |
| `dedicated_dial_in_number` | `table` | Yes | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `table` | Yes | List of Global Dial In Numbers |
| `listen_only_password` | `string` | No | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | No | Participant Password, numeric value, length is less than 6 |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pac():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PacEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PollEntity

```lua
local poll = client:Poll(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `polls` | `table` | No | Array of Polls |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Poll():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PollEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## QosEntity

```lua
local qos = client:Qos(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_input` | `table` | No | Quality of Service object |
| `as_output` | `table` | No | Quality of Service object |
| `audio_input` | `table` | No | Quality of Service object |
| `audio_output` | `table` | No | Quality of Service object |
| `cpu_usage` | `any` | No |  |
| `date_time` | `string` | No | Datetime of QOS |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of items per page |
| `participants` | `table` | No | Array of user objects |
| `total_records` | `number` | No | The number of all records available across pages |
| `video_input` | `table` | No | Quality of Service object |
| `video_output` | `table` | No | Quality of Service object |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Qos():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Qos():load({ participant_id = "participant_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QosEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecordingEntity

```lua
local recording = client:Recording(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start Date, |
| `meetings` | `table` | No | List of Recording |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `to` | `string` | No | End Date |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Recording():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecordingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RecordingSettingEntity

```lua
local recording_setting = client:RecordingSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approval_type` | `number` | No | Approval type |
| `on_demand` | `boolean` | No | Registration required |
| `password` | `string` | No | Password protect |
| `send_email_to_host` | `boolean` | No | Send an email to host when someone registers |
| `share_recording` | `string` | No | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `boolean` | No | Show social share buttons on registration page |
| `viewer_download` | `boolean` | No | Host video |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:RecordingSetting():load({ meeting_id = "meeting_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecordingSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReportEntity

```lua
local report = client:Report(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `number` | No | Meeting duration |
| `email` | `string` | No | Participant email |
| `end_time` | `string` | No | Meeting end time |
| `from` | `string` | No | Start date for this report |
| `id` | `number` | No | Meeting ID |
| `meetings` | `table` | No | Array of meeting objects |
| `name` | `string` | No | Participant display name |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `participants` | `table` | No | Array of meeting participant objects |
| `participants_count` | `number` | No | Number of meeting participants |
| `question_details` | `table` | No | Array of questions from user |
| `start_time` | `string` | No | Meeting start time |
| `to` | `string` | No | End date for this report |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `number` | No | Number of meeting minutes |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `table` | No | Tracking fields |
| `type` | `number` | No | Meeting type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Report():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Report():load({ meeting_id = "meeting_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TrackingFieldEntity

```lua
local tracking_field = client:TrackingField(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `field` | `string` | No | Tracking Field Name |
| `id` | `string` | No | Tracking Field ID |
| `recommended_values` | `table` | No | Array of recommended values |
| `required` | `boolean` | No | Tracking Field Required |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `table` | No | Array of Tracking Fields |
| `visible` | `boolean` | No | Tracking Field Visible |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:TrackingField():create({
  body = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:TrackingField():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TrackingField():load({ id = "tracking_field_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:TrackingField():remove({ id = "tracking_field_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:TrackingField():update({
  id = "tracking_field_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrackingFieldEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TspEntity

```lua
local tsp = client:Tsp(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Country Code |
| `conference_code` | `string` | Yes | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `table` | Yes | List of Dial In Numbers |
| `id` | `string` | No |  |
| `leader_pin` | `string` | Yes | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | No | Dial-in number, length is less than 16 |
| `type` | `string` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Tsp():create({
  user_id = --[[ string ]],
  body = --[[ table ]],
  conference_code = --[[ string ]],
  dial_in_numbers = --[[ table ]],
  leader_pin = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Tsp():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Tsp():load({ id = "tsp_id", user_id = "user_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Tsp():remove({ id = "tsp_id", user_id = "user_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Tsp():update({
  id = "tsp_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TspEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserEntity

```lua
local user = client:User(nil)
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
| `group_ids` | `table` | No |  |
| `host_key` | `string` | No |  |
| `id` | `string` | No | User ID |
| `im_group_ids` | `table` | No |  |
| `language` | `string` | No |  |
| `last_client_version` | `string` | No | User last login client version |
| `last_login_time` | `string` | No | User last login time |
| `last_name` | `string` | No | User's last name |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `personal_meeting_url` | `string` | No |  |
| `pic_url` | `string` | No |  |
| `pmi` | `string` | No | Personal Meeting ID |
| `timezone` | `string` | No | Time Zone |
| `total_records` | `number` | No | The number of all records available across pages |
| `type` | `number` | Yes | User's type |
| `use_pmi` | `boolean` | No |  |
| `users` | `table` | No | List of User objects |
| `vanity_url` | `string` | No |  |
| `verified` | `number` | No |  |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:User():create({
  body = --[[ table ]],
  email = --[[ string ]],
  type = --[[ number ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:User():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:User():load({ id = "user_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:User():remove({ id = "user_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:User():update({
  id = "user_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserAssistantsListEntity

```lua
local user_assistants_list = client:UserAssistantsList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:UserAssistantsList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAssistantsListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserPermissionEntity

```lua
local user_permission = client:UserPermission(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `permissions` | `table` | No | List of user permissions |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:UserPermission():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserPermissionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserSchedulersListEntity

```lua
local user_schedulers_list = client:UserSchedulersList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:UserSchedulersList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserSchedulersListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## UserSettingEntity

```lua
local user_setting = client:UserSetting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `table` | No |  |
| `feature` | `table` | No |  |
| `id` | `string` | No |  |
| `in_meeting` | `table` | No |  |
| `recording` | `table` | No |  |
| `schedule_meeting` | `table` | No |  |
| `telephony` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:UserSetting():load({ id = "user_setting_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserSettingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebhookEntity

```lua
local webhook = client:Webhook(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_password` | `string` | Yes | Webhook auth password |
| `auth_user` | `string` | Yes | Webhook auth user name |
| `created_at` | `string` | No | Webhook create time |
| `events` | `table` | Yes | List of events objects. |
| `id` | `string` | No |  |
| `total_records` | `number` | No | The number of all records available across pages |
| `url` | `string` | Yes | Webhook endpoint |
| `webhook_id` | `string` | No | Webhook Id |
| `webhooks` | `table` | No | List of Webhook objects |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Webhook():create({
  body = --[[ table ]],
  auth_password = --[[ string ]],
  auth_user = --[[ string ]],
  events = --[[ table ]],
  url = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Webhook():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Webhook():load({ id = "webhook_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Webhook():remove({ id = "webhook_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Webhook():update({
  id = "webhook_id",
  body = {},
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebinarEntity

```lua
local webinar = client:Webinar(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `string` | No | Webinar agenda |
| `created_at` | `string` | No | Create time |
| `duration` | `string` | No | Webinar duration |
| `email` | `string` | No | User email |
| `end_time` | `string` | No | Webinar end time |
| `has_3rd_party_audio` | `boolean` | No |  |
| `has_pstn` | `boolean` | No |  |
| `has_recording` | `boolean` | No |  |
| `has_screen_share` | `boolean` | No |  |
| `has_sip` | `boolean` | No |  |
| `has_video` | `boolean` | No |  |
| `has_voip` | `boolean` | No |  |
| `host` | `string` | No | User display name |
| `host_id` | `string` | No | ID of the user set as host of webinar |
| `id` | `string` | No | Webinar Poll ID |
| `join_url` | `string` | No | Join url |
| `occurrences` | `table` | No | Array of occurrence objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `participants` | `number` | No | Webinar participant count |
| `questions` | `table` | No | Array of Polls |
| `settings` | `table` | No | Webinar Settings |
| `start_time` | `string` | No | Webinar start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Webinar Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Webinar topic |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `table` | No | Tracking fields |
| `type` | `number` | No | Webinar Type |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Webinar UUID |
| `webinars` | `table` | No | List of Webinar objects |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Webinar():create({
  user_id = --[[ string ]],
  body = --[[ table ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Webinar():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Webinar():load({ id = "webinar_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Webinar():remove({ id = "webinar_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Webinar():update({
  id = "webinar_id",
  poll_id = "poll_id",
  body = "body",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebinarInstanceEntity

```lua
local webinar_instance = client:WebinarInstance(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webinars` | `table` | No | List of ended webinar instances. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WebinarInstance():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarInstanceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebinarPanelistListEntity

```lua
local webinar_panelist_list = client:WebinarPanelistList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `panelists` | `table` | No | List of Panelist objects |
| `total_records` | `number` | No | Total records |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WebinarPanelistList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarPanelistListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WebinarRegistrantListEntity

```lua
local webinar_registrant_list = client:WebinarRegistrantList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WebinarRegistrantList():load({ id = "webinar_registrant_list_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarRegistrantListEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ZoomRoomListEntity

```lua
local zoom_room_list = client:ZoomRoomList(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |
| `zoom_rooms` | `table` | No | Array of Zoom Rooms |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ZoomRoomList():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoomRoomListEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    debug = { active = true },
    idempotency = { active = true },
    metrics = { active = true },
    paging = { active = true },
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
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

