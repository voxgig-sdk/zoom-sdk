# Zoom Python SDK



The Python SDK for the Zoom API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Account()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/zoom-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from zoom_sdk import ZoomSDK

client = ZoomSDK({
    "apikey": os.environ.get("ZOOM_APIKEY"),
})
```

### 2. List account records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    accounts = client.Account().list()
    for account in accounts:
        print(account)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a billing

Billing is nested under account, so provide the `account_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    billing = client.Billing().load({"account_id": "example_account_id"})
    print(billing)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.Account().create({"body": {}})

# Update — the created record's id is a plain dict key
client.Account().update({"id": created.data_get()["id"], "body": {}, "accounts": []})

# Remove
client.Account().remove({"id": created.data_get()["id"]})
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    usersetting = client.UserSetting().load({"id": "example_id"})
    print(usersetting)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ZoomSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
usersetting = client.UserSetting().load({"id": "test01"})
# usersetting contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ZoomSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ZoomSDK

```python
from zoom_sdk import ZoomSDK

client = ZoomSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ZoomSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ZoomSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `account = client.Account()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `list` | List of Account objects |
| `id` | `str` |  |
| `meeting_connectors` | `str` | Meeting Connector, multiple values separated by comma |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `pay_mode` | `str` | Payee |
| `room_connectors` | `str` | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `bool` | Enable Share Meeting Connector |
| `share_rc` | `bool` | Enable Share Virtual Room Connector |
| `total_records` | `int` | The number of all records available across pages |

#### Example: Load

```python
account = client.Account().load({"id": "account_id"})
```

#### Example: List

```python
accounts = client.Account().list()
```

#### Example: Create

```python
account = client.Account().create({
    "body": {},  # dict
})
```


### AccountPlan

Create an instance: `account_plan = client.AccountPlan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `plan_audio` | `dict` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `dict` | Account base plan object |
| `plan_large_meeting` | `list` | Additional Large Meeting Plans |
| `plan_recording` | `str` | Additional Cloud Recording Plan |
| `plan_room_connector` | `dict` | Account plan object |
| `plan_webinar` | `list` | Additional Webinar Plans |
| `plan_zoom_rooms` | `dict` | Account plan object |

#### Example: List

```python
account_plans = client.AccountPlan().list({"id": "example"})
```

#### Example: Create

```python
account_plan = client.AccountPlan().create({
    "id": "example_id",  # str
    "body": "example_body",  # Any
    "plan_base": {},  # dict
})
```


### AccountSetting

Create an instance: `account_setting = client.AccountSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `dict` | Account Settings: Notification |
| `feature` | `dict` | Account Settings: Feature |
| `id` | `str` |  |
| `in_meeting` | `dict` | Account Settings: In Meeting |
| `integration` | `dict` | Account Settings: Integration |
| `recording` | `dict` | Account Settings: Recording |
| `schedule_meting` | `dict` | Account Settings: Schedule Meeting |
| `security` | `dict` | Account Settings: Security |
| `telephony` | `dict` | Account Settings: Telephony |
| `zoom_rooms` | `dict` | Account Settings: Zoom Rooms |

#### Example: Load

```python
account_setting = client.AccountSetting().load({"id": "account_setting_id"})
```


### Billing

