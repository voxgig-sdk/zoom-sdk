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

#### `Meeting(data=None)`

Create a new `MeetingEntity` instance. Pass `None` for no initial data.

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

## MeetingEntity

```python
meeting = client.Meeting()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `str` | No |  |
| `created_at` | `str` | No |  |
| `duration` | `int` | No |  |
| `host_id` | `str` | No |  |
| `host_video` | `bool` | No |  |
| `id` | `int` | No |  |
| `join_before_host` | `bool` | No |  |
| `join_url` | `str` | No |  |
| `mute_upon_entry` | `bool` | No |  |
| `participant_video` | `bool` | No |  |
| `password` | `str` | No |  |
| `settings` | `dict` | No |  |
| `start_time` | `str` | No |  |
| `status` | `str` | No |  |
| `timezone` | `str` | No |  |
| `topic` | `str` | Yes |  |
| `type` | `int` | No |  |
| `uuid` | `str` | No |  |
| `waiting_room` | `bool` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Meeting().create({
    "user_id": "example_user_id",  # str
    "topic": "example_topic",  # str
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
result = client.Meeting().load({"id": 1})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Meeting().remove({"id": 1})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Meeting().update({
    "id": 1,
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

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ZoomSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

