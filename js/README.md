# Zoom JavaScript SDK



The JavaScript SDK for the Zoom API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Account()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`, `patch`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install zoom
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { ZoomSDK } = require('@voxgig-sdk/zoom-sdk-js')

const client = new ZoomSDK({
  apikey: process.env.ZOOM_APIKEY,
})
```

### Load an Account

```js
const account = await client.Account().load({ id: 'account_id' })
console.log(account)
```

### List Account Records

```js
const accounts = await client.Account().list()
for (const account of accounts) {
  console.log(account)
}
```

### Create a Account

```js
const created = await client.Account().create({
  body: {},
})
console.log(created)
```

### Update a Account

```js
const updated = await client.Account().update({
  id: 'account_id',
  body: {},
  accounts: [],
})
console.log(updated)
```

### Remove a Account

```js
await client.Account().remove({ id: 'account_id' })
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const usersetting = await client.UserSetting().load({ id: "example_id" })
  console.log(usersetting)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = ZoomSDK.test()

const usersetting = await client.UserSetting().load({ id: 'test01' })
// usersetting is the entity, populated with mock response data
// — call usersetting.data() for the record itself
console.log(usersetting)
```

You can also use the instance method:

```js
const client = new ZoomSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.UserSetting()

// First call runs the operation and stores its result
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ZoomSDK({
  apikey: '...',
  extend: [logger],
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
cd js && npm test
```


## Reference

### ZoomSDK

#### Constructor

```js
new ZoomSDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Account(data?)` | `AccountEntity` | Create an Account entity instance. |
| `AccountPlan(data?)` | `AccountPlanEntity` | Create an AccountPlan entity instance. |
| `AccountSetting(data?)` | `AccountSettingEntity` | Create an AccountSetting entity instance. |
| `Billing(data?)` | `BillingEntity` | Create a Billing entity instance. |
| `CloudRecording(data?)` | `CloudRecordingEntity` | Create a CloudRecording entity instance. |
| `Dashboard(data?)` | `DashboardEntity` | Create a Dashboard entity instance. |
| `Device(data?)` | `DeviceEntity` | Create a Device entity instance. |
| `DomainsList(data?)` | `DomainsListEntity` | Create a DomainsList entity instance. |
| `Group(data?)` | `GroupEntity` | Create a Group entity instance. |
| `GroupMemberList(data?)` | `GroupMemberListEntity` | Create a GroupMemberList entity instance. |
| `ImChat(data?)` | `ImChatEntity` | Create an ImChat entity instance. |
| `ImGroup(data?)` | `ImGroupEntity` | Create an ImGroup entity instance. |
| `ImGroupList(data?)` | `ImGroupListEntity` | Create an ImGroupList entity instance. |
| `Meeting(data?)` | `MeetingEntity` | Create a Meeting entity instance. |
| `MeetingInstance(data?)` | `MeetingInstanceEntity` | Create a MeetingInstance entity instance. |
| `MeetingInvitation(data?)` | `MeetingInvitationEntity` | Create a MeetingInvitation entity instance. |
| `MeetingRegistrantList(data?)` | `MeetingRegistrantListEntity` | Create a MeetingRegistrantList entity instance. |
| `Pac(data?)` | `PacEntity` | Create a Pac entity instance. |
| `Poll(data?)` | `PollEntity` | Create a Poll entity instance. |
| `Qos(data?)` | `QosEntity` | Create a Qos entity instance. |
| `Recording(data?)` | `RecordingEntity` | Create a Recording entity instance. |
| `RecordingSetting(data?)` | `RecordingSettingEntity` | Create a RecordingSetting entity instance. |
| `Report(data?)` | `ReportEntity` | Create a Report entity instance. |
| `TrackingField(data?)` | `TrackingFieldEntity` | Create a TrackingField entity instance. |
| `Tsp(data?)` | `TspEntity` | Create a Tsp entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `UserAssistantsList(data?)` | `UserAssistantsListEntity` | Create an UserAssistantsList entity instance. |
| `UserPermission(data?)` | `UserPermissionEntity` | Create an UserPermission entity instance. |
| `UserSchedulersList(data?)` | `UserSchedulersListEntity` | Create an UserSchedulersList entity instance. |
| `UserSetting(data?)` | `UserSettingEntity` | Create an UserSetting entity instance. |
| `Webhook(data?)` | `WebhookEntity` | Create a Webhook entity instance. |
| `Webinar(data?)` | `WebinarEntity` | Create a Webinar entity instance. |
| `WebinarInstance(data?)` | `WebinarInstanceEntity` | Create a WebinarInstance entity instance. |
| `WebinarPanelistList(data?)` | `WebinarPanelistListEntity` | Create a WebinarPanelistList entity instance. |
| `WebinarRegistrantList(data?)` | `WebinarRegistrantListEntity` | Create a WebinarRegistrantList entity instance. |
| `ZoomRoomList(data?)` | `ZoomRoomListEntity` | Create a ZoomRoomList entity instance. |
| `tester(testopts?, sdkopts?)` | `ZoomSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ZoomSDK.test(testopts?, sdkopts?)` | `ZoomSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ZoomSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `undefined`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

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

Operations: create, list, load, remove, update.

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

Operations: create, list.

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

Operations: load.

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

Operations: create, load, patch, update.

API path: `/accounts/{accountId}/plans/addons`

#### CloudRecording

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load, patch, remove, update.

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

Operations: list, load.

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

Operations: create, list, remove, update.

API path: `/h323/devices`

#### DomainsList

| Field | Description |
| --- | --- |
| `domain` | Domain Name |
| `status` | Domain Status |

Operations: list.

API path: `/accounts/{accountId}/managed_domains`

#### Group

| Field | Description |
| --- | --- |
| `id` | Group ID |
| `name` | Group name |
| `total_members` | Total number of members in this group |

Operations: create, list, load, remove, update.

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

Operations: list.

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

Operations: list, load.

API path: `/im/chat/sessions`

#### ImGroup

| Field | Description |
| --- | --- |
| `id` | Group ID |

Operations: create, load, remove, update.

API path: `/im/groups/{groupId}/members`

#### ImGroupList

| Field | Description |
| --- | --- |
| `groups` | List of Group objects |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |

Operations: list.

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

Operations: create, list, load, patch, remove, update.

API path: `/meetings/{meetingId}/registrants`

#### MeetingInstance

| Field | Description |
| --- | --- |
| `meetings` | List of ended meeting instances. |

Operations: list.

API path: `/past_meetings/{meetingId}/instances`

#### MeetingInvitation

| Field | Description |
| --- | --- |
| `id` |  |
| `invitation` | Meeting invitation |

Operations: load.

API path: `/meetings/{meetingId}/invitation`

#### MeetingRegistrantList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/meetings/{meetingId}/registrants`

