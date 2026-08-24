// Typed models for the Zoom SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/zoom-sdk/go/core"
)

// Meeting is the typed data model for the meeting entity.
type Meeting struct {
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *int `json:"duration,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	HostVideo *bool `json:"host_video,omitempty"`
	Id *int `json:"id,omitempty"`
	JoinBeforeHost *bool `json:"join_before_host,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	MuteUponEntry *bool `json:"mute_upon_entry,omitempty"`
	ParticipantVideo *bool `json:"participant_video,omitempty"`
	Password *string `json:"password,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Topic string `json:"topic"`
	Type *int `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	WaitingRoom *bool `json:"waiting_room,omitempty"`
}

// MeetingLoadMatch is the typed request payload for Meeting.LoadTyped.
type MeetingLoadMatch struct {
	Id int `json:"id"`
}

// MeetingListMatch is the typed request payload for Meeting.ListTyped.
type MeetingListMatch struct {
	UserId string `json:"user_id"`
}

// MeetingCreateData is the typed request payload for Meeting.CreateTyped.
type MeetingCreateData struct {
	UserId string `json:"user_id"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *int `json:"duration,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	HostVideo *bool `json:"host_video,omitempty"`
	Id *int `json:"id,omitempty"`
	JoinBeforeHost *bool `json:"join_before_host,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	MuteUponEntry *bool `json:"mute_upon_entry,omitempty"`
	ParticipantVideo *bool `json:"participant_video,omitempty"`
	Password *string `json:"password,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Topic string `json:"topic"`
	Type *int `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	WaitingRoom *bool `json:"waiting_room,omitempty"`
}

// MeetingUpdateData is the typed request payload for Meeting.UpdateTyped.
type MeetingUpdateData struct {
	Id int `json:"id"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *int `json:"duration,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	HostVideo *bool `json:"host_video,omitempty"`
	JoinBeforeHost *bool `json:"join_before_host,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	MuteUponEntry *bool `json:"mute_upon_entry,omitempty"`
	ParticipantVideo *bool `json:"participant_video,omitempty"`
	Password *string `json:"password,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Topic *string `json:"topic,omitempty"`
	Type *int `json:"type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	WaitingRoom *bool `json:"waiting_room,omitempty"`
}

// MeetingRemoveMatch is the typed request payload for Meeting.RemoveTyped.
type MeetingRemoveMatch struct {
	Id int `json:"id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
