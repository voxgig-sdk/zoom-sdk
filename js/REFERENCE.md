# Zoom JavaScript SDK Reference

Complete API reference for the Zoom JavaScript SDK.


## ZoomSDK

### Constructor

```ts
new ZoomSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ZoomSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ZoomSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ZoomSDK` instance in test mode.


### Instance Methods

#### `Account(data?: object)`

Create a new `Account` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountEntity` instance.

#### `AccountPlan(data?: object)`

Create a new `AccountPlan` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountPlanEntity` instance.

#### `AccountSetting(data?: object)`

Create a new `AccountSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AccountSettingEntity` instance.

#### `Billing(data?: object)`

Create a new `Billing` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BillingEntity` instance.

#### `CloudRecording(data?: object)`

Create a new `CloudRecording` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CloudRecordingEntity` instance.

#### `Dashboard(data?: object)`

Create a new `Dashboard` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DashboardEntity` instance.

#### `Device(data?: object)`

Create a new `Device` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DeviceEntity` instance.

#### `DomainsList(data?: object)`

Create a new `DomainsList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DomainsListEntity` instance.

#### `Group(data?: object)`

Create a new `Group` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupEntity` instance.

#### `GroupMemberList(data?: object)`

Create a new `GroupMemberList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GroupMemberListEntity` instance.

#### `ImChat(data?: object)`

Create a new `ImChat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImChatEntity` instance.

#### `ImGroup(data?: object)`

Create a new `ImGroup` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImGroupEntity` instance.

#### `ImGroupList(data?: object)`

Create a new `ImGroupList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ImGroupListEntity` instance.

#### `Meeting(data?: object)`

Create a new `Meeting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeetingEntity` instance.

#### `MeetingInstance(data?: object)`

Create a new `MeetingInstance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeetingInstanceEntity` instance.

#### `MeetingInvitation(data?: object)`

Create a new `MeetingInvitation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeetingInvitationEntity` instance.

#### `MeetingRegistrantList(data?: object)`

Create a new `MeetingRegistrantList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MeetingRegistrantListEntity` instance.

#### `Pac(data?: object)`

Create a new `Pac` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PacEntity` instance.

#### `Poll(data?: object)`

Create a new `Poll` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PollEntity` instance.

#### `Qos(data?: object)`

Create a new `Qos` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `QosEntity` instance.

#### `Recording(data?: object)`

Create a new `Recording` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecordingEntity` instance.

#### `RecordingSetting(data?: object)`

Create a new `RecordingSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RecordingSettingEntity` instance.

#### `Report(data?: object)`

Create a new `Report` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReportEntity` instance.

#### `TrackingField(data?: object)`

Create a new `TrackingField` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrackingFieldEntity` instance.

#### `Tsp(data?: object)`

Create a new `Tsp` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TspEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `UserAssistantsList(data?: object)`

Create a new `UserAssistantsList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserAssistantsListEntity` instance.

#### `UserPermission(data?: object)`

Create a new `UserPermission` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserPermissionEntity` instance.

#### `UserSchedulersList(data?: object)`

Create a new `UserSchedulersList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserSchedulersListEntity` instance.

#### `UserSetting(data?: object)`

Create a new `UserSetting` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserSettingEntity` instance.

#### `Webhook(data?: object)`

Create a new `Webhook` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebhookEntity` instance.

#### `Webinar(data?: object)`

Create a new `Webinar` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebinarEntity` instance.

#### `WebinarInstance(data?: object)`

Create a new `WebinarInstance` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebinarInstanceEntity` instance.

#### `WebinarPanelistList(data?: object)`

Create a new `WebinarPanelistList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebinarPanelistListEntity` instance.

#### `WebinarRegistrantList(data?: object)`

Create a new `WebinarRegistrantList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WebinarRegistrantListEntity` instance.

#### `ZoomRoomList(data?: object)`

