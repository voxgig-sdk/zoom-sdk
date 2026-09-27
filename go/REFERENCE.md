# Zoom Golang SDK Reference

Complete API reference for the Zoom Golang SDK.


## ZoomSDK

### Constructor

```go
func NewZoomSDK(options map[string]any) *ZoomSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ZoomSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ZoomSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Account(data map[string]any) ZoomEntity`

Create a new `Account` entity instance. Pass `nil` for no initial data.

#### `AccountPlan(data map[string]any) ZoomEntity`

Create a new `AccountPlan` entity instance. Pass `nil` for no initial data.

#### `AccountSetting(data map[string]any) ZoomEntity`

Create a new `AccountSetting` entity instance. Pass `nil` for no initial data.

#### `Billing(data map[string]any) ZoomEntity`

Create a new `Billing` entity instance. Pass `nil` for no initial data.

#### `CloudRecording(data map[string]any) ZoomEntity`

Create a new `CloudRecording` entity instance. Pass `nil` for no initial data.

#### `Dashboard(data map[string]any) ZoomEntity`

Create a new `Dashboard` entity instance. Pass `nil` for no initial data.

#### `Device(data map[string]any) ZoomEntity`

Create a new `Device` entity instance. Pass `nil` for no initial data.

#### `DomainsList(data map[string]any) ZoomEntity`

Create a new `DomainsList` entity instance. Pass `nil` for no initial data.

#### `Group(data map[string]any) ZoomEntity`

Create a new `Group` entity instance. Pass `nil` for no initial data.

#### `GroupMemberList(data map[string]any) ZoomEntity`

Create a new `GroupMemberList` entity instance. Pass `nil` for no initial data.

#### `ImChat(data map[string]any) ZoomEntity`

Create a new `ImChat` entity instance. Pass `nil` for no initial data.

#### `ImGroup(data map[string]any) ZoomEntity`

Create a new `ImGroup` entity instance. Pass `nil` for no initial data.

#### `ImGroupList(data map[string]any) ZoomEntity`

Create a new `ImGroupList` entity instance. Pass `nil` for no initial data.

#### `Meeting(data map[string]any) ZoomEntity`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

#### `MeetingInstance(data map[string]any) ZoomEntity`

Create a new `MeetingInstance` entity instance. Pass `nil` for no initial data.

#### `MeetingInvitation(data map[string]any) ZoomEntity`

Create a new `MeetingInvitation` entity instance. Pass `nil` for no initial data.

#### `MeetingRegistrantList(data map[string]any) ZoomEntity`

Create a new `MeetingRegistrantList` entity instance. Pass `nil` for no initial data.

#### `Pac(data map[string]any) ZoomEntity`

Create a new `Pac` entity instance. Pass `nil` for no initial data.

#### `Poll(data map[string]any) ZoomEntity`

Create a new `Poll` entity instance. Pass `nil` for no initial data.

#### `Qos(data map[string]any) ZoomEntity`

Create a new `Qos` entity instance. Pass `nil` for no initial data.

#### `Recording(data map[string]any) ZoomEntity`

Create a new `Recording` entity instance. Pass `nil` for no initial data.

#### `RecordingSetting(data map[string]any) ZoomEntity`

Create a new `RecordingSetting` entity instance. Pass `nil` for no initial data.

#### `Report(data map[string]any) ZoomEntity`

Create a new `Report` entity instance. Pass `nil` for no initial data.

#### `TrackingField(data map[string]any) ZoomEntity`

Create a new `TrackingField` entity instance. Pass `nil` for no initial data.

#### `Tsp(data map[string]any) ZoomEntity`

Create a new `Tsp` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) ZoomEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `UserAssistantsList(data map[string]any) ZoomEntity`

Create a new `UserAssistantsList` entity instance. Pass `nil` for no initial data.

#### `UserPermission(data map[string]any) ZoomEntity`

Create a new `UserPermission` entity instance. Pass `nil` for no initial data.

#### `UserSchedulersList(data map[string]any) ZoomEntity`

Create a new `UserSchedulersList` entity instance. Pass `nil` for no initial data.

