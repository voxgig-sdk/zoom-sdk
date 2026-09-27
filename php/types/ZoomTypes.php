<?php
declare(strict_types=1);

// Typed models for the Zoom SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Account entity data model. */
class Account
{
    public ?array $accounts = null;
    public ?string $id = null;
    public ?string $meeting_connectors = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $pay_mode = null;
    public ?string $room_connectors = null;
    public ?bool $share_mc = null;
    public ?bool $share_rc = null;
    public ?int $total_records = null;
}

/** Request payload for Account#load. */
class AccountLoadMatch
{
    public string $id;
}

/** Request payload for Account#list. */
class AccountListMatch
{
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** Request payload for Account#create. */
class AccountCreateData
{
    public array $body;
    public ?array $accounts = null;
    public ?string $id = null;
    public ?string $meeting_connectors = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $pay_mode = null;
    public ?string $room_connectors = null;
    public ?bool $share_mc = null;
    public ?bool $share_rc = null;
    public ?int $total_records = null;
}

/** Request payload for Account#update. */
class AccountUpdateData
{
    public string $id;
    public array $body;
    public ?array $accounts = null;
    public ?string $meeting_connectors = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $pay_mode = null;
    public ?string $room_connectors = null;
    public ?bool $share_mc = null;
    public ?bool $share_rc = null;
    public ?int $total_records = null;
}

/** Request payload for Account#remove. */
class AccountRemoveMatch
{
    public string $id;
}

/** AccountPlan entity data model. */
class AccountPlan
{
    public ?string $id = null;
    public ?array $plan_audio = null;
    public array $plan_base;
    public ?array $plan_large_meeting = null;
    public ?string $plan_recording = null;
    public ?array $plan_room_connector = null;
    public ?array $plan_webinar = null;
    public ?array $plan_zoom_rooms = null;
}

/** Request payload for AccountPlan#list. */
class AccountPlanListMatch
{
    public string $id;
}

/** Request payload for AccountPlan#create. */
class AccountPlanCreateData
{
    public string $id;
    public mixed $body;
    public ?array $plan_audio = null;
    public array $plan_base;
    public ?array $plan_large_meeting = null;
    public ?string $plan_recording = null;
    public ?array $plan_room_connector = null;
    public ?array $plan_webinar = null;
    public ?array $plan_zoom_rooms = null;
}

/** AccountSetting entity data model. */
class AccountSetting
{
    public ?array $email_notification = null;
    public ?array $feature = null;
    public ?string $id = null;
    public ?array $in_meeting = null;
    public ?array $integration = null;
    public ?array $recording = null;
    public ?array $schedule_meting = null;
    public ?array $security = null;
    public ?array $telephony = null;
    public ?array $zoom_rooms = null;
}

/** Request payload for AccountSetting#load. */
class AccountSettingLoadMatch
{
    public string $id;
}

/** Billing entity data model. */
class Billing
{
    public string $address;
    public ?string $apt = null;
    public string $city;
    public string $country;
    public string $email;
    public string $first_name;
    public string $last_name;
    public string $phone_number;
    public string $state;
    public string $zip;
}

/** Request payload for Billing#load. */
class BillingLoadMatch
{
    public string $account_id;
}

/** Request payload for Billing#create. */
class BillingCreateData
{
    public string $account_id;
    public array $body;
    public string $address;
    public ?string $apt = null;
    public string $city;
    public string $country;
    public string $email;
    public string $first_name;
    public string $last_name;
    public string $phone_number;
    public string $state;
    public string $zip;
}

/** Request payload for Billing#update. */
class BillingUpdateData
{
    public string $account_id;
    public array $body;
    public ?string $address = null;
    public ?string $apt = null;
    public ?string $city = null;
    public ?string $country = null;
    public ?string $email = null;
    public ?string $first_name = null;
    public ?string $last_name = null;
    public ?string $phone_number = null;
    public ?string $state = null;
    public ?string $zip = null;
}

/** CloudRecording entity data model. */
class CloudRecording
{
    public ?string $id = null;
}

/** Request payload for CloudRecording#load. */
class CloudRecordingLoadMatch
{
    public string $meeting_id;
}

/** Request payload for CloudRecording#update. */
class CloudRecordingUpdateData
{
    public string $meeting_id;
    public mixed $body;
    public ?string $id = null;
}

/** Request payload for CloudRecording#remove. */
class CloudRecordingRemoveMatch
{
    public ?string $id = null;
    public string $meeting_id;
    public mixed $action = null;
}

/** Dashboard entity data model. */
class Dashboard
{
    public ?string $account_type = null;
    public ?string $calender_name = null;
    public ?string $camera = null;
    public ?array $crc_ports_usage = null;
    public ?string $device_ip = null;
    public ?string $email = null;
    public ?string $from = null;
    public ?string $id = null;
    public ?string $last_start_time = null;
    public ?array $live_meeting = null;
    public ?array $meetings = null;
    public ?string $microphone = null;
    public ?string $next_page_token = null;
    public ?int $page_count = null;
    public ?int $page_size = null;
    public ?array $participants = null;
    public ?array $past_meetings = null;
    public ?string $room_name = null;
    public ?string $speaker = null;
    public ?string $status = null;
    public ?string $to = null;
    public ?int $total_records = null;
    public ?array $users = null;
    public ?array $webinars = null;
}

/** Request payload for Dashboard#load. */
class DashboardLoadMatch
{
    public string $zoomroom_id;
    public mixed $from;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public mixed $to;
}

/** Request payload for Dashboard#list. */
class DashboardListMatch
{
    public mixed $from;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $to;
    public mixed $type = null;
}

/** Device entity data model. */
class Device
{
    public ?array $devices = null;
    public ?string $id = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for Device#list. */
class DeviceListMatch
{
    public ?array $devices = null;
    public ?string $id = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for Device#create. */
class DeviceCreateData
{
    public array $body;
    public ?array $devices = null;
    public ?string $id = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for Device#update. */
class DeviceUpdateData
{
    public string $id;
    public array $body;
    public ?array $devices = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for Device#remove. */
class DeviceRemoveMatch
{
    public string $id;
}

/** DomainsList entity data model. */
class DomainsList
{
    public ?string $domain = null;
    public ?string $status = null;
}

/** Request payload for DomainsList#list. */
class DomainsListListMatch
{
    public string $account_id;
}

/** Group entity data model. */
class Group
{
    public ?string $id = null;
    public ?string $name = null;
    public ?int $total_members = null;
}

/** Request payload for Group#load. */
class GroupLoadMatch
{
    public string $id;
}

/** Request payload for Group#list. */
class GroupListMatch
{
    public ?string $id = null;
    public ?string $name = null;
    public ?int $total_members = null;
}

/** Request payload for Group#create. */
class GroupCreateData
{
    public mixed $body;
    public ?string $id = null;
    public ?string $name = null;
    public ?int $total_members = null;
}

/** Request payload for Group#update. */
class GroupUpdateData
{
    public string $id;
    public mixed $body;
    public ?string $name = null;
    public ?int $total_members = null;
}

/** Request payload for Group#remove. */
class GroupRemoveMatch
{
    public string $id;
    public ?string $member_id = null;
}

/** GroupMemberList entity data model. */
class GroupMemberList
{
    public ?string $id = null;
    public ?array $members = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for GroupMemberList#list. */
class GroupMemberListListMatch
{
    public string $id;
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** ImChat entity data model. */
class ImChat
{
    public ?string $from = null;
    public ?array $messages = null;
    public ?string $next_page_token = null;
    public ?int $page_size = null;
    public ?string $session_id = null;
    public ?array $sessions = null;
    public ?string $to = null;
}

/** Request payload for ImChat#load. */
class ImChatLoadMatch
{
    public string $session_id;
    public mixed $from;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $to;
}

/** Request payload for ImChat#list. */
class ImChatListMatch
{
    public mixed $from;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $to;
}

/** ImGroup entity data model. */
class ImGroup
{
    public ?string $id = null;
}

/** Request payload for ImGroup#load. */
class ImGroupLoadMatch
{
    public string $id;
}

/** Request payload for ImGroup#create. */
class ImGroupCreateData
{
    public ?string $group_id = null;
    public mixed $body;
    public ?string $id = null;
}

/** Request payload for ImGroup#update. */
class ImGroupUpdateData
{
    public string $id;
    public mixed $body;
}

/** Request payload for ImGroup#remove. */
class ImGroupRemoveMatch
{
    public string $id;
}

/** ImGroupList entity data model. */
class ImGroupList
{
    public ?array $groups = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Request payload for ImGroupList#list. */
class ImGroupListListMatch
{
    public ?array $groups = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
}

/** Meeting entity data model. */
class Meeting
{
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?string $h323_password = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $id = null;
    public ?string $join_url = null;
    public ?array $meetings = null;
    public ?string $next_page_token = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?int $participants_count = null;
    public ?string $password = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_minutes = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_email = null;
    public ?string $user_name = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
}

/** Request payload for Meeting#load. */
class MeetingLoadMatch
{
    public string $id;
}

/** Request payload for Meeting#list. */
class MeetingListMatch
{
    public string $user_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public mixed $type = null;
}

/** Request payload for Meeting#create. */
class MeetingCreateData
{
    public string $user_id;
    public mixed $body;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?string $h323_password = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $id = null;
    public ?string $join_url = null;
    public ?array $meetings = null;
    public ?string $next_page_token = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?int $participants_count = null;
    public ?string $password = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_minutes = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_email = null;
    public ?string $user_name = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
}

/** Request payload for Meeting#update. */
class MeetingUpdateData
{
    public string $id;
    public string $poll_id;
    public mixed $body;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?string $h323_password = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $join_url = null;
    public ?array $meetings = null;
    public ?string $next_page_token = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?int $participants_count = null;
    public ?string $password = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_minutes = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_email = null;
    public ?string $user_name = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
}

/** Request payload for Meeting#remove. */
class MeetingRemoveMatch
{
    public string $id;
    public ?string $occurrence_id = null;
    public ?string $poll_id = null;
}

/** MeetingInstance entity data model. */
class MeetingInstance
{
    public ?array $meetings = null;
}

/** Request payload for MeetingInstance#list. */
class MeetingInstanceListMatch
{
    public string $past_meeting_id;
}

/** MeetingInvitation entity data model. */
class MeetingInvitation
{
    public ?string $id = null;
    public ?string $invitation = null;
}

/** Request payload for MeetingInvitation#load. */
class MeetingInvitationLoadMatch
{
    public string $id;
}

/** MeetingRegistrantList entity data model. */
class MeetingRegistrantList
{
    public ?string $id = null;
}

/** Request payload for MeetingRegistrantList#load. */
class MeetingRegistrantListLoadMatch
{
    public string $id;
    public ?string $occurrence_id = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public mixed $status = null;
}

/** Pac entity data model. */
class Pac
{
    public ?int $conference_id = null;
    public array $dedicated_dial_in_number;
    public array $global_dial_in_numbers;
    public ?string $listen_only_password = null;
    public ?string $participant_password = null;
}

/** Request payload for Pac#list. */
class PacListMatch
{
    public string $user_id;
}

/** Poll entity data model. */
class Poll
{
    public ?array $polls = null;
    public ?int $total_records = null;
}

/** Request payload for Poll#list. */
class PollListMatch
{
    public string $meeting_id;
}

/** Qos entity data model. */
class Qos
{
    public ?array $as_input = null;
    public ?array $as_output = null;
    public ?array $audio_input = null;
    public ?array $audio_output = null;
    public mixed $cpu_usage = null;
    public ?string $date_time = null;
    public ?string $next_page_token = null;
    public ?int $page_count = null;
    public ?int $page_size = null;
    public ?array $participants = null;
    public ?int $total_records = null;
    public ?array $video_input = null;
    public ?array $video_output = null;
}

/** Request payload for Qos#load. */
class QosLoadMatch
{
    public ?string $meeting_id = null;
    public string $participant_id;
    public mixed $type = null;
    public ?string $webinar_id = null;
}

/** Request payload for Qos#list. */
class QosListMatch
{
    public string $meeting_id;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $type = null;
}

/** Recording entity data model. */
class Recording
{
    public ?string $from = null;
    public ?array $meetings = null;
    public ?string $next_page_token = null;
    public ?int $page_count = null;
    public ?int $page_size = null;
    public ?string $to = null;
    public ?int $total_records = null;
}

/** Request payload for Recording#list. */
class RecordingListMatch
{
    public string $user_id;
    public mixed $from;
    public mixed $mc = null;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $to;
    public mixed $trash = null;
}

/** RecordingSetting entity data model. */
class RecordingSetting
{
    public ?int $approval_type = null;
    public ?bool $on_demand = null;
    public ?string $password = null;
    public ?bool $send_email_to_host = null;
    public ?string $share_recording = null;
    public ?bool $show_social_share_buttons = null;
    public ?bool $viewer_download = null;
}

/** Request payload for RecordingSetting#load. */
class RecordingSettingLoadMatch
{
    public string $meeting_id;
}

/** Report entity data model. */
class Report
{
    public ?int $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?string $from = null;
    public ?int $id = null;
    public ?array $meetings = null;
    public ?string $name = null;
    public ?string $next_page_token = null;
    public ?int $page_count = null;
    public ?int $page_size = null;
    public ?array $participants = null;
    public ?int $participants_count = null;
    public ?array $question_details = null;
    public ?string $start_time = null;
    public ?string $to = null;
    public ?string $topic = null;
    public ?int $total_minutes = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_email = null;
    public ?string $user_name = null;
    public ?string $uuid = null;
}

/** Request payload for Report#load. */
class ReportLoadMatch
{
    public string $meeting_id;
}

/** Request payload for Report#list. */
class ReportListMatch
{
    public string $user_id;
    public mixed $from;
    public mixed $next_page_token = null;
    public ?int $page_size = null;
    public mixed $to;
}

/** TrackingField entity data model. */
class TrackingField
{
    public ?string $field = null;
    public ?string $id = null;
    public ?array $recommended_values = null;
    public ?bool $required = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?bool $visible = null;
}

/** Request payload for TrackingField#load. */
class TrackingFieldLoadMatch
{
    public string $id;
}

/** Request payload for TrackingField#list. */
class TrackingFieldListMatch
{
    public ?string $field = null;
    public ?string $id = null;
    public ?array $recommended_values = null;
    public ?bool $required = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?bool $visible = null;
}

/** Request payload for TrackingField#create. */
class TrackingFieldCreateData
{
    public array $body;
    public ?string $field = null;
    public ?string $id = null;
    public ?array $recommended_values = null;
    public ?bool $required = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?bool $visible = null;
}

/** Request payload for TrackingField#update. */
class TrackingFieldUpdateData
{
    public string $id;
    public array $body;
    public ?string $field = null;
    public ?array $recommended_values = null;
    public ?bool $required = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?bool $visible = null;
}

/** Request payload for TrackingField#remove. */
class TrackingFieldRemoveMatch
{
    public string $id;
}

/** Tsp entity data model. */
class Tsp
{
    public ?string $code = null;
    public string $conference_code;
    public array $dial_in_numbers;
    public ?string $id = null;
    public string $leader_pin;
    public ?string $number = null;
    public ?string $type = null;
}

/** Request payload for Tsp#load. */
class TspLoadMatch
{
    public string $id;
    public string $user_id;
}

/** Request payload for Tsp#list. */
class TspListMatch
{
    public ?string $code = null;
    public ?string $conference_code = null;
    public ?array $dial_in_numbers = null;
    public ?string $id = null;
    public ?string $leader_pin = null;
    public ?string $number = null;
    public ?string $type = null;
}

/** Request payload for Tsp#create. */
class TspCreateData
{
    public string $user_id;
    public array $body;
    public ?string $code = null;
    public string $conference_code;
    public array $dial_in_numbers;
    public ?string $id = null;
    public string $leader_pin;
    public ?string $number = null;
    public ?string $type = null;
}

/** Request payload for Tsp#update. */
class TspUpdateData
{
    public ?string $id = null;
    public ?string $user_id = null;
    public array $body;
    public ?string $code = null;
    public ?string $conference_code = null;
    public ?array $dial_in_numbers = null;
    public ?string $leader_pin = null;
    public ?string $number = null;
    public ?string $type = null;
}

/** Request payload for Tsp#remove. */
class TspRemoveMatch
{
    public string $id;
    public string $user_id;
}

/** User entity data model. */
class User
{
    public ?string $account_id = null;
    public ?string $cms_user_id = null;
    public ?string $created_at = null;
    public ?string $dept = null;
    public string $email;
    public ?string $first_name = null;
    public ?array $group_ids = null;
    public ?string $host_key = null;
    public ?string $id = null;
    public ?array $im_group_ids = null;
    public ?string $language = null;
    public ?string $last_client_version = null;
    public ?string $last_login_time = null;
    public ?string $last_name = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $personal_meeting_url = null;
    public ?string $pic_url = null;
    public ?string $pmi = null;
    public ?string $timezone = null;
    public ?int $total_records = null;
    public int $type;
    public ?bool $use_pmi = null;
    public ?array $users = null;
    public ?string $vanity_url = null;
    public ?int $verified = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public string $id;
    public mixed $login_type = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?int $page_number = null;
    public ?int $page_size = null;
    public mixed $status = null;
}

/** Request payload for User#create. */
class UserCreateData
{
    public array $body;
    public ?string $account_id = null;
    public ?string $cms_user_id = null;
    public ?string $created_at = null;
    public ?string $dept = null;
    public string $email;
    public ?string $first_name = null;
    public ?array $group_ids = null;
    public ?string $host_key = null;
    public ?string $id = null;
    public ?array $im_group_ids = null;
    public ?string $language = null;
    public ?string $last_client_version = null;
    public ?string $last_login_time = null;
    public ?string $last_name = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $personal_meeting_url = null;
    public ?string $pic_url = null;
    public ?string $pmi = null;
    public ?string $timezone = null;
    public ?int $total_records = null;
    public int $type;
    public ?bool $use_pmi = null;
    public ?array $users = null;
    public ?string $vanity_url = null;
    public ?int $verified = null;
}

/** Request payload for User#update. */
class UserUpdateData
{
    public string $id;
    public array $body;
    public ?string $account_id = null;
    public ?string $cms_user_id = null;
    public ?string $created_at = null;
    public ?string $dept = null;
    public ?string $email = null;
    public ?string $first_name = null;
    public ?array $group_ids = null;
    public ?string $host_key = null;
    public ?array $im_group_ids = null;
    public ?string $language = null;
    public ?string $last_client_version = null;
    public ?string $last_login_time = null;
    public ?string $last_name = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?string $personal_meeting_url = null;
    public ?string $pic_url = null;
    public ?string $pmi = null;
    public ?string $timezone = null;
    public ?int $total_records = null;
    public ?int $type = null;
    public ?bool $use_pmi = null;
    public ?array $users = null;
    public ?string $vanity_url = null;
    public ?int $verified = null;
}

/** Request payload for User#remove. */
class UserRemoveMatch
{
    public string $id;
    public mixed $action = null;
    public mixed $transfer_email = null;
    public mixed $transfer_meeting = null;
    public mixed $transfer_recording = null;
    public mixed $transfer_webinar = null;
    public ?string $assistant_id = null;
    public ?string $scheduler_id = null;
}

/** UserAssistantsList entity data model. */
class UserAssistantsList
{
    public ?string $id = null;
}

/** Request payload for UserAssistantsList#list. */
class UserAssistantsListListMatch
{
    public string $id;
}

/** UserPermission entity data model. */
class UserPermission
{
    public ?string $id = null;
    public ?array $permissions = null;
}

/** Request payload for UserPermission#list. */
class UserPermissionListMatch
{
    public string $id;
}

/** UserSchedulersList entity data model. */
class UserSchedulersList
{
    public ?string $id = null;
}

/** Request payload for UserSchedulersList#list. */
class UserSchedulersListListMatch
{
    public string $id;
}

/** UserSetting entity data model. */
class UserSetting
{
    public ?array $email_notification = null;
    public ?array $feature = null;
    public ?string $id = null;
    public ?array $in_meeting = null;
    public ?array $recording = null;
    public ?array $schedule_meeting = null;
    public ?array $telephony = null;
}

/** Request payload for UserSetting#load. */
class UserSettingLoadMatch
{
    public string $id;
    public mixed $login_type = null;
}

/** Webhook entity data model. */
class Webhook
{
    public string $auth_password;
    public string $auth_user;
    public ?string $created_at = null;
    public array $events;
    public ?string $id = null;
    public ?int $total_records = null;
    public string $url;
    public ?string $webhook_id = null;
    public ?array $webhooks = null;
}

/** Request payload for Webhook#load. */
class WebhookLoadMatch
{
    public string $id;
}

/** Request payload for Webhook#list. */
class WebhookListMatch
{
    public ?string $auth_password = null;
    public ?string $auth_user = null;
    public ?string $created_at = null;
    public ?array $events = null;
    public ?string $id = null;
    public ?int $total_records = null;
    public ?string $url = null;
    public ?string $webhook_id = null;
    public ?array $webhooks = null;
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
    public array $body;
    public string $auth_password;
    public string $auth_user;
    public ?string $created_at = null;
    public array $events;
    public ?string $id = null;
    public ?int $total_records = null;
    public string $url;
    public ?string $webhook_id = null;
    public ?array $webhooks = null;
}

/** Request payload for Webhook#update. */
class WebhookUpdateData
{
    public string $id;
    public array $body;
    public ?string $auth_password = null;
    public ?string $auth_user = null;
    public ?string $created_at = null;
    public ?array $events = null;
    public ?int $total_records = null;
    public ?string $url = null;
    public ?string $webhook_id = null;
    public ?array $webhooks = null;
}

/** Request payload for Webhook#remove. */
class WebhookRemoveMatch
{
    public string $id;
}

/** Webinar entity data model. */
class Webinar
{
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $id = null;
    public ?string $join_url = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
    public ?array $webinars = null;
}

/** Request payload for Webinar#load. */
class WebinarLoadMatch
{
    public string $id;
    public ?string $poll_id = null;
    public mixed $type = null;
}

/** Request payload for Webinar#list. */
class WebinarListMatch
{
    public string $user_id;
    public ?int $page_number = null;
    public ?int $page_size = null;
}

/** Request payload for Webinar#create. */
class WebinarCreateData
{
    public string $user_id;
    public array $body;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $id = null;
    public ?string $join_url = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
    public ?array $webinars = null;
}

/** Request payload for Webinar#update. */
class WebinarUpdateData
{
    public string $id;
    public string $poll_id;
    public mixed $body;
    public ?string $agenda = null;
    public ?string $created_at = null;
    public ?string $duration = null;
    public ?string $email = null;
    public ?string $end_time = null;
    public ?bool $has_3rd_party_audio = null;
    public ?bool $has_pstn = null;
    public ?bool $has_recording = null;
    public ?bool $has_screen_share = null;
    public ?bool $has_sip = null;
    public ?bool $has_video = null;
    public ?bool $has_voip = null;
    public ?string $host = null;
    public ?string $host_id = null;
    public ?string $join_url = null;
    public ?array $occurrences = null;
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $participants = null;
    public ?array $questions = null;
    public ?array $settings = null;
    public ?string $start_time = null;
    public ?string $start_url = null;
    public ?string $status = null;
    public ?string $timezone = null;
    public ?string $title = null;
    public ?string $topic = null;
    public ?int $total_records = null;
    public ?array $tracking_fields = null;
    public ?int $type = null;
    public ?string $user_type = null;
    public ?string $uuid = null;
    public ?array $webinars = null;
}

/** Request payload for Webinar#remove. */
class WebinarRemoveMatch
{
    public string $id;
    public ?string $occurrence_id = null;
    public ?string $panelist_id = null;
    public ?string $poll_id = null;
}

/** WebinarInstance entity data model. */
class WebinarInstance
{
    public ?array $webinars = null;
}

/** Request payload for WebinarInstance#list. */
class WebinarInstanceListMatch
{
    public string $past_webinar_id;
}

/** WebinarPanelistList entity data model. */
class WebinarPanelistList
{
    public ?string $id = null;
    public ?array $panelists = null;
    public ?int $total_records = null;
}

/** Request payload for WebinarPanelistList#list. */
class WebinarPanelistListListMatch
{
    public string $id;
}

/** WebinarRegistrantList entity data model. */
class WebinarRegistrantList
{
    public ?string $id = null;
}

/** Request payload for WebinarRegistrantList#load. */
class WebinarRegistrantListLoadMatch
{
    public string $id;
    public ?string $occurrence_id = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public mixed $status = null;
}

/** ZoomRoomList entity data model. */
class ZoomRoomList
{
    public ?int $page_count = null;
    public ?int $page_number = null;
    public ?int $page_size = null;
    public ?int $total_records = null;
    public ?array $zoom_rooms = null;
}

/** Request payload for ZoomRoomList#list. */
class ZoomRoomListListMatch
{
    public ?int $page_number = null;
    public ?int $page_size = null;
}