#### Pac

| Field | Description |
| --- | --- |
| `conference_id` | Conference ID |
| `dedicated_dial_in_number` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | List of Global Dial In Numbers |
| `listen_only_password` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | Participant Password, numeric value, length is less than 6 |

Operations: list.

API path: `/users/{userId}/pac`

#### Poll

| Field | Description |
| --- | --- |
| `polls` | Array of Polls |
| `total_records` | The number of all records available across pages |

Operations: list.

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

Operations: list, load.

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

Operations: list.

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

Operations: load.

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

Operations: list, load.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load, remove, update.

API path: `/users/{userId}/assistants`

#### UserAssistantsList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list.

API path: `/users/{userId}/assistants`

#### UserPermission

| Field | Description |
| --- | --- |
| `id` |  |
| `permissions` | List of user permissions |

Operations: list.

API path: `/users/{userId}/permissions`

#### UserSchedulersList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: list.

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

Operations: load.

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

Operations: create, list, load, remove, update.

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

Operations: create, list, load, patch, remove, update.

API path: `/webinars/{webinarId}/registrants`

#### WebinarInstance

| Field | Description |
| --- | --- |
| `webinars` | List of ended webinar instances. |

Operations: list.

API path: `/past_webinars/{webinarId}/instances`

#### WebinarPanelistList

| Field | Description |
| --- | --- |
| `id` |  |
| `panelists` | List of Panelist objects |
| `total_records` | Total records |

Operations: list.

API path: `/webinars/{webinarId}/panelists`