Create an instance: `billing = client.Billing()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `address` | `str` | Billing Contact's address |
| `apt` | `str` | Billing Contact's apartment/suite |
| `city` | `str` | Billing Contact's city |
| `country` | `str` | Billing Contact's country |
| `email` | `str` | Billing Contact's email address |
| `first_name` | `str` | Billing Contact's first name |
| `last_name` | `str` | Billing Contact's last name |
| `phone_number` | `str` | Billing Contact's phone number |
| `state` | `str` | Billing Contact's state |
| `zip` | `str` | Billing Contact's zip/postal code |

#### Example: Load

```python
billing = client.Billing().load({"account_id": "account_id"})
```

#### Example: Create

```python
billing = client.Billing().create({
    "account_id": "example_account_id",  # str
    "body": {},  # dict
    "address": "example_address",  # str
    "city": "example_city",  # str
    "country": "example_country",  # str
    "email": "example_email",  # str
    "first_name": "example_first_name",  # str
    "last_name": "example_last_name",  # str
    "phone_number": "example_phone_number",  # str
    "state": "example_state",  # str
    "zip": "example_zip",  # str
})
```


### CloudRecording

Create an instance: `cloud_recording = client.CloudRecording()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
cloud_recording = client.CloudRecording().load({"meeting_id": "meeting_id"})
```


### Dashboard

Create an instance: `dashboard = client.Dashboard()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_type` | `str` | Zoom Room email type |
| `calender_name` | `str` | Zoom Calendar name |
| `camera` | `str` | Zoom Room camera |
| `crc_ports_usage` | `list` |  |
| `device_ip` | `str` | Zoom Room device IP |
| `email` | `str` | Zoom Room email |
| `from` | `str` | Start date for this report |
| `id` | `str` | Zoom Room ID |
| `last_start_time` | `str` | Zoom Room last start time |
| `live_meeting` | `dict` | Meeting metric details |
| `meetings` | `list` | Array of meeting objects |
| `microphone` | `str` | Zoom Room microphone |
| `next_page_token` | `str` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `list` | Array of user objects |
| `past_meetings` | `dict` |  |
| `room_name` | `str` | Zoom Room name |
| `speaker` | `str` | Zoom Room speaker |
| `status` | `str` | Zoom Room status |
| `to` | `str` | End date for this report |
| `total_records` | `int` | The number of all records available across pages |
| `users` | `list` |  |
| `webinars` | `list` | Array of webinar objects |

#### Example: Load

```python
dashboard = client.Dashboard().load({"zoomroom_id": "zoomroom_id", "from": "from", "to": "to"})
```

#### Example: List

```python
dashboards = client.Dashboard().list({"from": "example", "to": "example"})
```


### Device

Create an instance: `device = client.Device()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `devices` | `list` | List of H.323/SIP Device objects |
| `id` | `str` |  |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```python
devices = client.Device().list()
```

#### Example: Create

```python
device = client.Device().create({
    "body": {},  # dict
})
```


### DomainsList

Create an instance: `domains_list = client.DomainsList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `str` | Domain Name |
| `status` | `str` | Domain Status |

#### Example: List

```python
domains_lists = client.DomainsList().list({"account_id": "example"})
```


### Group

Create an instance: `group = client.Group()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` | Group ID |
| `name` | `str` | Group name |
| `total_members` | `int` | Total number of members in this group |

#### Example: Load

```python
group = client.Group().load({"id": "group_id"})
```

#### Example: List

```python
groups = client.Group().list()
```

#### Example: Create

```python
group = client.Group().create({
    "body": "example_body",  # Any
})
```


### GroupMemberList

Create an instance: `group_member_list = client.GroupMemberList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `members` | `list` | List of Group member objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```python
group_member_lists = client.GroupMemberList().list({"id": "example"})
```


### ImChat

Create an instance: `im_chat = client.ImChat()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `str` | Start date |
| `messages` | `list` | Array of session objects |
| `next_page_token` | `str` | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | The amount of records returns within a single API call. |
| `session_id` | `str` | IM Chat session ID |
| `sessions` | `list` | Array of session objects |
| `to` | `str` | End date |

#### Example: Load

```python
im_chat = client.ImChat().load({"session_id": "session_id", "from": "from", "to": "to"})
```

#### Example: List

```python
im_chats = client.ImChat().list({"from": "example", "to": "example"})
```


### ImGroup

Create an instance: `im_group = client.ImGroup()`

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
| `id` | `str` | Group ID |

#### Example: Load

```python
im_group = client.ImGroup().load({"id": "im_group_id"})
```

#### Example: Create

```python
im_group = client.ImGroup().create({
    "body": "example_body",  # Any
})
```


### ImGroupList

Create an instance: `im_group_list = client.ImGroupList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `groups` | `list` | List of Group objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```python
im_group_lists = client.ImGroupList().list()
```


### Meeting

