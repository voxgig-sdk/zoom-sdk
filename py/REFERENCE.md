# Zoom Python SDK Reference

Complete API reference for the Zoom Python SDK.


## ZoomSDK

### Constructor

```python
from zoom_sdk import ZoomSDK

client = ZoomSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ZoomSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ZoomSDK.test()
```


### Instance Methods

#### `Account(data=None)`

Create a new `AccountEntity` instance. Pass `None` for no initial data.

#### `AccountPlan(data=None)`

Create a new `AccountPlanEntity` instance. Pass `None` for no initial data.

#### `AccountSetting(data=None)`

Create a new `AccountSettingEntity` instance. Pass `None` for no initial data.

#### `Billing(data=None)`

Create a new `BillingEntity` instance. Pass `None` for no initial data.

#### `CloudRecording(data=None)`

Create a new `CloudRecordingEntity` instance. Pass `None` for no initial data.

#### `Dashboard(data=None)`

Create a new `DashboardEntity` instance. Pass `None` for no initial data.

#### `Device(data=None)`

Create a new `DeviceEntity` instance. Pass `None` for no initial data.

#### `DomainsList(data=None)`

Create a new `DomainsListEntity` instance. Pass `None` for no initial data.

#### `Group(data=None)`

Create a new `GroupEntity` instance. Pass `None` for no initial data.

#### `GroupMemberList(data=None)`

Create a new `GroupMemberListEntity` instance. Pass `None` for no initial data.

#### `ImChat(data=None)`

Create a new `ImChatEntity` instance. Pass `None` for no initial data.

#### `ImGroup(data=None)`

Create a new `ImGroupEntity` instance. Pass `None` for no initial data.

#### `ImGroupList(data=None)`

Create a new `ImGroupListEntity` instance. Pass `None` for no initial data.

#### `Meeting(data=None)`

Create a new `MeetingEntity` instance. Pass `None` for no initial data.

#### `MeetingInstance(data=None)`

Create a new `MeetingInstanceEntity` instance. Pass `None` for no initial data.

#### `MeetingInvitation(data=None)`

Create a new `MeetingInvitationEntity` instance. Pass `None` for no initial data.

#### `MeetingRegistrantList(data=None)`

Create a new `MeetingRegistrantListEntity` instance. Pass `None` for no initial data.

#### `Pac(data=None)`

Create a new `PacEntity` instance. Pass `None` for no initial data.

#### `Poll(data=None)`

Create a new `PollEntity` instance. Pass `None` for no initial data.

#### `Qos(data=None)`

Create a new `QosEntity` instance. Pass `None` for no initial data.

#### `Recording(data=None)`

Create a new `RecordingEntity` instance. Pass `None` for no initial data.

#### `RecordingSetting(data=None)`

Create a new `RecordingSettingEntity` instance. Pass `None` for no initial data.

#### `Report(data=None)`

Create a new `ReportEntity` instance. Pass `None` for no initial data.

#### `TrackingField(data=None)`

Create a new `TrackingFieldEntity` instance. Pass `None` for no initial data.

#### `Tsp(data=None)`

Create a new `TspEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `UserAssistantsList(data=None)`

Create a new `UserAssistantsListEntity` instance. Pass `None` for no initial data.

#### `UserPermission(data=None)`

Create a new `UserPermissionEntity` instance. Pass `None` for no initial data.

#### `UserSchedulersList(data=None)`

Create a new `UserSchedulersListEntity` instance. Pass `None` for no initial data.

#### `UserSetting(data=None)`

Create a new `UserSettingEntity` instance. Pass `None` for no initial data.

#### `Webhook(data=None)`

Create a new `WebhookEntity` instance. Pass `None` for no initial data.

#### `Webinar(data=None)`

Create a new `WebinarEntity` instance. Pass `None` for no initial data.

#### `WebinarInstance(data=None)`

Create a new `WebinarInstanceEntity` instance. Pass `None` for no initial data.

#### `WebinarPanelistList(data=None)`

Create a new `WebinarPanelistListEntity` instance. Pass `None` for no initial data.

#### `WebinarRegistrantList(data=None)`

Create a new `WebinarRegistrantListEntity` instance. Pass `None` for no initial data.

#### `ZoomRoomList(data=None)`

Create a new `ZoomRoomListEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AccountEntity