#### WebinarRegistrantList

| Field | Description |
| --- | --- |
| `id` |  |

Operations: load.

API path: `/webinars/{webinarId}/registrants`

#### ZoomRoomList

| Field | Description |
| --- | --- |
| `page_count` | The number of items returned on this page |
| `page_number` | The page number of current results |
| `page_size` | The number of records returned within a single API call |
| `total_records` | The number of all records available across pages |
| `zoom_rooms` | Array of Zoom Rooms |

Operations: list.

API path: `/metrics/zoomrooms`



## Entities


### Account

Create an instance: `const account = client.Account()`

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
| `accounts` | `Array` | List of Account objects |
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

```ts
const account = await client.Account().load({ id: 'account_id' })
```

#### Example: List

```ts
const accounts = await client.Account().list()
```

#### Example: Create

```ts
const account = await client.Account().create({
  body: {},
})
```


### AccountPlan

Create an instance: `const account_plan = client.AccountPlan()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `plan_audio` | `Object` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `Object` | Account base plan object |
| `plan_large_meeting` | `Array` | Additional Large Meeting Plans |
| `plan_recording` | `string` | Additional Cloud Recording Plan |
| `plan_room_connector` | `Object` | Account plan object |
| `plan_webinar` | `Array` | Additional Webinar Plans |
| `plan_zoom_rooms` | `Object` | Account plan object |

#### Example: List

```ts
const account_plans = await client.AccountPlan().list({ id: "example" })
```

#### Example: Create

```ts
const account_plan = await client.AccountPlan().create({
  id: 'example_id',
  body: 'example_body',
  plan_base: {},
})
```


### AccountSetting

Create an instance: `const account_setting = client.AccountSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `Object` | Account Settings: Notification |
| `feature` | `Object` | Account Settings: Feature |
| `id` | `string` |  |
| `in_meeting` | `Object` | Account Settings: In Meeting |
| `integration` | `Object` | Account Settings: Integration |
| `recording` | `Object` | Account Settings: Recording |
| `schedule_meting` | `Object` | Account Settings: Schedule Meeting |
| `security` | `Object` | Account Settings: Security |
| `telephony` | `Object` | Account Settings: Telephony |
| `zoom_rooms` | `Object` | Account Settings: Zoom Rooms |

#### Example: Load

```ts
const account_setting = await client.AccountSetting().load({ id: 'account_setting_id' })
```


### Billing

Create an instance: `const billing = client.Billing()`

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

```ts
const billing = await client.Billing().load({ account_id: 'account_id' })
```

#### Example: Create

```ts
const billing = await client.Billing().create({
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


### CloudRecording

Create an instance: `const cloud_recording = client.CloudRecording()`

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

```ts
const cloud_recording = await client.CloudRecording().load({ meeting_id: 'meeting_id' })
```


### Dashboard

Create an instance: `const dashboard = client.Dashboard()`

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
| `crc_ports_usage` | `Array` |  |
| `device_ip` | `string` | Zoom Room device IP |
| `email` | `string` | Zoom Room email |
| `from` | `string` | Start date for this report |
| `id` | `string` | Zoom Room ID |
| `last_start_time` | `string` | Zoom Room last start time |
| `live_meeting` | `Object` | Meeting metric details |
| `meetings` | `Array` | Array of meeting objects |
| `microphone` | `string` | Zoom Room microphone |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `participants` | `Array` | Array of user objects |
| `past_meetings` | `Object` |  |
| `room_name` | `string` | Zoom Room name |
| `speaker` | `string` | Zoom Room speaker |
| `status` | `string` | Zoom Room status |
| `to` | `string` | End date for this report |
| `total_records` | `number` | The number of all records available across pages |
| `users` | `Array` |  |
| `webinars` | `Array` | Array of webinar objects |

#### Example: Load

```ts
const dashboard = await client.Dashboard().load({ zoomroom_id: 'zoomroom_id', from: 'from', to: 'to' })
```

#### Example: List

```ts
const dashboards = await client.Dashboard().list({ from: "example", to: "example" })
```


### Device

Create an instance: `const device = client.Device()`

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
| `devices` | `Array` | List of H.323/SIP Device objects |
| `id` | `string` |  |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```ts
const devices = await client.Device().list()
```

#### Example: Create

```ts
const device = await client.Device().create({
  body: {},
})
```


### DomainsList

Create an instance: `const domains_list = client.DomainsList()`

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

```ts
const domains_lists = await client.DomainsList().list({ account_id: "example" })
```


### Group

Create an instance: `const group = client.Group()`

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

```ts
const group = await client.Group().load({ id: 'group_id' })
```

#### Example: List

```ts
const groups = await client.Group().list()
```

#### Example: Create

```ts
const group = await client.Group().create({
  body: 'example_body',
})
```


### GroupMemberList

Create an instance: `const group_member_list = client.GroupMemberList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `members` | `Array` | List of Group member objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```ts
const group_member_lists = await client.GroupMemberList().list({ id: "example" })
```