Create an instance: `meeting = client.Meeting()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda` | `str` | Agenda |
| `created_at` | `str` | Create time |
| `duration` | `str` | Meeting duration |
| `email` | `str` | User email |
| `end_time` | `str` | Meeting end time |
| `h323_password` | `str` | H.323/SIP room system password |
| `has_3rd_party_audio` | `bool` |  |
| `has_pstn` | `bool` |  |
| `has_recording` | `bool` |  |
| `has_screen_share` | `bool` |  |
| `has_sip` | `bool` |  |
| `has_video` | `bool` |  |
| `has_voip` | `bool` |  |
| `host` | `str` | User display name |
| `host_id` | `str` | ID of the user set as host of meeting |
| `id` | `str` | Meeting Poll ID |
| `join_url` | `str` | Join url |
| `meetings` | `list` | List of Meeting objects |
| `next_page_token` | `str` | Next page token is used to paginate through large result sets. |
| `occurrences` | `list` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Meeting participant count |
| `participants_count` | `int` | Number of meeting participants |
| `password` | `str` | Meeting password |
| `questions` | `list` | Array of Polls |
| `settings` | `dict` | Meeting Settings |
| `start_time` | `str` | Meeting start time |
| `start_url` | `str` | Start url |
| `status` | `str` | Status of the Meeting Poll |
| `timezone` | `str` | Timezone to format start_time |
| `title` | `str` | Poll Title |
| `topic` | `str` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `list` | Tracking fields |
| `type` | `int` | Meeting Type |
| `user_email` | `str` | User email |
| `user_name` | `str` | User display name |
| `user_type` | `str` | User type |
| `uuid` | `str` | Meeting UUID |

#### Example: Load

```python
meeting = client.Meeting().load({"id": "meeting_id"})
```

#### Example: List

```python
meetings = client.Meeting().list({"user_id": "example"})
```

#### Example: Create

```python
meeting = client.Meeting().create({
    "user_id": "example_user_id",  # str
    "body": "example_body",  # Any
})
```


### MeetingInstance

Create an instance: `meeting_instance = client.MeetingInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetings` | `list` | List of ended meeting instances. |

#### Example: List

```python
meeting_instances = client.MeetingInstance().list({"past_meeting_id": "example"})
```


### MeetingInvitation

Create an instance: `meeting_invitation = client.MeetingInvitation()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `invitation` | `str` | Meeting invitation |

#### Example: Load

```python
meeting_invitation = client.MeetingInvitation().load({"id": "meeting_invitation_id"})
```


### MeetingRegistrantList

Create an instance: `meeting_registrant_list = client.MeetingRegistrantList()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
meeting_registrant_list = client.MeetingRegistrantList().load({"id": "meeting_registrant_list_id"})
```


### Pac

Create an instance: `pac = client.Pac()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `conference_id` | `int` | Conference ID |
| `dedicated_dial_in_number` | `list` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `list` | List of Global Dial In Numbers |
| `listen_only_password` | `str` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `str` | Participant Password, numeric value, length is less than 6 |

#### Example: List

```python
pacs = client.Pac().list({"user_id": "example"})
```


### Poll

Create an instance: `poll = client.Poll()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `polls` | `list` | Array of Polls |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```python
polls = client.Poll().list({"meeting_id": "example"})
```


### Qos

Create an instance: `qos = client.Qos()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_input` | `dict` | Quality of Service object |
| `as_output` | `dict` | Quality of Service object |
| `audio_input` | `dict` | Quality of Service object |
| `audio_output` | `dict` | Quality of Service object |
| `cpu_usage` | `Any` |  |
| `date_time` | `str` | Datetime of QOS |
| `next_page_token` | `str` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of items per page |
| `participants` | `list` | Array of user objects |
| `total_records` | `int` | The number of all records available across pages |
| `video_input` | `dict` | Quality of Service object |
| `video_output` | `dict` | Quality of Service object |

#### Example: Load

```python
qos = client.Qos().load({"participant_id": "participant_id"})
```

#### Example: List

```python
qoss = client.Qos().list({"meeting_id": "example"})
```


### Recording

Create an instance: `recording = client.Recording()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `str` | Start Date, |
| `meetings` | `list` | List of Recording |
| `next_page_token` | `str` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `to` | `str` | End Date |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```python
recordings = client.Recording().list({"user_id": "example", "from": "example", "to": "example"})
```


### RecordingSetting

