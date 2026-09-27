-- Typed models for the Zoom SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Account
---@field accounts? table
---@field id? string
---@field meeting_connectors? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field pay_mode? string
---@field room_connectors? string
---@field share_mc? boolean
---@field share_rc? boolean
---@field total_records? number

---@class AccountLoadMatch
---@field id string

---@class AccountListMatch
---@field page_number? number
---@field page_size? number

---@class AccountCreateData
---@field body table
---@field accounts? table
---@field id? string
---@field meeting_connectors? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field pay_mode? string
---@field room_connectors? string
---@field share_mc? boolean
---@field share_rc? boolean
---@field total_records? number

---@class AccountUpdateData
---@field id string
---@field body table
---@field accounts? table
---@field meeting_connectors? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field pay_mode? string
---@field room_connectors? string
---@field share_mc? boolean
---@field share_rc? boolean
---@field total_records? number

---@class AccountRemoveMatch
---@field id string

---@class AccountPlan
---@field id? string
---@field plan_audio? table
---@field plan_base table
---@field plan_large_meeting? table
---@field plan_recording? string
---@field plan_room_connector? table
---@field plan_webinar? table
---@field plan_zoom_rooms? table

---@class AccountPlanListMatch
---@field id string

---@class AccountPlanCreateData
---@field id string
---@field body any
---@field plan_audio? table
---@field plan_base table
---@field plan_large_meeting? table
---@field plan_recording? string
---@field plan_room_connector? table
---@field plan_webinar? table
---@field plan_zoom_rooms? table

---@class AccountSetting
---@field email_notification? table
---@field feature? table
---@field id? string
---@field in_meeting? table
---@field integration? table
---@field recording? table
---@field schedule_meting? table
---@field security? table
---@field telephony? table
---@field zoom_rooms? table

---@class AccountSettingLoadMatch
---@field id string

---@class Billing
---@field address string
---@field apt? string
---@field city string
---@field country string
---@field email string
---@field first_name string
---@field last_name string
---@field phone_number string
---@field state string
---@field zip string

---@class BillingLoadMatch
---@field account_id string

---@class BillingCreateData
---@field account_id string
---@field body table
---@field address string
---@field apt? string
---@field city string
---@field country string
---@field email string
---@field first_name string
---@field last_name string
---@field phone_number string
---@field state string
---@field zip string

---@class BillingUpdateData
---@field account_id string
---@field body table
---@field address? string
---@field apt? string
---@field city? string
---@field country? string
---@field email? string
---@field first_name? string
---@field last_name? string
---@field phone_number? string
---@field state? string
---@field zip? string

---@class CloudRecording
---@field id? string

---@class CloudRecordingLoadMatch
---@field meeting_id string

---@class CloudRecordingUpdateData
---@field meeting_id string
---@field body any
---@field id? string

---@class CloudRecordingRemoveMatch
---@field id? string
---@field meeting_id string
---@field action? any

---@class Dashboard
---@field account_type? string
---@field calender_name? string
---@field camera? string
---@field crc_ports_usage? table
---@field device_ip? string
---@field email? string
---@field from? string
---@field id? string
---@field last_start_time? string
---@field live_meeting? table
---@field meetings? table
---@field microphone? string
---@field next_page_token? string
---@field page_count? number
---@field page_size? number
---@field participants? table
---@field past_meetings? table
---@field room_name? string
---@field speaker? string
---@field status? string
---@field to? string
---@field total_records? number
---@field users? table
---@field webinars? table

---@class DashboardLoadMatch
---@field zoomroom_id string
---@field from any
---@field page_number? number
---@field page_size? number
---@field to any

---@class DashboardListMatch
---@field from any
---@field next_page_token? any
---@field page_size? number
---@field to any
---@field type? any

---@class Device
---@field devices? table
---@field id? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class DeviceListMatch
---@field devices? table
---@field id? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class DeviceCreateData
---@field body table
---@field devices? table
---@field id? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class DeviceUpdateData
---@field id string
---@field body table
---@field devices? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class DeviceRemoveMatch
---@field id string

---@class DomainsList
---@field domain? string
---@field status? string

---@class DomainsListListMatch
---@field account_id string

---@class Group
---@field id? string
---@field name? string
---@field total_members? number

---@class GroupLoadMatch
---@field id string