### ImChat

Create an instance: `const im_chat = client.ImChat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start date |
| `messages` | `Array` | Array of session objects |
| `next_page_token` | `string` | Next page token, used to paginate through large result sets. |
| `page_size` | `number` | The amount of records returns within a single API call. |
| `session_id` | `string` | IM Chat session ID |
| `sessions` | `Array` | Array of session objects |
| `to` | `string` | End date |

#### Example: Load

```ts
const im_chat = await client.ImChat().load({ session_id: 'session_id', from: 'from', to: 'to' })
```

#### Example: List

```ts
const im_chats = await client.ImChat().list({ from: "example", to: "example" })
```


### ImGroup

Create an instance: `const im_group = client.ImGroup()`

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

```ts
const im_group = await client.ImGroup().load({ id: 'im_group_id' })
```

#### Example: Create

```ts
const im_group = await client.ImGroup().create({
  body: 'example_body',
})
```


### ImGroupList

Create an instance: `const im_group_list = client.ImGroupList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `groups` | `Array` | List of Group objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```ts
const im_group_lists = await client.ImGroupList().list()
```


### Meeting

Create an instance: `const meeting = client.Meeting()`

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
| `meetings` | `Array` | List of Meeting objects |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `occurrences` | `Array` | Array of occurrence objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `participants` | `number` | Meeting participant count |
| `participants_count` | `number` | Number of meeting participants |
| `password` | `string` | Meeting password |
| `questions` | `Array` | Array of Polls |
| `settings` | `Object` | Meeting Settings |
| `start_time` | `string` | Meeting start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Meeting Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `number` | Number of meeting minutes |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `Array` | Tracking fields |
| `type` | `number` | Meeting Type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `user_type` | `string` | User type |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```ts
const meeting = await client.Meeting().load({ id: 'meeting_id' })
```

#### Example: List

```ts
const meetings = await client.Meeting().list({ user_id: "example" })
```

#### Example: Create

```ts
const meeting = await client.Meeting().create({
  user_id: 'example_user_id',
  body: 'example_body',
})
```


### MeetingInstance

Create an instance: `const meeting_instance = client.MeetingInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetings` | `Array` | List of ended meeting instances. |

#### Example: List

```ts
const meeting_instances = await client.MeetingInstance().list({ past_meeting_id: "example" })
```


### MeetingInvitation

Create an instance: `const meeting_invitation = client.MeetingInvitation()`

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

```ts
const meeting_invitation = await client.MeetingInvitation().load({ id: 'meeting_invitation_id' })
```


### MeetingRegistrantList

Create an instance: `const meeting_registrant_list = client.MeetingRegistrantList()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const meeting_registrant_list = await client.MeetingRegistrantList().load({ id: 'meeting_registrant_list_id' })
```


### Pac

Create an instance: `const pac = client.Pac()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `conference_id` | `number` | Conference ID |
| `dedicated_dial_in_number` | `Array` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `Array` | List of Global Dial In Numbers |
| `listen_only_password` | `string` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | Participant Password, numeric value, length is less than 6 |

#### Example: List

```ts
const pacs = await client.Pac().list({ user_id: "example" })
```


### Poll

Create an instance: `const poll = client.Poll()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `polls` | `Array` | Array of Polls |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```ts
const polls = await client.Poll().list({ meeting_id: "example" })
```


### Qos

