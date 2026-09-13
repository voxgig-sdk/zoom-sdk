# Zoom SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Zoom",
            "slug": "zoom",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.zoom.us/v2",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "meeting": {},
            },
        },
        "entity": {
      "meeting": {
        "fields": [
          {
            "name": "agenda",
            "type": "`$STRING`",
          },
          {
            "name": "created_at",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "type": "`$INTEGER`",
          },
          {
            "name": "host_id",
            "type": "`$STRING`",
          },
          {
            "name": "host_video",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "join_before_host",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "join_url",
            "type": "`$STRING`",
          },
          {
            "name": "mute_upon_entry",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "participant_video",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "password",
            "type": "`$STRING`",
          },
          {
            "name": "settings",
            "type": "`$OBJECT`",
          },
          {
            "name": "start_time",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "timezone",
            "type": "`$STRING`",
          },
          {
            "name": "topic",
            "op": {
              "list": {
                "type": "`$STRING`",
              },
            },
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$INTEGER`",
          },
          {
            "name": "uuid",
            "type": "`$STRING`",
          },
          {
            "name": "waiting_room",
            "type": "`$BOOLEAN`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "meeting",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/users/{userId}/meetings",
                "rename": {
                  "param": {
                    "userId": "user_id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "user_id",
                  },
                  {
                    "lit": "meetings",
                  },
                ],
                "select": {
                  "exist": [
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.settings`",
                },
                "parts": [
                  "users",
                  "{user_id}",
                  "meetings",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "user_id",
                      "orig": "user_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "kind": "query",
                      "name": "next_page_token",
                      "orig": "next_page_token",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "page_size",
                      "orig": "page_size",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/users/{userId}/meetings",
                "rename": {
                  "param": {
                    "userId": "user_id",
                  },
                },
                "segments": [
                  {
                    "lit": "users",
                  },
                  {
                    "var": "user_id",
                  },
                  {
                    "lit": "meetings",
                  },
                ],
                "select": {
                  "exist": [
                    "next_page_token",
                    "page_size",
                    "type",
                    "user_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.meetings`",
                },
                "parts": [
                  "users",
                  "{user_id}",
                  "meetings",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "meeting_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/meetings/{meetingId}",
                "rename": {
                  "param": {
                    "meetingId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "meetings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.settings`",
                },
                "parts": [
                  "meetings",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "meeting_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/meetings/{meetingId}",
                "rename": {
                  "param": {
                    "meetingId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "meetings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "meetings",
                  "{id}",
                ],
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "meeting_id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PATCH",
                "orig": "/meetings/{meetingId}",
                "rename": {
                  "param": {
                    "meetingId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "meetings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "meetings",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "user",
            ],
          ],
        },
      },
    },
    }