---@class GroupListMatch
---@field id? string
---@field name? string
---@field total_members? number

---@class GroupCreateData
---@field body any
---@field id? string
---@field name? string
---@field total_members? number

---@class GroupUpdateData
---@field id string
---@field body any
---@field name? string
---@field total_members? number

---@class GroupRemoveMatch
---@field id string
---@field member_id? string

---@class GroupMemberList
---@field id? string
---@field members? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class GroupMemberListListMatch
---@field id string
---@field page_number? number
---@field page_size? number

---@class ImChat
---@field from? string
---@field messages? table
---@field next_page_token? string
---@field page_size? number
---@field session_id? string
---@field sessions? table
---@field to? string

---@class ImChatLoadMatch
---@field session_id string
---@field from any
---@field next_page_token? any
---@field page_size? number
---@field to any

---@class ImChatListMatch
---@field from any
---@field next_page_token? any
---@field page_size? number
---@field to any

---@class ImGroup
---@field id? string

---@class ImGroupLoadMatch
---@field id string

---@class ImGroupCreateData
---@field group_id? string
---@field body any
---@field id? string

---@class ImGroupUpdateData
---@field id string
---@field body any

---@class ImGroupRemoveMatch
---@field id string

---@class ImGroupList
---@field groups? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class ImGroupListListMatch
---@field groups? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number

---@class Meeting
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field h323_password? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field id? string
---@field join_url? string
---@field meetings? table
---@field next_page_token? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field participants_count? number
---@field password? string
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_minutes? number
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_email? string
---@field user_name? string
---@field user_type? string
---@field uuid? string

---@class MeetingLoadMatch
---@field id string

---@class MeetingListMatch
---@field user_id string
---@field page_number? number
---@field page_size? number
---@field type? any

---@class MeetingCreateData
---@field user_id string
---@field body any
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field h323_password? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field id? string
---@field join_url? string
---@field meetings? table
---@field next_page_token? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field participants_count? number
---@field password? string
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_minutes? number
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_email? string
---@field user_name? string
---@field user_type? string
---@field uuid? string

---@class MeetingUpdateData
---@field id string
---@field poll_id string
---@field body any
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field h323_password? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field join_url? string
---@field meetings? table
---@field next_page_token? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field participants_count? number
---@field password? string
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_minutes? number
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_email? string
---@field user_name? string
---@field user_type? string
---@field uuid? string

---@class MeetingRemoveMatch
---@field id string
---@field occurrence_id? string
---@field poll_id? string

---@class MeetingInstance
---@field meetings? table

---@class MeetingInstanceListMatch
---@field past_meeting_id string

---@class MeetingInvitation
---@field id? string
---@field invitation? string

---@class MeetingInvitationLoadMatch
---@field id string

---@class MeetingRegistrantList
---@field id? string

---@class MeetingRegistrantListLoadMatch
---@field id string
---@field occurrence_id? string
---@field page_number? number
---@field page_size? number
---@field status? any

---@class Pac
---@field conference_id? number
---@field dedicated_dial_in_number table
---@field global_dial_in_numbers table
---@field listen_only_password? string
---@field participant_password? string

---@class PacListMatch
---@field user_id string

---@class Poll
---@field polls? table
---@field total_records? number

---@class PollListMatch
---@field meeting_id string

---@class Qos
---@field as_input? table
---@field as_output? table
---@field audio_input? table
---@field audio_output? table
---@field cpu_usage? any
---@field date_time? string
---@field next_page_token? string
---@field page_count? number
---@field page_size? number
---@field participants? table
---@field total_records? number
---@field video_input? table
---@field video_output? table

---@class QosLoadMatch
---@field meeting_id? string
---@field participant_id string
---@field type? any
---@field webinar_id? string

---@class QosListMatch
---@field meeting_id string
---@field next_page_token? any
---@field page_size? number
---@field type? any

---@class Recording
---@field from? string
---@field meetings? table
---@field next_page_token? string
---@field page_count? number
---@field page_size? number
---@field to? string
---@field total_records? number

---@class RecordingListMatch
---@field user_id string
---@field from any
---@field mc? any
---@field next_page_token? any
---@field page_size? number
---@field to any
---@field trash? any

---@class RecordingSetting
---@field approval_type? number
---@field on_demand? boolean
---@field password? string
---@field send_email_to_host? boolean
---@field share_recording? string
---@field show_social_share_buttons? boolean
---@field viewer_download? boolean

