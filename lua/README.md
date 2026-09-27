# Zoom Lua SDK



The Lua SDK for the Zoom API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Account()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/zoom-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("zoom_sdk")

local client = sdk.new({
  apikey = os.getenv("ZOOM_APIKEY"),
})
```

### 2. List account records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local accounts, err = client:Account():list()
if err then error(err) end

for _, item in ipairs(accounts) do
  print(item["id"])
end
```

### 3. Load a billing

Billing is nested under account, so provide the `account_id`.

```lua
local billing, err = client:Billing():load({ account_id = "example_account_id" })
if err then error(err) end
print(billing)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Account():create({ body = {} })
if err then error(err) end

-- Update
client:Account():update({ id = created:data_get()["id"], body = {}, accounts = {} })

-- Remove
client:Account():remove({ id = created:data_get()["id"] })
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local usersetting, err = client:UserSetting():load({ id = "example_id" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:UserSetting():load({ id = "test01" })
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ZOOM_TEST_LIVE=TRUE
ZOOM_APIKEY=<your-key>
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### ZoomSDK

```lua
local sdk = require("zoom_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ZoomSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Account` | `(data) -> AccountEntity` | Create an Account entity instance. |
| `AccountPlan` | `(data) -> AccountPlanEntity` | Create an AccountPlan entity instance. |
| `AccountSetting` | `(data) -> AccountSettingEntity` | Create an AccountSetting entity instance. |
| `Billing` | `(data) -> BillingEntity` | Create a Billing entity instance. |
| `CloudRecording` | `(data) -> CloudRecordingEntity` | Create a CloudRecording entity instance. |
| `Dashboard` | `(data) -> DashboardEntity` | Create a Dashboard entity instance. |
| `Device` | `(data) -> DeviceEntity` | Create a Device entity instance. |
| `DomainsList` | `(data) -> DomainsListEntity` | Create a DomainsList entity instance. |
| `Group` | `(data) -> GroupEntity` | Create a Group entity instance. |
| `GroupMemberList` | `(data) -> GroupMemberListEntity` | Create a GroupMemberList entity instance. |
| `ImChat` | `(data) -> ImChatEntity` | Create an ImChat entity instance. |
| `ImGroup` | `(data) -> ImGroupEntity` | Create an ImGroup entity instance. |
| `ImGroupList` | `(data) -> ImGroupListEntity` | Create an ImGroupList entity instance. |
| `Meeting` | `(data) -> MeetingEntity` | Create a Meeting entity instance. |
| `MeetingInstance` | `(data) -> MeetingInstanceEntity` | Create a MeetingInstance entity instance. |
| `MeetingInvitation` | `(data) -> MeetingInvitationEntity` | Create a MeetingInvitation entity instance. |
| `MeetingRegistrantList` | `(data) -> MeetingRegistrantListEntity` | Create a MeetingRegistrantList entity instance. |
| `Pac` | `(data) -> PacEntity` | Create a Pac entity instance. |
| `Poll` | `(data) -> PollEntity` | Create a Poll entity instance. |
| `Qos` | `(data) -> QosEntity` | Create a Qos entity instance. |
| `Recording` | `(data) -> RecordingEntity` | Create a Recording entity instance. |
| `RecordingSetting` | `(data) -> RecordingSettingEntity` | Create a RecordingSetting entity instance. |
| `Report` | `(data) -> ReportEntity` | Create a Report entity instance. |
| `TrackingField` | `(data) -> TrackingFieldEntity` | Create a TrackingField entity instance. |
| `Tsp` | `(data) -> TspEntity` | Create a Tsp entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |
| `UserAssistantsList` | `(data) -> UserAssistantsListEntity` | Create an UserAssistantsList entity instance. |
| `UserPermission` | `(data) -> UserPermissionEntity` | Create an UserPermission entity instance. |
| `UserSchedulersList` | `(data) -> UserSchedulersListEntity` | Create an UserSchedulersList entity instance. |
| `UserSetting` | `(data) -> UserSettingEntity` | Create an UserSetting entity instance. |
| `Webhook` | `(data) -> WebhookEntity` | Create a Webhook entity instance. |
| `Webinar` | `(data) -> WebinarEntity` | Create a Webinar entity instance. |
| `WebinarInstance` | `(data) -> WebinarInstanceEntity` | Create a WebinarInstance entity instance. |
| `WebinarPanelistList` | `(data) -> WebinarPanelistListEntity` | Create a WebinarPanelistList entity instance. |
| `WebinarRegistrantList` | `(data) -> WebinarRegistrantListEntity` | Create a WebinarRegistrantList entity instance. |
| `ZoomRoomList` | `(data) -> ZoomRoomListEntity` | Create a ZoomRoomList entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local account, err = client:Account():load({ id = "example_id" })
    if err then error(err) end
    -- account is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local account = client:Account(nil)`

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
| `accounts` | `table` | List of Account objects |
| `id` | `string` |  |
| `meeting_connectors` | `string` | Meeting Connector, multiple values separated by comma |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `pay_mode` | `string` | Payee |
| `room_connectors` | `string` | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `boolean` | Enable Share Meeting Connector |
| `share_rc` | `boolean` | Enable Share Virtual Room Connector |
| `total_records` | `number` | The number of all records available across pages |

#### Example: Load

```lua
local account, err = client:Account():load({ id = "account_id" })
```

#### Example: List

```lua
local accounts, err = client:Account():list()
```

#### Example: Create

```lua
local account, err = client:Account():create({
  body = {}, -- table
})
```


### AccountPlan

Create an instance: `local account_plan = client:AccountPlan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `plan_audio` | `table` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `table` | Account base plan object |
| `plan_large_meeting` | `table` | Additional Large Meeting Plans |
| `plan_recording` | `string` | Additional Cloud Recording Plan |
| `plan_room_connector` | `table` | Account plan object |
| `plan_webinar` | `table` | Additional Webinar Plans |
| `plan_zoom_rooms` | `table` | Account plan object |

#### Example: List

```lua
local account_plans, err = client:AccountPlan():list()
```

#### Example: Create

```lua
local account_plan, err = client:AccountPlan():create({
  id = "example_id", -- string
  body = "example_body", -- any
  plan_base = {}, -- table
})
```


### AccountSetting

Create an instance: `local account_setting = client:AccountSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `table` | Account Settings: Notification |
| `feature` | `table` | Account Settings: Feature |
| `id` | `string` |  |
| `in_meeting` | `table` | Account Settings: In Meeting |
| `integration` | `table` | Account Settings: Integration |
| `recording` | `table` | Account Settings: Recording |
| `schedule_meting` | `table` | Account Settings: Schedule Meeting |
| `security` | `table` | Account Settings: Security |
| `telephony` | `table` | Account Settings: Telephony |
| `zoom_rooms` | `table` | Account Settings: Zoom Rooms |

#### Example: Load

```lua
local account_setting, err = client:AccountSetting():load({ id = "account_setting_id" })
```


### Billing

Create an instance: `local billing = client:Billing(nil)`

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

```lua
local billing, err = client:Billing():load({ account_id = "account_id" })
```

#### Example: Create

```lua
local billing, err = client:Billing():create({
  account_id = "example_account_id", -- string
  body = {}, -- table
  address = "example_address", -- string
  city = "example_city", -- string
  country = "example_country", -- string
  email = "example_email", -- string
  first_name = "example_first_name", -- string
  last_name = "example_last_name", -- string
  phone_number = "example_phone_number", -- string
  state = "example_state", -- string
  zip = "example_zip", -- string
})
```


### CloudRecording

Create an instance: `local cloud_recording = client:CloudRecording(nil)`

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

```lua
local cloud_recording, err = client:CloudRecording():load({ meeting_id = "meeting_id" })
```


### Dashboard

Create an instance: `local dashboard = client:Dashboard(nil)`

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
| `crc_ports_usage` | `table` |  |
| `device_ip` | `string` | Zoom Room device IP |
| `email` | `string` | Zoom Room email |
| `from` | `string` | Start date for this report |
| `id` | `string` | Zoom Room ID |
| `last_start_time` | `string` | Zoom Room last start time |
| `live_meeting` | `table` | Meeting metric details |
| `meetings` | `table` | Array of meeting objects |
| `microphone` | `string` | Zoom Room microphone |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `participants` | `table` | Array of user objects |
| `past_meetings` | `table` |  |
| `room_name` | `string` | Zoom Room name |
| `speaker` | `string` | Zoom Room speaker |
| `status` | `string` | Zoom Room status |
| `to` | `string` | End date for this report |
| `total_records` | `number` | The number of all records available across pages |
| `users` | `table` |  |
| `webinars` | `table` | Array of webinar objects |

#### Example: Load

```lua
local dashboard, err = client:Dashboard():load({ zoomroom_id = "zoomroom_id", from = "from", to = "to" })
```

#### Example: List

```lua
local dashboards, err = client:Dashboard():list()
```


### Device

Create an instance: `local device = client:Device(nil)`

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
| `devices` | `table` | List of H.323/SIP Device objects |
| `id` | `string` |  |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```lua
local devices, err = client:Device():list()
```

#### Example: Create

```lua
local device, err = client:Device():create({
  body = {}, -- table
})
```


### DomainsList

Create an instance: `local domains_list = client:DomainsList(nil)`

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

```lua
local domains_lists, err = client:DomainsList():list()
```


### Group

Create an instance: `local group = client:Group(nil)`

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
| `total_members` | `number` | Total number of members in this group |

#### Example: Load

```lua
local group, err = client:Group():load({ id = "group_id" })
```

#### Example: List

```lua
local groups, err = client:Group():list()
```

#### Example: Create

```lua
local group, err = client:Group():create({
  body = "example_body", -- any
})
```


### GroupMemberList

Create an instance: `local group_member_list = client:GroupMemberList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `members` | `table` | List of Group member objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```lua
local group_member_lists, err = client:GroupMemberList():list()
```


### ImChat

Create an instance: `local im_chat = client:ImChat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start date |
| `messages` | `table` | Array of session objects |
| `next_page_token` | `string` | Next page token, used to paginate through large result sets. |
| `page_size` | `number` | The amount of records returns within a single API call. |
| `session_id` | `string` | IM Chat session ID |
| `sessions` | `table` | Array of session objects |
| `to` | `string` | End date |

#### Example: Load

```lua
local im_chat, err = client:ImChat():load({ session_id = "session_id", from = "from", to = "to" })
```

#### Example: List

```lua
local im_chats, err = client:ImChat():list()
```


### ImGroup

Create an instance: `local im_group = client:ImGroup(nil)`

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

```lua
local im_group, err = client:ImGroup():load({ id = "im_group_id" })
```

#### Example: Create

```lua
local im_group, err = client:ImGroup():create({
  body = "example_body", -- any
})
```


### ImGroupList

Create an instance: `local im_group_list = client:ImGroupList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `groups` | `table` | List of Group objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```lua
local im_group_lists, err = client:ImGroupList():list()
```


### Meeting

Create an instance: `local meeting = client:Meeting(nil)`

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
| `has_3rd_party_audio` | `boolean` |  |
| `has_pstn` | `boolean` |  |
| `has_recording` | `boolean` |  |
| `has_screen_share` | `boolean` |  |
| `has_sip` | `boolean` |  |
| `has_video` | `boolean` |  |
| `has_voip` | `boolean` |  |
| `host` | `string` | User display name |
| `host_id` | `string` | ID of the user set as host of meeting |
| `id` | `string` | Meeting Poll ID |
| `join_url` | `string` | Join url |
| `meetings` | `table` | List of Meeting objects |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `occurrences` | `table` | Array of occurrence objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `participants` | `number` | Meeting participant count |
| `participants_count` | `number` | Number of meeting participants |
| `password` | `string` | Meeting password |
| `questions` | `table` | Array of Polls |
| `settings` | `table` | Meeting Settings |
| `start_time` | `string` | Meeting start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Meeting Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `number` | Number of meeting minutes |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `table` | Tracking fields |
| `type` | `number` | Meeting Type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `user_type` | `string` | User type |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```lua
local meeting, err = client:Meeting():load({ id = "meeting_id" })
```

#### Example: List

```lua
local meetings, err = client:Meeting():list()
```

#### Example: Create

```lua
local meeting, err = client:Meeting():create({
  user_id = "example_user_id", -- string
  body = "example_body", -- any
})
```


### MeetingInstance

Create an instance: `local meeting_instance = client:MeetingInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetings` | `table` | List of ended meeting instances. |

#### Example: List

```lua
local meeting_instances, err = client:MeetingInstance():list()
```


### MeetingInvitation

Create an instance: `local meeting_invitation = client:MeetingInvitation(nil)`

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

```lua
local meeting_invitation, err = client:MeetingInvitation():load({ id = "meeting_invitation_id" })
```


### MeetingRegistrantList

Create an instance: `local meeting_registrant_list = client:MeetingRegistrantList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local meeting_registrant_list, err = client:MeetingRegistrantList():load({ id = "meeting_registrant_list_id" })
```


### Pac

Create an instance: `local pac = client:Pac(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `conference_id` | `number` | Conference ID |
| `dedicated_dial_in_number` | `table` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `table` | List of Global Dial In Numbers |
| `listen_only_password` | `string` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | Participant Password, numeric value, length is less than 6 |

#### Example: List

```lua
local pacs, err = client:Pac():list()
```


### Poll

Create an instance: `local poll = client:Poll(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `polls` | `table` | Array of Polls |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```lua
local polls, err = client:Poll():list()
```


### Qos

Create an instance: `local qos = client:Qos(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_input` | `table` | Quality of Service object |
| `as_output` | `table` | Quality of Service object |
| `audio_input` | `table` | Quality of Service object |
| `audio_output` | `table` | Quality of Service object |
| `cpu_usage` | `any` |  |
| `date_time` | `string` | Datetime of QOS |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of items per page |
| `participants` | `table` | Array of user objects |
| `total_records` | `number` | The number of all records available across pages |
| `video_input` | `table` | Quality of Service object |
| `video_output` | `table` | Quality of Service object |

#### Example: Load

```lua
local qos, err = client:Qos():load({ participant_id = "participant_id" })
```

#### Example: List

```lua
local qoss, err = client:Qos():list()
```


### Recording

Create an instance: `local recording = client:Recording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start Date, |
| `meetings` | `table` | List of Recording |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `to` | `string` | End Date |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```lua
local recordings, err = client:Recording():list()
```


### RecordingSetting

Create an instance: `local recording_setting = client:RecordingSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approval_type` | `number` | Approval type |
| `on_demand` | `boolean` | Registration required |
| `password` | `string` | Password protect |
| `send_email_to_host` | `boolean` | Send an email to host when someone registers |
| `share_recording` | `string` | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `boolean` | Show social share buttons on registration page |
| `viewer_download` | `boolean` | Host video |

#### Example: Load

```lua
local recording_setting, err = client:RecordingSetting():load({ meeting_id = "meeting_id" })
```


### Report

Create an instance: `local report = client:Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `number` | Meeting duration |
| `email` | `string` | Participant email |
| `end_time` | `string` | Meeting end time |
| `from` | `string` | Start date for this report |
| `id` | `number` | Meeting ID |
| `meetings` | `table` | Array of meeting objects |
| `name` | `string` | Participant display name |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `participants` | `table` | Array of meeting participant objects |
| `participants_count` | `number` | Number of meeting participants |
| `question_details` | `table` | Array of questions from user |
| `start_time` | `string` | Meeting start time |
| `to` | `string` | End date for this report |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `number` | Number of meeting minutes |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `table` | Tracking fields |
| `type` | `number` | Meeting type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```lua
local report, err = client:Report():load({ meeting_id = "meeting_id" })
```

#### Example: List

```lua
local reports, err = client:Report():list()
```


### TrackingField

Create an instance: `local tracking_field = client:TrackingField(nil)`

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
| `recommended_values` | `table` | Array of recommended values |
| `required` | `boolean` | Tracking Field Required |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `table` | Array of Tracking Fields |
| `visible` | `boolean` | Tracking Field Visible |

#### Example: Load

```lua
local tracking_field, err = client:TrackingField():load({ id = "tracking_field_id" })
```

#### Example: List

```lua
local tracking_fields, err = client:TrackingField():list()
```

#### Example: Create

```lua
local tracking_field, err = client:TrackingField():create({
  body = {}, -- table
})
```


### Tsp

Create an instance: `local tsp = client:Tsp(nil)`

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
| `dial_in_numbers` | `table` | List of Dial In Numbers |
| `id` | `string` |  |
| `leader_pin` | `string` | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | Dial-in number, length is less than 16 |
| `type` | `string` |  |

#### Example: Load

```lua
local tsp, err = client:Tsp():load({ id = "tsp_id", user_id = "user_id" })
```

#### Example: List

```lua
local tsps, err = client:Tsp():list()
```

#### Example: Create

```lua
local tsp, err = client:Tsp():create({
  user_id = "example_user_id", -- string
  body = {}, -- table
  conference_code = "example_conference_code", -- string
  dial_in_numbers = {}, -- table
  leader_pin = "example_leader_pin", -- string
})
```


### User

Create an instance: `local user = client:User(nil)`

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
| `group_ids` | `table` |  |
| `host_key` | `string` |  |
| `id` | `string` | User ID |
| `im_group_ids` | `table` |  |
| `language` | `string` |  |
| `last_client_version` | `string` | User last login client version |
| `last_login_time` | `string` | User last login time |
| `last_name` | `string` | User's last name |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `personal_meeting_url` | `string` |  |
| `pic_url` | `string` |  |
| `pmi` | `string` | Personal Meeting ID |
| `timezone` | `string` | Time Zone |
| `total_records` | `number` | The number of all records available across pages |
| `type` | `number` | User's type |
| `use_pmi` | `boolean` |  |
| `users` | `table` | List of User objects |
| `vanity_url` | `string` |  |
| `verified` | `number` |  |

#### Example: Load

```lua
local user, err = client:User():load({ id = "user_id" })
```

#### Example: List

```lua
local users, err = client:User():list()
```

#### Example: Create

```lua
local user, err = client:User():create({
  body = {}, -- table
  email = "example_email", -- string
  type = 1, -- number
})
```


### UserAssistantsList

Create an instance: `local user_assistants_list = client:UserAssistantsList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```lua
local user_assistants_lists, err = client:UserAssistantsList():list()
```


### UserPermission

Create an instance: `local user_permission = client:UserPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `permissions` | `table` | List of user permissions |

#### Example: List

```lua
local user_permissions, err = client:UserPermission():list()
```


### UserSchedulersList

Create an instance: `local user_schedulers_list = client:UserSchedulersList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```lua
local user_schedulers_lists, err = client:UserSchedulersList():list()
```


### UserSetting

Create an instance: `local user_setting = client:UserSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `table` |  |
| `feature` | `table` |  |
| `id` | `string` |  |
| `in_meeting` | `table` |  |
| `recording` | `table` |  |
| `schedule_meeting` | `table` |  |
| `telephony` | `table` |  |

#### Example: Load

```lua
local user_setting, err = client:UserSetting():load({ id = "user_setting_id" })
```


### Webhook

Create an instance: `local webhook = client:Webhook(nil)`

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
| `events` | `table` | List of events objects. |
| `id` | `string` |  |
| `total_records` | `number` | The number of all records available across pages |
| `url` | `string` | Webhook endpoint |
| `webhook_id` | `string` | Webhook Id |
| `webhooks` | `table` | List of Webhook objects |

#### Example: Load

```lua
local webhook, err = client:Webhook():load({ id = "webhook_id" })
```

#### Example: List

```lua
local webhooks, err = client:Webhook():list()
```

#### Example: Create

```lua
local webhook, err = client:Webhook():create({
  body = {}, -- table
  auth_password = "example_auth_password", -- string
  auth_user = "example_auth_user", -- string
  events = {}, -- table
  url = "example_url", -- string
})
```


### Webinar

Create an instance: `local webinar = client:Webinar(nil)`

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
| `has_3rd_party_audio` | `boolean` |  |
| `has_pstn` | `boolean` |  |
| `has_recording` | `boolean` |  |
| `has_screen_share` | `boolean` |  |
| `has_sip` | `boolean` |  |
| `has_video` | `boolean` |  |
| `has_voip` | `boolean` |  |
| `host` | `string` | User display name |
| `host_id` | `string` | ID of the user set as host of webinar |
| `id` | `string` | Webinar Poll ID |
| `join_url` | `string` | Join url |
| `occurrences` | `table` | Array of occurrence objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `participants` | `number` | Webinar participant count |
| `questions` | `table` | Array of Polls |
| `settings` | `table` | Webinar Settings |
| `start_time` | `string` | Webinar start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Webinar Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Webinar topic |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `table` | Tracking fields |
| `type` | `number` | Webinar Type |
| `user_type` | `string` | User type |
| `uuid` | `string` | Webinar UUID |
| `webinars` | `table` | List of Webinar objects |

#### Example: Load

```lua
local webinar, err = client:Webinar():load({ id = "webinar_id" })
```

#### Example: List

```lua
local webinars, err = client:Webinar():list()
```

#### Example: Create

```lua
local webinar, err = client:Webinar():create({
  user_id = "example_user_id", -- string
  body = {}, -- table
})
```


### WebinarInstance

Create an instance: `local webinar_instance = client:WebinarInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `webinars` | `table` | List of ended webinar instances. |

#### Example: List

```lua
local webinar_instances, err = client:WebinarInstance():list()
```


### WebinarPanelistList

Create an instance: `local webinar_panelist_list = client:WebinarPanelistList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `panelists` | `table` | List of Panelist objects |
| `total_records` | `number` | Total records |

#### Example: List

```lua
local webinar_panelist_lists, err = client:WebinarPanelistList():list()
```


### WebinarRegistrantList

Create an instance: `local webinar_registrant_list = client:WebinarRegistrantList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```lua
local webinar_registrant_list, err = client:WebinarRegistrantList():load({ id = "webinar_registrant_list_id" })
```


### ZoomRoomList

Create an instance: `local zoom_room_list = client:ZoomRoomList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |
| `zoom_rooms` | `table` | Array of Zoom Rooms |

#### Example: List

```lua
local zoom_room_lists, err = client:ZoomRoomList():list()
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

Features are the extension mechanism. A feature is a Lua table
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

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── zoom_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`zoom_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local usersetting = client:UserSetting()
usersetting:load({ id = "example_id" })

-- usersetting:data_get() now returns the usersetting data from the last load
-- usersetting:match_get() returns the last match criteria
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