```python
account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `list` | No | List of Account objects |
| `id` | `str` | No |  |
| `meeting_connectors` | `str` | No | Meeting Connector, multiple values separated by comma |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `pay_mode` | `str` | No | Payee |
| `room_connectors` | `str` | No | Virtual Room Connector, multiple value separated by comma |
| `share_mc` | `bool` | No | Enable Share Meeting Connector |
| `share_rc` | `bool` | No | Enable Share Virtual Room Connector |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Account().create({
    "body": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Account().list()
for account in results:
    print(account)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Account().load({"id": "account_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Account().remove({"id": "account_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Account().update({
    "id": "account_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AccountPlanEntity

```python
account_plan = client.AccountPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `plan_audio` | `dict` | No | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `dict` | Yes | Account base plan object |
| `plan_large_meeting` | `list` | No | Additional Large Meeting Plans |
| `plan_recording` | `str` | No | Additional Cloud Recording Plan |
| `plan_room_connector` | `dict` | No | Account plan object |
| `plan_webinar` | `list` | No | Additional Webinar Plans |
| `plan_zoom_rooms` | `dict` | No | Account plan object |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.AccountPlan().create({
    "id": "example_id",  # str
    "body": "example_body",  # Any
    "plan_base": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.AccountPlan().list({"id": "example"})
for account_plan in results:
    print(account_plan)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountPlanEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AccountSettingEntity

```python
account_setting = client.AccountSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `dict` | No | Account Settings: Notification |
| `feature` | `dict` | No | Account Settings: Feature |
| `id` | `str` | No |  |
| `in_meeting` | `dict` | No | Account Settings: In Meeting |
| `integration` | `dict` | No | Account Settings: Integration |
| `recording` | `dict` | No | Account Settings: Recording |
| `schedule_meting` | `dict` | No | Account Settings: Schedule Meeting |
| `security` | `dict` | No | Account Settings: Security |
| `telephony` | `dict` | No | Account Settings: Telephony |
| `zoom_rooms` | `dict` | No | Account Settings: Zoom Rooms |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.AccountSetting().load({"id": "account_setting_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AccountSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BillingEntity

```python
billing = client.Billing()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `address` | `str` | Yes | Billing Contact's address |
| `apt` | `str` | No | Billing Contact's apartment/suite |
| `city` | `str` | Yes | Billing Contact's city |
| `country` | `str` | Yes | Billing Contact's country |
| `email` | `str` | Yes | Billing Contact's email address |
| `first_name` | `str` | Yes | Billing Contact's first name |
| `last_name` | `str` | Yes | Billing Contact's last name |
| `phone_number` | `str` | Yes | Billing Contact's phone number |
| `state` | `str` | Yes | Billing Contact's state |
| `zip` | `str` | Yes | Billing Contact's zip/postal code |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Billing().create({
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Billing().load({"account_id": "account_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Billing().update({
    "account_id": "account_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BillingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CloudRecordingEntity

```python
cloud_recording = client.CloudRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CloudRecording().load({"meeting_id": "meeting_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.CloudRecording().remove({"meeting_id": "meeting_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.CloudRecording().update({
    "meeting_id": "meeting_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CloudRecordingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DashboardEntity

```python
dashboard = client.Dashboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_type` | `str` | No | Zoom Room email type |
| `calender_name` | `str` | No | Zoom Calendar name |
| `camera` | `str` | No | Zoom Room camera |
| `crc_ports_usage` | `list` | No |  |
| `device_ip` | `str` | No | Zoom Room device IP |
| `email` | `str` | No | Zoom Room email |
| `from` | `str` | No | Start date for this report |
| `id` | `str` | No | Zoom Room ID |
| `last_start_time` | `str` | No | Zoom Room last start time |
| `live_meeting` | `dict` | No | Meeting metric details |
| `meetings` | `list` | No | Array of meeting objects |
| `microphone` | `str` | No | Zoom Room microphone |
| `next_page_token` | `str` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `list` | No | Array of user objects |
| `past_meetings` | `dict` | No |  |
| `room_name` | `str` | No | Zoom Room name |
| `speaker` | `str` | No | Zoom Room speaker |
| `status` | `str` | No | Zoom Room status |
| `to` | `str` | No | End date for this report |
| `total_records` | `int` | No | The number of all records available across pages |
| `users` | `list` | No |  |
| `webinars` | `list` | No | Array of webinar objects |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Dashboard().list({"from": "example", "to": "example"})
for dashboard in results:
    print(dashboard)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Dashboard().load({"zoomroom_id": "zoomroom_id", "from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DashboardEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DeviceEntity

```python
device = client.Device()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `devices` | `list` | No | List of H.323/SIP Device objects |
| `id` | `str` | No |  |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Device().create({
    "body": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Device().list()
for device in results:
    print(device)
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Device().remove({"id": "id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Device().update({
    "id": "id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DeviceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DomainsListEntity

```python
domains_list = client.DomainsList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `str` | No | Domain Name |
| `status` | `str` | No | Domain Status |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DomainsList().list({"account_id": "example"})
for domains_list in results:
    print(domains_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DomainsListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GroupEntity

```python
group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No | Group ID |
| `name` | `str` | No | Group name |
| `total_members` | `int` | No | Total number of members in this group |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Group().create({
    "body": "example_body",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Group().list()
for group in results:
    print(group)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Group().load({"id": "group_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Group().remove({"id": "group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Group().update({
    "id": "group_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GroupMemberListEntity

```python
group_member_list = client.GroupMemberList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `members` | `list` | No | List of Group member objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GroupMemberList().list({"id": "example"})
for group_member_list in results:
    print(group_member_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GroupMemberListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImChatEntity

```python
im_chat = client.ImChat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `str` | No | Start date |
| `messages` | `list` | No | Array of session objects |
| `next_page_token` | `str` | No | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | No | The amount of records returns within a single API call. |
| `session_id` | `str` | No | IM Chat session ID |
| `sessions` | `list` | No | Array of session objects |
| `to` | `str` | No | End date |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ImChat().list({"from": "example", "to": "example"})
for im_chat in results:
    print(im_chat)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ImChat().load({"session_id": "session_id", "from": "from", "to": "to"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImChatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImGroupEntity

```python
im_group = client.ImGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No | Group ID |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ImGroup().create({
    "body": "example_body",  # Any
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ImGroup().load({"id": "im_group_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.ImGroup().remove({"id": "im_group_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.ImGroup().update({
    "id": "im_group_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImGroupEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ImGroupListEntity

```python
im_group_list = client.ImGroupList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `list` | No | List of Group objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ImGroupList().list()
for im_group_list in results:
    print(im_group_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ImGroupListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeetingEntity

```python
meeting = client.Meeting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `str` | No | Agenda |
| `created_at` | `str` | No | Create time |
| `duration` | `str` | No | Meeting duration |
| `email` | `str` | No | User email |
| `end_time` | `str` | No | Meeting end time |
| `h323_password` | `str` | No | H.323/SIP room system password |
| `has_3rd_party_audio` | `bool` | No |  |
| `has_pstn` | `bool` | No |  |
| `has_recording` | `bool` | No |  |
| `has_screen_share` | `bool` | No |  |
| `has_sip` | `bool` | No |  |
| `has_video` | `bool` | No |  |
| `has_voip` | `bool` | No |  |
| `host` | `str` | No | User display name |
| `host_id` | `str` | No | ID of the user set as host of meeting |
| `id` | `str` | No | Meeting Poll ID |
| `join_url` | `str` | No | Join url |
| `meetings` | `list` | No | List of Meeting objects |
| `next_page_token` | `str` | No | Next page token is used to paginate through large result sets. |
| `occurrences` | `list` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Meeting participant count |
| `participants_count` | `int` | No | Number of meeting participants |
| `password` | `str` | No | Meeting password |
| `questions` | `list` | No | Array of Polls |
| `settings` | `dict` | No | Meeting Settings |
| `start_time` | `str` | No | Meeting start time |
| `start_url` | `str` | No | Start url |
| `status` | `str` | No | Status of the Meeting Poll |
| `timezone` | `str` | No | Timezone to format start_time |
| `title` | `str` | No | Poll Title |
| `topic` | `str` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `list` | No | Tracking fields |
| `type` | `int` | No | Meeting Type |
| `user_email` | `str` | No | User email |
| `user_name` | `str` | No | User display name |
| `user_type` | `str` | No | User type |
| `uuid` | `str` | No | Meeting UUID |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Meeting().create({
    "user_id": "example_user_id",  # str
    "body": "example_body",  # Any
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Meeting().list({"user_id": "example"})
for meeting in results:
    print(meeting)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Meeting().load({"id": "meeting_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Meeting().remove({"id": "meeting_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Meeting().update({
    "id": "meeting_id",
    "poll_id": "poll_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeetingInstanceEntity

```python
meeting_instance = client.MeetingInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meetings` | `list` | No | List of ended meeting instances. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MeetingInstance().list({"past_meeting_id": "example"})
for meeting_instance in results:
    print(meeting_instance)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingInstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeetingInvitationEntity

```python
meeting_invitation = client.MeetingInvitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `invitation` | `str` | No | Meeting invitation |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MeetingInvitation().load({"id": "meeting_invitation_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingInvitationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MeetingRegistrantListEntity

```python
meeting_registrant_list = client.MeetingRegistrantList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MeetingRegistrantList().load({"id": "meeting_registrant_list_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MeetingRegistrantListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PacEntity

```python
pac = client.Pac()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `conference_id` | `int` | No | Conference ID |
| `dedicated_dial_in_number` | `list` | Yes | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `list` | Yes | List of Global Dial In Numbers |
| `listen_only_password` | `str` | No | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `str` | No | Participant Password, numeric value, length is less than 6 |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pac().list({"user_id": "example"})
for pac in results:
    print(pac)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PacEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PollEntity

```python
poll = client.Poll()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `polls` | `list` | No | Array of Polls |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Poll().list({"meeting_id": "example"})
for poll in results:
    print(poll)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PollEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## QosEntity

```python
qos = client.Qos()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_input` | `dict` | No | Quality of Service object |
| `as_output` | `dict` | No | Quality of Service object |
| `audio_input` | `dict` | No | Quality of Service object |
| `audio_output` | `dict` | No | Quality of Service object |
| `cpu_usage` | `Any` | No |  |
| `date_time` | `str` | No | Datetime of QOS |
| `next_page_token` | `str` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of items per page |
| `participants` | `list` | No | Array of user objects |
| `total_records` | `int` | No | The number of all records available across pages |
| `video_input` | `dict` | No | Quality of Service object |
| `video_output` | `dict` | No | Quality of Service object |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Qos().list({"meeting_id": "example"})
for qos in results:
    print(qos)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Qos().load({"participant_id": "participant_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `QosEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecordingEntity

```python
recording = client.Recording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `str` | No | Start Date, |
| `meetings` | `list` | No | List of Recording |
| `next_page_token` | `str` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `to` | `str` | No | End Date |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Recording().list({"user_id": "example", "from": "example", "to": "example"})
for recording in results:
    print(recording)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecordingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RecordingSettingEntity

```python
recording_setting = client.RecordingSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `approval_type` | `int` | No | Approval type |
| `on_demand` | `bool` | No | Registration required |
| `password` | `str` | No | Password protect |
| `send_email_to_host` | `bool` | No | Send an email to host when someone registers |
| `share_recording` | `str` | No | Determine if the meeting recording is shared |
| `show_social_share_buttons` | `bool` | No | Show social share buttons on registration page |
| `viewer_download` | `bool` | No | Host video |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.RecordingSetting().load({"meeting_id": "meeting_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RecordingSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReportEntity

```python
report = client.Report()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Meeting duration |
| `email` | `str` | No | Participant email |
| `end_time` | `str` | No | Meeting end time |
| `from` | `str` | No | Start date for this report |
| `id` | `int` | No | Meeting ID |
| `meetings` | `list` | No | Array of meeting objects |
| `name` | `str` | No | Participant display name |
| `next_page_token` | `str` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `list` | No | Array of meeting participant objects |
| `participants_count` | `int` | No | Number of meeting participants |
| `question_details` | `list` | No | Array of questions from user |
| `start_time` | `str` | No | Meeting start time |
| `to` | `str` | No | End date for this report |
| `topic` | `str` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `list` | No | Tracking fields |
| `type` | `int` | No | Meeting type |
| `user_email` | `str` | No | User email |
| `user_name` | `str` | No | User display name |
| `uuid` | `str` | No | Meeting UUID |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Report().list({"user_id": "example", "from": "example", "to": "example"})
for report in results:
    print(report)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Report().load({"meeting_id": "meeting_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReportEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrackingFieldEntity

```python
tracking_field = client.TrackingField()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `field` | `str` | No | Tracking Field Name |
| `id` | `str` | No | Tracking Field ID |
| `recommended_values` | `list` | No | Array of recommended values |
| `required` | `bool` | No | Tracking Field Required |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `list` | No | Array of Tracking Fields |
| `visible` | `bool` | No | Tracking Field Visible |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.TrackingField().create({
    "body": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.TrackingField().list()
for tracking_field in results:
    print(tracking_field)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TrackingField().load({"id": "tracking_field_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.TrackingField().remove({"id": "tracking_field_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.TrackingField().update({
    "id": "tracking_field_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrackingFieldEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TspEntity

```python
tsp = client.Tsp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `str` | No | Country Code |
| `conference_code` | `str` | Yes | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `list` | Yes | List of Dial In Numbers |
| `id` | `str` | No |  |
| `leader_pin` | `str` | Yes | Leader PIN, numeric value, length is less than 16. |
| `number` | `str` | No | Dial-in number, length is less than 16 |
| `type` | `str` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Tsp().create({
    "user_id": "example_user_id",  # str
    "body": {},  # dict
    "conference_code": "example_conference_code",  # str
    "dial_in_numbers": [],  # list
    "leader_pin": "example_leader_pin",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Tsp().list()
for tsp in results:
    print(tsp)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Tsp().load({"id": "tsp_id", "user_id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Tsp().remove({"id": "tsp_id", "user_id": "user_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Tsp().update({
    "id": "tsp_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TspEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_id` | `str` | No |  |
| `cms_user_id` | `str` | No |  |
| `created_at` | `str` | No | User create time |
| `dept` | `str` | No | Department |
| `email` | `str` | Yes | User's email address |
| `first_name` | `str` | No | User's first name |
| `group_ids` | `list` | No |  |
| `host_key` | `str` | No |  |
| `id` | `str` | No | User ID |
| `im_group_ids` | `list` | No |  |
| `language` | `str` | No |  |
| `last_client_version` | `str` | No | User last login client version |
| `last_login_time` | `str` | No | User last login time |
| `last_name` | `str` | No | User's last name |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `personal_meeting_url` | `str` | No |  |
| `pic_url` | `str` | No |  |
| `pmi` | `str` | No | Personal Meeting ID |
| `timezone` | `str` | No | Time Zone |
| `total_records` | `int` | No | The number of all records available across pages |
| `type` | `int` | Yes | User's type |
| `use_pmi` | `bool` | No |  |
| `users` | `list` | No | List of User objects |
| `vanity_url` | `str` | No |  |
| `verified` | `int` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.User().create({
    "body": {},  # dict
    "email": "example_email",  # str
    "type": 1,  # int
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.User().list()
for user in results:
    print(user)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.User().load({"id": "user_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.User().remove({"id": "user_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.User().update({
    "id": "user_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserAssistantsListEntity

```python
user_assistants_list = client.UserAssistantsList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.UserAssistantsList().list({"id": "example"})
for user_assistants_list in results:
    print(user_assistants_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserAssistantsListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserPermissionEntity

```python
user_permission = client.UserPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `permissions` | `list` | No | List of user permissions |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.UserPermission().list({"id": "example"})
for user_permission in results:
    print(user_permission)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserPermissionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserSchedulersListEntity

```python
user_schedulers_list = client.UserSchedulersList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.UserSchedulersList().list({"id": "example"})
for user_schedulers_list in results:
    print(user_schedulers_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserSchedulersListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserSettingEntity

```python
user_setting = client.UserSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `dict` | No |  |
| `feature` | `dict` | No |  |
| `id` | `str` | No |  |
| `in_meeting` | `dict` | No |  |
| `recording` | `dict` | No |  |
| `schedule_meeting` | `dict` | No |  |
| `telephony` | `dict` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.UserSetting().load({"id": "user_setting_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserSettingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebhookEntity

```python
webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_password` | `str` | Yes | Webhook auth password |
| `auth_user` | `str` | Yes | Webhook auth user name |
| `created_at` | `str` | No | Webhook create time |
| `events` | `list` | Yes | List of events objects. |
| `id` | `str` | No |  |
| `total_records` | `int` | No | The number of all records available across pages |
| `url` | `str` | Yes | Webhook endpoint |
| `webhook_id` | `str` | No | Webhook Id |
| `webhooks` | `list` | No | List of Webhook objects |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Webhook().create({
    "body": {},  # dict
    "auth_password": "example_auth_password",  # str
    "auth_user": "example_auth_user",  # str
    "events": [],  # list
    "url": "example_url",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Webhook().list()
for webhook in results:
    print(webhook)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Webhook().load({"id": "webhook_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Webhook().remove({"id": "webhook_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Webhook().update({
    "id": "webhook_id",
    "body": {},
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebhookEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebinarEntity

```python
webinar = client.Webinar()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `str` | No | Webinar agenda |
| `created_at` | `str` | No | Create time |
| `duration` | `str` | No | Webinar duration |
| `email` | `str` | No | User email |
| `end_time` | `str` | No | Webinar end time |
| `has_3rd_party_audio` | `bool` | No |  |
| `has_pstn` | `bool` | No |  |
| `has_recording` | `bool` | No |  |
| `has_screen_share` | `bool` | No |  |
| `has_sip` | `bool` | No |  |
| `has_video` | `bool` | No |  |
| `has_voip` | `bool` | No |  |
| `host` | `str` | No | User display name |
| `host_id` | `str` | No | ID of the user set as host of webinar |
| `id` | `str` | No | Webinar Poll ID |
| `join_url` | `str` | No | Join url |
| `occurrences` | `list` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Webinar participant count |
| `questions` | `list` | No | Array of Polls |
| `settings` | `dict` | No | Webinar Settings |
| `start_time` | `str` | No | Webinar start time |
| `start_url` | `str` | No | Start url |
| `status` | `str` | No | Status of the Webinar Poll |
| `timezone` | `str` | No | Timezone to format start_time |
| `title` | `str` | No | Poll Title |
| `topic` | `str` | No | Webinar topic |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `list` | No | Tracking fields |
| `type` | `int` | No | Webinar Type |
| `user_type` | `str` | No | User type |
| `uuid` | `str` | No | Webinar UUID |
| `webinars` | `list` | No | List of Webinar objects |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Webinar().create({
    "user_id": "example_user_id",  # str
    "body": {},  # dict
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Webinar().list({"user_id": "example"})
for webinar in results:
    print(webinar)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Webinar().load({"id": "webinar_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Webinar().remove({"id": "webinar_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Webinar().update({
    "id": "webinar_id",
    "poll_id": "poll_id",
    "body": "body",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebinarInstanceEntity

```python
webinar_instance = client.WebinarInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webinars` | `list` | No | List of ended webinar instances. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WebinarInstance().list({"past_webinar_id": "example"})
for webinar_instance in results:
    print(webinar_instance)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarInstanceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebinarPanelistListEntity

```python
webinar_panelist_list = client.WebinarPanelistList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `panelists` | `list` | No | List of Panelist objects |
| `total_records` | `int` | No | Total records |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WebinarPanelistList().list({"id": "example"})
for webinar_panelist_list in results:
    print(webinar_panelist_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarPanelistListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WebinarRegistrantListEntity

```python
webinar_registrant_list = client.WebinarRegistrantList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WebinarRegistrantList().load({"id": "webinar_registrant_list_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WebinarRegistrantListEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ZoomRoomListEntity

```python
zoom_room_list = client.ZoomRoomList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |
| `zoom_rooms` | `list` | No | Array of Zoom Rooms |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ZoomRoomList().list()
for zoom_room_list in results:
    print(zoom_room_list)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ZoomRoomListEntity` instance with the same options.

#### `get_name() -> str`

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

```python
client = ZoomSDK({
    "feature": {
        "debug": {"active": True},
        "idempotency": {"active": True},
        "metrics": {"active": True},
        "paging": {"active": True},
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

