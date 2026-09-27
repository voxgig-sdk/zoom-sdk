-- Zoom SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Zoom",
      slug = "zoom",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["debug"] = {
        ["options"] = {
          ["active"] = false,
          ["max"] = 100,
          ["redact"] = {
            "authorization",
            "cookie",
            "set-cookie",
            "api-key",
            "apikey",
            "x-api-key",
            "idempotency-key",
          },
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["onEntry"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["idempotency"] = {
        ["options"] = {
          ["active"] = false,
          ["header"] = "Idempotency-Key",
          ["methods"] = {
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
          },
          ["ops"] = {
            "create",
            "update",
            "remove",
          },
        },
        ["optspec"] = {
          ["keygen"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["metrics"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["paging"] = {
        ["options"] = {
          ["active"] = false,
          ["afterVar"] = "after",
          ["cursorParam"] = "cursor",
          ["firstVar"] = "first",
          ["limitParam"] = "limit",
          ["pageParam"] = "page",
          ["startPage"] = 1,
        },
        ["optspec"] = {
          ["limit"] = "`$NUMBER`",
          ["ops"] = "`$LIST`",
        },
        ["strict"] = false,
        ["transport"] = "none",
      },
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.zoom.us/v2",
      auth = {
        prefix = "",
        ["in"] = "query",
        name = "access_token",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["account"] = {},
        ["account_plan"] = {},
        ["account_setting"] = {},
        ["billing"] = {},
        ["cloud_recording"] = {},
        ["dashboard"] = {},
        ["device"] = {},
        ["domains_list"] = {},
        ["group"] = {},
        ["group_member_list"] = {},
        ["im_chat"] = {},
        ["im_group"] = {},
        ["im_group_list"] = {},
        ["meeting"] = {},
        ["meeting_instance"] = {},
        ["meeting_invitation"] = {},
        ["meeting_registrant_list"] = {},
        ["pac"] = {},
        ["poll"] = {},
        ["qos"] = {},
        ["recording"] = {},
        ["recording_setting"] = {},
        ["report"] = {},
        ["tracking_field"] = {},
        ["tsp"] = {},
        ["user"] = {},
        ["user_assistants_list"] = {},
        ["user_permission"] = {},
        ["user_schedulers_list"] = {},
        ["user_setting"] = {},
        ["webhook"] = {},
        ["webinar"] = {},
        ["webinar_instance"] = {},
        ["webinar_panelist_list"] = {},
        ["webinar_registrant_list"] = {},
        ["zoom_room_list"] = {},
      },
    },
    entity = {
      ["account"] = {
        ["fields"] = {
          {
            ["name"] = "accounts",
            ["title"] = "Accounts",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Account objects",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "meeting_connectors",
            ["title"] = "Meeting Connectors",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting Connector, multiple values separated by comma",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "pay_mode",
            ["title"] = "Pay Mode",
            ["type"] = "`$STRING`",
            ["short"] = "Payee",
          },
          {
            ["name"] = "room_connectors",
            ["title"] = "Room Connectors",
            ["type"] = "`$STRING`",
            ["short"] = "Virtual Room Connector, multiple value separated by comma",
          },
          {
            ["name"] = "share_mc",
            ["title"] = "Share Mc",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Enable Share Meeting Connector",
          },
          {
            ["name"] = "share_rc",
            ["title"] = "Share Rc",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Enable Share Virtual Room Connector",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "account",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/accounts",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                },
                ["parts"] = {
                  "accounts",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                },
                ["parts"] = {
                  "accounts",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page_number",
                    "page_size",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/{accountId}",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.options`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/accounts/{accountId}",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/accounts/{accountId}/options",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "options",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                  "options",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "option",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/accounts/{accountId}/settings",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "setting",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["account_plan"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "plan_audio",
            ["title"] = "Plan Audio",
            ["type"] = "`$OBJECT`",
            ["short"] = "Additional Audio Conferencing <a href=\"#plans\">plan type</a>",
          },
          {
            ["name"] = "plan_base",
            ["title"] = "Plan Base",
            ["type"] = "`$OBJECT`",
            ["req"] = true,
            ["short"] = "Account base plan object",
          },
          {
            ["name"] = "plan_large_meeting",
            ["title"] = "Plan Large Meeting",
            ["type"] = "`$ARRAY`",
            ["short"] = "Additional Large Meeting Plans",
          },
          {
            ["name"] = "plan_recording",
            ["title"] = "Plan Recording",
            ["type"] = "`$STRING`",
            ["short"] = "Additional Cloud Recording Plan",
          },
          {
            ["name"] = "plan_room_connector",
            ["title"] = "Plan Room Connector",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account plan object",
          },
          {
            ["name"] = "plan_webinar",
            ["title"] = "Plan Webinar",
            ["type"] = "`$ARRAY`",
            ["short"] = "Additional Webinar Plans",
          },
          {
            ["name"] = "plan_zoom_rooms",
            ["title"] = "Plan Zoom Rooms",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account plan object",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "account_plan",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/accounts/{accountId}/plans",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "plans",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                  "plans",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/{accountId}/plans",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "plans",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                  "plans",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["account_setting"] = {
        ["fields"] = {
          {
            ["name"] = "email_notification",
            ["title"] = "Email Notification",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Notification",
          },
          {
            ["name"] = "feature",
            ["title"] = "Feature",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Feature",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "in_meeting",
            ["title"] = "In Meeting",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: In Meeting",
          },
          {
            ["name"] = "integration",
            ["title"] = "Integration",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Integration",
          },
          {
            ["name"] = "recording",
            ["title"] = "Recording",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Recording",
          },
          {
            ["name"] = "schedule_meting",
            ["title"] = "Schedule Meting",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Schedule Meeting",
          },
          {
            ["name"] = "security",
            ["title"] = "Security",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Security",
          },
          {
            ["name"] = "telephony",
            ["title"] = "Telephony",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Telephony",
          },
          {
            ["name"] = "zoom_rooms",
            ["title"] = "Zoom Rooms",
            ["type"] = "`$OBJECT`",
            ["short"] = "Account Settings: Zoom Rooms",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "account_setting",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/{accountId}/settings",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{id}",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["billing"] = {
        ["fields"] = {
          {
            ["name"] = "address",
            ["title"] = "Address",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's address",
          },
          {
            ["name"] = "apt",
            ["title"] = "Apt",
            ["type"] = "`$STRING`",
            ["short"] = "Billing Contact's apartment/suite",
          },
          {
            ["name"] = "city",
            ["title"] = "City",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's city",
          },
          {
            ["name"] = "country",
            ["title"] = "Country",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's country",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's email address",
          },
          {
            ["name"] = "first_name",
            ["title"] = "First Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's first name",
          },
          {
            ["name"] = "last_name",
            ["title"] = "Last Name",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's last name",
          },
          {
            ["name"] = "phone_number",
            ["title"] = "Phone Number",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's phone number",
          },
          {
            ["name"] = "state",
            ["title"] = "State",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's state",
          },
          {
            ["name"] = "zip",
            ["title"] = "Zip",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Billing Contact's zip/postal code",
          },
        },
        ["name"] = "billing",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/accounts/{accountId}/plans/addons",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "plans",
                  },
                  {
                    ["lit"] = "addons",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "plans",
                  "addons",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                    "body",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/{accountId}/billing",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "billing",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "billing",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                  },
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/accounts/{accountId}/billing",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "billing",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "billing",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                    "body",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/accounts/{accountId}/plans/addons",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "plans",
                  },
                  {
                    ["lit"] = "addons",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "plans",
                  "addons",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                    "body",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/accounts/{accountId}/plans/base",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "plans",
                  },
                  {
                    ["lit"] = "base",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "plans",
                  "base",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                    "body",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.account",
            },
          },
        },
      },
      ["cloud_recording"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "cloud_recording",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/recordings",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                  },
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/meetings/{meetingId}/recordings/settings",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "meeting_id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/meetings/{meetingId}/recordings/{recordingId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                    ["recordingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "recording_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "action",
                      ["orig"] = "action",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "action",
                    "id",
                    "meeting_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/meetings/{meetingId}/recordings",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "action",
                      ["orig"] = "action",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "action",
                    "meeting_id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/meetings/{meetingId}/recordings/{recordingId}/status",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                  {
                    ["var"] = "recording_id",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                  "{recording_id}",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                    ["recordingId"] = "recording_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "recording_id",
                      ["orig"] = "recording_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "status",
                  ["exist"] = {
                    "body",
                    "meeting_id",
                    "recording_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/meetings/{meetingId}/recordings/status",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "meeting_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.meeting",
              "$.main.kit.entity.recording",
            },
          },
        },
      },
      ["dashboard"] = {
        ["fields"] = {
          {
            ["name"] = "account_type",
            ["title"] = "Account Type",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room email type",
          },
          {
            ["name"] = "calender_name",
            ["title"] = "Calender Name",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Calendar name",
          },
          {
            ["name"] = "camera",
            ["title"] = "Camera",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room camera",
          },
          {
            ["name"] = "crc_ports_usage",
            ["title"] = "Crc Ports Usage",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "device_ip",
            ["title"] = "Device Ip",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room device IP",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room email",
          },
          {
            ["name"] = "from",
            ["title"] = "From",
            ["type"] = "`$STRING`",
            ["short"] = "Start date for this report",
            ["format"] = "date",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room ID",
          },
          {
            ["name"] = "last_start_time",
            ["title"] = "Last Start Time",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room last start time",
          },
          {
            ["name"] = "live_meeting",
            ["title"] = "Live Meeting",
            ["type"] = "`$OBJECT`",
            ["short"] = "Meeting metric details",
          },
          {
            ["name"] = "meetings",
            ["title"] = "Meetings",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of meeting objects",
          },
          {
            ["name"] = "microphone",
            ["title"] = "Microphone",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room microphone",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token is used to paginate through large result sets.",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call.",
          },
          {
            ["name"] = "participants",
            ["title"] = "Participants",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of user objects",
          },
          {
            ["name"] = "past_meetings",
            ["title"] = "Past Meetings",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "room_name",
            ["title"] = "Room Name",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room name",
          },
          {
            ["name"] = "speaker",
            ["title"] = "Speaker",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room speaker",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Zoom Room status",
          },
          {
            ["name"] = "to",
            ["title"] = "To",
            ["type"] = "`$STRING`",
            ["short"] = "End date for this report",
            ["format"] = "date",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "users",
            ["title"] = "Users",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "webinars",
            ["title"] = "Webinars",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of webinar objects",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "dashboard",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "to",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "to",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/im",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "im",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "im",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "to",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings/{meetingId}/participants",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                  "{meeting_id}",
                  "participants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                    "next_page_token",
                    "page_size",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings/{meetingId}/participants/sharing",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["lit"] = "sharing",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                  "{meeting_id}",
                  "participants",
                  "sharing",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                    "next_page_token",
                    "page_size",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars/{webinarId}/participants",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                  "{webinar_id}",
                  "participants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "next_page_token",
                    "page_size",
                    "type",
                    "webinar_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars/{webinarId}/participants/sharing",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["lit"] = "sharing",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                  "{webinar_id}",
                  "participants",
                  "sharing",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "next_page_token",
                    "page_size",
                    "type",
                    "webinar_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/crc",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "crc",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "crc",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "to",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/zoomrooms/{zoomroomId}",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "zoomrooms",
                  },
                  {
                    ["var"] = "zoomroom_id",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "zoomrooms",
                  "{zoomroom_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["zoomroomId"] = "zoomroom_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "zoomroom_id",
                      ["orig"] = "zoomroom_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "page_number",
                    "page_size",
                    "to",
                    "zoomroom_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.webinar",
            },
          },
        },
      },
      ["device"] = {
        ["fields"] = {
          {
            ["name"] = "devices",
            ["title"] = "Devices",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of H.323/SIP Device objects",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "device",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/h323/devices",
                ["segments"] = {
                  {
                    ["lit"] = "h323",
                  },
                  {
                    ["lit"] = "devices",
                  },
                },
                ["parts"] = {
                  "h323",
                  "devices",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/h323/devices",
                ["segments"] = {
                  {
                    ["lit"] = "h323",
                  },
                  {
                    ["lit"] = "devices",
                  },
                },
                ["parts"] = {
                  "h323",
                  "devices",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/h323/devices/{deviceId}",
                ["segments"] = {
                  {
                    ["lit"] = "h323",
                  },
                  {
                    ["lit"] = "devices",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "h323",
                  "devices",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["deviceId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "device_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/h323/devices/{deviceId}",
                ["segments"] = {
                  {
                    ["lit"] = "h323",
                  },
                  {
                    ["lit"] = "devices",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "h323",
                  "devices",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["deviceId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "device_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["domains_list"] = {
        ["fields"] = {
          {
            ["name"] = "domain",
            ["title"] = "Domain",
            ["type"] = "`$STRING`",
            ["short"] = "Domain Name",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Domain Status",
          },
        },
        ["name"] = "domains_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/accounts/{accountId}/managed_domains",
                ["segments"] = {
                  {
                    ["lit"] = "accounts",
                  },
                  {
                    ["var"] = "account_id",
                  },
                  {
                    ["lit"] = "managed_domains",
                  },
                },
                ["parts"] = {
                  "accounts",
                  "{account_id}",
                  "managed_domains",
                },
                ["rename"] = {
                  ["param"] = {
                    ["accountId"] = "account_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.domains`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "account_id",
                      ["orig"] = "account_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "account_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.account",
            },
          },
        },
      },
      ["group"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Group ID",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Group name",
          },
          {
            ["name"] = "total_members",
            ["title"] = "Total Members",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of members in this group",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "group",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/groups/{groupId}/members",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "members",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                  "members",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "member",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/groups",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                },
                ["parts"] = {
                  "groups",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/groups",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                },
                ["parts"] = {
                  "groups",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.groups`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/groups/{groupId}/members/{memberId}",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "members",
                  },
                  {
                    ["var"] = "member_id",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                  "members",
                  "{member_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                    ["memberId"] = "member_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "member_id",
                      ["orig"] = "member_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "member_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["group_member_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "members",
            ["title"] = "Members",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Group member objects",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "group_member_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/groups/{groupId}/members",
                ["segments"] = {
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "members",
                  },
                },
                ["parts"] = {
                  "groups",
                  "{id}",
                  "members",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "members",
                  ["exist"] = {
                    "id",
                    "page_number",
                    "page_size",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/im/groups/{groupId}/members",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "members",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{id}",
                  "members",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "members",
                  ["exist"] = {
                    "id",
                    "page_number",
                    "page_size",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["im_chat"] = {
        ["fields"] = {
          {
            ["name"] = "from",
            ["title"] = "From",
            ["type"] = "`$STRING`",
            ["short"] = "Start date",
            ["format"] = "date",
          },
          {
            ["name"] = "messages",
            ["title"] = "Messages",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of session objects",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token, used to paginate through large result sets.",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The amount of records returns within a single API call.",
          },
          {
            ["name"] = "session_id",
            ["title"] = "Session Id",
            ["type"] = "`$STRING`",
            ["short"] = "IM Chat session ID",
          },
          {
            ["name"] = "sessions",
            ["title"] = "Sessions",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of session objects",
          },
          {
            ["name"] = "to",
            ["title"] = "To",
            ["type"] = "`$STRING`",
            ["short"] = "End date",
            ["format"] = "date",
          },
        },
        ["name"] = "im_chat",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/im/chat/sessions",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "chat",
                  },
                  {
                    ["lit"] = "sessions",
                  },
                },
                ["parts"] = {
                  "im",
                  "chat",
                  "sessions",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "to",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/im/chat/sessions/{sessionId}",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "chat",
                  },
                  {
                    ["lit"] = "sessions",
                  },
                  {
                    ["var"] = "session_id",
                  },
                },
                ["parts"] = {
                  "im",
                  "chat",
                  "sessions",
                  "{session_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["sessionId"] = "session_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "session_id",
                      ["orig"] = "session_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "session_id",
                    "to",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["im_group"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Group ID",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "im_group",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/im/groups/{groupId}/members",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "group_id",
                  },
                  {
                    ["lit"] = "members",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{group_id}",
                  "members",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "group_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "group_id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "group_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/im/groups",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/im/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/im/groups/{groupId}/members/{memberId}",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "group_id",
                  },
                  {
                    ["lit"] = "members",
                  },
                  {
                    ["var"] = "member_id",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{group_id}",
                  "members",
                  "{member_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "group_id",
                    ["memberId"] = "member_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "group_id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "member_id",
                      ["orig"] = "member_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "group_id",
                    "member_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/im/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/im/groups/{groupId}",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["groupId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "group_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.group",
            },
            {
              "$.main.kit.entity.group",
            },
          },
        },
      },
      ["im_group_list"] = {
        ["fields"] = {
          {
            ["name"] = "groups",
            ["title"] = "Groups",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Group objects",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["name"] = "im_group_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/im/groups",
                ["segments"] = {
                  {
                    ["lit"] = "im",
                  },
                  {
                    ["lit"] = "groups",
                  },
                },
                ["parts"] = {
                  "im",
                  "groups",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["meeting"] = {
        ["fields"] = {
          {
            ["name"] = "agenda",
            ["title"] = "Agenda",
            ["type"] = "`$STRING`",
            ["short"] = "Agenda",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Create time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting duration",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "User email",
          },
          {
            ["name"] = "end_time",
            ["title"] = "End Time",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting end time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "h323_password",
            ["title"] = "H323 Password",
            ["type"] = "`$STRING`",
            ["short"] = "H.323/SIP room system password",
          },
          {
            ["name"] = "has_3rd_party_audio",
            ["title"] = "Has 3rd Party Audio",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_pstn",
            ["title"] = "Has Pstn",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_recording",
            ["title"] = "Has Recording",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_screen_share",
            ["title"] = "Has Screen Share",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_sip",
            ["title"] = "Has Sip",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_video",
            ["title"] = "Has Video",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_voip",
            ["title"] = "Has Voip",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "host",
            ["title"] = "Host",
            ["type"] = "`$STRING`",
            ["short"] = "User display name",
          },
          {
            ["name"] = "host_id",
            ["title"] = "Host Id",
            ["type"] = "`$STRING`",
            ["short"] = "ID of the user set as host of meeting",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting Poll ID",
          },
          {
            ["name"] = "join_url",
            ["title"] = "Join Url",
            ["type"] = "`$STRING`",
            ["short"] = "Join url",
          },
          {
            ["name"] = "meetings",
            ["title"] = "Meetings",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Meeting objects",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token is used to paginate through large result sets.",
          },
          {
            ["name"] = "occurrences",
            ["title"] = "Occurrences",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of occurrence objects",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "participants",
            ["title"] = "Participants",
            ["type"] = "`$INTEGER`",
            ["short"] = "Meeting participant count",
          },
          {
            ["name"] = "participants_count",
            ["title"] = "Participants Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of meeting participants",
          },
          {
            ["name"] = "password",
            ["title"] = "Password",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting password",
          },
          {
            ["name"] = "questions",
            ["title"] = "Questions",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of Polls",
          },
          {
            ["name"] = "settings",
            ["title"] = "Settings",
            ["type"] = "`$OBJECT`",
            ["short"] = "Meeting Settings",
          },
          {
            ["name"] = "start_time",
            ["title"] = "Start Time",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting start time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "start_url",
            ["title"] = "Start Url",
            ["type"] = "`$STRING`",
            ["short"] = "Start url",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Status of the Meeting Poll",
          },
          {
            ["name"] = "timezone",
            ["title"] = "Timezone",
            ["type"] = "`$STRING`",
            ["short"] = "Timezone to format start_time",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Poll Title",
          },
          {
            ["name"] = "topic",
            ["title"] = "Topic",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting topic",
          },
          {
            ["name"] = "total_minutes",
            ["title"] = "Total Minutes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of meeting minutes",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "tracking_fields",
            ["title"] = "Tracking Fields",
            ["type"] = "`$ARRAY`",
            ["short"] = "Tracking fields",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$INTEGER`",
            ["short"] = "Meeting Type",
          },
          {
            ["name"] = "user_email",
            ["title"] = "User Email",
            ["type"] = "`$STRING`",
            ["short"] = "User email",
          },
          {
            ["name"] = "user_name",
            ["title"] = "User Name",
            ["type"] = "`$STRING`",
            ["short"] = "User display name",
          },
          {
            ["name"] = "user_type",
            ["title"] = "User Type",
            ["type"] = "`$STRING`",
            ["short"] = "User type",
          },
          {
            ["name"] = "uuid",
            ["title"] = "Uuid",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting UUID",
            ["format"] = "uuid",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "meeting",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/meetings/{meetingId}/registrants",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "registrants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrant",
                  ["exist"] = {
                    "body",
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/meetings/{meetingId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "poll",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users/{userId}/meetings",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "meetings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "user_id",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/meetings",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "meetings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page_number",
                    "page_size",
                    "type",
                    "user_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/past_meetings/{meetingUUID}/participants",
                ["segments"] = {
                  {
                    ["lit"] = "past_meetings",
                  },
                  {
                    ["var"] = "meeting_uuid",
                  },
                  {
                    ["lit"] = "participants",
                  },
                },
                ["parts"] = {
                  "past_meetings",
                  "{meeting_uuid}",
                  "participants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingUUID"] = "meeting_uuid",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_uuid",
                      ["orig"] = "meeting_uuid",
                      ["type"] = "`$ANY`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_uuid",
                    "next_page_token",
                    "page_size",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                    ["pollId"] = "poll_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "poll_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings/{meetingId}",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/past_meetings/{meetingUUID}",
                ["segments"] = {
                  {
                    ["lit"] = "past_meetings",
                  },
                  {
                    ["var"] = "meeting_uuid",
                  },
                },
                ["parts"] = {
                  "past_meetings",
                  "{meeting_uuid}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingUUID"] = "meeting_uuid",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_uuid",
                      ["orig"] = "meeting_uuid",
                      ["type"] = "`$ANY`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_uuid",
                  },
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/meetings/{meetingId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/meetings/{meetingId}/livestream",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "livestream",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "livestream",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "livestream",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/meetings/{meetingId}/livestream/status",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "livestream",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "livestream",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "livestream_status",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/meetings/{meetingId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/meetings/{meetingId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                    ["pollId"] = "poll_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "poll_id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/meetings/{meetingId}/registrants/status",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "registrants",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrant_status",
                  ["exist"] = {
                    "body",
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/meetings/{meetingId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                    ["pollId"] = "poll_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                    "poll_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/meetings/{meetingId}/status",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "status",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.poll",
            },
            {
              "$.main.kit.entity.user",
            },
          },
        },
      },
      ["meeting_instance"] = {
        ["fields"] = {
          {
            ["name"] = "meetings",
            ["title"] = "Meetings",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of ended meeting instances.",
          },
        },
        ["name"] = "meeting_instance",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/past_meetings/{meetingId}/instances",
                ["segments"] = {
                  {
                    ["lit"] = "past_meetings",
                  },
                  {
                    ["var"] = "past_meeting_id",
                  },
                  {
                    ["lit"] = "instances",
                  },
                },
                ["parts"] = {
                  "past_meetings",
                  "{past_meeting_id}",
                  "instances",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "past_meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "past_meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "past_meeting_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["meeting_invitation"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "invitation",
            ["title"] = "Invitation",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting invitation",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "meeting_invitation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/invitation",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "invitation",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "invitation",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["meeting_registrant_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "meeting_registrant_list",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/registrants",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{id}",
                  "registrants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrants",
                  ["exist"] = {
                    "id",
                    "occurrence_id",
                    "page_number",
                    "page_size",
                    "status",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["pac"] = {
        ["fields"] = {
          {
            ["name"] = "conference_id",
            ["title"] = "Conference Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Conference ID",
          },
          {
            ["name"] = "dedicated_dial_in_number",
            ["title"] = "Dedicated Dial In Number",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of Dedicated Dial In Numbers",
          },
          {
            ["name"] = "global_dial_in_numbers",
            ["title"] = "Global Dial In Numbers",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of Global Dial In Numbers",
          },
          {
            ["name"] = "listen_only_password",
            ["title"] = "Listen Only Password",
            ["type"] = "`$STRING`",
            ["short"] = "Listen-Only Password, numeric value, length is less than 6",
          },
          {
            ["name"] = "participant_password",
            ["title"] = "Participant Password",
            ["type"] = "`$STRING`",
            ["short"] = "Participant Password, numeric value, length is less than 6",
          },
        },
        ["name"] = "pac",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/pac",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "pac",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "pac",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.tsp_accounts`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.user",
            },
          },
        },
      },
      ["poll"] = {
        ["fields"] = {
          {
            ["name"] = "polls",
            ["title"] = "Polls",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of Polls",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["name"] = "poll",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webinars/{webinarId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{webinar_id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "webinar_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.webinar",
            },
          },
        },
      },
      ["qos"] = {
        ["fields"] = {
          {
            ["name"] = "as_input",
            ["title"] = "As Input",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
          {
            ["name"] = "as_output",
            ["title"] = "As Output",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
          {
            ["name"] = "audio_input",
            ["title"] = "Audio Input",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
          {
            ["name"] = "audio_output",
            ["title"] = "Audio Output",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
          {
            ["name"] = "cpu_usage",
            ["title"] = "Cpu Usage",
            ["type"] = "`$ANY`",
          },
          {
            ["name"] = "date_time",
            ["title"] = "Date Time",
            ["type"] = "`$STRING`",
            ["short"] = "Datetime of QOS",
            ["format"] = "date-time",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token is used to paginate through large result sets.",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
            ["format"] = "int64",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items per page",
          },
          {
            ["name"] = "participants",
            ["title"] = "Participants",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of user objects",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
            ["format"] = "int64",
          },
          {
            ["name"] = "video_input",
            ["title"] = "Video Input",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
          {
            ["name"] = "video_output",
            ["title"] = "Video Output",
            ["type"] = "`$OBJECT`",
            ["short"] = "Quality of Service object",
          },
        },
        ["name"] = "qos",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings/{meetingId}/participants/qos",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["lit"] = "qos",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                  "{meeting_id}",
                  "participants",
                  "qos",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                    "next_page_token",
                    "page_size",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars/{webinarId}/participants/qos",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["lit"] = "qos",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                  "{webinar_id}",
                  "participants",
                  "qos",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "next_page_token",
                    "page_size",
                    "type",
                    "webinar_id",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/meetings/{meetingId}/participants/{participantId}/qos",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["var"] = "participant_id",
                  },
                  {
                    ["lit"] = "qos",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "meetings",
                  "{meeting_id}",
                  "participants",
                  "{participant_id}",
                  "qos",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                    ["participantId"] = "participant_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.user_qos`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "participant_id",
                      ["orig"] = "participant_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                    "participant_id",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars/{webinarId}/participants/{participantId}/qos",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                  {
                    ["var"] = "participant_id",
                  },
                  {
                    ["lit"] = "qos",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                  "{webinar_id}",
                  "participants",
                  "{participant_id}",
                  "qos",
                },
                ["rename"] = {
                  ["param"] = {
                    ["participantId"] = "participant_id",
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.user_qos`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "participant_id",
                      ["orig"] = "participant_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "participant_id",
                    "type",
                    "webinar_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.webinar",
            },
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.webinar",
            },
          },
        },
      },
      ["recording"] = {
        ["fields"] = {
          {
            ["name"] = "from",
            ["title"] = "From",
            ["type"] = "`$STRING`",
            ["short"] = "Start Date,",
            ["format"] = "date",
          },
          {
            ["name"] = "meetings",
            ["title"] = "Meetings",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Recording",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token is used to paginate through large result sets.",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call.",
          },
          {
            ["name"] = "to",
            ["title"] = "To",
            ["type"] = "`$STRING`",
            ["short"] = "End Date",
            ["format"] = "date",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
        },
        ["name"] = "recording",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/recordings",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "recordings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "mc",
                      ["orig"] = "mc",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "trash",
                      ["orig"] = "trash",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "mc",
                    "next_page_token",
                    "page_size",
                    "to",
                    "trash",
                    "user_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.user",
            },
          },
        },
      },
      ["recording_setting"] = {
        ["fields"] = {
          {
            ["name"] = "approval_type",
            ["title"] = "Approval Type",
            ["type"] = "`$INTEGER`",
            ["short"] = "Approval type",
          },
          {
            ["name"] = "on_demand",
            ["title"] = "On Demand",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Registration required",
          },
          {
            ["name"] = "password",
            ["title"] = "Password",
            ["type"] = "`$STRING`",
            ["short"] = "Password protect",
          },
          {
            ["name"] = "send_email_to_host",
            ["title"] = "Send Email To Host",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Send an email to host when someone registers",
          },
          {
            ["name"] = "share_recording",
            ["title"] = "Share Recording",
            ["type"] = "`$STRING`",
            ["short"] = "Determine if the meeting recording is shared",
          },
          {
            ["name"] = "show_social_share_buttons",
            ["title"] = "Show Social Share Buttons",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Show social share buttons on registration page",
          },
          {
            ["name"] = "viewer_download",
            ["title"] = "Viewer Download",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Host video",
          },
        },
        ["name"] = "recording_setting",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/meetings/{meetingId}/recordings/settings",
                ["segments"] = {
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "recordings",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "meetings",
                  "{meeting_id}",
                  "recordings",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
          },
        },
      },
      ["report"] = {
        ["fields"] = {
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$INTEGER`",
            ["short"] = "Meeting duration",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "Participant email",
          },
          {
            ["name"] = "end_time",
            ["title"] = "End Time",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting end time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "from",
            ["title"] = "From",
            ["type"] = "`$STRING`",
            ["short"] = "Start date for this report",
            ["format"] = "date",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Meeting ID",
          },
          {
            ["name"] = "meetings",
            ["title"] = "Meetings",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of meeting objects",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Participant display name",
          },
          {
            ["name"] = "next_page_token",
            ["title"] = "Next Page Token",
            ["type"] = "`$STRING`",
            ["short"] = "Next page token is used to paginate through large result sets.",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call.",
          },
          {
            ["name"] = "participants",
            ["title"] = "Participants",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of meeting participant objects",
          },
          {
            ["name"] = "participants_count",
            ["title"] = "Participants Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of meeting participants",
          },
          {
            ["name"] = "question_details",
            ["title"] = "Question Details",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of questions from user",
          },
          {
            ["name"] = "start_time",
            ["title"] = "Start Time",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting start time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "to",
            ["title"] = "To",
            ["type"] = "`$STRING`",
            ["short"] = "End date for this report",
            ["format"] = "date",
          },
          {
            ["name"] = "topic",
            ["title"] = "Topic",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting topic",
          },
          {
            ["name"] = "total_minutes",
            ["title"] = "Total Minutes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of meeting minutes",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "tracking_fields",
            ["title"] = "Tracking Fields",
            ["type"] = "`$ARRAY`",
            ["short"] = "Tracking fields",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$INTEGER`",
            ["short"] = "Meeting type",
          },
          {
            ["name"] = "user_email",
            ["title"] = "User Email",
            ["type"] = "`$STRING`",
            ["short"] = "User email",
          },
          {
            ["name"] = "user_name",
            ["title"] = "User Name",
            ["type"] = "`$STRING`",
            ["short"] = "User display name",
          },
          {
            ["name"] = "uuid",
            ["title"] = "Uuid",
            ["type"] = "`$STRING`",
            ["short"] = "Meeting UUID",
            ["format"] = "uuid",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "report",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/users/{userId}/meetings",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                },
                ["parts"] = {
                  "report",
                  "users",
                  "{user_id}",
                  "meetings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "from",
                    "next_page_token",
                    "page_size",
                    "to",
                    "user_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/telephone",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "telephone",
                  },
                },
                ["parts"] = {
                  "report",
                  "telephone",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "telephone",
                  ["exist"] = {
                    "from",
                    "page_number",
                    "page_size",
                    "to",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/users",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "users",
                  },
                },
                ["parts"] = {
                  "report",
                  "users",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "user",
                  ["exist"] = {
                    "from",
                    "page_number",
                    "page_size",
                    "to",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/meetings/{meetingId}/participants",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                },
                ["parts"] = {
                  "report",
                  "meetings",
                  "{meeting_id}",
                  "participants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                    "next_page_token",
                    "page_size",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/webinars/{webinarId}/participants",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "participants",
                  },
                },
                ["parts"] = {
                  "report",
                  "webinars",
                  "{webinar_id}",
                  "participants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "next_page_token",
                      ["orig"] = "next_page_token",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "next_page_token",
                    "page_size",
                    "webinar_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/cloud_recording",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "cloud_recording",
                  },
                },
                ["parts"] = {
                  "report",
                  "cloud_recording",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "from",
                      ["orig"] = "from",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "to",
                      ["orig"] = "to",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "cloud_recording",
                  ["exist"] = {
                    "from",
                    "to",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/daily",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "daily",
                  },
                },
                ["parts"] = {
                  "report",
                  "daily",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.dates`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "month",
                      ["orig"] = "month",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "year",
                      ["orig"] = "year",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "daily",
                  ["exist"] = {
                    "month",
                    "year",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/meetings/{meetingId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "report",
                  "meetings",
                  "{meeting_id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.questions`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/webinars/{webinarId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "report",
                  "webinars",
                  "{webinar_id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.questions`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "webinar_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/webinars/{webinarId}/qa",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                  {
                    ["lit"] = "qa",
                  },
                },
                ["parts"] = {
                  "report",
                  "webinars",
                  "{webinar_id}",
                  "qa",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.questions`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "webinar_id",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/meetings/{meetingId}",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "meetings",
                  },
                  {
                    ["var"] = "meeting_id",
                  },
                },
                ["parts"] = {
                  "report",
                  "meetings",
                  "{meeting_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["meetingId"] = "meeting_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "meeting_id",
                      ["orig"] = "meeting_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "meeting_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/report/webinars/{webinarId}",
                ["segments"] = {
                  {
                    ["lit"] = "report",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "webinar_id",
                  },
                },
                ["parts"] = {
                  "report",
                  "webinars",
                  "{webinar_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "webinar_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.meeting",
            },
            {
              "$.main.kit.entity.user",
            },
            {
              "$.main.kit.entity.webinar",
            },
          },
        },
      },
      ["tracking_field"] = {
        ["fields"] = {
          {
            ["name"] = "field",
            ["title"] = "Field",
            ["type"] = "`$STRING`",
            ["short"] = "Tracking Field Name",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Tracking Field ID",
          },
          {
            ["name"] = "recommended_values",
            ["title"] = "Recommended Values",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of recommended values",
          },
          {
            ["name"] = "required",
            ["title"] = "Required",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Tracking Field Required",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "tracking_fields",
            ["title"] = "Tracking Fields",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of Tracking Fields",
          },
          {
            ["name"] = "visible",
            ["title"] = "Visible",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Tracking Field Visible",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "tracking_field",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/v2/tracking_fields",
                ["segments"] = {
                  {
                    ["lit"] = "v2",
                  },
                  {
                    ["lit"] = "tracking_fields",
                  },
                },
                ["parts"] = {
                  "v2",
                  "tracking_fields",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v2/tracking_fields",
                ["segments"] = {
                  {
                    ["lit"] = "v2",
                  },
                  {
                    ["lit"] = "tracking_fields",
                  },
                },
                ["parts"] = {
                  "v2",
                  "tracking_fields",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/v2/tracking_fields/{fieldId}",
                ["segments"] = {
                  {
                    ["lit"] = "v2",
                  },
                  {
                    ["lit"] = "tracking_fields",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v2",
                  "tracking_fields",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["fieldId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "field_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/v2/tracking_fields/{fieldId}",
                ["segments"] = {
                  {
                    ["lit"] = "v2",
                  },
                  {
                    ["lit"] = "tracking_fields",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v2",
                  "tracking_fields",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["fieldId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "field_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/v2/tracking_fields/{fieldId}",
                ["segments"] = {
                  {
                    ["lit"] = "v2",
                  },
                  {
                    ["lit"] = "tracking_fields",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "v2",
                  "tracking_fields",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["fieldId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "field_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["tsp"] = {
        ["fields"] = {
          {
            ["name"] = "code",
            ["title"] = "Code",
            ["type"] = "`$STRING`",
            ["short"] = "Country Code",
          },
          {
            ["name"] = "conference_code",
            ["title"] = "Conference Code",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Conference code, numeric value, length is less than 16.",
          },
          {
            ["name"] = "dial_in_numbers",
            ["title"] = "Dial In Numbers",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of Dial In Numbers",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "leader_pin",
            ["title"] = "Leader Pin",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Leader PIN, numeric value, length is less than 16.",
          },
          {
            ["name"] = "number",
            ["title"] = "Number",
            ["type"] = "`$STRING`",
            ["short"] = "Dial-in number, length is less than 16",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "tsp",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users/{userId}/tsp",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "tsp",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "tsp",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "user_id",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/tsp",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "tsp",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "tsp",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.tsp_accounts`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "user_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/tsp",
                ["segments"] = {
                  {
                    ["lit"] = "tsp",
                  },
                },
                ["parts"] = {
                  "tsp",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.dial_in_numbers`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/tsp/{tspId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "tsp",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "tsp",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["tspId"] = "id",
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "tsp_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "user_id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/tsp/{tspId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "tsp",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "tsp",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["tspId"] = "id",
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "tsp_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "user_id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/users/{userId}/tsp/{tspId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "tsp",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "tsp",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["tspId"] = "id",
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "tsp_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                    "user_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/tsp",
                ["segments"] = {
                  {
                    ["lit"] = "tsp",
                  },
                },
                ["parts"] = {
                  "tsp",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.user",
            },
          },
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "account_id",
            ["title"] = "Account Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cms_user_id",
            ["title"] = "Cms User Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "User create time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "dept",
            ["title"] = "Dept",
            ["type"] = "`$STRING`",
            ["short"] = "Department",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "User's email address",
          },
          {
            ["name"] = "first_name",
            ["title"] = "First Name",
            ["type"] = "`$STRING`",
            ["short"] = "User's first name",
          },
          {
            ["name"] = "group_ids",
            ["title"] = "Group Ids",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "host_key",
            ["title"] = "Host Key",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID",
          },
          {
            ["name"] = "im_group_ids",
            ["title"] = "Im Group Ids",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "language",
            ["title"] = "Language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "last_client_version",
            ["title"] = "Last Client Version",
            ["type"] = "`$STRING`",
            ["short"] = "User last login client version",
          },
          {
            ["name"] = "last_login_time",
            ["title"] = "Last Login Time",
            ["type"] = "`$STRING`",
            ["short"] = "User last login time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "last_name",
            ["title"] = "Last Name",
            ["type"] = "`$STRING`",
            ["short"] = "User's last name",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "personal_meeting_url",
            ["title"] = "Personal Meeting Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pic_url",
            ["title"] = "Pic Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "pmi",
            ["title"] = "Pmi",
            ["type"] = "`$STRING`",
            ["short"] = "Personal Meeting ID",
          },
          {
            ["name"] = "timezone",
            ["title"] = "Timezone",
            ["type"] = "`$STRING`",
            ["short"] = "Time Zone",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$INTEGER`",
            ["req"] = true,
            ["short"] = "User's type",
          },
          {
            ["name"] = "use_pmi",
            ["title"] = "Use Pmi",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "users",
            ["title"] = "Users",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of User objects",
          },
          {
            ["name"] = "vanity_url",
            ["title"] = "Vanity Url",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "verified",
            ["title"] = "Verified",
            ["type"] = "`$INTEGER`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users/{userId}/assistants",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "assistants",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "assistants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "assistant",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users/{userId}/picture",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "picture",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "picture",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "pic_file",
                      ["orig"] = "pic_file",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "picture",
                  ["exist"] = {
                    "id",
                    "pic_file",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                },
                ["parts"] = {
                  "users",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                },
                ["parts"] = {
                  "users",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page_number",
                    "page_size",
                    "status",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "login_type",
                      ["orig"] = "login_type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "login_type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/token",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "token",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "token",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "token",
                  ["exist"] = {
                    "id",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/email",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["lit"] = "email",
                  },
                },
                ["parts"] = {
                  "users",
                  "email",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "email",
                      ["orig"] = "email",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "email",
                  ["exist"] = {
                    "email",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/vanity_name",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["lit"] = "vanity_name",
                  },
                },
                ["parts"] = {
                  "users",
                  "vanity_name",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "vanity_name",
                      ["orig"] = "vanity_name",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "vanity_name",
                  ["exist"] = {
                    "vanity_name",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/zpk",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["lit"] = "zpk",
                  },
                },
                ["parts"] = {
                  "users",
                  "zpk",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "zpk",
                      ["orig"] = "zpk",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "zpk",
                  ["exist"] = {
                    "zpk",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "action",
                      ["orig"] = "action",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "transfer_email",
                      ["orig"] = "transfer_email",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "transfer_meeting",
                      ["orig"] = "transfer_meeting",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "transfer_recording",
                      ["orig"] = "transfer_recording",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "transfer_webinar",
                      ["orig"] = "transfer_webinar",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "action",
                    "id",
                    "transfer_email",
                    "transfer_meeting",
                    "transfer_recording",
                    "transfer_webinar",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/assistants/{assistantId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "assistants",
                  },
                  {
                    ["var"] = "assistant_id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "assistants",
                  "{assistant_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["assistantId"] = "assistant_id",
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "assistant_id",
                      ["orig"] = "assistant_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "assistant_id",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/schedulers/{schedulerId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "schedulers",
                  },
                  {
                    ["var"] = "scheduler_id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "schedulers",
                  "{scheduler_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["schedulerId"] = "scheduler_id",
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "scheduler_id",
                      ["orig"] = "scheduler_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "scheduler_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/assistants",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "assistants",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "assistants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "assistant",
                  ["exist"] = {
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/schedulers",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "schedulers",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "schedulers",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "scheduler",
                  ["exist"] = {
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/users/{userId}/token",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "token",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "token",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "token",
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/users/{userId}",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/users/{userId}/email",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "email",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "email",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "email",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/users/{userId}/password",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "password",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "password",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "password",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/users/{userId}/settings",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "setting",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/users/{userId}/status",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "status",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_assistants_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user_assistants_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/assistants",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "assistants",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "assistants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.assistants`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "assistants",
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_permission"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "permissions",
            ["title"] = "Permissions",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of user permissions",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user_permission",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/permissions",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "permissions",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "permissions",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.permissions`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_schedulers_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user_schedulers_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/schedulers",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "schedulers",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "schedulers",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.assistants`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "schedulers",
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user_setting"] = {
        ["fields"] = {
          {
            ["name"] = "email_notification",
            ["title"] = "Email Notification",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "feature",
            ["title"] = "Feature",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "in_meeting",
            ["title"] = "In Meeting",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "recording",
            ["title"] = "Recording",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "schedule_meeting",
            ["title"] = "Schedule Meeting",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "telephony",
            ["title"] = "Telephony",
            ["type"] = "`$OBJECT`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user_setting",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/settings",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "settings",
                  },
                },
                ["parts"] = {
                  "users",
                  "{id}",
                  "settings",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "login_type",
                      ["orig"] = "login_type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "login_type",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["webhook"] = {
        ["fields"] = {
          {
            ["name"] = "auth_password",
            ["title"] = "Auth Password",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Webhook auth password",
          },
          {
            ["name"] = "auth_user",
            ["title"] = "Auth User",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Webhook auth user name",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Webhook create time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "events",
            ["title"] = "Events",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of events objects.",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["req"] = true,
            ["short"] = "Webhook endpoint",
          },
          {
            ["name"] = "webhook_id",
            ["title"] = "Webhook Id",
            ["type"] = "`$STRING`",
            ["short"] = "Webhook Id",
          },
          {
            ["name"] = "webhooks",
            ["title"] = "Webhooks",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Webhook objects",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "webhook",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/webhooks",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                },
                ["parts"] = {
                  "webhooks",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webhooks",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                },
                ["parts"] = {
                  "webhooks",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webhooks/{webhookId}",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webhooks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webhookId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webhook_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/webhooks/{webhookId}",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webhooks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webhookId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webhook_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/webhooks/{webhookId}",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webhooks",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webhookId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webhook_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/webhooks/options",
                ["segments"] = {
                  {
                    ["lit"] = "webhooks",
                  },
                  {
                    ["lit"] = "options",
                  },
                },
                ["parts"] = {
                  "webhooks",
                  "options",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "option",
                  ["exist"] = {
                    "body",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["webinar"] = {
        ["fields"] = {
          {
            ["name"] = "agenda",
            ["title"] = "Agenda",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar agenda",
          },
          {
            ["name"] = "created_at",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Create time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "duration",
            ["title"] = "Duration",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar duration",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "User email",
          },
          {
            ["name"] = "end_time",
            ["title"] = "End Time",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar end time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "has_3rd_party_audio",
            ["title"] = "Has 3rd Party Audio",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_pstn",
            ["title"] = "Has Pstn",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_recording",
            ["title"] = "Has Recording",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_screen_share",
            ["title"] = "Has Screen Share",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_sip",
            ["title"] = "Has Sip",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_video",
            ["title"] = "Has Video",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "has_voip",
            ["title"] = "Has Voip",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "host",
            ["title"] = "Host",
            ["type"] = "`$STRING`",
            ["short"] = "User display name",
          },
          {
            ["name"] = "host_id",
            ["title"] = "Host Id",
            ["type"] = "`$STRING`",
            ["short"] = "ID of the user set as host of webinar",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar Poll ID",
          },
          {
            ["name"] = "join_url",
            ["title"] = "Join Url",
            ["type"] = "`$STRING`",
            ["short"] = "Join url",
          },
          {
            ["name"] = "occurrences",
            ["title"] = "Occurrences",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of occurrence objects",
          },
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "participants",
            ["title"] = "Participants",
            ["type"] = "`$INTEGER`",
            ["short"] = "Webinar participant count",
          },
          {
            ["name"] = "questions",
            ["title"] = "Questions",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of Polls",
          },
          {
            ["name"] = "settings",
            ["title"] = "Settings",
            ["type"] = "`$OBJECT`",
            ["short"] = "Webinar Settings",
          },
          {
            ["name"] = "start_time",
            ["title"] = "Start Time",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar start time",
            ["format"] = "date-time",
          },
          {
            ["name"] = "start_url",
            ["title"] = "Start Url",
            ["type"] = "`$STRING`",
            ["short"] = "Start url",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Status of the Webinar Poll",
          },
          {
            ["name"] = "timezone",
            ["title"] = "Timezone",
            ["type"] = "`$STRING`",
            ["short"] = "Timezone to format start_time",
          },
          {
            ["name"] = "title",
            ["title"] = "Title",
            ["type"] = "`$STRING`",
            ["short"] = "Poll Title",
          },
          {
            ["name"] = "topic",
            ["title"] = "Topic",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar topic",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "tracking_fields",
            ["title"] = "Tracking Fields",
            ["type"] = "`$ARRAY`",
            ["short"] = "Tracking fields",
          },
          {
            ["name"] = "type",
            ["title"] = "Type",
            ["type"] = "`$INTEGER`",
            ["short"] = "Webinar Type",
          },
          {
            ["name"] = "user_type",
            ["title"] = "User Type",
            ["type"] = "`$STRING`",
            ["short"] = "User type",
          },
          {
            ["name"] = "uuid",
            ["title"] = "Uuid",
            ["type"] = "`$STRING`",
            ["short"] = "Webinar UUID",
            ["format"] = "uuid",
          },
          {
            ["name"] = "webinars",
            ["title"] = "Webinars",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Webinar objects",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "webinar",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/webinars/{webinarId}/registrants",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "registrants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrant",
                  ["exist"] = {
                    "body",
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/webinars/{webinarId}/panelists",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "panelists",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "panelists",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "panelist",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/webinars/{webinarId}/polls",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "polls",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "poll",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/users/{userId}/webinars",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "webinars",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "user_id",
                  },
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/users/{userId}/webinars",
                ["segments"] = {
                  {
                    ["lit"] = "users",
                  },
                  {
                    ["var"] = "user_id",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                },
                ["parts"] = {
                  "users",
                  "{user_id}",
                  "webinars",
                },
                ["rename"] = {
                  ["param"] = {
                    ["userId"] = "user_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "user_id",
                      ["orig"] = "user_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page_number",
                    "page_size",
                    "user_id",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webinars/{webinarId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["pollId"] = "poll_id",
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "poll_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/webinars/{webinarId}",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "webinars",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "type",
                      ["orig"] = "type",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "type",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webinars/{webinarId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["patch"] = {
            ["input"] = "data",
            ["name"] = "patch",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PATCH",
                ["orig"] = "/webinars/{webinarId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$OBJECT`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/webinars/{webinarId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/webinars/{webinarId}/panelists/{panelistId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "panelists",
                  },
                  {
                    ["var"] = "panelist_id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "panelists",
                  "{panelist_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["panelistId"] = "panelist_id",
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "panelist_id",
                      ["orig"] = "panelist_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "panelist_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/webinars/{webinarId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["pollId"] = "poll_id",
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "poll_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/webinars/{webinarId}/panelists",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "panelists",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "panelists",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "panelist",
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["update"] = {
            ["input"] = "data",
            ["name"] = "update",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/webinars/{webinarId}/registrants/status",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "registrants",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrant_status",
                  ["exist"] = {
                    "body",
                    "id",
                    "occurrence_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/webinars/{webinarId}/polls/{pollId}",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "polls",
                  },
                  {
                    ["var"] = "poll_id",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "polls",
                  "{poll_id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["pollId"] = "poll_id",
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "poll_id",
                      ["orig"] = "poll_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "body",
                    "id",
                    "poll_id",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "PUT",
                ["orig"] = "/webinars/{webinarId}/status",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "status",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "body",
                      ["orig"] = "body",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "status",
                  ["exist"] = {
                    "body",
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "$.main.kit.entity.user",
            },
            {
              "$.main.kit.entity.poll",
            },
          },
        },
      },
      ["webinar_instance"] = {
        ["fields"] = {
          {
            ["name"] = "webinars",
            ["title"] = "Webinars",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of ended webinar instances.",
          },
        },
        ["name"] = "webinar_instance",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/past_webinars/{webinarId}/instances",
                ["segments"] = {
                  {
                    ["lit"] = "past_webinars",
                  },
                  {
                    ["var"] = "past_webinar_id",
                  },
                  {
                    ["lit"] = "instances",
                  },
                },
                ["parts"] = {
                  "past_webinars",
                  "{past_webinar_id}",
                  "instances",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "past_webinar_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "past_webinar_id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "past_webinar_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["webinar_panelist_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "panelists",
            ["title"] = "Panelists",
            ["type"] = "`$ARRAY`",
            ["short"] = "List of Panelist objects",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total records",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "webinar_panelist_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webinars/{webinarId}/panelists",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "panelists",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "panelists",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "panelists",
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["webinar_registrant_list"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "webinar_registrant_list",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/webinars/{webinarId}/registrants",
                ["segments"] = {
                  {
                    ["lit"] = "webinars",
                  },
                  {
                    ["var"] = "id",
                  },
                  {
                    ["lit"] = "registrants",
                  },
                },
                ["parts"] = {
                  "webinars",
                  "{id}",
                  "registrants",
                },
                ["rename"] = {
                  ["param"] = {
                    ["webinarId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "webinar_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "occurrence_id",
                      ["orig"] = "occurrence_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$ANY`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["$action"] = "registrants",
                  ["exist"] = {
                    "id",
                    "occurrence_id",
                    "page_number",
                    "page_size",
                    "status",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["zoom_room_list"] = {
        ["fields"] = {
          {
            ["name"] = "page_count",
            ["title"] = "Page Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of items returned on this page",
          },
          {
            ["name"] = "page_number",
            ["title"] = "Page Number",
            ["type"] = "`$INTEGER`",
            ["short"] = "The page number of current results",
          },
          {
            ["name"] = "page_size",
            ["title"] = "Page Size",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of records returned within a single API call",
          },
          {
            ["name"] = "total_records",
            ["title"] = "Total Records",
            ["type"] = "`$INTEGER`",
            ["short"] = "The number of all records available across pages",
          },
          {
            ["name"] = "zoom_rooms",
            ["title"] = "Zoom Rooms",
            ["type"] = "`$ARRAY`",
            ["short"] = "Array of Zoom Rooms",
          },
        },
        ["name"] = "zoom_room_list",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/metrics/zoomrooms",
                ["segments"] = {
                  {
                    ["lit"] = "metrics",
                  },
                  {
                    ["lit"] = "zoomrooms",
                  },
                },
                ["parts"] = {
                  "metrics",
                  "zoomrooms",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "page_number",
                      ["orig"] = "page_number",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "page_size",
                      ["orig"] = "page_size",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "page_number",
                    "page_size",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
