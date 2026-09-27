package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Zoom",
			"slug": "zoom",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"debug": map[string]any{
				"options": map[string]any{
					"active": false,
					"max": 100,
					"redact": []any{
						"authorization",
						"cookie",
						"set-cookie",
						"api-key",
						"apikey",
						"x-api-key",
						"idempotency-key",
					},
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"onEntry": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"idempotency": map[string]any{
				"options": map[string]any{
					"active": false,
					"header": "Idempotency-Key",
					"methods": []any{
						"POST",
						"PUT",
						"PATCH",
						"DELETE",
					},
					"ops": []any{
						"create",
						"update",
						"remove",
					},
				},
				"optspec": map[string]any{
					"keygen": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"metrics": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "none",
			},
			"paging": map[string]any{
				"options": map[string]any{
					"active": false,
					"afterVar": "after",
					"cursorParam": "cursor",
					"firstVar": "first",
					"limitParam": "limit",
					"pageParam": "page",
					"startPage": 1,
				},
				"optspec": map[string]any{
					"limit": "`$NUMBER`",
					"ops": "`$LIST`",
				},
				"strict": false,
				"transport": "none",
			},
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.zoom.us/v2",
			"auth": map[string]any{
				"prefix": "",
				"in": "query",
				"name": "access_token",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"account": map[string]any{},
				"account_plan": map[string]any{},
				"account_setting": map[string]any{},
				"billing": map[string]any{},
				"cloud_recording": map[string]any{},
				"dashboard": map[string]any{},
				"device": map[string]any{},
				"domains_list": map[string]any{},
				"group": map[string]any{},
				"group_member_list": map[string]any{},
				"im_chat": map[string]any{},
				"im_group": map[string]any{},
				"im_group_list": map[string]any{},
				"meeting": map[string]any{},
				"meeting_instance": map[string]any{},
				"meeting_invitation": map[string]any{},
				"meeting_registrant_list": map[string]any{},
				"pac": map[string]any{},
				"poll": map[string]any{},
				"qos": map[string]any{},
				"recording": map[string]any{},
				"recording_setting": map[string]any{},
				"report": map[string]any{},
				"tracking_field": map[string]any{},
				"tsp": map[string]any{},
				"user": map[string]any{},
				"user_assistants_list": map[string]any{},
				"user_permission": map[string]any{},
				"user_schedulers_list": map[string]any{},
				"user_setting": map[string]any{},
				"webhook": map[string]any{},
				"webinar": map[string]any{},
				"webinar_instance": map[string]any{},
				"webinar_panelist_list": map[string]any{},
				"webinar_registrant_list": map[string]any{},
				"zoom_room_list": map[string]any{},
			},
		},
		"entity": map[string]any{
			"account": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "accounts",
						"title": "Accounts",
						"type": "`$ARRAY`",
						"short": "List of Account objects",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "meeting_connectors",
						"title": "Meeting Connectors",
						"type": "`$STRING`",
						"short": "Meeting Connector, multiple values separated by comma",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "pay_mode",
						"title": "Pay Mode",
						"type": "`$STRING`",
						"short": "Payee",
					},
					map[string]any{
						"name": "room_connectors",
						"title": "Room Connectors",
						"type": "`$STRING`",
						"short": "Virtual Room Connector, multiple value separated by comma",
					},
					map[string]any{
						"name": "share_mc",
						"title": "Share Mc",
						"type": "`$BOOLEAN`",
						"short": "Enable Share Meeting Connector",
					},
					map[string]any{
						"name": "share_rc",
						"title": "Share Rc",
						"type": "`$BOOLEAN`",
						"short": "Enable Share Virtual Room Connector",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "account",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
								},
								"parts": []any{
									"accounts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_number",
										"page_size",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{accountId}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.options`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/accounts/{accountId}",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/accounts/{accountId}/options",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "options",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"options",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "option",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/accounts/{accountId}/settings",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "setting",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"account_plan": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "plan_audio",
						"title": "Plan Audio",
						"type": "`$OBJECT`",
						"short": "Additional Audio Conferencing <a href=\"#plans\">plan type</a>",
					},
					map[string]any{
						"name": "plan_base",
						"title": "Plan Base",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Account base plan object",
					},
					map[string]any{
						"name": "plan_large_meeting",
						"title": "Plan Large Meeting",
						"type": "`$ARRAY`",
						"short": "Additional Large Meeting Plans",
					},
					map[string]any{
						"name": "plan_recording",
						"title": "Plan Recording",
						"type": "`$STRING`",
						"short": "Additional Cloud Recording Plan",
					},
					map[string]any{
						"name": "plan_room_connector",
						"title": "Plan Room Connector",
						"type": "`$OBJECT`",
						"short": "Account plan object",
					},
					map[string]any{
						"name": "plan_webinar",
						"title": "Plan Webinar",
						"type": "`$ARRAY`",
						"short": "Additional Webinar Plans",
					},
					map[string]any{
						"name": "plan_zoom_rooms",
						"title": "Plan Zoom Rooms",
						"type": "`$OBJECT`",
						"short": "Account plan object",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "account_plan",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts/{accountId}/plans",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "plans",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"plans",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{accountId}/plans",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "plans",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"plans",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"account_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email_notification",
						"title": "Email Notification",
						"type": "`$OBJECT`",
						"short": "Account Settings: Notification",
					},
					map[string]any{
						"name": "feature",
						"title": "Feature",
						"type": "`$OBJECT`",
						"short": "Account Settings: Feature",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "in_meeting",
						"title": "In Meeting",
						"type": "`$OBJECT`",
						"short": "Account Settings: In Meeting",
					},
					map[string]any{
						"name": "integration",
						"title": "Integration",
						"type": "`$OBJECT`",
						"short": "Account Settings: Integration",
					},
					map[string]any{
						"name": "recording",
						"title": "Recording",
						"type": "`$OBJECT`",
						"short": "Account Settings: Recording",
					},
					map[string]any{
						"name": "schedule_meting",
						"title": "Schedule Meting",
						"type": "`$OBJECT`",
						"short": "Account Settings: Schedule Meeting",
					},
					map[string]any{
						"name": "security",
						"title": "Security",
						"type": "`$OBJECT`",
						"short": "Account Settings: Security",
					},
					map[string]any{
						"name": "telephony",
						"title": "Telephony",
						"type": "`$OBJECT`",
						"short": "Account Settings: Telephony",
					},
					map[string]any{
						"name": "zoom_rooms",
						"title": "Zoom Rooms",
						"type": "`$OBJECT`",
						"short": "Account Settings: Zoom Rooms",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "account_setting",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{accountId}/settings",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"accounts",
									"{id}",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"billing": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"title": "Address",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's address",
					},
					map[string]any{
						"name": "apt",
						"title": "Apt",
						"type": "`$STRING`",
						"short": "Billing Contact's apartment/suite",
					},
					map[string]any{
						"name": "city",
						"title": "City",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's city",
					},
					map[string]any{
						"name": "country",
						"title": "Country",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's country",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's email address",
					},
					map[string]any{
						"name": "first_name",
						"title": "First Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's first name",
					},
					map[string]any{
						"name": "last_name",
						"title": "Last Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's last name",
					},
					map[string]any{
						"name": "phone_number",
						"title": "Phone Number",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's phone number",
					},
					map[string]any{
						"name": "state",
						"title": "State",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's state",
					},
					map[string]any{
						"name": "zip",
						"title": "Zip",
						"type": "`$STRING`",
						"req": true,
						"short": "Billing Contact's zip/postal code",
					},
				},
				"name": "billing",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/accounts/{accountId}/plans/addons",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "plans",
									},
									map[string]any{
										"lit": "addons",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"plans",
									"addons",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"body",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{accountId}/billing",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "billing",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"billing",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/accounts/{accountId}/billing",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "billing",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"billing",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"body",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/accounts/{accountId}/plans/addons",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "plans",
									},
									map[string]any{
										"lit": "addons",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"plans",
									"addons",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"body",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/accounts/{accountId}/plans/base",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "plans",
									},
									map[string]any{
										"lit": "base",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"plans",
									"base",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
										"body",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"cloud_recording": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "cloud_recording",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/recordings",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/meetings/{meetingId}/recordings/settings",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"meeting_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/meetings/{meetingId}/recordings/{recordingId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
										"recordingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "recording_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "action",
											"orig": "action",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"action",
										"id",
										"meeting_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/meetings/{meetingId}/recordings",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "action",
											"orig": "action",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"action",
										"meeting_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/meetings/{meetingId}/recordings/{recordingId}/status",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
									map[string]any{
										"var": "recording_id",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
									"{recording_id}",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
										"recordingId": "recording_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "recording_id",
											"orig": "recording_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"body",
										"meeting_id",
										"recording_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/meetings/{meetingId}/recordings/status",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"meeting_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.meeting",
							"$.main.kit.entity.recording",
						},
					},
				},
			},
			"dashboard": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_type",
						"title": "Account Type",
						"type": "`$STRING`",
						"short": "Zoom Room email type",
					},
					map[string]any{
						"name": "calender_name",
						"title": "Calender Name",
						"type": "`$STRING`",
						"short": "Zoom Calendar name",
					},
					map[string]any{
						"name": "camera",
						"title": "Camera",
						"type": "`$STRING`",
						"short": "Zoom Room camera",
					},
					map[string]any{
						"name": "crc_ports_usage",
						"title": "Crc Ports Usage",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "device_ip",
						"title": "Device Ip",
						"type": "`$STRING`",
						"short": "Zoom Room device IP",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Zoom Room email",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start date for this report",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Zoom Room ID",
					},
					map[string]any{
						"name": "last_start_time",
						"title": "Last Start Time",
						"type": "`$STRING`",
						"short": "Zoom Room last start time",
					},
					map[string]any{
						"name": "live_meeting",
						"title": "Live Meeting",
						"type": "`$OBJECT`",
						"short": "Meeting metric details",
					},
					map[string]any{
						"name": "meetings",
						"title": "Meetings",
						"type": "`$ARRAY`",
						"short": "Array of meeting objects",
					},
					map[string]any{
						"name": "microphone",
						"title": "Microphone",
						"type": "`$STRING`",
						"short": "Zoom Room microphone",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token is used to paginate through large result sets.",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call.",
					},
					map[string]any{
						"name": "participants",
						"title": "Participants",
						"type": "`$ARRAY`",
						"short": "Array of user objects",
					},
					map[string]any{
						"name": "past_meetings",
						"title": "Past Meetings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "room_name",
						"title": "Room Name",
						"type": "`$STRING`",
						"short": "Zoom Room name",
					},
					map[string]any{
						"name": "speaker",
						"title": "Speaker",
						"type": "`$STRING`",
						"short": "Zoom Room speaker",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Zoom Room status",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End date for this report",
						"format": "date",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "users",
						"title": "Users",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "webinars",
						"title": "Webinars",
						"type": "`$ARRAY`",
						"short": "Array of webinar objects",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "dashboard",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"next_page_token",
										"page_size",
										"to",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"next_page_token",
										"page_size",
										"to",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/im",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "im",
									},
								},
								"parts": []any{
									"metrics",
									"im",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"next_page_token",
										"page_size",
										"to",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings/{meetingId}/participants",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "participants",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
									"{meeting_id}",
									"participants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
										"next_page_token",
										"page_size",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings/{meetingId}/participants/sharing",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"lit": "sharing",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
									"{meeting_id}",
									"participants",
									"sharing",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
										"next_page_token",
										"page_size",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars/{webinarId}/participants",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "participants",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
									"{webinar_id}",
									"participants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"next_page_token",
										"page_size",
										"type",
										"webinar_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars/{webinarId}/participants/sharing",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"lit": "sharing",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
									"{webinar_id}",
									"participants",
									"sharing",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"next_page_token",
										"page_size",
										"type",
										"webinar_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/crc",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "crc",
									},
								},
								"parts": []any{
									"metrics",
									"crc",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"to",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/zoomrooms/{zoomroomId}",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "zoomrooms",
									},
									map[string]any{
										"var": "zoomroom_id",
									},
								},
								"parts": []any{
									"metrics",
									"zoomrooms",
									"{zoomroom_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"zoomroomId": "zoomroom_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "zoomroom_id",
											"orig": "zoomroom_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.webinar",
						},
					},
				},
			},
			"device": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "devices",
						"title": "Devices",
						"type": "`$ARRAY`",
						"short": "List of H.323/SIP Device objects",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "device",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/h323/devices",
								"segments": []any{
									map[string]any{
										"lit": "h323",
									},
									map[string]any{
										"lit": "devices",
									},
								},
								"parts": []any{
									"h323",
									"devices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/h323/devices",
								"segments": []any{
									map[string]any{
										"lit": "h323",
									},
									map[string]any{
										"lit": "devices",
									},
								},
								"parts": []any{
									"h323",
									"devices",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/h323/devices/{deviceId}",
								"segments": []any{
									map[string]any{
										"lit": "h323",
									},
									map[string]any{
										"lit": "devices",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"h323",
									"devices",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"deviceId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "device_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/h323/devices/{deviceId}",
								"segments": []any{
									map[string]any{
										"lit": "h323",
									},
									map[string]any{
										"lit": "devices",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"h323",
									"devices",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"deviceId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "device_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"domains_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "domain",
						"title": "Domain",
						"type": "`$STRING`",
						"short": "Domain Name",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Domain Status",
					},
				},
				"name": "domains_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/accounts/{accountId}/managed_domains",
								"segments": []any{
									map[string]any{
										"lit": "accounts",
									},
									map[string]any{
										"var": "account_id",
									},
									map[string]any{
										"lit": "managed_domains",
									},
								},
								"parts": []any{
									"accounts",
									"{account_id}",
									"managed_domains",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"accountId": "account_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.domains`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "account_id",
											"orig": "account_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"account_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.account",
						},
					},
				},
			},
			"group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Group ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Group name",
					},
					map[string]any{
						"name": "total_members",
						"title": "Total Members",
						"type": "`$INTEGER`",
						"short": "Total number of members in this group",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "group",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups/{groupId}/members",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
									"members",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "member",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/groups",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.groups`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}/members/{memberId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
									"members",
									"{member_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
										"memberId": "member_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "member_id",
											"orig": "member_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"member_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"group_member_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "members",
						"title": "Members",
						"type": "`$ARRAY`",
						"short": "List of Group member objects",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "group_member_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/groups/{groupId}/members",
								"segments": []any{
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"parts": []any{
									"groups",
									"{id}",
									"members",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "members",
									"exist": []any{
										"id",
										"page_number",
										"page_size",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/im/groups/{groupId}/members",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{id}",
									"members",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "members",
									"exist": []any{
										"id",
										"page_number",
										"page_size",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"im_chat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start date",
						"format": "date",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
						"short": "Array of session objects",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token, used to paginate through large result sets.",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The amount of records returns within a single API call.",
					},
					map[string]any{
						"name": "session_id",
						"title": "Session Id",
						"type": "`$STRING`",
						"short": "IM Chat session ID",
					},
					map[string]any{
						"name": "sessions",
						"title": "Sessions",
						"type": "`$ARRAY`",
						"short": "Array of session objects",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End date",
						"format": "date",
					},
				},
				"name": "im_chat",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/im/chat/sessions",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "chat",
									},
									map[string]any{
										"lit": "sessions",
									},
								},
								"parts": []any{
									"im",
									"chat",
									"sessions",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"next_page_token",
										"page_size",
										"to",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/im/chat/sessions/{sessionId}",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "chat",
									},
									map[string]any{
										"lit": "sessions",
									},
									map[string]any{
										"var": "session_id",
									},
								},
								"parts": []any{
									"im",
									"chat",
									"sessions",
									"{session_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"sessionId": "session_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "session_id",
											"orig": "session_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"im_group": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Group ID",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "im_group",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/im/groups/{groupId}/members",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "members",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{group_id}",
									"members",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"group_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/im/groups",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"im",
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/im/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/im/groups/{groupId}/members/{memberId}",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "group_id",
									},
									map[string]any{
										"lit": "members",
									},
									map[string]any{
										"var": "member_id",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{group_id}",
									"members",
									"{member_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "group_id",
										"memberId": "member_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "group_id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "member_id",
											"orig": "member_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"group_id",
										"member_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/im/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/im/groups/{groupId}",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"im",
									"groups",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"groupId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "group_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.group",
						},
						[]any{
							"$.main.kit.entity.group",
						},
					},
				},
			},
			"im_group_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "groups",
						"title": "Groups",
						"type": "`$ARRAY`",
						"short": "List of Group objects",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"name": "im_group_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/im/groups",
								"segments": []any{
									map[string]any{
										"lit": "im",
									},
									map[string]any{
										"lit": "groups",
									},
								},
								"parts": []any{
									"im",
									"groups",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"meeting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agenda",
						"title": "Agenda",
						"type": "`$STRING`",
						"short": "Agenda",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Create time",
						"format": "date-time",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Meeting duration",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "User email",
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$STRING`",
						"short": "Meeting end time",
						"format": "date-time",
					},
					map[string]any{
						"name": "h323_password",
						"title": "H323 Password",
						"type": "`$STRING`",
						"short": "H.323/SIP room system password",
					},
					map[string]any{
						"name": "has_3rd_party_audio",
						"title": "Has 3rd Party Audio",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_pstn",
						"title": "Has Pstn",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_recording",
						"title": "Has Recording",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_screen_share",
						"title": "Has Screen Share",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_sip",
						"title": "Has Sip",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_video",
						"title": "Has Video",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_voip",
						"title": "Has Voip",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "host",
						"title": "Host",
						"type": "`$STRING`",
						"short": "User display name",
					},
					map[string]any{
						"name": "host_id",
						"title": "Host Id",
						"type": "`$STRING`",
						"short": "ID of the user set as host of meeting",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Meeting Poll ID",
					},
					map[string]any{
						"name": "join_url",
						"title": "Join Url",
						"type": "`$STRING`",
						"short": "Join url",
					},
					map[string]any{
						"name": "meetings",
						"title": "Meetings",
						"type": "`$ARRAY`",
						"short": "List of Meeting objects",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token is used to paginate through large result sets.",
					},
					map[string]any{
						"name": "occurrences",
						"title": "Occurrences",
						"type": "`$ARRAY`",
						"short": "Array of occurrence objects",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "participants",
						"title": "Participants",
						"type": "`$INTEGER`",
						"short": "Meeting participant count",
					},
					map[string]any{
						"name": "participants_count",
						"title": "Participants Count",
						"type": "`$INTEGER`",
						"short": "Number of meeting participants",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"short": "Meeting password",
					},
					map[string]any{
						"name": "questions",
						"title": "Questions",
						"type": "`$ARRAY`",
						"short": "Array of Polls",
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
						"short": "Meeting Settings",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$STRING`",
						"short": "Meeting start time",
						"format": "date-time",
					},
					map[string]any{
						"name": "start_url",
						"title": "Start Url",
						"type": "`$STRING`",
						"short": "Start url",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Status of the Meeting Poll",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
						"short": "Timezone to format start_time",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Poll Title",
					},
					map[string]any{
						"name": "topic",
						"title": "Topic",
						"type": "`$STRING`",
						"short": "Meeting topic",
					},
					map[string]any{
						"name": "total_minutes",
						"title": "Total Minutes",
						"type": "`$INTEGER`",
						"short": "Number of meeting minutes",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "tracking_fields",
						"title": "Tracking Fields",
						"type": "`$ARRAY`",
						"short": "Tracking fields",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$INTEGER`",
						"short": "Meeting Type",
					},
					map[string]any{
						"name": "user_email",
						"title": "User Email",
						"type": "`$STRING`",
						"short": "User email",
					},
					map[string]any{
						"name": "user_name",
						"title": "User Name",
						"type": "`$STRING`",
						"short": "User display name",
					},
					map[string]any{
						"name": "user_type",
						"title": "User Type",
						"type": "`$STRING`",
						"short": "User type",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"short": "Meeting UUID",
						"format": "uuid",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "meeting",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/meetings/{meetingId}/registrants",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"registrants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrant",
									"exist": []any{
										"body",
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/meetings/{meetingId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "poll",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/meetings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "meetings",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"meetings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"user_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/meetings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "meetings",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"meetings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_number",
										"page_size",
										"type",
										"user_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/past_meetings/{meetingUUID}/participants",
								"segments": []any{
									map[string]any{
										"lit": "past_meetings",
									},
									map[string]any{
										"var": "meeting_uuid",
									},
									map[string]any{
										"lit": "participants",
									},
								},
								"parts": []any{
									"past_meetings",
									"{meeting_uuid}",
									"participants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingUUID": "meeting_uuid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_uuid",
											"orig": "meeting_uuid",
											"type": "`$ANY`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_uuid",
										"next_page_token",
										"page_size",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
										"pollId": "poll_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"poll_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings/{meetingId}",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/past_meetings/{meetingUUID}",
								"segments": []any{
									map[string]any{
										"lit": "past_meetings",
									},
									map[string]any{
										"var": "meeting_uuid",
									},
								},
								"parts": []any{
									"past_meetings",
									"{meeting_uuid}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingUUID": "meeting_uuid",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_uuid",
											"orig": "meeting_uuid",
											"type": "`$ANY`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_uuid",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/meetings/{meetingId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/meetings/{meetingId}/livestream",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "livestream",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"livestream",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "livestream",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/meetings/{meetingId}/livestream/status",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "livestream",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"livestream",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "livestream_status",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/meetings/{meetingId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/meetings/{meetingId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
										"pollId": "poll_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"poll_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/meetings/{meetingId}/registrants/status",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"registrants",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrant_status",
									"exist": []any{
										"body",
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/meetings/{meetingId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
										"pollId": "poll_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
										"poll_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/meetings/{meetingId}/status",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.poll",
						},
						[]any{
							"$.main.kit.entity.user",
						},
					},
				},
			},
			"meeting_instance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "meetings",
						"title": "Meetings",
						"type": "`$ARRAY`",
						"short": "List of ended meeting instances.",
					},
				},
				"name": "meeting_instance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/past_meetings/{meetingId}/instances",
								"segments": []any{
									map[string]any{
										"lit": "past_meetings",
									},
									map[string]any{
										"var": "past_meeting_id",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"parts": []any{
									"past_meetings",
									"{past_meeting_id}",
									"instances",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "past_meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "past_meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"past_meeting_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"meeting_invitation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "invitation",
						"title": "Invitation",
						"type": "`$STRING`",
						"short": "Meeting invitation",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "meeting_invitation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/invitation",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "invitation",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"invitation",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"meeting_registrant_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "meeting_registrant_list",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/registrants",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
								},
								"parts": []any{
									"meetings",
									"{id}",
									"registrants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrants",
									"exist": []any{
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
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pac": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "conference_id",
						"title": "Conference Id",
						"type": "`$INTEGER`",
						"short": "Conference ID",
					},
					map[string]any{
						"name": "dedicated_dial_in_number",
						"title": "Dedicated Dial In Number",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of Dedicated Dial In Numbers",
					},
					map[string]any{
						"name": "global_dial_in_numbers",
						"title": "Global Dial In Numbers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of Global Dial In Numbers",
					},
					map[string]any{
						"name": "listen_only_password",
						"title": "Listen Only Password",
						"type": "`$STRING`",
						"short": "Listen-Only Password, numeric value, length is less than 6",
					},
					map[string]any{
						"name": "participant_password",
						"title": "Participant Password",
						"type": "`$STRING`",
						"short": "Participant Password, numeric value, length is less than 6",
					},
				},
				"name": "pac",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/pac",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "pac",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"pac",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tsp_accounts`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.user",
						},
					},
				},
			},
			"poll": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "polls",
						"title": "Polls",
						"type": "`$ARRAY`",
						"short": "Array of Polls",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"name": "poll",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webinars/{webinarId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"webinars",
									"{webinar_id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"webinar_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.webinar",
						},
					},
				},
			},
			"qos": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "as_input",
						"title": "As Input",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
					map[string]any{
						"name": "as_output",
						"title": "As Output",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
					map[string]any{
						"name": "audio_input",
						"title": "Audio Input",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
					map[string]any{
						"name": "audio_output",
						"title": "Audio Output",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
					map[string]any{
						"name": "cpu_usage",
						"title": "Cpu Usage",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "date_time",
						"title": "Date Time",
						"type": "`$STRING`",
						"short": "Datetime of QOS",
						"format": "date-time",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token is used to paginate through large result sets.",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
						"format": "int64",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of items per page",
					},
					map[string]any{
						"name": "participants",
						"title": "Participants",
						"type": "`$ARRAY`",
						"short": "Array of user objects",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
						"format": "int64",
					},
					map[string]any{
						"name": "video_input",
						"title": "Video Input",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
					map[string]any{
						"name": "video_output",
						"title": "Video Output",
						"type": "`$OBJECT`",
						"short": "Quality of Service object",
					},
				},
				"name": "qos",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings/{meetingId}/participants/qos",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"lit": "qos",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
									"{meeting_id}",
									"participants",
									"qos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
										"next_page_token",
										"page_size",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars/{webinarId}/participants/qos",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"lit": "qos",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
									"{webinar_id}",
									"participants",
									"qos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"next_page_token",
										"page_size",
										"type",
										"webinar_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/meetings/{meetingId}/participants/{participantId}/qos",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"var": "participant_id",
									},
									map[string]any{
										"lit": "qos",
									},
								},
								"parts": []any{
									"metrics",
									"meetings",
									"{meeting_id}",
									"participants",
									"{participant_id}",
									"qos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
										"participantId": "participant_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user_qos`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "participant_id",
											"orig": "participant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
										"participant_id",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars/{webinarId}/participants/{participantId}/qos",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "participants",
									},
									map[string]any{
										"var": "participant_id",
									},
									map[string]any{
										"lit": "qos",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
									"{webinar_id}",
									"participants",
									"{participant_id}",
									"qos",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"participantId": "participant_id",
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user_qos`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "participant_id",
											"orig": "participant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"participant_id",
										"type",
										"webinar_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.webinar",
						},
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.webinar",
						},
					},
				},
			},
			"recording": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start Date,",
						"format": "date",
					},
					map[string]any{
						"name": "meetings",
						"title": "Meetings",
						"type": "`$ARRAY`",
						"short": "List of Recording",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token is used to paginate through large result sets.",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call.",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End Date",
						"format": "date",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
				},
				"name": "recording",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/recordings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "recordings",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"recordings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "mc",
											"orig": "mc",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "trash",
											"orig": "trash",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
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
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.user",
						},
					},
				},
			},
			"recording_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "approval_type",
						"title": "Approval Type",
						"type": "`$INTEGER`",
						"short": "Approval type",
					},
					map[string]any{
						"name": "on_demand",
						"title": "On Demand",
						"type": "`$BOOLEAN`",
						"short": "Registration required",
					},
					map[string]any{
						"name": "password",
						"title": "Password",
						"type": "`$STRING`",
						"short": "Password protect",
					},
					map[string]any{
						"name": "send_email_to_host",
						"title": "Send Email To Host",
						"type": "`$BOOLEAN`",
						"short": "Send an email to host when someone registers",
					},
					map[string]any{
						"name": "share_recording",
						"title": "Share Recording",
						"type": "`$STRING`",
						"short": "Determine if the meeting recording is shared",
					},
					map[string]any{
						"name": "show_social_share_buttons",
						"title": "Show Social Share Buttons",
						"type": "`$BOOLEAN`",
						"short": "Show social share buttons on registration page",
					},
					map[string]any{
						"name": "viewer_download",
						"title": "Viewer Download",
						"type": "`$BOOLEAN`",
						"short": "Host video",
					},
				},
				"name": "recording_setting",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}/recordings/settings",
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "recordings",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"meetings",
									"{meeting_id}",
									"recordings",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
					},
				},
			},
			"report": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$INTEGER`",
						"short": "Meeting duration",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Participant email",
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$STRING`",
						"short": "Meeting end time",
						"format": "date-time",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Start date for this report",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Meeting ID",
					},
					map[string]any{
						"name": "meetings",
						"title": "Meetings",
						"type": "`$ARRAY`",
						"short": "Array of meeting objects",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Participant display name",
					},
					map[string]any{
						"name": "next_page_token",
						"title": "Next Page Token",
						"type": "`$STRING`",
						"short": "Next page token is used to paginate through large result sets.",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call.",
					},
					map[string]any{
						"name": "participants",
						"title": "Participants",
						"type": "`$ARRAY`",
						"short": "Array of meeting participant objects",
					},
					map[string]any{
						"name": "participants_count",
						"title": "Participants Count",
						"type": "`$INTEGER`",
						"short": "Number of meeting participants",
					},
					map[string]any{
						"name": "question_details",
						"title": "Question Details",
						"type": "`$ARRAY`",
						"short": "Array of questions from user",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$STRING`",
						"short": "Meeting start time",
						"format": "date-time",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "End date for this report",
						"format": "date",
					},
					map[string]any{
						"name": "topic",
						"title": "Topic",
						"type": "`$STRING`",
						"short": "Meeting topic",
					},
					map[string]any{
						"name": "total_minutes",
						"title": "Total Minutes",
						"type": "`$INTEGER`",
						"short": "Number of meeting minutes",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "tracking_fields",
						"title": "Tracking Fields",
						"type": "`$ARRAY`",
						"short": "Tracking fields",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$INTEGER`",
						"short": "Meeting type",
					},
					map[string]any{
						"name": "user_email",
						"title": "User Email",
						"type": "`$STRING`",
						"short": "User email",
					},
					map[string]any{
						"name": "user_name",
						"title": "User Name",
						"type": "`$STRING`",
						"short": "User display name",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"short": "Meeting UUID",
						"format": "uuid",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "report",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/users/{userId}/meetings",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "meetings",
									},
								},
								"parts": []any{
									"report",
									"users",
									"{user_id}",
									"meetings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"from",
										"next_page_token",
										"page_size",
										"to",
										"user_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/telephone",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "telephone",
									},
								},
								"parts": []any{
									"report",
									"telephone",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "telephone",
									"exist": []any{
										"from",
										"page_number",
										"page_size",
										"to",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/users",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "users",
									},
								},
								"parts": []any{
									"report",
									"users",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "user",
									"exist": []any{
										"from",
										"page_number",
										"page_size",
										"to",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/meetings/{meetingId}/participants",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "participants",
									},
								},
								"parts": []any{
									"report",
									"meetings",
									"{meeting_id}",
									"participants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
										"next_page_token",
										"page_size",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/webinars/{webinarId}/participants",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "participants",
									},
								},
								"parts": []any{
									"report",
									"webinars",
									"{webinar_id}",
									"participants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"next_page_token",
										"page_size",
										"webinar_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/cloud_recording",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "cloud_recording",
									},
								},
								"parts": []any{
									"report",
									"cloud_recording",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "from",
											"orig": "from",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "to",
											"orig": "to",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "cloud_recording",
									"exist": []any{
										"from",
										"to",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/daily",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "daily",
									},
								},
								"parts": []any{
									"report",
									"daily",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dates`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "month",
											"orig": "month",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "daily",
									"exist": []any{
										"month",
										"year",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/meetings/{meetingId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"report",
									"meetings",
									"{meeting_id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.questions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/webinars/{webinarId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"report",
									"webinars",
									"{webinar_id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.questions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"webinar_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/webinars/{webinarId}/qa",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
									map[string]any{
										"lit": "qa",
									},
								},
								"parts": []any{
									"report",
									"webinars",
									"{webinar_id}",
									"qa",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.questions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"webinar_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/meetings/{meetingId}",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "meeting_id",
									},
								},
								"parts": []any{
									"report",
									"meetings",
									"{meeting_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "meeting_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "meeting_id",
											"orig": "meeting_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"meeting_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/report/webinars/{webinarId}",
								"segments": []any{
									map[string]any{
										"lit": "report",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "webinar_id",
									},
								},
								"parts": []any{
									"report",
									"webinars",
									"{webinar_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"webinar_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.meeting",
						},
						[]any{
							"$.main.kit.entity.user",
						},
						[]any{
							"$.main.kit.entity.webinar",
						},
					},
				},
			},
			"tracking_field": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "field",
						"title": "Field",
						"type": "`$STRING`",
						"short": "Tracking Field Name",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Tracking Field ID",
					},
					map[string]any{
						"name": "recommended_values",
						"title": "Recommended Values",
						"type": "`$ARRAY`",
						"short": "Array of recommended values",
					},
					map[string]any{
						"name": "required",
						"title": "Required",
						"type": "`$BOOLEAN`",
						"short": "Tracking Field Required",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "tracking_fields",
						"title": "Tracking Fields",
						"type": "`$ARRAY`",
						"short": "Array of Tracking Fields",
					},
					map[string]any{
						"name": "visible",
						"title": "Visible",
						"type": "`$BOOLEAN`",
						"short": "Tracking Field Visible",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "tracking_field",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/v2/tracking_fields",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "tracking_fields",
									},
								},
								"parts": []any{
									"v2",
									"tracking_fields",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/tracking_fields",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "tracking_fields",
									},
								},
								"parts": []any{
									"v2",
									"tracking_fields",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/v2/tracking_fields/{fieldId}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "tracking_fields",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"tracking_fields",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fieldId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "field_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/v2/tracking_fields/{fieldId}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "tracking_fields",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"tracking_fields",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fieldId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "field_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/v2/tracking_fields/{fieldId}",
								"segments": []any{
									map[string]any{
										"lit": "v2",
									},
									map[string]any{
										"lit": "tracking_fields",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"v2",
									"tracking_fields",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"fieldId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "field_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"tsp": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"title": "Code",
						"type": "`$STRING`",
						"short": "Country Code",
					},
					map[string]any{
						"name": "conference_code",
						"title": "Conference Code",
						"type": "`$STRING`",
						"req": true,
						"short": "Conference code, numeric value, length is less than 16.",
					},
					map[string]any{
						"name": "dial_in_numbers",
						"title": "Dial In Numbers",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of Dial In Numbers",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "leader_pin",
						"title": "Leader Pin",
						"type": "`$STRING`",
						"req": true,
						"short": "Leader PIN, numeric value, length is less than 16.",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"short": "Dial-in number, length is less than 16",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "tsp",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/tsp",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "tsp",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"tsp",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"user_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/tsp",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "tsp",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"tsp",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.tsp_accounts`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/tsp",
								"segments": []any{
									map[string]any{
										"lit": "tsp",
									},
								},
								"parts": []any{
									"tsp",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dial_in_numbers`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/tsp/{tspId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "tsp",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"tsp",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tspId": "id",
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tsp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/tsp/{tspId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "tsp",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"tsp",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tspId": "id",
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tsp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"user_id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/users/{userId}/tsp/{tspId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "tsp",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"tsp",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"tspId": "id",
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "tsp_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
										"user_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/tsp",
								"segments": []any{
									map[string]any{
										"lit": "tsp",
									},
								},
								"parts": []any{
									"tsp",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.user",
						},
					},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "account_id",
						"title": "Account Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cms_user_id",
						"title": "Cms User Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "User create time",
						"format": "date-time",
					},
					map[string]any{
						"name": "dept",
						"title": "Dept",
						"type": "`$STRING`",
						"short": "Department",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"req": true,
						"short": "User's email address",
					},
					map[string]any{
						"name": "first_name",
						"title": "First Name",
						"type": "`$STRING`",
						"short": "User's first name",
					},
					map[string]any{
						"name": "group_ids",
						"title": "Group Ids",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "host_key",
						"title": "Host Key",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "User ID",
					},
					map[string]any{
						"name": "im_group_ids",
						"title": "Im Group Ids",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "last_client_version",
						"title": "Last Client Version",
						"type": "`$STRING`",
						"short": "User last login client version",
					},
					map[string]any{
						"name": "last_login_time",
						"title": "Last Login Time",
						"type": "`$STRING`",
						"short": "User last login time",
						"format": "date-time",
					},
					map[string]any{
						"name": "last_name",
						"title": "Last Name",
						"type": "`$STRING`",
						"short": "User's last name",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "personal_meeting_url",
						"title": "Personal Meeting Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pic_url",
						"title": "Pic Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pmi",
						"title": "Pmi",
						"type": "`$STRING`",
						"short": "Personal Meeting ID",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
						"short": "Time Zone",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$INTEGER`",
						"req": true,
						"short": "User's type",
					},
					map[string]any{
						"name": "use_pmi",
						"title": "Use Pmi",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "users",
						"title": "Users",
						"type": "`$ARRAY`",
						"short": "List of User objects",
					},
					map[string]any{
						"name": "vanity_url",
						"title": "Vanity Url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "verified",
						"title": "Verified",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/assistants",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "assistants",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"assistants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "assistant",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/picture",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "picture",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"picture",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "pic_file",
											"orig": "pic_file",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "picture",
									"exist": []any{
										"id",
										"pic_file",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
								},
								"parts": []any{
									"users",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
								},
								"parts": []any{
									"users",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_number",
										"page_size",
										"status",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "login_type",
											"orig": "login_type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"login_type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/token",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"token",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "token",
									"exist": []any{
										"id",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/email",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "email",
									},
								},
								"parts": []any{
									"users",
									"email",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "email",
									"exist": []any{
										"email",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/vanity_name",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "vanity_name",
									},
								},
								"parts": []any{
									"users",
									"vanity_name",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "vanity_name",
											"orig": "vanity_name",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "vanity_name",
									"exist": []any{
										"vanity_name",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/zpk",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"lit": "zpk",
									},
								},
								"parts": []any{
									"users",
									"zpk",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "zpk",
											"orig": "zpk",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "zpk",
									"exist": []any{
										"zpk",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "action",
											"orig": "action",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "transfer_email",
											"orig": "transfer_email",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "transfer_meeting",
											"orig": "transfer_meeting",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "transfer_recording",
											"orig": "transfer_recording",
											"type": "`$ANY`",
											"kind": "query",
										},
										map[string]any{
											"name": "transfer_webinar",
											"orig": "transfer_webinar",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"action",
										"id",
										"transfer_email",
										"transfer_meeting",
										"transfer_recording",
										"transfer_webinar",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/assistants/{assistantId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "assistants",
									},
									map[string]any{
										"var": "assistant_id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"assistants",
									"{assistant_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"assistantId": "assistant_id",
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "assistant_id",
											"orig": "assistant_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"assistant_id",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/schedulers/{schedulerId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "schedulers",
									},
									map[string]any{
										"var": "scheduler_id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"schedulers",
									"{scheduler_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"schedulerId": "scheduler_id",
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "scheduler_id",
											"orig": "scheduler_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"scheduler_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/assistants",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "assistants",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"assistants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "assistant",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/schedulers",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "schedulers",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"schedulers",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "scheduler",
									"exist": []any{
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/users/{userId}/token",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "token",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"token",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "token",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/users/{userId}",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"users",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/users/{userId}/email",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "email",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"email",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "email",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/users/{userId}/password",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "password",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"password",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "password",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/users/{userId}/settings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "setting",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/users/{userId}/status",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_assistants_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user_assistants_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/assistants",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "assistants",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"assistants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.assistants`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "assistants",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_permission": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "permissions",
						"title": "Permissions",
						"type": "`$ARRAY`",
						"short": "List of user permissions",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user_permission",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/permissions",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "permissions",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"permissions",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.permissions`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_schedulers_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user_schedulers_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/schedulers",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "schedulers",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"schedulers",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.assistants`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "schedulers",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user_setting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email_notification",
						"title": "Email Notification",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "feature",
						"title": "Feature",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "in_meeting",
						"title": "In Meeting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "recording",
						"title": "Recording",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "schedule_meeting",
						"title": "Schedule Meeting",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "telephony",
						"title": "Telephony",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "user_setting",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/settings",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "settings",
									},
								},
								"parts": []any{
									"users",
									"{id}",
									"settings",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "login_type",
											"orig": "login_type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"login_type",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webhook": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auth_password",
						"title": "Auth Password",
						"type": "`$STRING`",
						"req": true,
						"short": "Webhook auth password",
					},
					map[string]any{
						"name": "auth_user",
						"title": "Auth User",
						"type": "`$STRING`",
						"req": true,
						"short": "Webhook auth user name",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Webhook create time",
						"format": "date-time",
					},
					map[string]any{
						"name": "events",
						"title": "Events",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of events objects.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"req": true,
						"short": "Webhook endpoint",
					},
					map[string]any{
						"name": "webhook_id",
						"title": "Webhook Id",
						"type": "`$STRING`",
						"short": "Webhook Id",
					},
					map[string]any{
						"name": "webhooks",
						"title": "Webhooks",
						"type": "`$ARRAY`",
						"short": "List of Webhook objects",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webhook",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webhooks",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
								},
								"parts": []any{
									"webhooks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webhooks/{webhookId}",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhookId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webhook_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webhooks/{webhookId}",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhookId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webhook_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/webhooks/{webhookId}",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webhooks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webhookId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webhook_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/webhooks/options",
								"segments": []any{
									map[string]any{
										"lit": "webhooks",
									},
									map[string]any{
										"lit": "options",
									},
								},
								"parts": []any{
									"webhooks",
									"options",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "option",
									"exist": []any{
										"body",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webinar": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agenda",
						"title": "Agenda",
						"type": "`$STRING`",
						"short": "Webinar agenda",
					},
					map[string]any{
						"name": "created_at",
						"title": "Created At",
						"type": "`$STRING`",
						"short": "Create time",
						"format": "date-time",
					},
					map[string]any{
						"name": "duration",
						"title": "Duration",
						"type": "`$STRING`",
						"short": "Webinar duration",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "User email",
					},
					map[string]any{
						"name": "end_time",
						"title": "End Time",
						"type": "`$STRING`",
						"short": "Webinar end time",
						"format": "date-time",
					},
					map[string]any{
						"name": "has_3rd_party_audio",
						"title": "Has 3rd Party Audio",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_pstn",
						"title": "Has Pstn",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_recording",
						"title": "Has Recording",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_screen_share",
						"title": "Has Screen Share",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_sip",
						"title": "Has Sip",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_video",
						"title": "Has Video",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "has_voip",
						"title": "Has Voip",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "host",
						"title": "Host",
						"type": "`$STRING`",
						"short": "User display name",
					},
					map[string]any{
						"name": "host_id",
						"title": "Host Id",
						"type": "`$STRING`",
						"short": "ID of the user set as host of webinar",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Webinar Poll ID",
					},
					map[string]any{
						"name": "join_url",
						"title": "Join Url",
						"type": "`$STRING`",
						"short": "Join url",
					},
					map[string]any{
						"name": "occurrences",
						"title": "Occurrences",
						"type": "`$ARRAY`",
						"short": "Array of occurrence objects",
					},
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "participants",
						"title": "Participants",
						"type": "`$INTEGER`",
						"short": "Webinar participant count",
					},
					map[string]any{
						"name": "questions",
						"title": "Questions",
						"type": "`$ARRAY`",
						"short": "Array of Polls",
					},
					map[string]any{
						"name": "settings",
						"title": "Settings",
						"type": "`$OBJECT`",
						"short": "Webinar Settings",
					},
					map[string]any{
						"name": "start_time",
						"title": "Start Time",
						"type": "`$STRING`",
						"short": "Webinar start time",
						"format": "date-time",
					},
					map[string]any{
						"name": "start_url",
						"title": "Start Url",
						"type": "`$STRING`",
						"short": "Start url",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Status of the Webinar Poll",
					},
					map[string]any{
						"name": "timezone",
						"title": "Timezone",
						"type": "`$STRING`",
						"short": "Timezone to format start_time",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"short": "Poll Title",
					},
					map[string]any{
						"name": "topic",
						"title": "Topic",
						"type": "`$STRING`",
						"short": "Webinar topic",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "tracking_fields",
						"title": "Tracking Fields",
						"type": "`$ARRAY`",
						"short": "Tracking fields",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$INTEGER`",
						"short": "Webinar Type",
					},
					map[string]any{
						"name": "user_type",
						"title": "User Type",
						"type": "`$STRING`",
						"short": "User type",
					},
					map[string]any{
						"name": "uuid",
						"title": "Uuid",
						"type": "`$STRING`",
						"short": "Webinar UUID",
						"format": "uuid",
					},
					map[string]any{
						"name": "webinars",
						"title": "Webinars",
						"type": "`$ARRAY`",
						"short": "List of Webinar objects",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webinar",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/webinars/{webinarId}/registrants",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"registrants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrant",
									"exist": []any{
										"body",
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/webinars/{webinarId}/panelists",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "panelists",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"panelists",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "panelist",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/webinars/{webinarId}/polls",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"polls",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "poll",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/webinars",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "webinars",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"webinars",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"user_id",
									},
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/webinars",
								"segments": []any{
									map[string]any{
										"lit": "users",
									},
									map[string]any{
										"var": "user_id",
									},
									map[string]any{
										"lit": "webinars",
									},
								},
								"parts": []any{
									"users",
									"{user_id}",
									"webinars",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "user_id",
											"orig": "user_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_number",
										"page_size",
										"user_id",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webinars/{webinarId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pollId": "poll_id",
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"poll_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/webinars/{webinarId}",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"metrics",
									"webinars",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "type",
											"orig": "type",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"type",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webinars/{webinarId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"patch": map[string]any{
						"input": "data",
						"name": "patch",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PATCH",
								"orig": "/webinars/{webinarId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$OBJECT`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webinars/{webinarId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webinars/{webinarId}/panelists/{panelistId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "panelists",
									},
									map[string]any{
										"var": "panelist_id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"panelists",
									"{panelist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"panelistId": "panelist_id",
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "panelist_id",
											"orig": "panelist_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"panelist_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webinars/{webinarId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pollId": "poll_id",
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"poll_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "DELETE",
								"orig": "/webinars/{webinarId}/panelists",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "panelists",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"panelists",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "panelist",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/webinars/{webinarId}/registrants/status",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"registrants",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrant_status",
									"exist": []any{
										"body",
										"id",
										"occurrence_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/webinars/{webinarId}/polls/{pollId}",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "polls",
									},
									map[string]any{
										"var": "poll_id",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"polls",
									"{poll_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"pollId": "poll_id",
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "poll_id",
											"orig": "poll_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"body",
										"id",
										"poll_id",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "PUT",
								"orig": "/webinars/{webinarId}/status",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "status",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"status",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "body",
											"orig": "body",
											"type": "`$ANY`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "status",
									"exist": []any{
										"body",
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"$.main.kit.entity.user",
						},
						[]any{
							"$.main.kit.entity.poll",
						},
					},
				},
			},
			"webinar_instance": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "webinars",
						"title": "Webinars",
						"type": "`$ARRAY`",
						"short": "List of ended webinar instances.",
					},
				},
				"name": "webinar_instance",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/past_webinars/{webinarId}/instances",
								"segments": []any{
									map[string]any{
										"lit": "past_webinars",
									},
									map[string]any{
										"var": "past_webinar_id",
									},
									map[string]any{
										"lit": "instances",
									},
								},
								"parts": []any{
									"past_webinars",
									"{past_webinar_id}",
									"instances",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "past_webinar_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "past_webinar_id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"past_webinar_id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webinar_panelist_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "panelists",
						"title": "Panelists",
						"type": "`$ARRAY`",
						"short": "List of Panelist objects",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "Total records",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webinar_panelist_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webinars/{webinarId}/panelists",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "panelists",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"panelists",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"$action": "panelists",
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"webinar_registrant_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "webinar_registrant_list",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/webinars/{webinarId}/registrants",
								"segments": []any{
									map[string]any{
										"lit": "webinars",
									},
									map[string]any{
										"var": "id",
									},
									map[string]any{
										"lit": "registrants",
									},
								},
								"parts": []any{
									"webinars",
									"{id}",
									"registrants",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"webinarId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "webinar_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "occurrence_id",
											"orig": "occurrence_id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$ANY`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"$action": "registrants",
									"exist": []any{
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
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"zoom_room_list": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "page_count",
						"title": "Page Count",
						"type": "`$INTEGER`",
						"short": "The number of items returned on this page",
					},
					map[string]any{
						"name": "page_number",
						"title": "Page Number",
						"type": "`$INTEGER`",
						"short": "The page number of current results",
					},
					map[string]any{
						"name": "page_size",
						"title": "Page Size",
						"type": "`$INTEGER`",
						"short": "The number of records returned within a single API call",
					},
					map[string]any{
						"name": "total_records",
						"title": "Total Records",
						"type": "`$INTEGER`",
						"short": "The number of all records available across pages",
					},
					map[string]any{
						"name": "zoom_rooms",
						"title": "Zoom Rooms",
						"type": "`$ARRAY`",
						"short": "Array of Zoom Rooms",
					},
				},
				"name": "zoom_room_list",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/metrics/zoomrooms",
								"segments": []any{
									map[string]any{
										"lit": "metrics",
									},
									map[string]any{
										"lit": "zoomrooms",
									},
								},
								"parts": []any{
									"metrics",
									"zoomrooms",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "page_number",
											"orig": "page_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"page_number",
										"page_size",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "debug":
		if NewDebugFeatureFunc != nil {
			return NewDebugFeatureFunc()
		}
	case "idempotency":
		if NewIdempotencyFeatureFunc != nil {
			return NewIdempotencyFeatureFunc()
		}
	case "metrics":
		if NewMetricsFeatureFunc != nil {
			return NewMetricsFeatureFunc()
		}
	case "paging":
		if NewPagingFeatureFunc != nil {
			return NewPagingFeatureFunc()
		}
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
