# Zoom PHP SDK Reference

Complete API reference for the Zoom PHP SDK.


## ZoomSDK

### Constructor

```php
require_once __DIR__ . '/zoom_sdk.php';

$client = new ZoomSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ZoomSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ZoomSDK::test();
```


### Instance Methods

#### `Meeting($data = null)`

Create a new `MeetingEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ZoomUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## MeetingEntity

```php
$meeting = $client->Meeting();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agenda` | `string` | No |  |
| `created_at` | `string` | No |  |
| `duration` | `int` | No |  |
| `host_id` | `string` | No |  |
| `host_video` | `bool` | No |  |
| `id` | `int` | No |  |
| `join_before_host` | `bool` | No |  |
| `join_url` | `string` | No |  |
| `mute_upon_entry` | `bool` | No |  |
| `participant_video` | `bool` | No |  |
| `password` | `string` | No |  |
| `settings` | `array` | No |  |
| `start_time` | `string` | No |  |
| `status` | `string` | No |  |
| `timezone` | `string` | No |  |
| `topic` | `string` | Yes |  |
| `type` | `int` | No |  |
| `uuid` | `string` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Meeting()->create([
  "user_id" => null, // string
  "topic" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Meeting()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Meeting()->load(["id" => 1]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Meeting()->remove(["id" => 1]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Meeting()->update([
  "id" => 1,
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MeetingEntity`

Create a new `MeetingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ZoomSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