Create a new `ZoomRoomList` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ZoomRoomListEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ZoomSDK.test()`.

**Returns:** `ZoomSDK` instance in test mode.


---

## AccountEntity

```ts
const account = client.Account()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `Array` | No | List of Account objects |
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Account().create({
  body: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Account().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Account().load({ id: 'account_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Account().remove({ id: 'account_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Account().update({
  id: 'account_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountPlanEntity

```ts
const account_plan = client.AccountPlan()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `plan_audio` | `Object` | No | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `Object` | Yes | Account base plan object |
| `plan_large_meeting` | `Array` | No | Additional Large Meeting Plans |
| `plan_recording` | `string` | No | Additional Cloud Recording Plan |
| `plan_room_connector` | `Object` | No | Account plan object |
| `plan_webinar` | `Array` | No | Additional Webinar Plans |
| `plan_zoom_rooms` | `Object` | No | Account plan object |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.AccountPlan().create({
  id: 'example_id',
  body: 'example_body',
  plan_base: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AccountPlan().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountPlanEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AccountSettingEntity

```ts
const account_setting = client.AccountSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `Object` | No | Account Settings: Notification |
| `feature` | `Object` | No | Account Settings: Feature |
| `id` | `string` | No |  |
| `in_meeting` | `Object` | No | Account Settings: In Meeting |
| `integration` | `Object` | No | Account Settings: Integration |
| `recording` | `Object` | No | Account Settings: Recording |
| `schedule_meting` | `Object` | No | Account Settings: Schedule Meeting |
| `security` | `Object` | No | Account Settings: Security |
| `telephony` | `Object` | No | Account Settings: Telephony |
| `zoom_rooms` | `Object` | No | Account Settings: Zoom Rooms |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.AccountSetting().load({ id: 'account_setting_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BillingEntity

```ts
const billing = client.Billing()
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

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Billing().create({
  account_id: 'example_account_id',
  body: {},
  address: 'example_address',
  city: 'example_city',
  country: 'example_country',
  email: 'example_email',
  first_name: 'example_first_name',
  last_name: 'example_last_name',
  phone_number: 'example_phone_number',
  state: 'example_state',
  zip: 'example_zip',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Billing().load({ account_id: 'account_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Billing().update({
  account_id: 'account_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BillingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CloudRecordingEntity

```ts
const cloud_recording = client.CloudRecording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CloudRecording().load({ meeting_id: 'meeting_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.CloudRecording().remove({ meeting_id: 'meeting_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.CloudRecording().update({
  meeting_id: 'meeting_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CloudRecordingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DashboardEntity

```ts
const dashboard = client.Dashboard()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_type` | `string` | No | Zoom Room email type |
| `calender_name` | `string` | No | Zoom Calendar name |
| `camera` | `string` | No | Zoom Room camera |
| `crc_ports_usage` | `Array` | No |  |
| `device_ip` | `string` | No | Zoom Room device IP |
| `email` | `string` | No | Zoom Room email |
| `from` | `string` | No | Start date for this report |
| `id` | `string` | No | Zoom Room ID |
| `last_start_time` | `string` | No | Zoom Room last start time |
| `live_meeting` | `Object` | No | Meeting metric details |
| `meetings` | `Array` | No | Array of meeting objects |
| `microphone` | `string` | No | Zoom Room microphone |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `participants` | `Array` | No | Array of user objects |
| `past_meetings` | `Object` | No |  |
| `room_name` | `string` | No | Zoom Room name |
| `speaker` | `string` | No | Zoom Room speaker |
| `status` | `string` | No | Zoom Room status |
| `to` | `string` | No | End date for this report |
| `total_records` | `number` | No | The number of all records available across pages |
| `users` | `Array` | No |  |
| `webinars` | `Array` | No | Array of webinar objects |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Dashboard().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dashboard().load({ zoomroom_id: 'zoomroom_id', from: 'from', to: 'to' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DashboardEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DeviceEntity

```ts
const device = client.Device()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `devices` | `Array` | No | List of H.323/SIP Device objects |
| `id` | `string` | No |  |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Device().create({
  body: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Device().list()
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Device().remove({ id: 'id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Device().update({
  id: 'id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DeviceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DomainsListEntity

```ts
const domains_list = client.DomainsList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | Domain Name |
| `status` | `string` | No | Domain Status |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DomainsList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DomainsListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupEntity

```ts
const group = client.Group()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |
| `name` | `string` | No | Group name |
| `total_members` | `number` | No | Total number of members in this group |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Group().create({
  body: 'example_body',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Group().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Group().load({ id: 'group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Group().remove({ id: 'group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Group().update({
  id: 'group_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GroupMemberListEntity

```ts
const group_member_list = client.GroupMemberList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `members` | `Array` | No | List of Group member objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GroupMemberList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GroupMemberListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImChatEntity

```ts
const im_chat = client.ImChat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start date |
| `messages` | `Array` | No | Array of session objects |
| `next_page_token` | `string` | No | Next page token, used to paginate through large result sets. |
| `page_size` | `number` | No | The amount of records returns within a single API call. |
| `session_id` | `string` | No | IM Chat session ID |
| `sessions` | `Array` | No | Array of session objects |
| `to` | `string` | No | End date |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ImChat().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ImChat().load({ session_id: 'session_id', from: 'from', to: 'to' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImChatEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImGroupEntity

```ts
const im_group = client.ImGroup()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ImGroup().create({
  body: 'example_body',
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ImGroup().load({ id: 'im_group_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.ImGroup().remove({ id: 'im_group_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.ImGroup().update({
  id: 'im_group_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImGroupEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ImGroupListEntity

```ts
const im_group_list = client.ImGroupList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `Array` | No | List of Group objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ImGroupList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ImGroupListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeetingEntity

```ts
const meeting = client.Meeting()
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
| `meetings` | `Array` | No | List of Meeting objects |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `occurrences` | `Array` | No | Array of occurrence objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `participants` | `number` | No | Meeting participant count |
| `participants_count` | `number` | No | Number of meeting participants |
| `password` | `string` | No | Meeting password |
| `questions` | `Array` | No | Array of Polls |
| `settings` | `Object` | No | Meeting Settings |
| `start_time` | `string` | No | Meeting start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Meeting Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `number` | No | Number of meeting minutes |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `Array` | No | Tracking fields |
| `type` | `number` | No | Meeting Type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Meeting().create({
  user_id: 'example_user_id',
  body: 'example_body',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Meeting().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Meeting().load({ id: 'meeting_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Meeting().remove({ id: 'meeting_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Meeting().update({
  id: 'meeting_id',
  poll_id: 'poll_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeetingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeetingInstanceEntity

```ts
const meeting_instance = client.MeetingInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meetings` | `Array` | No | List of ended meeting instances. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MeetingInstance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeetingInstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeetingInvitationEntity

```ts
const meeting_invitation = client.MeetingInvitation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `invitation` | `string` | No | Meeting invitation |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MeetingInvitation().load({ id: 'meeting_invitation_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeetingInvitationEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MeetingRegistrantListEntity

```ts
const meeting_registrant_list = client.MeetingRegistrantList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MeetingRegistrantList().load({ id: 'meeting_registrant_list_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MeetingRegistrantListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PacEntity

```ts
const pac = client.Pac()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `conference_id` | `number` | No | Conference ID |
| `dedicated_dial_in_number` | `Array` | Yes | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `Array` | Yes | List of Global Dial In Numbers |
| `listen_only_password` | `string` | No | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | No | Participant Password, numeric value, length is less than 6 |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pac().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PacEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PollEntity

```ts
const poll = client.Poll()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `polls` | `Array` | No | Array of Polls |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Poll().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PollEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## QosEntity

```ts
const qos = client.Qos()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_input` | `Object` | No | Quality of Service object |
| `as_output` | `Object` | No | Quality of Service object |
| `audio_input` | `Object` | No | Quality of Service object |
| `audio_output` | `Object` | No | Quality of Service object |
| `cpu_usage` | `*` | No |  |
| `date_time` | `string` | No | Datetime of QOS |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of items per page |
| `participants` | `Array` | No | Array of user objects |
| `total_records` | `number` | No | The number of all records available across pages |
| `video_input` | `Object` | No | Quality of Service object |
| `video_output` | `Object` | No | Quality of Service object |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Qos().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Qos().load({ participant_id: 'participant_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `QosEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecordingEntity

```ts
const recording = client.Recording()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start Date, |
| `meetings` | `Array` | No | List of Recording |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `to` | `string` | No | End Date |
| `total_records` | `number` | No | The number of all records available across pages |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Recording().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecordingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RecordingSettingEntity

```ts
const recording_setting = client.RecordingSetting()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.RecordingSetting().load({ meeting_id: 'meeting_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RecordingSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReportEntity

```ts
const report = client.Report()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `number` | No | Meeting duration |
| `email` | `string` | No | Participant email |
| `end_time` | `string` | No | Meeting end time |
| `from` | `string` | No | Start date for this report |
| `id` | `number` | No | Meeting ID |
| `meetings` | `Array` | No | Array of meeting objects |
| `name` | `string` | No | Participant display name |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_size` | `number` | No | The number of records returned within a single API call. |
| `participants` | `Array` | No | Array of meeting participant objects |
| `participants_count` | `number` | No | Number of meeting participants |
| `question_details` | `Array` | No | Array of questions from user |
| `start_time` | `string` | No | Meeting start time |
| `to` | `string` | No | End date for this report |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `number` | No | Number of meeting minutes |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `Array` | No | Tracking fields |
| `type` | `number` | No | Meeting type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Report().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Report().load({ meeting_id: 'meeting_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReportEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrackingFieldEntity

```ts
const tracking_field = client.TrackingField()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `field` | `string` | No | Tracking Field Name |
| `id` | `string` | No | Tracking Field ID |
| `recommended_values` | `Array` | No | Array of recommended values |
| `required` | `boolean` | No | Tracking Field Required |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `Array` | No | Array of Tracking Fields |
| `visible` | `boolean` | No | Tracking Field Visible |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.TrackingField().create({
  body: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TrackingField().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TrackingField().load({ id: 'tracking_field_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.TrackingField().remove({ id: 'tracking_field_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.TrackingField().update({
  id: 'tracking_field_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrackingFieldEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TspEntity

```ts
const tsp = client.Tsp()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Country Code |
| `conference_code` | `string` | Yes | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `Array` | Yes | List of Dial In Numbers |
| `id` | `string` | No |  |
| `leader_pin` | `string` | Yes | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | No | Dial-in number, length is less than 16 |
| `type` | `string` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Tsp().create({
  user_id: 'example_user_id',
  body: {},
  conference_code: 'example_conference_code',
  dial_in_numbers: [],
  leader_pin: 'example_leader_pin',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Tsp().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Tsp().load({ id: 'tsp_id', user_id: 'user_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Tsp().remove({ id: 'tsp_id', user_id: 'user_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Tsp().update({
  id: 'tsp_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TspEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
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
| `group_ids` | `Array` | No |  |
| `host_key` | `string` | No |  |
| `id` | `string` | No | User ID |
| `im_group_ids` | `Array` | No |  |
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
| `users` | `Array` | No | List of User objects |
| `vanity_url` | `string` | No |  |
| `verified` | `number` | No |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.User().create({
  body: {},
  email: 'example_email',
  type: 1,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.User().load({ id: 'user_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.User().remove({ id: 'user_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.User().update({
  id: 'user_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserAssistantsListEntity

```ts
const user_assistants_list = client.UserAssistantsList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.UserAssistantsList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserAssistantsListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserPermissionEntity

```ts
const user_permission = client.UserPermission()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `permissions` | `Array` | No | List of user permissions |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.UserPermission().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserPermissionEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserSchedulersListEntity

```ts
const user_schedulers_list = client.UserSchedulersList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.UserSchedulersList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserSchedulersListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserSettingEntity

```ts
const user_setting = client.UserSetting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `Object` | No |  |
| `feature` | `Object` | No |  |
| `id` | `string` | No |  |
| `in_meeting` | `Object` | No |  |
| `recording` | `Object` | No |  |
| `schedule_meeting` | `Object` | No |  |
| `telephony` | `Object` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.UserSetting().load({ id: 'user_setting_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserSettingEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebhookEntity

```ts
const webhook = client.Webhook()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_password` | `string` | Yes | Webhook auth password |
| `auth_user` | `string` | Yes | Webhook auth user name |
| `created_at` | `string` | No | Webhook create time |
| `events` | `Array` | Yes | List of events objects. |
| `id` | `string` | No |  |
| `total_records` | `number` | No | The number of all records available across pages |
| `url` | `string` | Yes | Webhook endpoint |
| `webhook_id` | `string` | No | Webhook Id |
| `webhooks` | `Array` | No | List of Webhook objects |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Webhook().create({
  body: {},
  auth_password: 'example_auth_password',
  auth_user: 'example_auth_user',
  events: [],
  url: 'example_url',
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Webhook().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Webhook().load({ id: 'webhook_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Webhook().remove({ id: 'webhook_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Webhook().update({
  id: 'webhook_id',
  body: {},
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebhookEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebinarEntity

```ts
const webinar = client.Webinar()
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
| `occurrences` | `Array` | No | Array of occurrence objects |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `participants` | `number` | No | Webinar participant count |
| `questions` | `Array` | No | Array of Polls |
| `settings` | `Object` | No | Webinar Settings |
| `start_time` | `string` | No | Webinar start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Webinar Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Webinar topic |
| `total_records` | `number` | No | The number of all records available across pages |
| `tracking_fields` | `Array` | No | Tracking fields |
| `type` | `number` | No | Webinar Type |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Webinar UUID |
| `webinars` | `Array` | No | List of Webinar objects |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Webinar().create({
  user_id: 'example_user_id',
  body: {},
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Webinar().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Webinar().load({ id: 'webinar_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Webinar().remove({ id: 'webinar_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Webinar().update({
  id: 'webinar_id',
  poll_id: 'poll_id',
  body: 'body',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebinarEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebinarInstanceEntity

```ts
const webinar_instance = client.WebinarInstance()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webinars` | `Array` | No | List of ended webinar instances. |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WebinarInstance().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebinarInstanceEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebinarPanelistListEntity

```ts
const webinar_panelist_list = client.WebinarPanelistList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `panelists` | `Array` | No | List of Panelist objects |
| `total_records` | `number` | No | Total records |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WebinarPanelistList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebinarPanelistListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WebinarRegistrantListEntity

```ts
const webinar_registrant_list = client.WebinarRegistrantList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WebinarRegistrantList().load({ id: 'webinar_registrant_list_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WebinarRegistrantListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ZoomRoomListEntity

```ts
const zoom_room_list = client.ZoomRoomList()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page_count` | `number` | No | The number of items returned on this page |
| `page_number` | `number` | No | The page number of current results |
| `page_size` | `number` | No | The number of records returned within a single API call |
| `total_records` | `number` | No | The number of all records available across pages |
| `zoom_rooms` | `Array` | No | Array of Zoom Rooms |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ZoomRoomList().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ZoomRoomListEntity` instance with the same client and
options.

#### `client()`

Return the parent `ZoomSDK` instance.

#### `entopts()`

Return a copy of the entity options.


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

```ts
const client = new ZoomSDK({
  feature: {
    debug: { active: true },
    idempotency: { active: true },
    metrics: { active: true },
    paging: { active: true },
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
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

