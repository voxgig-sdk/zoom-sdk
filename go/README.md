# Zoom Golang SDK



The Golang SDK for the Zoom API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Account(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`, `Patch`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `js`, `lua`, `php`, `py`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/zoom-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/zoom-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/zoom-sdk/go=../zoom-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/zoom-sdk/go"
)

func main() {
    client := sdk.NewZoomSDK(map[string]any{
        "apikey": os.Getenv("ZOOM_APIKEY"),
    })

    // List account records — the value is the array of records itself.
    accounts, err := client.Account(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range accounts.([]any) {
        fmt.Println(item)
    }

    // Load a single account — the value is the loaded record.
    account, err := client.Account(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(account)

    // Create a account.
    created, err := client.Account(nil).Create(map[string]any{"body": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)

    // Update a account.
    updated, err := client.Account(nil).Update(map[string]any{"id": "example_id", "body": map[string]any{}, "accounts": []any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(updated)

    // Remove a account.
    removed, err := client.Account(nil).Remove(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(removed)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
usersetting, err := client.UserSetting(nil).Load(map[string]any{"id": "example_id"}, nil)
if err != nil {
    // handle err
    return
}
_ = usersetting
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

userSetting, err := client.UserSetting(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(userSetting) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewZoomSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewZoomSDK

```go
func NewZoomSDK(options map[string]any) *ZoomSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ZoomSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ZoomSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Account` | `(data map[string]any) ZoomEntity` | Create an Account entity instance. |
| `AccountPlan` | `(data map[string]any) ZoomEntity` | Create an AccountPlan entity instance. |
| `AccountSetting` | `(data map[string]any) ZoomEntity` | Create an AccountSetting entity instance. |
| `Billing` | `(data map[string]any) ZoomEntity` | Create a Billing entity instance. |
| `CloudRecording` | `(data map[string]any) ZoomEntity` | Create a CloudRecording entity instance. |
| `Dashboard` | `(data map[string]any) ZoomEntity` | Create a Dashboard entity instance. |
| `Device` | `(data map[string]any) ZoomEntity` | Create a Device entity instance. |
| `DomainsList` | `(data map[string]any) ZoomEntity` | Create a DomainsList entity instance. |
| `Group` | `(data map[string]any) ZoomEntity` | Create a Group entity instance. |
| `GroupMemberList` | `(data map[string]any) ZoomEntity` | Create a GroupMemberList entity instance. |
| `ImChat` | `(data map[string]any) ZoomEntity` | Create an ImChat entity instance. |
| `ImGroup` | `(data map[string]any) ZoomEntity` | Create an ImGroup entity instance. |
| `ImGroupList` | `(data map[string]any) ZoomEntity` | Create an ImGroupList entity instance. |
| `Meeting` | `(data map[string]any) ZoomEntity` | Create a Meeting entity instance. |
| `MeetingInstance` | `(data map[string]any) ZoomEntity` | Create a MeetingInstance entity instance. |
| `MeetingInvitation` | `(data map[string]any) ZoomEntity` | Create a MeetingInvitation entity instance. |
| `MeetingRegistrantList` | `(data map[string]any) ZoomEntity` | Create a MeetingRegistrantList entity instance. |
| `Pac` | `(data map[string]any) ZoomEntity` | Create a Pac entity instance. |
| `Poll` | `(data map[string]any) ZoomEntity` | Create a Poll entity instance. |
| `Qos` | `(data map[string]any) ZoomEntity` | Create a Qos entity instance. |
| `Recording` | `(data map[string]any) ZoomEntity` | Create a Recording entity instance. |
| `RecordingSetting` | `(data map[string]any) ZoomEntity` | Create a RecordingSetting entity instance. |
| `Report` | `(data map[string]any) ZoomEntity` | Create a Report entity instance. |
| `TrackingField` | `(data map[string]any) ZoomEntity` | Create a TrackingField entity instance. |
| `Tsp` | `(data map[string]any) ZoomEntity` | Create a Tsp entity instance. |
| `User` | `(data map[string]any) ZoomEntity` | Create an User entity instance. |
| `UserAssistantsList` | `(data map[string]any) ZoomEntity` | Create an UserAssistantsList entity instance. |
| `UserPermission` | `(data map[string]any) ZoomEntity` | Create an UserPermission entity instance. |
| `UserSchedulersList` | `(data map[string]any) ZoomEntity` | Create an UserSchedulersList entity instance. |
| `UserSetting` | `(data map[string]any) ZoomEntity` | Create an UserSetting entity instance. |
| `Webhook` | `(data map[string]any) ZoomEntity` | Create a Webhook entity instance. |
| `Webinar` | `(data map[string]any) ZoomEntity` | Create a Webinar entity instance. |
| `WebinarInstance` | `(data map[string]any) ZoomEntity` | Create a WebinarInstance entity instance. |
| `WebinarPanelistList` | `(data map[string]any) ZoomEntity` | Create a WebinarPanelistList entity instance. |
| `WebinarRegistrantList` | `(data map[string]any) ZoomEntity` | Create a WebinarRegistrantList entity instance. |
| `ZoomRoomList` | `(data map[string]any) ZoomEntity` | Create a ZoomRoomList entity instance. |

### Entity interface (ZoomEntity)

All entities implement the `ZoomEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    account, err := client.Account(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // account is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Account

| Field | Description |
| --- | --- |
| `"accounts"` | List of Account objects |
| `"id"` |  |
| `"meeting_connectors"` | Meeting Connector, multiple values separated by comma |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"pay_mode"` | Payee |
| `"room_connectors"` | Virtual Room Connector, multiple value separated by comma |
| `"share_mc"` | Enable Share Meeting Connector |
| `"share_rc"` | Enable Share Virtual Room Connector |
| `"total_records"` | The number of all records available across pages |

Operations: Create, List, Load, Remove, Update.

API path: `/accounts`

#### AccountPlan

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"plan_audio"` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `"plan_base"` | Account base plan object |
| `"plan_large_meeting"` | Additional Large Meeting Plans |
| `"plan_recording"` | Additional Cloud Recording Plan |
| `"plan_room_connector"` | Account plan object |
| `"plan_webinar"` | Additional Webinar Plans |
| `"plan_zoom_rooms"` | Account plan object |

Operations: Create, List.

API path: `/accounts/{accountId}/plans`

#### AccountSetting

| Field | Description |
| --- | --- |
| `"email_notification"` | Account Settings: Notification |
| `"feature"` | Account Settings: Feature |
| `"id"` |  |
| `"in_meeting"` | Account Settings: In Meeting |
| `"integration"` | Account Settings: Integration |
| `"recording"` | Account Settings: Recording |
| `"schedule_meting"` | Account Settings: Schedule Meeting |
| `"security"` | Account Settings: Security |
| `"telephony"` | Account Settings: Telephony |
| `"zoom_rooms"` | Account Settings: Zoom Rooms |

Operations: Load.

API path: `/accounts/{accountId}/settings`

#### Billing

| Field | Description |
| --- | --- |
| `"address"` | Billing Contact's address |
| `"apt"` | Billing Contact's apartment/suite |
| `"city"` | Billing Contact's city |
| `"country"` | Billing Contact's country |
| `"email"` | Billing Contact's email address |
| `"first_name"` | Billing Contact's first name |
| `"last_name"` | Billing Contact's last name |
| `"phone_number"` | Billing Contact's phone number |
| `"state"` | Billing Contact's state |
| `"zip"` | Billing Contact's zip/postal code |

Operations: Create, Load, Patch, Update.

API path: `/accounts/{accountId}/plans/addons`

#### CloudRecording

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load, Patch, Remove, Update.

API path: `/meetings/{meetingId}/recordings`

#### Dashboard

| Field | Description |
| --- | --- |
| `"account_type"` | Zoom Room email type |
| `"calender_name"` | Zoom Calendar name |
| `"camera"` | Zoom Room camera |
| `"crc_ports_usage"` |  |
| `"device_ip"` | Zoom Room device IP |
| `"email"` | Zoom Room email |
| `"from"` | Start date for this report |
| `"id"` | Zoom Room ID |
| `"last_start_time"` | Zoom Room last start time |
| `"live_meeting"` | Meeting metric details |
| `"meetings"` | Array of meeting objects |
| `"microphone"` | Zoom Room microphone |
| `"next_page_token"` | Next page token is used to paginate through large result sets. |
| `"page_count"` | The number of items returned on this page |
| `"page_size"` | The number of records returned within a single API call. |
| `"participants"` | Array of user objects |
| `"past_meetings"` |  |
| `"room_name"` | Zoom Room name |
| `"speaker"` | Zoom Room speaker |
| `"status"` | Zoom Room status |
| `"to"` | End date for this report |
| `"total_records"` | The number of all records available across pages |
| `"users"` |  |
| `"webinars"` | Array of webinar objects |

Operations: List, Load.

API path: `/metrics/meetings`

#### Device

| Field | Description |
| --- | --- |
| `"devices"` | List of H.323/SIP Device objects |
| `"id"` |  |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"total_records"` | The number of all records available across pages |

Operations: Create, List, Remove, Update.

API path: `/h323/devices`

#### DomainsList

| Field | Description |
| --- | --- |
| `"domain"` | Domain Name |
| `"status"` | Domain Status |

Operations: List.

API path: `/accounts/{accountId}/managed_domains`

#### Group

| Field | Description |
| --- | --- |
| `"id"` | Group ID |
| `"name"` | Group name |
| `"total_members"` | Total number of members in this group |

Operations: Create, List, Load, Remove, Update.

API path: `/groups/{groupId}/members`

#### GroupMemberList

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"members"` | List of Group member objects |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"total_records"` | The number of all records available across pages |

Operations: List.

API path: `/groups/{groupId}/members`

#### ImChat

| Field | Description |
| --- | --- |
| `"from"` | Start date |
| `"messages"` | Array of session objects |
| `"next_page_token"` | Next page token, used to paginate through large result sets. |
| `"page_size"` | The amount of records returns within a single API call. |
| `"session_id"` | IM Chat session ID |
| `"sessions"` | Array of session objects |
| `"to"` | End date |

Operations: List, Load.

API path: `/im/chat/sessions`

#### ImGroup

| Field | Description |
| --- | --- |
| `"id"` | Group ID |

Operations: Create, Load, Remove, Update.

API path: `/im/groups/{groupId}/members`

#### ImGroupList

| Field | Description |
| --- | --- |
| `"groups"` | List of Group objects |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"total_records"` | The number of all records available across pages |

Operations: List.

API path: `/im/groups`

#### Meeting

| Field | Description |
| --- | --- |
| `"agenda"` | Agenda |
| `"created_at"` | Create time |
| `"duration"` | Meeting duration |
| `"email"` | User email |
| `"end_time"` | Meeting end time |
| `"h323_password"` | H.323/SIP room system password |
| `"has_3rd_party_audio"` |  |
| `"has_pstn"` |  |
| `"has_recording"` |  |
| `"has_screen_share"` |  |
| `"has_sip"` |  |
| `"has_video"` |  |
| `"has_voip"` |  |
| `"host"` | User display name |
| `"host_id"` | ID of the user set as host of meeting |
| `"id"` | Meeting Poll ID |
| `"join_url"` | Join url |
| `"meetings"` | List of Meeting objects |
| `"next_page_token"` | Next page token is used to paginate through large result sets. |
| `"occurrences"` | Array of occurrence objects |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"participants"` | Meeting participant count |
| `"participants_count"` | Number of meeting participants |
| `"password"` | Meeting password |
| `"questions"` | Array of Polls |
| `"settings"` | Meeting Settings |
| `"start_time"` | Meeting start time |
| `"start_url"` | Start url |
| `"status"` | Status of the Meeting Poll |
| `"timezone"` | Timezone to format start_time |
| `"title"` | Poll Title |
| `"topic"` | Meeting topic |
| `"total_minutes"` | Number of meeting minutes |
| `"total_records"` | The number of all records available across pages |
| `"tracking_fields"` | Tracking fields |
| `"type"` | Meeting Type |
| `"user_email"` | User email |
| `"user_name"` | User display name |
| `"user_type"` | User type |
| `"uuid"` | Meeting UUID |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/meetings/{meetingId}/registrants`

#### MeetingInstance

| Field | Description |
| --- | --- |
| `"meetings"` | List of ended meeting instances. |

Operations: List.

API path: `/past_meetings/{meetingId}/instances`

#### MeetingInvitation

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"invitation"` | Meeting invitation |

Operations: Load.

API path: `/meetings/{meetingId}/invitation`

#### MeetingRegistrantList

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/meetings/{meetingId}/registrants`

#### Pac

| Field | Description |
| --- | --- |
| `"conference_id"` | Conference ID |
| `"dedicated_dial_in_number"` | List of Dedicated Dial In Numbers |
| `"global_dial_in_numbers"` | List of Global Dial In Numbers |
| `"listen_only_password"` | Listen-Only Password, numeric value, length is less than 6 |
| `"participant_password"` | Participant Password, numeric value, length is less than 6 |

Operations: List.

API path: `/users/{userId}/pac`

#### Poll

| Field | Description |
| --- | --- |
| `"polls"` | Array of Polls |
| `"total_records"` | The number of all records available across pages |

Operations: List.

API path: `/meetings/{meetingId}/polls`

#### Qos

| Field | Description |
| --- | --- |
| `"as_input"` | Quality of Service object |
| `"as_output"` | Quality of Service object |
| `"audio_input"` | Quality of Service object |
| `"audio_output"` | Quality of Service object |
| `"cpu_usage"` |  |
| `"date_time"` | Datetime of QOS |
| `"next_page_token"` | Next page token is used to paginate through large result sets. |
| `"page_count"` | The number of items returned on this page |
| `"page_size"` | The number of items per page |
| `"participants"` | Array of user objects |
| `"total_records"` | The number of all records available across pages |
| `"video_input"` | Quality of Service object |
| `"video_output"` | Quality of Service object |

Operations: List, Load.

API path: `/metrics/meetings/{meetingId}/participants/qos`

#### Recording

| Field | Description |
| --- | --- |
| `"from"` | Start Date, |
| `"meetings"` | List of Recording |
| `"next_page_token"` | Next page token is used to paginate through large result sets. |
| `"page_count"` | The number of items returned on this page |
| `"page_size"` | The number of records returned within a single API call. |
| `"to"` | End Date |
| `"total_records"` | The number of all records available across pages |

Operations: List.

API path: `/users/{userId}/recordings`

#### RecordingSetting

| Field | Description |
| --- | --- |
| `"approval_type"` | Approval type |
| `"on_demand"` | Registration required |
| `"password"` | Password protect |
| `"send_email_to_host"` | Send an email to host when someone registers |
| `"share_recording"` | Determine if the meeting recording is shared |
| `"show_social_share_buttons"` | Show social share buttons on registration page |
| `"viewer_download"` | Host video |

Operations: Load.

API path: `/meetings/{meetingId}/recordings/settings`

#### Report

| Field | Description |
| --- | --- |
| `"duration"` | Meeting duration |
| `"email"` | Participant email |
| `"end_time"` | Meeting end time |
| `"from"` | Start date for this report |
| `"id"` | Meeting ID |
| `"meetings"` | Array of meeting objects |
| `"name"` | Participant display name |
| `"next_page_token"` | Next page token is used to paginate through large result sets. |
| `"page_count"` | The number of items returned on this page |
| `"page_size"` | The number of records returned within a single API call. |
| `"participants"` | Array of meeting participant objects |
| `"participants_count"` | Number of meeting participants |
| `"question_details"` | Array of questions from user |
| `"start_time"` | Meeting start time |
| `"to"` | End date for this report |
| `"topic"` | Meeting topic |
| `"total_minutes"` | Number of meeting minutes |
| `"total_records"` | The number of all records available across pages |
| `"tracking_fields"` | Tracking fields |
| `"type"` | Meeting type |
| `"user_email"` | User email |
| `"user_name"` | User display name |
| `"uuid"` | Meeting UUID |

Operations: List, Load.

API path: `/report/users/{userId}/meetings`

#### TrackingField

| Field | Description |
| --- | --- |
| `"field"` | Tracking Field Name |
| `"id"` | Tracking Field ID |
| `"recommended_values"` | Array of recommended values |
| `"required"` | Tracking Field Required |
| `"total_records"` | The number of all records available across pages |
| `"tracking_fields"` | Array of Tracking Fields |
| `"visible"` | Tracking Field Visible |

Operations: Create, List, Load, Remove, Update.

API path: `/v2/tracking_fields`

#### Tsp

| Field | Description |
| --- | --- |
| `"code"` | Country Code |
| `"conference_code"` | Conference code, numeric value, length is less than 16. |
| `"dial_in_numbers"` | List of Dial In Numbers |
| `"id"` |  |
| `"leader_pin"` | Leader PIN, numeric value, length is less than 16. |
| `"number"` | Dial-in number, length is less than 16 |
| `"type"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/users/{userId}/tsp`

#### User

| Field | Description |
| --- | --- |
| `"account_id"` |  |
| `"cms_user_id"` |  |
| `"created_at"` | User create time |
| `"dept"` | Department |
| `"email"` | User's email address |
| `"first_name"` | User's first name |
| `"group_ids"` |  |
| `"host_key"` |  |
| `"id"` | User ID |
| `"im_group_ids"` |  |
| `"language"` |  |
| `"last_client_version"` | User last login client version |
| `"last_login_time"` | User last login time |
| `"last_name"` | User's last name |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"personal_meeting_url"` |  |
| `"pic_url"` |  |
| `"pmi"` | Personal Meeting ID |
| `"timezone"` | Time Zone |
| `"total_records"` | The number of all records available across pages |
| `"type"` | User's type |
| `"use_pmi"` |  |
| `"users"` | List of User objects |
| `"vanity_url"` |  |
| `"verified"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/users/{userId}/assistants`

#### UserAssistantsList

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: List.

API path: `/users/{userId}/assistants`

#### UserPermission

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"permissions"` | List of user permissions |

Operations: List.

API path: `/users/{userId}/permissions`

#### UserSchedulersList

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: List.

API path: `/users/{userId}/schedulers`

#### UserSetting

| Field | Description |
| --- | --- |
| `"email_notification"` |  |
| `"feature"` |  |
| `"id"` |  |
| `"in_meeting"` |  |
| `"recording"` |  |
| `"schedule_meeting"` |  |
| `"telephony"` |  |

Operations: Load.

API path: `/users/{userId}/settings`

#### Webhook

| Field | Description |
| --- | --- |
| `"auth_password"` | Webhook auth password |
| `"auth_user"` | Webhook auth user name |
| `"created_at"` | Webhook create time |
| `"events"` | List of events objects. |
| `"id"` |  |
| `"total_records"` | The number of all records available across pages |
| `"url"` | Webhook endpoint |
| `"webhook_id"` | Webhook Id |
| `"webhooks"` | List of Webhook objects |

Operations: Create, List, Load, Remove, Update.

API path: `/webhooks`

#### Webinar

| Field | Description |
| --- | --- |
| `"agenda"` | Webinar agenda |
| `"created_at"` | Create time |
| `"duration"` | Webinar duration |
| `"email"` | User email |
| `"end_time"` | Webinar end time |
| `"has_3rd_party_audio"` |  |
| `"has_pstn"` |  |
| `"has_recording"` |  |
| `"has_screen_share"` |  |
| `"has_sip"` |  |
| `"has_video"` |  |
| `"has_voip"` |  |
| `"host"` | User display name |
| `"host_id"` | ID of the user set as host of webinar |
| `"id"` | Webinar Poll ID |
| `"join_url"` | Join url |
| `"occurrences"` | Array of occurrence objects |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"participants"` | Webinar participant count |
| `"questions"` | Array of Polls |
| `"settings"` | Webinar Settings |
| `"start_time"` | Webinar start time |
| `"start_url"` | Start url |
| `"status"` | Status of the Webinar Poll |
| `"timezone"` | Timezone to format start_time |
| `"title"` | Poll Title |
| `"topic"` | Webinar topic |
| `"total_records"` | The number of all records available across pages |
| `"tracking_fields"` | Tracking fields |
| `"type"` | Webinar Type |
| `"user_type"` | User type |
| `"uuid"` | Webinar UUID |
| `"webinars"` | List of Webinar objects |

Operations: Create, List, Load, Patch, Remove, Update.

API path: `/webinars/{webinarId}/registrants`

#### WebinarInstance

| Field | Description |
| --- | --- |
| `"webinars"` | List of ended webinar instances. |

Operations: List.

API path: `/past_webinars/{webinarId}/instances`

#### WebinarPanelistList

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"panelists"` | List of Panelist objects |
| `"total_records"` | Total records |

Operations: List.

API path: `/webinars/{webinarId}/panelists`

#### WebinarRegistrantList

| Field | Description |
| --- | --- |
| `"id"` |  |

Operations: Load.

API path: `/webinars/{webinarId}/registrants`

#### ZoomRoomList

| Field | Description |
| --- | --- |
| `"page_count"` | The number of items returned on this page |
| `"page_number"` | The page number of current results |
| `"page_size"` | The number of records returned within a single API call |
| `"total_records"` | The number of all records available across pages |
| `"zoom_rooms"` | Array of Zoom Rooms |

Operations: List.

API path: `/metrics/zoomrooms`



## Entities


### Account

Create an instance: `account := client.Account(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `accounts` | `[]any` | List of Account objects |
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

```go
account, err := client.Account(nil).Load(map[string]any{"id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(account) // the loaded record
```

#### Example: List

```go
accounts, err := client.Account(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(accounts) // the array of records
```

#### Example: Create

```go
result, err := client.Account(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### AccountPlan

Create an instance: `accountPlan := client.AccountPlan(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `plan_audio` | `map[string]any` | Additional Audio Conferencing <a href="#plans">plan type</a> |
| `plan_base` | `map[string]any` | Account base plan object |
| `plan_large_meeting` | `[]any` | Additional Large Meeting Plans |
| `plan_recording` | `string` | Additional Cloud Recording Plan |
| `plan_room_connector` | `map[string]any` | Account plan object |
| `plan_webinar` | `[]any` | Additional Webinar Plans |
| `plan_zoom_rooms` | `map[string]any` | Account plan object |

#### Example: List

```go
accountPlans, err := client.AccountPlan(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(accountPlans) // the array of records
```

#### Example: Create

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


### AccountSetting

Create an instance: `accountSetting := client.AccountSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `map[string]any` | Account Settings: Notification |
| `feature` | `map[string]any` | Account Settings: Feature |
| `id` | `string` |  |
| `in_meeting` | `map[string]any` | Account Settings: In Meeting |
| `integration` | `map[string]any` | Account Settings: Integration |
| `recording` | `map[string]any` | Account Settings: Recording |
| `schedule_meting` | `map[string]any` | Account Settings: Schedule Meeting |
| `security` | `map[string]any` | Account Settings: Security |
| `telephony` | `map[string]any` | Account Settings: Telephony |
| `zoom_rooms` | `map[string]any` | Account Settings: Zoom Rooms |

#### Example: Load

```go
accountSetting, err := client.AccountSetting(nil).Load(map[string]any{"id": "account_setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(accountSetting) // the loaded record
```


### Billing

Create an instance: `billing := client.Billing(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |

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

```go
billing, err := client.Billing(nil).Load(map[string]any{"account_id": "account_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(billing) // the loaded record
```

#### Example: Create

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


### CloudRecording

Create an instance: `cloudRecording := client.CloudRecording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
cloudRecording, err := client.CloudRecording(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cloudRecording) // the loaded record
```


### Dashboard

Create an instance: `dashboard := client.Dashboard(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_type` | `string` | Zoom Room email type |
| `calender_name` | `string` | Zoom Calendar name |
| `camera` | `string` | Zoom Room camera |
| `crc_ports_usage` | `[]any` |  |
| `device_ip` | `string` | Zoom Room device IP |
| `email` | `string` | Zoom Room email |
| `from` | `string` | Start date for this report |
| `id` | `string` | Zoom Room ID |
| `last_start_time` | `string` | Zoom Room last start time |
| `live_meeting` | `map[string]any` | Meeting metric details |
| `meetings` | `[]any` | Array of meeting objects |
| `microphone` | `string` | Zoom Room microphone |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `[]any` | Array of user objects |
| `past_meetings` | `map[string]any` |  |
| `room_name` | `string` | Zoom Room name |
| `speaker` | `string` | Zoom Room speaker |
| `status` | `string` | Zoom Room status |
| `to` | `string` | End date for this report |
| `total_records` | `int` | The number of all records available across pages |
| `users` | `[]any` |  |
| `webinars` | `[]any` | Array of webinar objects |

#### Example: Load

```go
dashboard, err := client.Dashboard(nil).Load(map[string]any{"zoomroom_id": "zoomroom_id", "from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dashboard) // the loaded record
```

#### Example: List

```go
dashboards, err := client.Dashboard(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dashboards) // the array of records
```


### Device

Create an instance: `device := client.Device(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `devices` | `[]any` | List of H.323/SIP Device objects |
| `id` | `string` |  |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```go
devices, err := client.Device(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(devices) // the array of records
```

#### Example: Create

```go
result, err := client.Device(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### DomainsList

Create an instance: `domainsList := client.DomainsList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `domain` | `string` | Domain Name |
| `status` | `string` | Domain Status |

#### Example: List

```go
domainsLists, err := client.DomainsList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(domainsLists) // the array of records
```


### Group

Create an instance: `group := client.Group(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Group ID |
| `name` | `string` | Group name |
| `total_members` | `int` | Total number of members in this group |

#### Example: Load

```go
group, err := client.Group(nil).Load(map[string]any{"id": "group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(group) // the loaded record
```

#### Example: List

```go
groups, err := client.Group(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(groups) // the array of records
```

#### Example: Create

```go
result, err := client.Group(nil).Create(map[string]any{
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GroupMemberList

Create an instance: `groupMemberList := client.GroupMemberList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `members` | `[]any` | List of Group member objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```go
groupMemberLists, err := client.GroupMemberList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(groupMemberLists) // the array of records
```


### ImChat

Create an instance: `imChat := client.ImChat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start date |
| `messages` | `[]any` | Array of session objects |
| `next_page_token` | `string` | Next page token, used to paginate through large result sets. |
| `page_size` | `int` | The amount of records returns within a single API call. |
| `session_id` | `string` | IM Chat session ID |
| `sessions` | `[]any` | Array of session objects |
| `to` | `string` | End date |

#### Example: Load

```go
imChat, err := client.ImChat(nil).Load(map[string]any{"session_id": "session_id", "from": "from", "to": "to"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(imChat) // the loaded record
```

#### Example: List

```go
imChats, err := client.ImChat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(imChats) // the array of records
```


### ImGroup

Create an instance: `imGroup := client.ImGroup(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Group ID |

#### Example: Load

```go
imGroup, err := client.ImGroup(nil).Load(map[string]any{"id": "im_group_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(imGroup) // the loaded record
```

#### Example: Create

```go
result, err := client.ImGroup(nil).Create(map[string]any{
    "body": "example_body",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### ImGroupList

Create an instance: `imGroupList := client.ImGroupList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `groups` | `[]any` | List of Group objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```go
imGroupLists, err := client.ImGroupList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(imGroupLists) // the array of records
```


### Meeting

Create an instance: `meeting := client.Meeting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `meetings` | `[]any` | List of Meeting objects |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `occurrences` | `[]any` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Meeting participant count |
| `participants_count` | `int` | Number of meeting participants |
| `password` | `string` | Meeting password |
| `questions` | `[]any` | Array of Polls |
| `settings` | `map[string]any` | Meeting Settings |
| `start_time` | `string` | Meeting start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Meeting Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `[]any` | Tracking fields |
| `type` | `int` | Meeting Type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `user_type` | `string` | User type |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```go
meeting, err := client.Meeting(nil).Load(map[string]any{"id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(meeting) // the loaded record
```

#### Example: List

```go
meetings, err := client.Meeting(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(meetings) // the array of records
```

#### Example: Create

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


### MeetingInstance

Create an instance: `meetingInstance := client.MeetingInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetings` | `[]any` | List of ended meeting instances. |

#### Example: List

```go
meetingInstances, err := client.MeetingInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(meetingInstances) // the array of records
```


### MeetingInvitation

Create an instance: `meetingInvitation := client.MeetingInvitation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `invitation` | `string` | Meeting invitation |

#### Example: Load

```go
meetingInvitation, err := client.MeetingInvitation(nil).Load(map[string]any{"id": "meeting_invitation_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(meetingInvitation) // the loaded record
```


### MeetingRegistrantList

Create an instance: `meetingRegistrantList := client.MeetingRegistrantList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
meetingRegistrantList, err := client.MeetingRegistrantList(nil).Load(map[string]any{"id": "meeting_registrant_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(meetingRegistrantList) // the loaded record
```


### Pac

Create an instance: `pac := client.Pac(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `conference_id` | `int` | Conference ID |
| `dedicated_dial_in_number` | `[]any` | List of Dedicated Dial In Numbers |
| `global_dial_in_numbers` | `[]any` | List of Global Dial In Numbers |
| `listen_only_password` | `string` | Listen-Only Password, numeric value, length is less than 6 |
| `participant_password` | `string` | Participant Password, numeric value, length is less than 6 |

#### Example: List

```go
pacs, err := client.Pac(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(pacs) // the array of records
```


### Poll

Create an instance: `poll := client.Poll(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `polls` | `[]any` | Array of Polls |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```go
polls, err := client.Poll(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(polls) // the array of records
```


### Qos

Create an instance: `qos := client.Qos(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `as_input` | `map[string]any` | Quality of Service object |
| `as_output` | `map[string]any` | Quality of Service object |
| `audio_input` | `map[string]any` | Quality of Service object |
| `audio_output` | `map[string]any` | Quality of Service object |
| `cpu_usage` | `any` |  |
| `date_time` | `string` | Datetime of QOS |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of items per page |
| `participants` | `[]any` | Array of user objects |
| `total_records` | `int` | The number of all records available across pages |
| `video_input` | `map[string]any` | Quality of Service object |
| `video_output` | `map[string]any` | Quality of Service object |

#### Example: Load

```go
qos, err := client.Qos(nil).Load(map[string]any{"participant_id": "participant_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(qos) // the loaded record
```

#### Example: List

```go
qoss, err := client.Qos(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(qoss) // the array of records
```


### Recording

Create an instance: `recording := client.Recording(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `from` | `string` | Start Date, |
| `meetings` | `[]any` | List of Recording |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `to` | `string` | End Date |
| `total_records` | `int` | The number of all records available across pages |

#### Example: List

```go
recordings, err := client.Recording(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(recordings) // the array of records
```


### RecordingSetting

Create an instance: `recordingSetting := client.RecordingSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
recordingSetting, err := client.RecordingSetting(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(recordingSetting) // the loaded record
```


### Report

Create an instance: `report := client.Report(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Meeting duration |
| `email` | `string` | Participant email |
| `end_time` | `string` | Meeting end time |
| `from` | `string` | Start date for this report |
| `id` | `int` | Meeting ID |
| `meetings` | `[]any` | Array of meeting objects |
| `name` | `string` | Participant display name |
| `next_page_token` | `string` | Next page token is used to paginate through large result sets. |
| `page_count` | `int` | The number of items returned on this page |
| `page_size` | `int` | The number of records returned within a single API call. |
| `participants` | `[]any` | Array of meeting participant objects |
| `participants_count` | `int` | Number of meeting participants |
| `question_details` | `[]any` | Array of questions from user |
| `start_time` | `string` | Meeting start time |
| `to` | `string` | End date for this report |
| `topic` | `string` | Meeting topic |
| `total_minutes` | `int` | Number of meeting minutes |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `[]any` | Tracking fields |
| `type` | `int` | Meeting type |
| `user_email` | `string` | User email |
| `user_name` | `string` | User display name |
| `uuid` | `string` | Meeting UUID |

#### Example: Load

```go
report, err := client.Report(nil).Load(map[string]any{"meeting_id": "meeting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(report) // the loaded record
```

#### Example: List

```go
reports, err := client.Report(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(reports) // the array of records
```


### TrackingField

Create an instance: `trackingField := client.TrackingField(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `field` | `string` | Tracking Field Name |
| `id` | `string` | Tracking Field ID |
| `recommended_values` | `[]any` | Array of recommended values |
| `required` | `bool` | Tracking Field Required |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `[]any` | Array of Tracking Fields |
| `visible` | `bool` | Tracking Field Visible |

#### Example: Load

```go
trackingField, err := client.TrackingField(nil).Load(map[string]any{"id": "tracking_field_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(trackingField) // the loaded record
```

#### Example: List

```go
trackingFields, err := client.TrackingField(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(trackingFields) // the array of records
```

#### Example: Create

```go
result, err := client.TrackingField(nil).Create(map[string]any{
    "body": map[string]any{},
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Tsp

Create an instance: `tsp := client.Tsp(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | Country Code |
| `conference_code` | `string` | Conference code, numeric value, length is less than 16. |
| `dial_in_numbers` | `[]any` | List of Dial In Numbers |
| `id` | `string` |  |
| `leader_pin` | `string` | Leader PIN, numeric value, length is less than 16. |
| `number` | `string` | Dial-in number, length is less than 16 |
| `type` | `string` |  |

#### Example: Load

```go
tsp, err := client.Tsp(nil).Load(map[string]any{"id": "tsp_id", "user_id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(tsp) // the loaded record
```

#### Example: List

```go
tsps, err := client.Tsp(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(tsps) // the array of records
```

#### Example: Create

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


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | `string` |  |
| `cms_user_id` | `string` |  |
| `created_at` | `string` | User create time |
| `dept` | `string` | Department |
| `email` | `string` | User's email address |
| `first_name` | `string` | User's first name |
| `group_ids` | `[]any` |  |
| `host_key` | `string` |  |
| `id` | `string` | User ID |
| `im_group_ids` | `[]any` |  |
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
| `users` | `[]any` | List of User objects |
| `vanity_url` | `string` |  |
| `verified` | `int` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(users) // the array of records
```

#### Example: Create

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


### UserAssistantsList

Create an instance: `userAssistantsList := client.UserAssistantsList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```go
userAssistantsLists, err := client.UserAssistantsList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userAssistantsLists) // the array of records
```


### UserPermission

Create an instance: `userPermission := client.UserPermission(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `permissions` | `[]any` | List of user permissions |

#### Example: List

```go
userPermissions, err := client.UserPermission(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userPermissions) // the array of records
```


### UserSchedulersList

Create an instance: `userSchedulersList := client.UserSchedulersList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: List

```go
userSchedulersLists, err := client.UserSchedulersList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(userSchedulersLists) // the array of records
```


### UserSetting

Create an instance: `userSetting := client.UserSetting(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email_notification` | `map[string]any` |  |
| `feature` | `map[string]any` |  |
| `id` | `string` |  |
| `in_meeting` | `map[string]any` |  |
| `recording` | `map[string]any` |  |
| `schedule_meeting` | `map[string]any` |  |
| `telephony` | `map[string]any` |  |

#### Example: Load

```go
userSetting, err := client.UserSetting(nil).Load(map[string]any{"id": "user_setting_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(userSetting) // the loaded record
```


### Webhook

Create an instance: `webhook := client.Webhook(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `auth_password` | `string` | Webhook auth password |
| `auth_user` | `string` | Webhook auth user name |
| `created_at` | `string` | Webhook create time |
| `events` | `[]any` | List of events objects. |
| `id` | `string` |  |
| `total_records` | `int` | The number of all records available across pages |
| `url` | `string` | Webhook endpoint |
| `webhook_id` | `string` | Webhook Id |
| `webhooks` | `[]any` | List of Webhook objects |

#### Example: Load

```go
webhook, err := client.Webhook(nil).Load(map[string]any{"id": "webhook_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhook) // the loaded record
```

#### Example: List

```go
webhooks, err := client.Webhook(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webhooks) // the array of records
```

#### Example: Create

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


### Webinar

Create an instance: `webinar := client.Webinar(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

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
| `occurrences` | `[]any` | Array of occurrence objects |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `participants` | `int` | Webinar participant count |
| `questions` | `[]any` | Array of Polls |
| `settings` | `map[string]any` | Webinar Settings |
| `start_time` | `string` | Webinar start time |
| `start_url` | `string` | Start url |
| `status` | `string` | Status of the Webinar Poll |
| `timezone` | `string` | Timezone to format start_time |
| `title` | `string` | Poll Title |
| `topic` | `string` | Webinar topic |
| `total_records` | `int` | The number of all records available across pages |
| `tracking_fields` | `[]any` | Tracking fields |
| `type` | `int` | Webinar Type |
| `user_type` | `string` | User type |
| `uuid` | `string` | Webinar UUID |
| `webinars` | `[]any` | List of Webinar objects |

#### Example: Load

```go
webinar, err := client.Webinar(nil).Load(map[string]any{"id": "webinar_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webinar) // the loaded record
```

#### Example: List

```go
webinars, err := client.Webinar(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webinars) // the array of records
```

#### Example: Create

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


### WebinarInstance

Create an instance: `webinarInstance := client.WebinarInstance(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `webinars` | `[]any` | List of ended webinar instances. |

#### Example: List

```go
webinarInstances, err := client.WebinarInstance(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webinarInstances) // the array of records
```


### WebinarPanelistList

Create an instance: `webinarPanelistList := client.WebinarPanelistList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |
| `panelists` | `[]any` | List of Panelist objects |
| `total_records` | `int` | Total records |

#### Example: List

```go
webinarPanelistLists, err := client.WebinarPanelistList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(webinarPanelistLists) // the array of records
```


### WebinarRegistrantList

Create an instance: `webinarRegistrantList := client.WebinarRegistrantList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` |  |

#### Example: Load

```go
webinarRegistrantList, err := client.WebinarRegistrantList(nil).Load(map[string]any{"id": "webinar_registrant_list_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(webinarRegistrantList) // the loaded record
```


### ZoomRoomList

Create an instance: `zoomRoomList := client.ZoomRoomList(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `page_count` | `int` | The number of items returned on this page |
| `page_number` | `int` | The page number of current results |
| `page_size` | `int` | The number of records returned within a single API call |
| `total_records` | `int` | The number of all records available across pages |
| `zoom_rooms` | `[]any` | Array of Zoom Rooms |

#### Example: List

```go
zoomRoomLists, err := client.ZoomRoomList(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(zoomRoomLists) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

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

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/zoom-sdk/go/
├── zoom.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/zoom-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
usersetting := client.UserSetting(nil)
usersetting.Load(map[string]any{"id": "example_id"}, nil)

// usersetting.Data() now returns the usersetting data from the last load
// usersetting.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
