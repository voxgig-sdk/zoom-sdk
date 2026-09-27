// Typed models for the Zoom SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/zoom-sdk/go/core"
)

// Account is the typed data model for the account entity.
type Account struct {
}

// AccountLoadMatch is the typed request payload for Account.LoadTyped.
type AccountLoadMatch struct {
	Id string `json:"id"`
}

// AccountListMatch is the typed request payload for Account.ListTyped.
type AccountListMatch struct {
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// AccountCreateData is the typed request payload for Account.CreateTyped.
type AccountCreateData struct {
	Body map[string]any `json:"body"`
	Accounts *[]any `json:"accounts,omitempty"`
	Id *string `json:"id,omitempty"`
	MeetingConnectors *string `json:"meeting_connectors,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PayMode *string `json:"pay_mode,omitempty"`
	RoomConnectors *string `json:"room_connectors,omitempty"`
	ShareMc *bool `json:"share_mc,omitempty"`
	ShareRc *bool `json:"share_rc,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// AccountUpdateData is the typed request payload for Account.UpdateTyped.
type AccountUpdateData struct {
	Id string `json:"id"`
	Body map[string]any `json:"body"`
	Accounts *[]any `json:"accounts,omitempty"`
	MeetingConnectors *string `json:"meeting_connectors,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PayMode *string `json:"pay_mode,omitempty"`
	RoomConnectors *string `json:"room_connectors,omitempty"`
	ShareMc *bool `json:"share_mc,omitempty"`
	ShareRc *bool `json:"share_rc,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// AccountRemoveMatch is the typed request payload for Account.RemoveTyped.
type AccountRemoveMatch struct {
	Id string `json:"id"`
}

// AccountPlan is the typed data model for the account_plan entity.
type AccountPlan struct {
}

// AccountPlanListMatch is the typed request payload for AccountPlan.ListTyped.
type AccountPlanListMatch struct {
	Id string `json:"id"`
}

// AccountPlanCreateData is the typed request payload for AccountPlan.CreateTyped.
type AccountPlanCreateData struct {
	Id string `json:"id"`
	Body any `json:"body"`
	PlanAudio *map[string]any `json:"plan_audio,omitempty"`
	PlanBase map[string]any `json:"plan_base"`
	PlanLargeMeeting *[]any `json:"plan_large_meeting,omitempty"`
	PlanRecording *string `json:"plan_recording,omitempty"`
	PlanRoomConnector *map[string]any `json:"plan_room_connector,omitempty"`
	PlanWebinar *[]any `json:"plan_webinar,omitempty"`
	PlanZoomRooms *map[string]any `json:"plan_zoom_rooms,omitempty"`
}

// AccountSetting is the typed data model for the account_setting entity.
type AccountSetting struct {
}

// AccountSettingLoadMatch is the typed request payload for AccountSetting.LoadTyped.
type AccountSettingLoadMatch struct {
	Id string `json:"id"`
}

// Billing is the typed data model for the billing entity.
type Billing struct {
}

// BillingLoadMatch is the typed request payload for Billing.LoadTyped.
type BillingLoadMatch struct {
	AccountId string `json:"account_id"`
}

// BillingCreateData is the typed request payload for Billing.CreateTyped.
type BillingCreateData struct {
	AccountId string `json:"account_id"`
	Body map[string]any `json:"body"`
	Address string `json:"address"`
	Apt *string `json:"apt,omitempty"`
	City string `json:"city"`
	Country string `json:"country"`
	Email string `json:"email"`
	FirstName string `json:"first_name"`
	LastName string `json:"last_name"`
	PhoneNumber string `json:"phone_number"`
	State string `json:"state"`
	Zip string `json:"zip"`
}

// BillingUpdateData is the typed request payload for Billing.UpdateTyped.
type BillingUpdateData struct {
	AccountId string `json:"account_id"`
	Body map[string]any `json:"body"`
	Address *string `json:"address,omitempty"`
	Apt *string `json:"apt,omitempty"`
	City *string `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	Email *string `json:"email,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	PhoneNumber *string `json:"phone_number,omitempty"`
	State *string `json:"state,omitempty"`
	Zip *string `json:"zip,omitempty"`
}

// CloudRecording is the typed data model for the cloud_recording entity.
type CloudRecording struct {
}

// CloudRecordingLoadMatch is the typed request payload for CloudRecording.LoadTyped.
type CloudRecordingLoadMatch struct {
	MeetingId string `json:"meeting_id"`
}

// CloudRecordingUpdateData is the typed request payload for CloudRecording.UpdateTyped.
type CloudRecordingUpdateData struct {
	MeetingId string `json:"meeting_id"`
	Body any `json:"body"`
	Id *string `json:"id,omitempty"`
}

// CloudRecordingRemoveMatch is the typed request payload for CloudRecording.RemoveTyped.
type CloudRecordingRemoveMatch struct {
	Id *string `json:"id,omitempty"`
	MeetingId string `json:"meeting_id"`
	Action *any `json:"action,omitempty"`
}

// Dashboard is the typed data model for the dashboard entity.
type Dashboard struct {
}

// DashboardLoadMatch is the typed request payload for Dashboard.LoadTyped.
type DashboardLoadMatch struct {
	ZoomroomId string `json:"zoomroom_id"`
	From any `json:"from"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
}

// DashboardListMatch is the typed request payload for Dashboard.ListTyped.
type DashboardListMatch struct {
	From any `json:"from"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
	Type *any `json:"type,omitempty"`
}

// Device is the typed data model for the device entity.
type Device struct {
}

// DeviceListMatch is the typed request payload for Device.ListTyped.
type DeviceListMatch struct {
	Devices *[]any `json:"devices,omitempty"`
	Id *string `json:"id,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// DeviceCreateData is the typed request payload for Device.CreateTyped.
type DeviceCreateData struct {
	Body map[string]any `json:"body"`
	Devices *[]any `json:"devices,omitempty"`
	Id *string `json:"id,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// DeviceUpdateData is the typed request payload for Device.UpdateTyped.
type DeviceUpdateData struct {
	Id string `json:"id"`
	Body map[string]any `json:"body"`
	Devices *[]any `json:"devices,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// DeviceRemoveMatch is the typed request payload for Device.RemoveTyped.
type DeviceRemoveMatch struct {
	Id string `json:"id"`
}

// DomainsList is the typed data model for the domains_list entity.
type DomainsList struct {
}

// DomainsListListMatch is the typed request payload for DomainsList.ListTyped.
type DomainsListListMatch struct {
	AccountId string `json:"account_id"`
}

// Group is the typed data model for the group entity.
type Group struct {
}

// GroupLoadMatch is the typed request payload for Group.LoadTyped.
type GroupLoadMatch struct {
	Id string `json:"id"`
}

// GroupListMatch is the typed request payload for Group.ListTyped.
type GroupListMatch struct {
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalMembers *int `json:"total_members,omitempty"`
}

// GroupCreateData is the typed request payload for Group.CreateTyped.
type GroupCreateData struct {
	Body any `json:"body"`
	Id *string `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalMembers *int `json:"total_members,omitempty"`
}

// GroupUpdateData is the typed request payload for Group.UpdateTyped.
type GroupUpdateData struct {
	Id string `json:"id"`
	Body any `json:"body"`
	Name *string `json:"name,omitempty"`
	TotalMembers *int `json:"total_members,omitempty"`
}

// GroupRemoveMatch is the typed request payload for Group.RemoveTyped.
type GroupRemoveMatch struct {
	Id string `json:"id"`
	MemberId *string `json:"member_id,omitempty"`
}

// GroupMemberList is the typed data model for the group_member_list entity.
type GroupMemberList struct {
}

// GroupMemberListListMatch is the typed request payload for GroupMemberList.ListTyped.
type GroupMemberListListMatch struct {
	Id string `json:"id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// ImChat is the typed data model for the im_chat entity.
type ImChat struct {
}

// ImChatLoadMatch is the typed request payload for ImChat.LoadTyped.
type ImChatLoadMatch struct {
	SessionId string `json:"session_id"`
	From any `json:"from"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
}

// ImChatListMatch is the typed request payload for ImChat.ListTyped.
type ImChatListMatch struct {
	From any `json:"from"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
}

// ImGroup is the typed data model for the im_group entity.
type ImGroup struct {
}

// ImGroupLoadMatch is the typed request payload for ImGroup.LoadTyped.
type ImGroupLoadMatch struct {
	Id string `json:"id"`
}

// ImGroupCreateData is the typed request payload for ImGroup.CreateTyped.
type ImGroupCreateData struct {
	GroupId *string `json:"group_id,omitempty"`
	Body any `json:"body"`
	Id *string `json:"id,omitempty"`
}

// ImGroupUpdateData is the typed request payload for ImGroup.UpdateTyped.
type ImGroupUpdateData struct {
	Id string `json:"id"`
	Body any `json:"body"`
}

// ImGroupRemoveMatch is the typed request payload for ImGroup.RemoveTyped.
type ImGroupRemoveMatch struct {
	Id string `json:"id"`
}

// ImGroupList is the typed data model for the im_group_list entity.
type ImGroupList struct {
}

// ImGroupListListMatch is the typed request payload for ImGroupList.ListTyped.
type ImGroupListListMatch struct {
	Groups *[]any `json:"groups,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
}

// Meeting is the typed data model for the meeting entity.
type Meeting struct {
}

// MeetingLoadMatch is the typed request payload for Meeting.LoadTyped.
type MeetingLoadMatch struct {
	Id string `json:"id"`
}

// MeetingListMatch is the typed request payload for Meeting.ListTyped.
type MeetingListMatch struct {
	UserId string `json:"user_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Type *any `json:"type,omitempty"`
}

// MeetingCreateData is the typed request payload for Meeting.CreateTyped.
type MeetingCreateData struct {
	UserId string `json:"user_id"`
	Body any `json:"body"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Email *string `json:"email,omitempty"`
	EndTime *string `json:"end_time,omitempty"`
	H323Password *string `json:"h323_password,omitempty"`
	Has3rdPartyAudio *bool `json:"has_3rd_party_audio,omitempty"`
	HasPstn *bool `json:"has_pstn,omitempty"`
	HasRecording *bool `json:"has_recording,omitempty"`
	HasScreenShare *bool `json:"has_screen_share,omitempty"`
	HasSip *bool `json:"has_sip,omitempty"`
	HasVideo *bool `json:"has_video,omitempty"`
	HasVoip *bool `json:"has_voip,omitempty"`
	Host *string `json:"host,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	Id *string `json:"id,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	Meetings *[]any `json:"meetings,omitempty"`
	NextPageToken *string `json:"next_page_token,omitempty"`
	Occurrences *[]any `json:"occurrences,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Participants *int `json:"participants,omitempty"`
	ParticipantsCount *int `json:"participants_count,omitempty"`
	Password *string `json:"password,omitempty"`
	Questions *[]any `json:"questions,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	StartUrl *string `json:"start_url,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *string `json:"topic,omitempty"`
	TotalMinutes *int `json:"total_minutes,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Type *int `json:"type,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	UserName *string `json:"user_name,omitempty"`
	UserType *string `json:"user_type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
}

// MeetingUpdateData is the typed request payload for Meeting.UpdateTyped.
type MeetingUpdateData struct {
	Id string `json:"id"`
	PollId string `json:"poll_id"`
	Body any `json:"body"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Email *string `json:"email,omitempty"`
	EndTime *string `json:"end_time,omitempty"`
	H323Password *string `json:"h323_password,omitempty"`
	Has3rdPartyAudio *bool `json:"has_3rd_party_audio,omitempty"`
	HasPstn *bool `json:"has_pstn,omitempty"`
	HasRecording *bool `json:"has_recording,omitempty"`
	HasScreenShare *bool `json:"has_screen_share,omitempty"`
	HasSip *bool `json:"has_sip,omitempty"`
	HasVideo *bool `json:"has_video,omitempty"`
	HasVoip *bool `json:"has_voip,omitempty"`
	Host *string `json:"host,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	Meetings *[]any `json:"meetings,omitempty"`
	NextPageToken *string `json:"next_page_token,omitempty"`
	Occurrences *[]any `json:"occurrences,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Participants *int `json:"participants,omitempty"`
	ParticipantsCount *int `json:"participants_count,omitempty"`
	Password *string `json:"password,omitempty"`
	Questions *[]any `json:"questions,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	StartUrl *string `json:"start_url,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *string `json:"topic,omitempty"`
	TotalMinutes *int `json:"total_minutes,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Type *int `json:"type,omitempty"`
	UserEmail *string `json:"user_email,omitempty"`
	UserName *string `json:"user_name,omitempty"`
	UserType *string `json:"user_type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
}

// MeetingRemoveMatch is the typed request payload for Meeting.RemoveTyped.
type MeetingRemoveMatch struct {
	Id string `json:"id"`
	OccurrenceId *string `json:"occurrence_id,omitempty"`
	PollId *string `json:"poll_id,omitempty"`
}

// MeetingInstance is the typed data model for the meeting_instance entity.
type MeetingInstance struct {
}

// MeetingInstanceListMatch is the typed request payload for MeetingInstance.ListTyped.
type MeetingInstanceListMatch struct {
	PastMeetingId string `json:"past_meeting_id"`
}

// MeetingInvitation is the typed data model for the meeting_invitation entity.
type MeetingInvitation struct {
}

// MeetingInvitationLoadMatch is the typed request payload for MeetingInvitation.LoadTyped.
type MeetingInvitationLoadMatch struct {
	Id string `json:"id"`
}

// MeetingRegistrantList is the typed data model for the meeting_registrant_list entity.
type MeetingRegistrantList struct {
}

// MeetingRegistrantListLoadMatch is the typed request payload for MeetingRegistrantList.LoadTyped.
type MeetingRegistrantListLoadMatch struct {
	Id string `json:"id"`
	OccurrenceId *string `json:"occurrence_id,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Status *any `json:"status,omitempty"`
}

// Pac is the typed data model for the pac entity.
type Pac struct {
}

// PacListMatch is the typed request payload for Pac.ListTyped.
type PacListMatch struct {
	UserId string `json:"user_id"`
}

// Poll is the typed data model for the poll entity.
type Poll struct {
}

// PollListMatch is the typed request payload for Poll.ListTyped.
type PollListMatch struct {
	MeetingId string `json:"meeting_id"`
}

// Qos is the typed data model for the qos entity.
type Qos struct {
}

// QosLoadMatch is the typed request payload for Qos.LoadTyped.
type QosLoadMatch struct {
	MeetingId *string `json:"meeting_id,omitempty"`
	ParticipantId string `json:"participant_id"`
	Type *any `json:"type,omitempty"`
	WebinarId *string `json:"webinar_id,omitempty"`
}

// QosListMatch is the typed request payload for Qos.ListTyped.
type QosListMatch struct {
	MeetingId string `json:"meeting_id"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Type *any `json:"type,omitempty"`
}

// Recording is the typed data model for the recording entity.
type Recording struct {
}

// RecordingListMatch is the typed request payload for Recording.ListTyped.
type RecordingListMatch struct {
	UserId string `json:"user_id"`
	From any `json:"from"`
	Mc *any `json:"mc,omitempty"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
	Trash *any `json:"trash,omitempty"`
}

// RecordingSetting is the typed data model for the recording_setting entity.
type RecordingSetting struct {
}

// RecordingSettingLoadMatch is the typed request payload for RecordingSetting.LoadTyped.
type RecordingSettingLoadMatch struct {
	MeetingId string `json:"meeting_id"`
}

// Report is the typed data model for the report entity.
type Report struct {
}

// ReportLoadMatch is the typed request payload for Report.LoadTyped.
type ReportLoadMatch struct {
	MeetingId string `json:"meeting_id"`
}

// ReportListMatch is the typed request payload for Report.ListTyped.
type ReportListMatch struct {
	UserId string `json:"user_id"`
	From any `json:"from"`
	NextPageToken *any `json:"next_page_token,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	To any `json:"to"`
}

// TrackingField is the typed data model for the tracking_field entity.
type TrackingField struct {
}

// TrackingFieldLoadMatch is the typed request payload for TrackingField.LoadTyped.
type TrackingFieldLoadMatch struct {
	Id string `json:"id"`
}

// TrackingFieldListMatch is the typed request payload for TrackingField.ListTyped.
type TrackingFieldListMatch struct {
	Field *string `json:"field,omitempty"`
	Id *string `json:"id,omitempty"`
	RecommendedValues *[]any `json:"recommended_values,omitempty"`
	Required *bool `json:"required,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Visible *bool `json:"visible,omitempty"`
}

// TrackingFieldCreateData is the typed request payload for TrackingField.CreateTyped.
type TrackingFieldCreateData struct {
	Body map[string]any `json:"body"`
	Field *string `json:"field,omitempty"`
	Id *string `json:"id,omitempty"`
	RecommendedValues *[]any `json:"recommended_values,omitempty"`
	Required *bool `json:"required,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Visible *bool `json:"visible,omitempty"`
}

// TrackingFieldUpdateData is the typed request payload for TrackingField.UpdateTyped.
type TrackingFieldUpdateData struct {
	Id string `json:"id"`
	Body map[string]any `json:"body"`
	Field *string `json:"field,omitempty"`
	RecommendedValues *[]any `json:"recommended_values,omitempty"`
	Required *bool `json:"required,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Visible *bool `json:"visible,omitempty"`
}

// TrackingFieldRemoveMatch is the typed request payload for TrackingField.RemoveTyped.
type TrackingFieldRemoveMatch struct {
	Id string `json:"id"`
}

// Tsp is the typed data model for the tsp entity.
type Tsp struct {
}

// TspLoadMatch is the typed request payload for Tsp.LoadTyped.
type TspLoadMatch struct {
	Id string `json:"id"`
	UserId string `json:"user_id"`
}

// TspListMatch is the typed request payload for Tsp.ListTyped.
type TspListMatch struct {
	Code *string `json:"code,omitempty"`
	ConferenceCode *string `json:"conference_code,omitempty"`
	DialInNumbers *[]any `json:"dial_in_numbers,omitempty"`
	Id *string `json:"id,omitempty"`
	LeaderPin *string `json:"leader_pin,omitempty"`
	Number *string `json:"number,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TspCreateData is the typed request payload for Tsp.CreateTyped.
type TspCreateData struct {
	UserId string `json:"user_id"`
	Body map[string]any `json:"body"`
	Code *string `json:"code,omitempty"`
	ConferenceCode string `json:"conference_code"`
	DialInNumbers []any `json:"dial_in_numbers"`
	Id *string `json:"id,omitempty"`
	LeaderPin string `json:"leader_pin"`
	Number *string `json:"number,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TspUpdateData is the typed request payload for Tsp.UpdateTyped.
type TspUpdateData struct {
	Id *string `json:"id,omitempty"`
	UserId *string `json:"user_id,omitempty"`
	Body map[string]any `json:"body"`
	Code *string `json:"code,omitempty"`
	ConferenceCode *string `json:"conference_code,omitempty"`
	DialInNumbers *[]any `json:"dial_in_numbers,omitempty"`
	LeaderPin *string `json:"leader_pin,omitempty"`
	Number *string `json:"number,omitempty"`
	Type *string `json:"type,omitempty"`
}

// TspRemoveMatch is the typed request payload for Tsp.RemoveTyped.
type TspRemoveMatch struct {
	Id string `json:"id"`
	UserId string `json:"user_id"`
}

// User is the typed data model for the user entity.
type User struct {
}

// UserLoadMatch is the typed request payload for User.LoadTyped.
type UserLoadMatch struct {
	Id string `json:"id"`
	LoginType *any `json:"login_type,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Status *any `json:"status,omitempty"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Body map[string]any `json:"body"`
	AccountId *string `json:"account_id,omitempty"`
	CmsUserId *string `json:"cms_user_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Dept *string `json:"dept,omitempty"`
	Email string `json:"email"`
	FirstName *string `json:"first_name,omitempty"`
	GroupIds *[]any `json:"group_ids,omitempty"`
	HostKey *string `json:"host_key,omitempty"`
	Id *string `json:"id,omitempty"`
	ImGroupIds *[]any `json:"im_group_ids,omitempty"`
	Language *string `json:"language,omitempty"`
	LastClientVersion *string `json:"last_client_version,omitempty"`
	LastLoginTime *string `json:"last_login_time,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PersonalMeetingUrl *string `json:"personal_meeting_url,omitempty"`
	PicUrl *string `json:"pic_url,omitempty"`
	Pmi *string `json:"pmi,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	Type int `json:"type"`
	UsePmi *bool `json:"use_pmi,omitempty"`
	Users *[]any `json:"users,omitempty"`
	VanityUrl *string `json:"vanity_url,omitempty"`
	Verified *int `json:"verified,omitempty"`
}

// UserUpdateData is the typed request payload for User.UpdateTyped.
type UserUpdateData struct {
	Id string `json:"id"`
	Body map[string]any `json:"body"`
	AccountId *string `json:"account_id,omitempty"`
	CmsUserId *string `json:"cms_user_id,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Dept *string `json:"dept,omitempty"`
	Email *string `json:"email,omitempty"`
	FirstName *string `json:"first_name,omitempty"`
	GroupIds *[]any `json:"group_ids,omitempty"`
	HostKey *string `json:"host_key,omitempty"`
	ImGroupIds *[]any `json:"im_group_ids,omitempty"`
	Language *string `json:"language,omitempty"`
	LastClientVersion *string `json:"last_client_version,omitempty"`
	LastLoginTime *string `json:"last_login_time,omitempty"`
	LastName *string `json:"last_name,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	PersonalMeetingUrl *string `json:"personal_meeting_url,omitempty"`
	PicUrl *string `json:"pic_url,omitempty"`
	Pmi *string `json:"pmi,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	Type *int `json:"type,omitempty"`
	UsePmi *bool `json:"use_pmi,omitempty"`
	Users *[]any `json:"users,omitempty"`
	VanityUrl *string `json:"vanity_url,omitempty"`
	Verified *int `json:"verified,omitempty"`
}

// UserRemoveMatch is the typed request payload for User.RemoveTyped.
type UserRemoveMatch struct {
	Id string `json:"id"`
	Action *any `json:"action,omitempty"`
	TransferEmail *any `json:"transfer_email,omitempty"`
	TransferMeeting *any `json:"transfer_meeting,omitempty"`
	TransferRecording *any `json:"transfer_recording,omitempty"`
	TransferWebinar *any `json:"transfer_webinar,omitempty"`
	AssistantId *string `json:"assistant_id,omitempty"`
	SchedulerId *string `json:"scheduler_id,omitempty"`
}

// UserAssistantsList is the typed data model for the user_assistants_list entity.
type UserAssistantsList struct {
}

// UserAssistantsListListMatch is the typed request payload for UserAssistantsList.ListTyped.
type UserAssistantsListListMatch struct {
	Id string `json:"id"`
}

// UserPermission is the typed data model for the user_permission entity.
type UserPermission struct {
}

// UserPermissionListMatch is the typed request payload for UserPermission.ListTyped.
type UserPermissionListMatch struct {
	Id string `json:"id"`
}

// UserSchedulersList is the typed data model for the user_schedulers_list entity.
type UserSchedulersList struct {
}

// UserSchedulersListListMatch is the typed request payload for UserSchedulersList.ListTyped.
type UserSchedulersListListMatch struct {
	Id string `json:"id"`
}

// UserSetting is the typed data model for the user_setting entity.
type UserSetting struct {
}

// UserSettingLoadMatch is the typed request payload for UserSetting.LoadTyped.
type UserSettingLoadMatch struct {
	Id string `json:"id"`
	LoginType *any `json:"login_type,omitempty"`
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
}

// WebhookLoadMatch is the typed request payload for Webhook.LoadTyped.
type WebhookLoadMatch struct {
	Id string `json:"id"`
}

// WebhookListMatch is the typed request payload for Webhook.ListTyped.
type WebhookListMatch struct {
	AuthPassword *string `json:"auth_password,omitempty"`
	AuthUser *string `json:"auth_user,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Events *[]any `json:"events,omitempty"`
	Id *string `json:"id,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	Url *string `json:"url,omitempty"`
	WebhookId *string `json:"webhook_id,omitempty"`
	Webhooks *[]any `json:"webhooks,omitempty"`
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
type WebhookCreateData struct {
	Body map[string]any `json:"body"`
	AuthPassword string `json:"auth_password"`
	AuthUser string `json:"auth_user"`
	CreatedAt *string `json:"created_at,omitempty"`
	Events []any `json:"events"`
	Id *string `json:"id,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	Url string `json:"url"`
	WebhookId *string `json:"webhook_id,omitempty"`
	Webhooks *[]any `json:"webhooks,omitempty"`
}

// WebhookUpdateData is the typed request payload for Webhook.UpdateTyped.
type WebhookUpdateData struct {
	Id string `json:"id"`
	Body map[string]any `json:"body"`
	AuthPassword *string `json:"auth_password,omitempty"`
	AuthUser *string `json:"auth_user,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Events *[]any `json:"events,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	Url *string `json:"url,omitempty"`
	WebhookId *string `json:"webhook_id,omitempty"`
	Webhooks *[]any `json:"webhooks,omitempty"`
}

// WebhookRemoveMatch is the typed request payload for Webhook.RemoveTyped.
type WebhookRemoveMatch struct {
	Id string `json:"id"`
}

// Webinar is the typed data model for the webinar entity.
type Webinar struct {
}

// WebinarLoadMatch is the typed request payload for Webinar.LoadTyped.
type WebinarLoadMatch struct {
	Id string `json:"id"`
	PollId *string `json:"poll_id,omitempty"`
	Type *any `json:"type,omitempty"`
}

// WebinarListMatch is the typed request payload for Webinar.ListTyped.
type WebinarListMatch struct {
	UserId string `json:"user_id"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
}

// WebinarCreateData is the typed request payload for Webinar.CreateTyped.
type WebinarCreateData struct {
	UserId string `json:"user_id"`
	Body map[string]any `json:"body"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Email *string `json:"email,omitempty"`
	EndTime *string `json:"end_time,omitempty"`
	Has3rdPartyAudio *bool `json:"has_3rd_party_audio,omitempty"`
	HasPstn *bool `json:"has_pstn,omitempty"`
	HasRecording *bool `json:"has_recording,omitempty"`
	HasScreenShare *bool `json:"has_screen_share,omitempty"`
	HasSip *bool `json:"has_sip,omitempty"`
	HasVideo *bool `json:"has_video,omitempty"`
	HasVoip *bool `json:"has_voip,omitempty"`
	Host *string `json:"host,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	Id *string `json:"id,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	Occurrences *[]any `json:"occurrences,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Participants *int `json:"participants,omitempty"`
	Questions *[]any `json:"questions,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	StartUrl *string `json:"start_url,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *string `json:"topic,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Type *int `json:"type,omitempty"`
	UserType *string `json:"user_type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Webinars *[]any `json:"webinars,omitempty"`
}

// WebinarUpdateData is the typed request payload for Webinar.UpdateTyped.
type WebinarUpdateData struct {
	Id string `json:"id"`
	PollId string `json:"poll_id"`
	Body any `json:"body"`
	Agenda *string `json:"agenda,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	Duration *string `json:"duration,omitempty"`
	Email *string `json:"email,omitempty"`
	EndTime *string `json:"end_time,omitempty"`
	Has3rdPartyAudio *bool `json:"has_3rd_party_audio,omitempty"`
	HasPstn *bool `json:"has_pstn,omitempty"`
	HasRecording *bool `json:"has_recording,omitempty"`
	HasScreenShare *bool `json:"has_screen_share,omitempty"`
	HasSip *bool `json:"has_sip,omitempty"`
	HasVideo *bool `json:"has_video,omitempty"`
	HasVoip *bool `json:"has_voip,omitempty"`
	Host *string `json:"host,omitempty"`
	HostId *string `json:"host_id,omitempty"`
	JoinUrl *string `json:"join_url,omitempty"`
	Occurrences *[]any `json:"occurrences,omitempty"`
	PageCount *int `json:"page_count,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Participants *int `json:"participants,omitempty"`
	Questions *[]any `json:"questions,omitempty"`
	Settings *map[string]any `json:"settings,omitempty"`
	StartTime *string `json:"start_time,omitempty"`
	StartUrl *string `json:"start_url,omitempty"`
	Status *string `json:"status,omitempty"`
	Timezone *string `json:"timezone,omitempty"`
	Title *string `json:"title,omitempty"`
	Topic *string `json:"topic,omitempty"`
	TotalRecords *int `json:"total_records,omitempty"`
	TrackingFields *[]any `json:"tracking_fields,omitempty"`
	Type *int `json:"type,omitempty"`
	UserType *string `json:"user_type,omitempty"`
	Uuid *string `json:"uuid,omitempty"`
	Webinars *[]any `json:"webinars,omitempty"`
}

// WebinarRemoveMatch is the typed request payload for Webinar.RemoveTyped.
type WebinarRemoveMatch struct {
	Id string `json:"id"`
	OccurrenceId *string `json:"occurrence_id,omitempty"`
	PanelistId *string `json:"panelist_id,omitempty"`
	PollId *string `json:"poll_id,omitempty"`
}

// WebinarInstance is the typed data model for the webinar_instance entity.
type WebinarInstance struct {
}

// WebinarInstanceListMatch is the typed request payload for WebinarInstance.ListTyped.
type WebinarInstanceListMatch struct {
	PastWebinarId string `json:"past_webinar_id"`
}

// WebinarPanelistList is the typed data model for the webinar_panelist_list entity.
type WebinarPanelistList struct {
}

// WebinarPanelistListListMatch is the typed request payload for WebinarPanelistList.ListTyped.
type WebinarPanelistListListMatch struct {
	Id string `json:"id"`
}

// WebinarRegistrantList is the typed data model for the webinar_registrant_list entity.
type WebinarRegistrantList struct {
}

// WebinarRegistrantListLoadMatch is the typed request payload for WebinarRegistrantList.LoadTyped.
type WebinarRegistrantListLoadMatch struct {
	Id string `json:"id"`
	OccurrenceId *string `json:"occurrence_id,omitempty"`
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
	Status *any `json:"status,omitempty"`
}

// ZoomRoomList is the typed data model for the zoom_room_list entity.
type ZoomRoomList struct {
}

// ZoomRoomListListMatch is the typed request payload for ZoomRoomList.ListTyped.
type ZoomRoomListListMatch struct {
	PageNumber *int `json:"page_number,omitempty"`
	PageSize *int `json:"page_size,omitempty"`
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