Create an instance: `recording_setting = client.RecordingSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `approval_type` | `int` | Approval type |
| `on_demand` | `bool` | Registration required |
| `password` | `str` | Password protect |
| `send_email_to_host` | `bool` | Send an email to host when someone registers |
| `share_recording` | `str` | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `bool` | Show social share buttons on registration page |
| `viewer_download` | `bool` | Host video |

#### Example: Load

```python
recording_setting = client.RecordingSetting().load({"meeting_id": "meeting_id"})
```


### Report

Create an instance: `report = client.Report()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Meeting duration |
| `email` | `str` | Participant email |
| `end_time` | `str` | Meeting end time |
| `from` | `str` | Start date for this report |
| `id` | `int` | Meeting ID |
| `meetings` | `list` | Array of meeting objects |
| `name` | `str` | Participant display name |
| `next_page_token` | `str` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `list` | Array of meeting participant objects |
| `participants_count` | `int` | Number of meeting participants |
| `question_details` | `list` | Array of questions from user |
| `start_time` | `str` | Meeting start time |
| `to` | `str` | End date for this report |
| `topic` | `str` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `list` | Tracking fields |
| `type` | `int` | Meeting type |
| `user_email` | `str` | User email |
| `user_name` | `str` | User display name |
| `uuid` | `str` | Meeting UUID |

#### Example: Load

```python
report = client.Report().load({"meeting_id": "meeting_id"})
```

#### Example: List

```python
reports = client.Report().list({"user_id": "example", "from": "example", "to": "example"})
```


### TrackingField

Create an instance: `tracking_field = client.TrackingField()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `field` | `str` | Tracking Field Name |
| `id` | `str` | Tracking Field ID |
| `recommended_values` | `list` | Array of recommended values |
| `required` | `bool` | Tracking Field Required |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `list` | Array of Tracking Fields |
| `visible` | `bool` | Tracking Field Visible |

#### Example: Load

```python
tracking_field = client.TrackingField().load({"id": "tracking_field_id"})
```

#### Example: List

```python
tracking_fields = client.TrackingField().list()
```

#### Example: Create

```python
tracking_field = client.TrackingField().create({
    "body": {},  # dict
})
```


### Tsp

Create an instance: `tsp = client.Tsp()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `str` | Country Code |
| `conference_code` | `str` | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `list` | List of Dial In Numbers |
| `id` | `str` |  |
| `leader_pin` | `str` | Leader PIN, numeric value, length is less than 16. |
| `number` | `str` | Dial-in number, length is less than 16 |
| `type` | `str` |  |

#### Example: Load

```python
tsp = client.Tsp().load({"id": "tsp_id", "user_id": "user_id"})
```

#### Example: List

```python
tsps = client.Tsp().list()
```

#### Example: Create

```python
tsp = client.Tsp().create({
    "user_id": "example_user_id",  # str
    "body": {},  # dict
    "conference_code": "example_conference_code",  # str
    "dial_in_numbers": [],  # list
    "leader_pin": "example_leader_pin",  # str
})
```


### User

Create an instance: `user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `str` |  |
| `cms_user_id` | `str` |  |
| `created_at` | `str` | User create time |
| `dept` | `str` | Department |
| `email` | `str` | User's email address |
| `first_name` | `str` | User's first name |
| `group_ids` | `list` |  |
| `host_key` | `str` |  |
| `id` | `str` | User ID |
| `im_group_ids` | `list` |  |
| `language` | `str` |  |
| `last_client_version` | `str` | User last login client version |
| `last_login_time` | `str` | User last login time |
| `last_name` | `str` | User's last name |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `personal_meeting_url` | `str` |  |
| `pic_url` | `str` |  |
| `pmi` | `str` | Personal Meeting ID |
| `timezone` | `str` | Time Zone |
| `total_records` | `int` | The number of all records available across pages |
| `type` | `int` | User's type |
| `use_pmi` | `bool` |  |
| `users` | `list` | List of User objects |
| `vanity_url` | `str` |  |
| `verified` | `int` |  |

#### Example: Load

```python
user = client.User().load({"id": "user_id"})
```

#### Example: List

```python
users = client.User().list()
```

#### Example: Create

```python
user = client.User().create({
    "body": {},  # dict
    "email": "example_email",  # str
    "type": 1,  # int
})
```


### UserAssistantsList

Create an instance: `user_assistants_list = client.UserAssistantsList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
user_assistants_lists = client.UserAssistantsList().list({"id": "example"})
```


### UserPermission

Create an instance: `user_permission = client.UserPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `permissions` | `list` | List of user permissions |

#### Example: List

```python
user_permissions = client.UserPermission().list({"id": "example"})
```


### UserSchedulersList