#### `UserSetting(data map[string]any) ZoomEntity`

Create a new `UserSetting` entity instance. Pass `nil` for no initial data.

#### `Webhook(data map[string]any) ZoomEntity`

Create a new `Webhook` entity instance. Pass `nil` for no initial data.

#### `Webinar(data map[string]any) ZoomEntity`

Create a new `Webinar` entity instance. Pass `nil` for no initial data.

#### `WebinarInstance(data map[string]any) ZoomEntity`

Create a new `WebinarInstance` entity instance. Pass `nil` for no initial data.

#### `WebinarPanelistList(data map[string]any) ZoomEntity`

Create a new `WebinarPanelistList` entity instance. Pass `nil` for no initial data.

#### `WebinarRegistrantList(data map[string]any) ZoomEntity`

Create a new `WebinarRegistrantList` entity instance. Pass `nil` for no initial data.

#### `ZoomRoomList(data map[string]any) ZoomEntity`

Create a new `ZoomRoomList` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AccountEntity

```go
account := client.Account(nil)
fmt.Println(account.GetName()) // "account"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `accounts` | `[]any` | No | List of Account objects |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Account(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Account(nil).Load(map[string]any{"id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Account(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Account(nil).Update(map[string]any{
    "id": "account_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Account(nil).Remove(map[string]any{"id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AccountPlanEntity

```go
accountPlan := client.AccountPlan(nil)
fmt.Println(accountPlan.GetName()) // "account_plan"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `plan_audio` | `map[string]any` | No | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `map[string]any` | Yes | Account base plan object |
| `plan_large_meeting` | `[]any` | No | Additional Large Meeting Plans |
| `plan_recording` | `string` | No | Additional Cloud Recording Plan |
| `plan_room_connector` | `map[string]any` | No | Account plan object |
| `plan_webinar` | `[]any` | No | Additional Webinar Plans |
| `plan_zoom_rooms` | `map[string]any` | No | Account plan object |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.AccountPlan(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.AccountPlan(nil).Create(map[string]any{
    "id": "example_id",
    "body": "example_body",
    "plan_base": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountPlanEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AccountSettingEntity

```go
accountSetting := client.AccountSetting(nil)
fmt.Println(accountSetting.GetName()) // "account_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `map[string]any` | No | Account Settings: Notification |
| `feature` | `map[string]any` | No | Account Settings: Feature |
| `id` | `string` | No |  |
| `in_meeting` | `map[string]any` | No | Account Settings: In Meeting |
| `integration` | `map[string]any` | No | Account Settings: Integration |
| `recording` | `map[string]any` | No | Account Settings: Recording |
| `schedule_meting` | `map[string]any` | No | Account Settings: Schedule Meeting |
| `security` | `map[string]any` | No | Account Settings: Security |
| `telephony` | `map[string]any` | No | Account Settings: Telephony |
| `zoom_rooms` | `map[string]any` | No | Account Settings: Zoom Rooms |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.AccountSetting(nil).Load(map[string]any{"id": "account_setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AccountSettingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BillingEntity

```go
billing := client.Billing(nil)
fmt.Println(billing.GetName()) // "billing"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Billing(nil).Load(map[string]any{"account_id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Billing(nil).Create(map[string]any{
    "account_id": "example_account_id",
    "body": map[string]any{},
    "address": "example_address",
    "city": "example_city",
    "country": "example_country",
    "email": "example_email",
    "first_name": "example_first_name",
    "last_name": "example_last_name",
    "phone_number": "example_phone_number",
    "state": "example_state",
    "zip": "example_zip",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Billing(nil).Update(map[string]any{
    "account_id": "account_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BillingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CloudRecordingEntity

```go
cloudRecording := client.CloudRecording(nil)
fmt.Println(cloudRecording.GetName()) // "cloud_recording"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CloudRecording(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.CloudRecording(nil).Update(map[string]any{
    "meeting_id": "meeting_id",
    "body": "body",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.CloudRecording(nil).Remove(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CloudRecordingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DashboardEntity

```go
dashboard := client.Dashboard(nil)
fmt.Println(dashboard.GetName()) // "dashboard"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `account_type` | `string` | No | Zoom Room email type |
| `calender_name` | `string` | No | Zoom Calendar name |
| `camera` | `string` | No | Zoom Room camera |
| `crc_ports_usage` | `[]any` | No |  |
| `device_ip` | `string` | No | Zoom Room device IP |
| `email` | `string` | No | Zoom Room email |
| `from` | `string` | No | Start date for this report |
| `id` | `string` | No | Zoom Room ID |
| `last_start_time` | `string` | No | Zoom Room last start time |
| `live_meeting` | `map[string]any` | No | Meeting metric details |
| `meetings` | `[]any` | No | Array of meeting objects |
| `microphone` | `string` | No | Zoom Room microphone |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `[]any` | No | Array of user objects |
| `past_meetings` | `map[string]any` | No |  |
| `room_name` | `string` | No | Zoom Room name |
| `speaker` | `string` | No | Zoom Room speaker |
| `status` | `string` | No | Zoom Room status |
| `to` | `string` | No | End date for this report |
| `total_records` | `int` | No | The number of all records available across pages |
| `users` | `[]any` | No |  |
| `webinars` | `[]any` | No | Array of webinar objects |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Dashboard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dashboard(nil).Load(map[string]any{"zoomroom_id": "zoomroom_id", "from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DashboardEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DeviceEntity

```go
device := client.Device(nil)
fmt.Println(device.GetName()) // "device"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `devices` | `[]any` | No | List of H.323/SIP Device objects |
| `id` | `string` | No |  |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Device(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Device(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Device(nil).Update(map[string]any{
    "id": "id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Device(nil).Remove(map[string]any{"id": "id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DeviceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DomainsListEntity

```go
domainsList := client.DomainsList(nil)
fmt.Println(domainsList.GetName()) // "domains_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `domain` | `string` | No | Domain Name |
| `status` | `string` | No | Domain Status |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DomainsList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DomainsListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GroupEntity

```go
group := client.Group(nil)
fmt.Println(group.GetName()) // "group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |
| `name` | `string` | No | Group name |
| `total_members` | `int` | No | Total number of members in this group |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Group(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Group(nil).Load(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Group(nil).Create(map[string]any{
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Group(nil).Update(map[string]any{
    "id": "group_id",
    "body": "body",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Group(nil).Remove(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GroupMemberListEntity

```go
groupMemberList := client.GroupMemberList(nil)
fmt.Println(groupMemberList.GetName()) // "group_member_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `members` | `[]any` | No | List of Group member objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GroupMemberList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GroupMemberListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImChatEntity

```go
imChat := client.ImChat(nil)
fmt.Println(imChat.GetName()) // "im_chat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start date |
| `messages` | `[]any` | No | Array of session objects |
| `next_page_token` | `string` | No | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | No | The amount of records returns within a single API call. |
| `session_id` | `string` | No | IM Chat session ID |
| `sessions` | `[]any` | No | Array of session objects |
| `to` | `string` | No | End date |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ImChat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ImChat(nil).Load(map[string]any{"session_id": "session_id", "from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImChatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImGroupEntity

```go
imGroup := client.ImGroup(nil)
fmt.Println(imGroup.GetName()) // "im_group"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No | Group ID |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ImGroup(nil).Load(map[string]any{"id": "im_group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ImGroup(nil).Create(map[string]any{
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.ImGroup(nil).Update(map[string]any{
    "id": "im_group_id",
    "body": "body",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.ImGroup(nil).Remove(map[string]any{"id": "im_group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImGroupEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ImGroupListEntity

```go
imGroupList := client.ImGroupList(nil)
fmt.Println(imGroupList.GetName()) // "im_group_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `groups` | `[]any` | No | List of Group objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ImGroupList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ImGroupListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeetingEntity

```go
meeting := client.Meeting(nil)
fmt.Println(meeting.GetName()) // "meeting"
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
| `meetings` | `[]any` | No | List of Meeting objects |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `occurrences` | `[]any` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Meeting participant count |
| `participants_count` | `int` | No | Number of meeting participants |
| `password` | `string` | No | Meeting password |
| `questions` | `[]any` | No | Array of Polls |
| `settings` | `map[string]any` | No | Meeting Settings |
| `start_time` | `string` | No | Meeting start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Meeting Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `[]any` | No | Tracking fields |
| `type` | `int` | No | Meeting Type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Meeting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Meeting(nil).Load(map[string]any{"id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Meeting(nil).Create(map[string]any{
    "user_id": "example_user_id",
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Meeting(nil).Update(map[string]any{
    "id": "meeting_id",
    "poll_id": "poll_id",
    "body": "body",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Meeting(nil).Remove(map[string]any{"id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeetingInstanceEntity

```go
meetingInstance := client.MeetingInstance(nil)
fmt.Println(meetingInstance.GetName()) // "meeting_instance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `meetings` | `[]any` | No | List of ended meeting instances. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MeetingInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeetingInstanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeetingInvitationEntity

```go
meetingInvitation := client.MeetingInvitation(nil)
fmt.Println(meetingInvitation.GetName()) // "meeting_invitation"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `invitation` | `string` | No | Meeting invitation |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MeetingInvitation(nil).Load(map[string]any{"id": "meeting_invitation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeetingInvitationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MeetingRegistrantListEntity

```go
meetingRegistrantList := client.MeetingRegistrantList(nil)
fmt.Println(meetingRegistrantList.GetName()) // "meeting_registrant_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MeetingRegistrantList(nil).Load(map[string]any{"id": "meeting_registrant_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MeetingRegistrantListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PacEntity

```go
pac := client.Pac(nil)
fmt.Println(pac.GetName()) // "pac"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `conference_id` | `int` | No | Conference ID |
| `dedicated_dial_in_number` | `[]any` | Yes | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `[]any` | Yes | List of Global Dial In Numbers |
| `listen_only_password` | `string` | No | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | No | Participant Password, numeric value, length is less than 6 |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pac(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PacEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PollEntity

```go
poll := client.Poll(nil)
fmt.Println(poll.GetName()) // "poll"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `polls` | `[]any` | No | Array of Polls |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Poll(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PollEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## QosEntity

```go
qos := client.Qos(nil)
fmt.Println(qos.GetName()) // "qos"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `as_input` | `map[string]any` | No | Quality of Service object |
| `as_output` | `map[string]any` | No | Quality of Service object |
| `audio_input` | `map[string]any` | No | Quality of Service object |
| `audio_output` | `map[string]any` | No | Quality of Service object |
| `cpu_usage` | `any` | No |  |
| `date_time` | `string` | No | Datetime of QOS |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of items per page |
| `participants` | `[]any` | No | Array of user objects |
| `total_records` | `int` | No | The number of all records available across pages |
| `video_input` | `map[string]any` | No | Quality of Service object |
| `video_output` | `map[string]any` | No | Quality of Service object |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Qos(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Qos(nil).Load(map[string]any{"participant_id": "participant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `QosEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RecordingEntity

```go
recording := client.Recording(nil)
fmt.Println(recording.GetName()) // "recording"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | No | Start Date, |
| `meetings` | `[]any` | No | List of Recording |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `to` | `string` | No | End Date |
| `total_records` | `int` | No | The number of all records available across pages |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Recording(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecordingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RecordingSettingEntity

```go
recordingSetting := client.RecordingSetting(nil)
fmt.Println(recordingSetting.GetName()) // "recording_setting"
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.RecordingSetting(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RecordingSettingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReportEntity

```go
report := client.Report(nil)
fmt.Println(report.GetName()) // "report"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Meeting duration |
| `email` | `string` | No | Participant email |
| `end_time` | `string` | No | Meeting end time |
| `from` | `string` | No | Start date for this report |
| `id` | `int` | No | Meeting ID |
| `meetings` | `[]any` | No | Array of meeting objects |
| `name` | `string` | No | Participant display name |
| `next_page_token` | `string` | No | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_size` | `int` | No | The number of records returned within a single API call. |
| `participants` | `[]any` | No | Array of meeting participant objects |
| `participants_count` | `int` | No | Number of meeting participants |
| `question_details` | `[]any` | No | Array of questions from user |
| `start_time` | `string` | No | Meeting start time |
| `to` | `string` | No | End date for this report |
| `topic` | `string` | No | Meeting topic |
| `total_minutes` | `int` | No | Number of meeting minutes |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `[]any` | No | Tracking fields |
| `type` | `int` | No | Meeting type |
| `user_email` | `string` | No | User email |
| `user_name` | `string` | No | User display name |
| `uuid` | `string` | No | Meeting UUID |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Report(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Report(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReportEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrackingFieldEntity

```go
trackingField := client.TrackingField(nil)
fmt.Println(trackingField.GetName()) // "tracking_field"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `field` | `string` | No | Tracking Field Name |
| `id` | `string` | No | Tracking Field ID |
| `recommended_values` | `[]any` | No | Array of recommended values |
| `required` | `bool` | No | Tracking Field Required |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `[]any` | No | Array of Tracking Fields |
| `visible` | `bool` | No | Tracking Field Visible |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TrackingField(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.TrackingField(nil).Load(map[string]any{"id": "tracking_field_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.TrackingField(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.TrackingField(nil).Update(map[string]any{
    "id": "tracking_field_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.TrackingField(nil).Remove(map[string]any{"id": "tracking_field_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrackingFieldEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TspEntity

```go
tsp := client.Tsp(nil)
fmt.Println(tsp.GetName()) // "tsp"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | `string` | No | Country Code |
| `conference_code` | `string` | Yes | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `[]any` | Yes | List of Dial In Numbers |
| `id` | `string` | No |  |
| `leader_pin` | `string` | Yes | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | No | Dial-in number, length is less than 16 |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Tsp(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Tsp(nil).Load(map[string]any{"id": "tsp_id", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Tsp(nil).Create(map[string]any{
    "user_id": "example_user_id",
    "body": map[string]any{},
    "conference_code": "example_conference_code",
    "dial_in_numbers": []any{},
    "leader_pin": "example_leader_pin",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Tsp(nil).Update(map[string]any{
    "id": "tsp_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Tsp(nil).Remove(map[string]any{"id": "tsp_id", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TspEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
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
| `group_ids` | `[]any` | No |  |
| `host_key` | `string` | No |  |
| `id` | `string` | No | User ID |
| `im_group_ids` | `[]any` | No |  |
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
| `users` | `[]any` | No | List of User objects |
| `vanity_url` | `string` | No |  |
| `verified` | `int` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.User(nil).Create(map[string]any{
    "body": map[string]any{},
    "email": "example_email",
    "type": 1,
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.User(nil).Update(map[string]any{
    "id": "user_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.User(nil).Remove(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserAssistantsListEntity

```go
userAssistantsList := client.UserAssistantsList(nil)
fmt.Println(userAssistantsList.GetName()) // "user_assistants_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.UserAssistantsList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserAssistantsListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserPermissionEntity

```go
userPermission := client.UserPermission(nil)
fmt.Println(userPermission.GetName()) // "user_permission"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `permissions` | `[]any` | No | List of user permissions |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.UserPermission(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserPermissionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserSchedulersListEntity

```go
userSchedulersList := client.UserSchedulersList(nil)
fmt.Println(userSchedulersList.GetName()) // "user_schedulers_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.UserSchedulersList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserSchedulersListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserSettingEntity

```go
userSetting := client.UserSetting(nil)
fmt.Println(userSetting.GetName()) // "user_setting"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `email_notification` | `map[string]any` | No |  |
| `feature` | `map[string]any` | No |  |
| `id` | `string` | No |  |
| `in_meeting` | `map[string]any` | No |  |
| `recording` | `map[string]any` | No |  |
| `schedule_meeting` | `map[string]any` | No |  |
| `telephony` | `map[string]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.UserSetting(nil).Load(map[string]any{"id": "user_setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserSettingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebhookEntity

```go
webhook := client.Webhook(nil)
fmt.Println(webhook.GetName()) // "webhook"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `auth_password` | `string` | Yes | Webhook auth password |
| `auth_user` | `string` | Yes | Webhook auth user name |
| `created_at` | `string` | No | Webhook create time |
| `events` | `[]any` | Yes | List of events objects. |
| `id` | `string` | No |  |
| `total_records` | `int` | No | The number of all records available across pages |
| `url` | `string` | Yes | Webhook endpoint |
| `webhook_id` | `string` | No | Webhook Id |
| `webhooks` | `[]any` | No | List of Webhook objects |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Webhook(nil).Load(map[string]any{"id": "webhook_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Webhook(nil).Create(map[string]any{
    "body": map[string]any{},
    "auth_password": "example_auth_password",
    "auth_user": "example_auth_user",
    "events": []any{},
    "url": "example_url",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Webhook(nil).Update(map[string]any{
    "id": "webhook_id",
    "body": map[string]any{},
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Webhook(nil).Remove(map[string]any{"id": "webhook_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebhookEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebinarEntity

```go
webinar := client.Webinar(nil)
fmt.Println(webinar.GetName()) // "webinar"
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
| `occurrences` | `[]any` | No | Array of occurrence objects |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `participants` | `int` | No | Webinar participant count |
| `questions` | `[]any` | No | Array of Polls |
| `settings` | `map[string]any` | No | Webinar Settings |
| `start_time` | `string` | No | Webinar start time |
| `start_url` | `string` | No | Start url |
| `status` | `string` | No | Status of the Webinar Poll |
| `timezone` | `string` | No | Timezone to format start_time |
| `title` | `string` | No | Poll Title |
| `topic` | `string` | No | Webinar topic |
| `total_records` | `int` | No | The number of all records available across pages |
| `tracking_fields` | `[]any` | No | Tracking fields |
| `type` | `int` | No | Webinar Type |
| `user_type` | `string` | No | User type |
| `uuid` | `string` | No | Webinar UUID |
| `webinars` | `[]any` | No | List of Webinar objects |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Webinar(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Webinar(nil).Load(map[string]any{"id": "webinar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Webinar(nil).Create(map[string]any{
    "user_id": "example_user_id",
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Webinar(nil).Update(map[string]any{
    "id": "webinar_id",
    "poll_id": "poll_id",
    "body": "body",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Webinar(nil).Remove(map[string]any{"id": "webinar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebinarEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebinarInstanceEntity

```go
webinarInstance := client.WebinarInstance(nil)
fmt.Println(webinarInstance.GetName()) // "webinar_instance"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `webinars` | `[]any` | No | List of ended webinar instances. |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.WebinarInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebinarInstanceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebinarPanelistListEntity

```go
webinarPanelistList := client.WebinarPanelistList(nil)
fmt.Println(webinarPanelistList.GetName()) // "webinar_panelist_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `panelists` | `[]any` | No | List of Panelist objects |
| `total_records` | `int` | No | Total records |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.WebinarPanelistList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebinarPanelistListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WebinarRegistrantListEntity

```go
webinarRegistrantList := client.WebinarRegistrantList(nil)
fmt.Println(webinarRegistrantList.GetName()) // "webinar_registrant_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.WebinarRegistrantList(nil).Load(map[string]any{"id": "webinar_registrant_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WebinarRegistrantListEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ZoomRoomListEntity

```go
zoomRoomList := client.ZoomRoomList(nil)
fmt.Println(zoomRoomList.GetName()) // "zoom_room_list"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `page_count` | `int` | No | The number of items returned on this page |
| `page_number` | `int` | No | The page number of current results |
| `page_size` | `int` | No | The number of records returned within a single API call |
| `total_records` | `int` | No | The number of all records available across pages |
| `zoom_rooms` | `[]any` | No | Array of Zoom Rooms |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ZoomRoomList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ZoomRoomListEntity` instance with the same client and
options.

#### `GetName() string`

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

```go
client := sdk.NewZoomSDK(map[string]any{
    "feature": map[string]any{
        "debug": map[string]any{"active": true},
        "idempotency": map[string]any{"active": true},
        "metrics": map[string]any{"active": true},
        "paging": map[string]any{"active": true},
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

