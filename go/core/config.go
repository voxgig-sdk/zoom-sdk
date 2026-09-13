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
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.zoom.us/v2",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"meeting": map[string]any{},
			},
		},
		"entity": map[string]any{
			"meeting": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agenda",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "host_id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "host_video",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "join_before_host",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "join_url",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mute_upon_entry",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "participant_video",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "password",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "settings",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start_time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "timezone",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "topic",
						"op": map[string]any{
							"list": map[string]any{
								"type": "`$STRING`",
							},
						},
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "uuid",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "waiting_room",
						"type": "`$BOOLEAN`",
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
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/users/{userId}/meetings",
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.settings`",
								},
								"parts": []any{
									"users",
									"{user_id}",
									"meetings",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "user_id",
											"orig": "user_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "next_page_token",
											"orig": "next_page_token",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "page_size",
											"orig": "page_size",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{userId}/meetings",
								"rename": map[string]any{
									"param": map[string]any{
										"userId": "user_id",
									},
								},
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
								"select": map[string]any{
									"exist": []any{
										"next_page_token",
										"page_size",
										"type",
										"user_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.meetings`",
								},
								"parts": []any{
									"users",
									"{user_id}",
									"meetings",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "meeting_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/meetings/{meetingId}",
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.settings`",
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "meeting_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/meetings/{meetingId}",
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "meeting_id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "PATCH",
								"orig": "/meetings/{meetingId}",
								"rename": map[string]any{
									"param": map[string]any{
										"meetingId": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "meetings",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"meetings",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"user",
						},
					},
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
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