Create an instance: `const qos = client.Qos()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_input` | `Object` | Quality of Service object |
| `as_output` | `Object` | Quality of Service object |
| `audio_input` | `Object` | Quality of Service object |
| `audio_output` | `Object` | Quality of Service object |
| `cpu_usage` | `*` |  |
| `date_time` | `string` | Datetime of QOS |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of items per page |
| `participants` | `Array` | Array of user objects |
| `total_records` | `number` | The number of all records available across pages |
| `video_input` | `Object` | Quality of Service object |
| `video_output` | `Object` | Quality of Service object |

#### Example: Load

```ts
const qos = await client.Qos().load({ participant_id: 'participant_id' })
```

#### Example: List

```ts
const qoss = await client.Qos().list({ meeting_id: "example" })
```


### Recording

Create an instance: `const recording = client.Recording()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start Date, |
| `meetings` | `Array` | List of Recording |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `to` | `string` | End Date |
| `total_records` | `number` | The number of all records available across pages |

#### Example: List

```ts
const recordings = await client.Recording().list({ user_id: "example", from: "example", to: "example" })
```


### RecordingSetting

Create an instance: `const recording_setting = client.RecordingSetting()`

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

```ts
const recording_setting = await client.RecordingSetting().load({ meeting_id: 'meeting_id' })
```


### Report

Create an instance: `const report = client.Report()`

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
| `meetings` | `Array` | Array of meeting objects |
| `name` | `string` | Participant display name |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `number` | The number of items returned on this page |
| `page_size` | `number` | The number of records returned within a single API call. |
| `participants` | `Array` | Array of meeting participant objects |
| `participants_count` | `number` | Number of meeting participants |
| `question_details` | `Array` | Array of questions from user |
| `start_time` | `string` | Meeting start time |
| `to` | `string` | End date for this report |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `number` | Number of meeting minutes |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `Array` | Tracking fields |
| `type` | `number` | Meeting type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```ts
const report = await client.Report().load({ meeting_id: 'meeting_id' })
```

#### Example: List

```ts
const reports = await client.Report().list({ user_id: "example", from: "example", to: "example" })
```


### TrackingField

Create an instance: `const tracking_field = client.TrackingField()`

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
| `recommended_values` | `Array` | Array of recommended values |
| `required` | `boolean` | Tracking Field Required |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `Array` | Array of Tracking Fields |
| `visible` | `boolean` | Tracking Field Visible |

#### Example: Load

```ts
const tracking_field = await client.TrackingField().load({ id: 'tracking_field_id' })
```

#### Example: List

```ts
const tracking_fields = await client.TrackingField().list()
```

#### Example: Create

```ts
const tracking_field = await client.TrackingField().create({
  body: {},
})
```


### Tsp

Create an instance: `const tsp = client.Tsp()`

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
| `dial_in_numbers` | `Array` | List of Dial In Numbers |
| `id` | `string` |  |
| `leader_pin` | `string` | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | Dial-in number, length is less than 16 |
| `type` | `string` |  |

#### Example: Load

```ts
const tsp = await client.Tsp().load({ id: 'tsp_id', user_id: 'user_id' })
```

#### Example: List

```ts
const tsps = await client.Tsp().list()
```

#### Example: Create

```ts
const tsp = await client.Tsp().create({
  user_id: 'example_user_id',
  body: {},
  conference_code: 'example_conference_code',
  dial_in_numbers: [],
  leader_pin: 'example_leader_pin',
})
```


### User

Create an instance: `const user = client.User()`

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
| `group_ids` | `Array` |  |
| `host_key` | `string` |  |
| `id` | `string` | User ID |
| `im_group_ids` | `Array` |  |
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
| `users` | `Array` | List of User objects |
| `vanity_url` | `string` |  |
| `verified` | `number` |  |

#### Example: Load

```ts
const user = await client.User().load({ id: 'user_id' })
```

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
  body: {},
  email: 'example_email',
  type: 1,
})
```


### UserAssistantsList

Create an instance: `const user_assistants_list = client.UserAssistantsList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const user_assistants_lists = await client.UserAssistantsList().list({ id: "example" })
```


### UserPermission