---@class RecordingSettingLoadMatch
---@field meeting_id string

---@class Report
---@field duration? number
---@field email? string
---@field end_time? string
---@field from? string
---@field id? number
---@field meetings? table
---@field name? string
---@field next_page_token? string
---@field page_count? number
---@field page_size? number
---@field participants? table
---@field participants_count? number
---@field question_details? table
---@field start_time? string
---@field to? string
---@field topic? string
---@field total_minutes? number
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_email? string
---@field user_name? string
---@field uuid? string

---@class ReportLoadMatch
---@field meeting_id string

---@class ReportListMatch
---@field user_id string
---@field from any
---@field next_page_token? any
---@field page_size? number
---@field to any

---@class TrackingField
---@field field? string
---@field id? string
---@field recommended_values? table
---@field required? boolean
---@field total_records? number
---@field tracking_fields? table
---@field visible? boolean

---@class TrackingFieldLoadMatch
---@field id string

---@class TrackingFieldListMatch
---@field field? string
---@field id? string
---@field recommended_values? table
---@field required? boolean
---@field total_records? number
---@field tracking_fields? table
---@field visible? boolean

---@class TrackingFieldCreateData
---@field body table
---@field field? string
---@field id? string
---@field recommended_values? table
---@field required? boolean
---@field total_records? number
---@field tracking_fields? table
---@field visible? boolean

---@class TrackingFieldUpdateData
---@field id string
---@field body table
---@field field? string
---@field recommended_values? table
---@field required? boolean
---@field total_records? number
---@field tracking_fields? table
---@field visible? boolean

---@class TrackingFieldRemoveMatch
---@field id string

---@class Tsp
---@field code? string
---@field conference_code string
---@field dial_in_numbers table
---@field id? string
---@field leader_pin string
---@field number? string
---@field type? string

---@class TspLoadMatch
---@field id string
---@field user_id string

---@class TspListMatch
---@field code? string
---@field conference_code? string
---@field dial_in_numbers? table
---@field id? string
---@field leader_pin? string
---@field number? string
---@field type? string

---@class TspCreateData
---@field user_id string
---@field body table
---@field code? string
---@field conference_code string
---@field dial_in_numbers table
---@field id? string
---@field leader_pin string
---@field number? string
---@field type? string

---@class TspUpdateData
---@field id? string
---@field user_id? string
---@field body table
---@field code? string
---@field conference_code? string
---@field dial_in_numbers? table
---@field leader_pin? string
---@field number? string
---@field type? string

---@class TspRemoveMatch
---@field id string
---@field user_id string

---@class User
---@field account_id? string
---@field cms_user_id? string
---@field created_at? string
---@field dept? string
---@field email string
---@field first_name? string
---@field group_ids? table
---@field host_key? string
---@field id? string
---@field im_group_ids? table
---@field language? string
---@field last_client_version? string
---@field last_login_time? string
---@field last_name? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field personal_meeting_url? string
---@field pic_url? string
---@field pmi? string
---@field timezone? string
---@field total_records? number
---@field type number
---@field use_pmi? boolean
---@field users? table
---@field vanity_url? string
---@field verified? number

---@class UserLoadMatch
---@field id string
---@field login_type? any

---@class UserListMatch
---@field page_number? number
---@field page_size? number
---@field status? any

---@class UserCreateData
---@field body table
---@field account_id? string
---@field cms_user_id? string
---@field created_at? string
---@field dept? string
---@field email string
---@field first_name? string
---@field group_ids? table
---@field host_key? string
---@field id? string
---@field im_group_ids? table
---@field language? string
---@field last_client_version? string
---@field last_login_time? string
---@field last_name? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field personal_meeting_url? string
---@field pic_url? string
---@field pmi? string
---@field timezone? string
---@field total_records? number
---@field type number
---@field use_pmi? boolean
---@field users? table
---@field vanity_url? string
---@field verified? number

---@class UserUpdateData
---@field id string
---@field body table
---@field account_id? string
---@field cms_user_id? string
---@field created_at? string
---@field dept? string
---@field email? string
---@field first_name? string
---@field group_ids? table
---@field host_key? string
---@field im_group_ids? table
---@field language? string
---@field last_client_version? string
---@field last_login_time? string
---@field last_name? string
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field personal_meeting_url? string
---@field pic_url? string
---@field pmi? string
---@field timezone? string
---@field total_records? number
---@field type? number
---@field use_pmi? boolean
---@field users? table
---@field vanity_url? string
---@field verified? number