Create an instance: `user_schedulers_list = client.UserSchedulersList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: List

```python
user_schedulers_lists = client.UserSchedulersList().list({"id": "example"})
```


### UserSetting

Create an instance: `user_setting = client.UserSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `dict` |  |
| `feature` | `dict` |  |
| `id` | `str` |  |
| `in_meeting` | `dict` |  |
| `recording` | `dict` |  |
| `schedule_meeting` | `dict` |  |
| `telephony` | `dict` |  |

#### Example: Load

```python
user_setting = client.UserSetting().load({"id": "user_setting_id"})
```


### Webhook

Create an instance: `webhook = client.Webhook()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_password` | `str` | Webhook auth password |
| `auth_user` | `str` | Webhook auth user name |
| `created_at` | `str` | Webhook create time |
| `events` | `list` | List of events objects. |
| `id` | `str` |  |
| `total_records` | `int` | The number of all records available across pages |
| `url` | `str` | Webhook endpoint |
| `webhook_id` | `str` | Webhook Id |
| `webhooks` | `list` | List of Webhook objects |

#### Example: Load

```python
webhook = client.Webhook().load({"id": "webhook_id"})
```

#### Example: List

```python
webhooks = client.Webhook().list()
```

#### Example: Create

```python
webhook = client.Webhook().create({
    "body": {},  # dict
    "auth_password": "example_auth_password",  # str
    "auth_user": "example_auth_user",  # str
    "events": [],  # list
    "url": "example_url",  # str
})
```


### Webinar

Create an instance: `webinar = client.Webinar()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agenda` | `str` | Webinar agenda |
| `created_at` | `str` | Create time |
| `duration` | `str` | Webinar duration |
| `email` | `str` | User email |
| `end_time` | `str` | Webinar end time |
| `has_3rd_party_audio` | `bool` |  |
| `has_pstn` | `bool` |  |
| `has_recording` | `bool` |  |
| `has_screen_share` | `bool` |  |
| `has_sip` | `bool` |  |
| `has_video` | `bool` |  |
| `has_voip` | `bool` |  |
| `host` | `str` | User display name |
| `host_id` | `str` | ID of the user set as host of webinar |
| `id` | `str` | Webinar Poll ID |
| `join_url` | `str` | Join url |
| `occurrences` | `list` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Webinar participant count |
| `questions` | `list` | Array of Polls |
| `settings` | `dict` | Webinar Settings |
| `start_time` | `str` | Webinar start time |
| `start_url` | `str` | Start url |
| `status` | `str` | Status of the Webinar Poll |
| `timezone` | `str` | Timezone to format start_time |
| `title` | `str` | Poll Title |
| `topic` | `str` | Webinar topic |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `list` | Tracking fields |
| `type` | `int` | Webinar Type |
| `user_type` | `str` | User type |
| `uuid` | `str` | Webinar UUID |
| `webinars` | `list` | List of Webinar objects |

#### Example: Load

```python
webinar = client.Webinar().load({"id": "webinar_id"})
```

#### Example: List

```python
webinars = client.Webinar().list({"user_id": "example"})
```

#### Example: Create

```python
webinar = client.Webinar().create({
    "user_id": "example_user_id",  # str
    "body": {},  # dict
})
```


### WebinarInstance

Create an instance: `webinar_instance = client.WebinarInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `webinars` | `list` | List of ended webinar instances. |

#### Example: List

```python
webinar_instances = client.WebinarInstance().list({"past_webinar_id": "example"})
```


### WebinarPanelistList

Create an instance: `webinar_panelist_list = client.WebinarPanelistList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `panelists` | `list` | List of Panelist objects |
| `total_records` | `int` | Total records |

#### Example: List

```python
webinar_panelist_lists = client.WebinarPanelistList().list({"id": "example"})
```


### WebinarRegistrantList

Create an instance: `webinar_registrant_list = client.WebinarRegistrantList()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |

#### Example: Load

```python
webinar_registrant_list = client.WebinarRegistrantList().load({"id": "webinar_registrant_list_id"})
```


### ZoomRoomList

Create an instance: `zoom_room_list = client.ZoomRoomList()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |
| `zoom_rooms` | `list` | Array of Zoom Rooms |

#### Example: List

```python
zoom_room_lists = client.ZoomRoomList().list()
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

Features are the extension mechanism. A feature is a Python class
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

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── zoom_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`zoom_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
usersetting = client.UserSetting()
usersetting.load({"id": "example_id"})

# usersetting.data_get() now returns the usersetting data from the last load
# usersetting.match_get() returns the last match criteria
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