Create an instance: `const user_permission = client.UserPermission()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `permissions` | `Array` | List of user permissions |

#### Example: List

```ts
const user_permissions = await client.UserPermission().list({ id: "example" })
```


### UserSchedulersList

Create an instance: `const user_schedulers_list = client.UserSchedulersList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```ts
const user_schedulers_lists = await client.UserSchedulersList().list({ id: "example" })
```


### UserSetting

Create an instance: `const user_setting = client.UserSetting()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `Object` |  |
| `feature` | `Object` |  |
| `id` | `string` |  |
| `in_meeting` | `Object` |  |
| `recording` | `Object` |  |
| `schedule_meeting` | `Object` |  |
| `telephony` | `Object` |  |

#### Example: Load

```ts
const user_setting = await client.UserSetting().load({ id: 'user_setting_id' })
```


### Webhook

Create an instance: `const webhook = client.Webhook()`

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
| `events` | `Array` | List of events objects. |
| `id` | `string` |  |
| `total_records` | `number` | The number of all records available across pages |
| `url` | `string` | Webhook endpoint |
| `webhook_id` | `string` | Webhook Id |
| `webhooks` | `Array` | List of Webhook objects |

#### Example: Load

```ts
const webhook = await client.Webhook().load({ id: 'webhook_id' })
```

#### Example: List

```ts
const webhooks = await client.Webhook().list()
```

#### Example: Create

```ts
const webhook = await client.Webhook().create({
  body: {},
  auth_password: 'example_auth_password',
  auth_user: 'example_auth_user',
  events: [],
  url: 'example_url',
})
```


### Webinar

Create an instance: `const webinar = client.Webinar()`

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
| `occurrences` | `Array` | Array of occurrence objects |
| `page_count` | `number` | The number of items returned on this page |
| `page_number` | `number` | The page number of current results |
| `page_size` | `number` | The number of records returned within a single API call |
| `participants` | `number` | Webinar participant count |
| `questions` | `Array` | Array of Polls |
| `settings` | `Object` | Webinar Settings |
| `start_time` | `string` | Webinar start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Webinar Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Webinar topic |
| `total_records` | `number` | The number of all records available across pages |
| `tracking_fields` | `Array` | Tracking fields |
| `type` | `number` | Webinar Type |
| `user_type` | `string` | User type |
| `uuid` | `string` | Webinar UUID |
| `webinars` | `Array` | List of Webinar objects |

#### Example: Load

```ts
const webinar = await client.Webinar().load({ id: 'webinar_id' })
```

#### Example: List

```ts
const webinars = await client.Webinar().list({ user_id: "example" })
```

#### Example: Create

```ts
const webinar = await client.Webinar().create({
  user_id: 'example_user_id',
  body: {},
})
```


### WebinarInstance

Create an instance: `const webinar_instance = client.WebinarInstance()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `webinars` | `Array` | List of ended webinar instances. |

#### Example: List

```ts
const webinar_instances = await client.WebinarInstance().list({ past_webinar_id: "example" })
```


### WebinarPanelistList

Create an instance: `const webinar_panelist_list = client.WebinarPanelistList()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `panelists` | `Array` | List of Panelist objects |
| `total_records` | `number` | Total records |

#### Example: List

```ts
const webinar_panelist_lists = await client.WebinarPanelistList().list({ id: "example" })
```


### WebinarRegistrantList

Create an instance: `const webinar_registrant_list = client.WebinarRegistrantList()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```ts
const webinar_registrant_list = await client.WebinarRegistrantList().load({ id: 'webinar_registrant_list_id' })
```


### ZoomRoomList

Create an instance: `const zoom_room_list = client.ZoomRoomList()`

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
| `zoom_rooms` | `Array` | Array of Zoom Rooms |

#### Example: List

```ts
const zoom_room_lists = await client.ZoomRoomList().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

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

### Module structure

```
zoom/
├── src/
│   ├── ZoomSDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { ZoomSDK } = require('@voxgig-sdk/zoom-sdk-js')
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const usersetting = client.UserSetting()
await usersetting.load({ id: "example_id" })

// usersetting.data() now returns the usersetting data from the last `load`
// usersetting.match() returns { id: "example_id" }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
