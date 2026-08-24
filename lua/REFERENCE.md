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

#### `Meeting(data)`

Create a new `Meeting` entity instance. Pass `nil` for no initial data.

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

## MeetingEntity

```lua
local meeting = client:Meeting(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `string` | No |  |
| `created_at` | `string` | No |  |
| `duration` | `number` | No |  |
| `host_id` | `string` | No |  |
| `host_video` | `boolean` | No |  |
| `id` | `number` | No |  |
| `join_before_host` | `boolean` | No |  |
| `join_url` | `string` | No |  |
| `mute_upon_entry` | `boolean` | No |  |
| `participant_video` | `boolean` | No |  |
| `password` | `string` | No |  |
| `settings` | `table` | No |  |
| `start_time` | `string` | No |  |
| `status` | `string` | No |  |
| `timezone` | `string` | No |  |
| `topic` | `string` | Yes |  |
| `type` | `number` | No |  |
| `uuid` | `string` | No |  |
| `waiting_room` | `boolean` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `agenda` | - | - | - | - | - |
| `created_at` | - | - | - | - | - |
| `duration` | - | - | - | - | - |
| `host_id` | - | - | - | - | - |
| `host_video` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `join_before_host` | - | - | - | - | - |
| `join_url` | - | - | - | - | - |
| `mute_upon_entry` | - | - | - | - | - |
| `participant_video` | - | - | - | - | - |
| `password` | - | - | - | - | - |
| `settings` | - | - | - | - | - |
| `start_time` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `timezone` | - | - | - | - | - |
| `topic` | - | Yes | - | - | - |
| `type` | - | - | - | - | - |
| `uuid` | - | - | - | - | - |
| `waiting_room` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Meeting():create({
  user_id = --[[ string ]],
  topic = --[[ string ]],
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
local result, err = client:Meeting():load({ id = 1 })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Meeting():remove({ id = 1 })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Meeting():update({
  id = 1,
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

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