---@class UserRemoveMatch
---@field id string
---@field action? any
---@field transfer_email? any
---@field transfer_meeting? any
---@field transfer_recording? any
---@field transfer_webinar? any
---@field assistant_id? string
---@field scheduler_id? string

---@class UserAssistantsList
---@field id? string

---@class UserAssistantsListListMatch
---@field id string

---@class UserPermission
---@field id? string
---@field permissions? table

---@class UserPermissionListMatch
---@field id string

---@class UserSchedulersList
---@field id? string

---@class UserSchedulersListListMatch
---@field id string

---@class UserSetting
---@field email_notification? table
---@field feature? table
---@field id? string
---@field in_meeting? table
---@field recording? table
---@field schedule_meeting? table
---@field telephony? table

---@class UserSettingLoadMatch
---@field id string
---@field login_type? any

---@class Webhook
---@field auth_password string
---@field auth_user string
---@field created_at? string
---@field events table
---@field id? string
---@field total_records? number
---@field url string
---@field webhook_id? string
---@field webhooks? table

---@class WebhookLoadMatch
---@field id string

---@class WebhookListMatch
---@field auth_password? string
---@field auth_user? string
---@field created_at? string
---@field events? table
---@field id? string
---@field total_records? number
---@field url? string
---@field webhook_id? string
---@field webhooks? table

---@class WebhookCreateData
---@field body table
---@field auth_password string
---@field auth_user string
---@field created_at? string
---@field events table
---@field id? string
---@field total_records? number
---@field url string
---@field webhook_id? string
---@field webhooks? table

---@class WebhookUpdateData
---@field id string
---@field body table
---@field auth_password? string
---@field auth_user? string
---@field created_at? string
---@field events? table
---@field total_records? number
---@field url? string
---@field webhook_id? string
---@field webhooks? table

---@class WebhookRemoveMatch
---@field id string

---@class Webinar
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field id? string
---@field join_url? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_type? string
---@field uuid? string
---@field webinars? table

---@class WebinarLoadMatch
---@field id string
---@field poll_id? string
---@field type? any

---@class WebinarListMatch
---@field user_id string
---@field page_number? number
---@field page_size? number

---@class WebinarCreateData
---@field user_id string
---@field body table
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field id? string
---@field join_url? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_type? string
---@field uuid? string
---@field webinars? table

---@class WebinarUpdateData
---@field id string
---@field poll_id string
---@field body any
---@field agenda? string
---@field created_at? string
---@field duration? string
---@field email? string
---@field end_time? string
---@field has_3rd_party_audio? boolean
---@field has_pstn? boolean
---@field has_recording? boolean
---@field has_screen_share? boolean
---@field has_sip? boolean
---@field has_video? boolean
---@field has_voip? boolean
---@field host? string
---@field host_id? string
---@field join_url? string
---@field occurrences? table
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field participants? number
---@field questions? table
---@field settings? table
---@field start_time? string
---@field start_url? string
---@field status? string
---@field timezone? string
---@field title? string
---@field topic? string
---@field total_records? number
---@field tracking_fields? table
---@field type? number
---@field user_type? string
---@field uuid? string
---@field webinars? table

---@class WebinarRemoveMatch
---@field id string
---@field occurrence_id? string
---@field panelist_id? string
---@field poll_id? string

---@class WebinarInstance
---@field webinars? table

---@class WebinarInstanceListMatch
---@field past_webinar_id string

---@class WebinarPanelistList
---@field id? string
---@field panelists? table
---@field total_records? number

---@class WebinarPanelistListListMatch
---@field id string

---@class WebinarRegistrantList
---@field id? string

---@class WebinarRegistrantListLoadMatch
---@field id string
---@field occurrence_id? string
---@field page_number? number
---@field page_size? number
---@field status? any

---@class ZoomRoomList
---@field page_count? number
---@field page_number? number
---@field page_size? number
---@field total_records? number
---@field zoom_rooms? table

---@class ZoomRoomListListMatch
---@field page_number? number
---@field page_size? number

local M = {}

return M
