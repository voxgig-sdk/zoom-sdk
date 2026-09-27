# Typed models for the Zoom SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Account(TypedDict, total=False):
    accounts: list
    id: str
    meeting_connectors: str
    page_count: int
    page_number: int
    page_size: int
    pay_mode: str
    room_connectors: str
    share_mc: bool
    share_rc: bool
    total_records: int


class AccountLoadMatch(TypedDict):
    id: str


class AccountListMatch(TypedDict, total=False):
    page_number: int
    page_size: int


class AccountCreateDataRequired(TypedDict):
    body: dict


class AccountCreateData(AccountCreateDataRequired, total=False):
    accounts: list
    id: str
    meeting_connectors: str
    page_count: int
    page_number: int
    page_size: int
    pay_mode: str
    room_connectors: str
    share_mc: bool
    share_rc: bool
    total_records: int


class AccountUpdateDataRequired(TypedDict):
    id: str
    body: dict


class AccountUpdateData(AccountUpdateDataRequired, total=False):
    accounts: list
    meeting_connectors: str
    page_count: int
    page_number: int
    page_size: int
    pay_mode: str
    room_connectors: str
    share_mc: bool
    share_rc: bool
    total_records: int


class AccountRemoveMatch(TypedDict):
    id: str


class AccountPlanRequired(TypedDict):
    plan_base: dict


class AccountPlan(AccountPlanRequired, total=False):
    id: str
    plan_audio: dict
    plan_large_meeting: list
    plan_recording: str
    plan_room_connector: dict
    plan_webinar: list
    plan_zoom_rooms: dict


class AccountPlanListMatch(TypedDict):
    id: str


class AccountPlanCreateDataRequired(TypedDict):
    id: str
    body: Any
    plan_base: dict


class AccountPlanCreateData(AccountPlanCreateDataRequired, total=False):
    plan_audio: dict
    plan_large_meeting: list
    plan_recording: str
    plan_room_connector: dict
    plan_webinar: list
    plan_zoom_rooms: dict


class AccountSetting(TypedDict, total=False):
    email_notification: dict
    feature: dict
    id: str
    in_meeting: dict
    integration: dict
    recording: dict
    schedule_meting: dict
    security: dict
    telephony: dict
    zoom_rooms: dict


class AccountSettingLoadMatch(TypedDict):
    id: str


class BillingRequired(TypedDict):
    address: str
    city: str
    country: str
    email: str
    first_name: str
    last_name: str
    phone_number: str
    state: str
    zip: str


class Billing(BillingRequired, total=False):
    apt: str


class BillingLoadMatch(TypedDict):
    account_id: str


class BillingCreateDataRequired(TypedDict):
    account_id: str
    body: dict
    address: str
    city: str
    country: str
    email: str
    first_name: str
    last_name: str
    phone_number: str
    state: str
    zip: str


class BillingCreateData(BillingCreateDataRequired, total=False):
    apt: str


class BillingUpdateDataRequired(TypedDict):
    account_id: str
    body: dict


class BillingUpdateData(BillingUpdateDataRequired, total=False):
    address: str
    apt: str
    city: str
    country: str
    email: str
    first_name: str
    last_name: str
    phone_number: str
    state: str
    zip: str


class CloudRecording(TypedDict, total=False):
    id: str


class CloudRecordingLoadMatch(TypedDict):
    meeting_id: str


class CloudRecordingUpdateDataRequired(TypedDict):
    meeting_id: str
    body: Any


class CloudRecordingUpdateData(CloudRecordingUpdateDataRequired, total=False):
    id: str


class CloudRecordingRemoveMatchRequired(TypedDict):
    meeting_id: str


class CloudRecordingRemoveMatch(CloudRecordingRemoveMatchRequired, total=False):
    id: str
    action: Any


class Dashboard(TypedDict, total=False):
    account_type: str
    calender_name: str
    camera: str
    crc_ports_usage: list
    device_ip: str
    email: str
    id: str
    last_start_time: str
    live_meeting: dict
    meetings: list
    microphone: str
    next_page_token: str
    page_count: int
    page_size: int
    participants: list
    past_meetings: dict
    room_name: str
    speaker: str
    status: str
    to: str
    total_records: int
    users: list
    webinars: list


class DashboardLoadMatchRequired(TypedDict):
    zoomroom_id: str
    to: Any


class DashboardLoadMatch(DashboardLoadMatchRequired, total=False):
    page_number: int
    page_size: int


class DashboardListMatchRequired(TypedDict):
    to: Any


class DashboardListMatch(DashboardListMatchRequired, total=False):
    next_page_token: Any
    page_size: int
    type: Any


class Device(TypedDict, total=False):
    devices: list
    id: str
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class DeviceListMatch(TypedDict, total=False):
    devices: list
    id: str
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class DeviceCreateDataRequired(TypedDict):
    body: dict


class DeviceCreateData(DeviceCreateDataRequired, total=False):
    devices: list
    id: str
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class DeviceUpdateDataRequired(TypedDict):
    id: str
    body: dict


class DeviceUpdateData(DeviceUpdateDataRequired, total=False):
    devices: list
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class DeviceRemoveMatch(TypedDict):
    id: str


class DomainsList(TypedDict, total=False):
    domain: str
    status: str


class DomainsListListMatch(TypedDict):
    account_id: str


class Group(TypedDict, total=False):
    id: str
    name: str
    total_members: int


class GroupLoadMatch(TypedDict):
    id: str


class GroupListMatch(TypedDict, total=False):
    id: str
    name: str
    total_members: int


class GroupCreateDataRequired(TypedDict):
    body: Any


class GroupCreateData(GroupCreateDataRequired, total=False):
    id: str
    name: str
    total_members: int


class GroupUpdateDataRequired(TypedDict):
    id: str
    body: Any


class GroupUpdateData(GroupUpdateDataRequired, total=False):
    name: str
    total_members: int


class GroupRemoveMatchRequired(TypedDict):
    id: str


class GroupRemoveMatch(GroupRemoveMatchRequired, total=False):
    member_id: str


class GroupMemberList(TypedDict, total=False):
    id: str
    members: list
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class GroupMemberListListMatchRequired(TypedDict):
    id: str


class GroupMemberListListMatch(GroupMemberListListMatchRequired, total=False):
    page_number: int
    page_size: int


class ImChat(TypedDict, total=False):
    messages: list
    next_page_token: str
    page_size: int
    session_id: str
    sessions: list
    to: str


class ImChatLoadMatchRequired(TypedDict):
    session_id: str
    to: Any


class ImChatLoadMatch(ImChatLoadMatchRequired, total=False):
    next_page_token: Any
    page_size: int


class ImChatListMatchRequired(TypedDict):
    to: Any


class ImChatListMatch(ImChatListMatchRequired, total=False):
    next_page_token: Any
    page_size: int


class ImGroup(TypedDict, total=False):
    id: str


class ImGroupLoadMatch(TypedDict):
    id: str


class ImGroupCreateDataRequired(TypedDict):
    body: Any


class ImGroupCreateData(ImGroupCreateDataRequired, total=False):
    group_id: str
    id: str


class ImGroupUpdateData(TypedDict):
    id: str
    body: Any


class ImGroupRemoveMatch(TypedDict):
    id: str


class ImGroupList(TypedDict, total=False):
    groups: list
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class ImGroupListListMatch(TypedDict, total=False):
    groups: list
    page_count: int
    page_number: int
    page_size: int
    total_records: int


class Meeting(TypedDict, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    h323_password: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    id: str
    join_url: str
    meetings: list
    next_page_token: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    participants_count: int
    password: str
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_minutes: int
    total_records: int
    tracking_fields: list
    type: int
    user_email: str
    user_name: str
    user_type: str
    uuid: str


class MeetingLoadMatch(TypedDict):
    id: str


class MeetingListMatchRequired(TypedDict):
    user_id: str


class MeetingListMatch(MeetingListMatchRequired, total=False):
    page_number: int
    page_size: int
    type: Any


class MeetingCreateDataRequired(TypedDict):
    user_id: str
    body: Any


class MeetingCreateData(MeetingCreateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    h323_password: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    id: str
    join_url: str
    meetings: list
    next_page_token: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    participants_count: int
    password: str
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_minutes: int
    total_records: int
    tracking_fields: list
    type: int
    user_email: str
    user_name: str
    user_type: str
    uuid: str


class MeetingUpdateDataRequired(TypedDict):
    id: str
    poll_id: str
    body: Any


class MeetingUpdateData(MeetingUpdateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    h323_password: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    join_url: str
    meetings: list
    next_page_token: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    participants_count: int
    password: str
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_minutes: int
    total_records: int
    tracking_fields: list
    type: int
    user_email: str
    user_name: str
    user_type: str
    uuid: str


class MeetingRemoveMatchRequired(TypedDict):
    id: str


class MeetingRemoveMatch(MeetingRemoveMatchRequired, total=False):
    occurrence_id: str
    poll_id: str


class MeetingInstance(TypedDict, total=False):
    meetings: list


class MeetingInstanceListMatch(TypedDict):
    past_meeting_id: str


class MeetingInvitation(TypedDict, total=False):
    id: str
    invitation: str


class MeetingInvitationLoadMatch(TypedDict):
    id: str


class MeetingRegistrantList(TypedDict, total=False):
    id: str


class MeetingRegistrantListLoadMatchRequired(TypedDict):
    id: str


class MeetingRegistrantListLoadMatch(MeetingRegistrantListLoadMatchRequired, total=False):
    occurrence_id: str
    page_number: int
    page_size: int
    status: Any


class PacRequired(TypedDict):
    dedicated_dial_in_number: list
    global_dial_in_numbers: list


class Pac(PacRequired, total=False):
    conference_id: int
    listen_only_password: str
    participant_password: str


class PacListMatch(TypedDict):
    user_id: str


class Poll(TypedDict, total=False):
    polls: list
    total_records: int


class PollListMatch(TypedDict):
    meeting_id: str


class Qos(TypedDict, total=False):
    as_input: dict
    as_output: dict
    audio_input: dict
    audio_output: dict
    cpu_usage: Any
    date_time: str
    next_page_token: str
    page_count: int
    page_size: int
    participants: list
    total_records: int
    video_input: dict
    video_output: dict


class QosLoadMatchRequired(TypedDict):
    participant_id: str


class QosLoadMatch(QosLoadMatchRequired, total=False):
    meeting_id: str
    type: Any
    webinar_id: str


class QosListMatchRequired(TypedDict):
    meeting_id: str


class QosListMatch(QosListMatchRequired, total=False):
    next_page_token: Any
    page_size: int
    type: Any


class Recording(TypedDict, total=False):
    meetings: list
    next_page_token: str
    page_count: int
    page_size: int
    to: str
    total_records: int


class RecordingListMatchRequired(TypedDict):
    user_id: str
    to: Any


class RecordingListMatch(RecordingListMatchRequired, total=False):
    mc: Any
    next_page_token: Any
    page_size: int
    trash: Any


class RecordingSetting(TypedDict, total=False):
    approval_type: int
    on_demand: bool
    password: str
    send_email_to_host: bool
    share_recording: str
    show_social_share_buttons: bool
    viewer_download: bool


class RecordingSettingLoadMatch(TypedDict):
    meeting_id: str


class Report(TypedDict, total=False):
    duration: int
    email: str
    end_time: str
    id: int
    meetings: list
    name: str
    next_page_token: str
    page_count: int
    page_size: int
    participants: list
    participants_count: int
    question_details: list
    start_time: str
    to: str
    topic: str
    total_minutes: int
    total_records: int
    tracking_fields: list
    type: int
    user_email: str
    user_name: str
    uuid: str


class ReportLoadMatch(TypedDict):
    meeting_id: str


class ReportListMatchRequired(TypedDict):
    user_id: str
    to: Any


class ReportListMatch(ReportListMatchRequired, total=False):
    next_page_token: Any
    page_size: int


class TrackingField(TypedDict, total=False):
    field: str
    id: str
    recommended_values: list
    required: bool
    total_records: int
    tracking_fields: list
    visible: bool


class TrackingFieldLoadMatch(TypedDict):
    id: str


class TrackingFieldListMatch(TypedDict, total=False):
    field: str
    id: str
    recommended_values: list
    required: bool
    total_records: int
    tracking_fields: list
    visible: bool


class TrackingFieldCreateDataRequired(TypedDict):
    body: dict


class TrackingFieldCreateData(TrackingFieldCreateDataRequired, total=False):
    field: str
    id: str
    recommended_values: list
    required: bool
    total_records: int
    tracking_fields: list
    visible: bool


class TrackingFieldUpdateDataRequired(TypedDict):
    id: str
    body: dict


class TrackingFieldUpdateData(TrackingFieldUpdateDataRequired, total=False):
    field: str
    recommended_values: list
    required: bool
    total_records: int
    tracking_fields: list
    visible: bool


class TrackingFieldRemoveMatch(TypedDict):
    id: str


class TspRequired(TypedDict):
    conference_code: str
    dial_in_numbers: list
    leader_pin: str


class Tsp(TspRequired, total=False):
    code: str
    id: str
    number: str
    type: str


class TspLoadMatch(TypedDict):
    id: str
    user_id: str


class TspListMatch(TypedDict, total=False):
    code: str
    conference_code: str
    dial_in_numbers: list
    id: str
    leader_pin: str
    number: str
    type: str


class TspCreateDataRequired(TypedDict):
    user_id: str
    body: dict
    conference_code: str
    dial_in_numbers: list
    leader_pin: str


class TspCreateData(TspCreateDataRequired, total=False):
    code: str
    id: str
    number: str
    type: str


class TspUpdateDataRequired(TypedDict):
    body: dict


class TspUpdateData(TspUpdateDataRequired, total=False):
    id: str
    user_id: str
    code: str
    conference_code: str
    dial_in_numbers: list
    leader_pin: str
    number: str
    type: str


class TspRemoveMatch(TypedDict):
    id: str
    user_id: str


class UserRequired(TypedDict):
    email: str
    type: int


class User(UserRequired, total=False):
    account_id: str
    cms_user_id: str
    created_at: str
    dept: str
    first_name: str
    group_ids: list
    host_key: str
    id: str
    im_group_ids: list
    language: str
    last_client_version: str
    last_login_time: str
    last_name: str
    page_count: int
    page_number: int
    page_size: int
    personal_meeting_url: str
    pic_url: str
    pmi: str
    timezone: str
    total_records: int
    use_pmi: bool
    users: list
    vanity_url: str
    verified: int


class UserLoadMatchRequired(TypedDict):
    id: str


class UserLoadMatch(UserLoadMatchRequired, total=False):
    login_type: Any


class UserListMatch(TypedDict, total=False):
    page_number: int
    page_size: int
    status: Any


class UserCreateDataRequired(TypedDict):
    body: dict
    email: str
    type: int


class UserCreateData(UserCreateDataRequired, total=False):
    account_id: str
    cms_user_id: str
    created_at: str
    dept: str
    first_name: str
    group_ids: list
    host_key: str
    id: str
    im_group_ids: list
    language: str
    last_client_version: str
    last_login_time: str
    last_name: str
    page_count: int
    page_number: int
    page_size: int
    personal_meeting_url: str
    pic_url: str
    pmi: str
    timezone: str
    total_records: int
    use_pmi: bool
    users: list
    vanity_url: str
    verified: int


class UserUpdateDataRequired(TypedDict):
    id: str
    body: dict


class UserUpdateData(UserUpdateDataRequired, total=False):
    account_id: str
    cms_user_id: str
    created_at: str
    dept: str
    email: str
    first_name: str
    group_ids: list
    host_key: str
    im_group_ids: list
    language: str
    last_client_version: str
    last_login_time: str
    last_name: str
    page_count: int
    page_number: int
    page_size: int
    personal_meeting_url: str
    pic_url: str
    pmi: str
    timezone: str
    total_records: int
    type: int
    use_pmi: bool
    users: list
    vanity_url: str
    verified: int


class UserRemoveMatchRequired(TypedDict):
    id: str


class UserRemoveMatch(UserRemoveMatchRequired, total=False):
    action: Any
    transfer_email: Any
    transfer_meeting: Any
    transfer_recording: Any
    transfer_webinar: Any
    assistant_id: str
    scheduler_id: str


class UserAssistantsList(TypedDict, total=False):
    id: str


class UserAssistantsListListMatch(TypedDict):
    id: str


class UserPermission(TypedDict, total=False):
    id: str
    permissions: list


class UserPermissionListMatch(TypedDict):
    id: str


class UserSchedulersList(TypedDict, total=False):
    id: str


class UserSchedulersListListMatch(TypedDict):
    id: str


class UserSetting(TypedDict, total=False):
    email_notification: dict
    feature: dict
    id: str
    in_meeting: dict
    recording: dict
    schedule_meeting: dict
    telephony: dict


class UserSettingLoadMatchRequired(TypedDict):
    id: str


class UserSettingLoadMatch(UserSettingLoadMatchRequired, total=False):
    login_type: Any


class WebhookRequired(TypedDict):
    auth_password: str
    auth_user: str
    events: list
    url: str


class Webhook(WebhookRequired, total=False):
    created_at: str
    id: str
    total_records: int
    webhook_id: str
    webhooks: list


class WebhookLoadMatch(TypedDict):
    id: str


class WebhookListMatch(TypedDict, total=False):
    auth_password: str
    auth_user: str
    created_at: str
    events: list
    id: str
    total_records: int
    url: str
    webhook_id: str
    webhooks: list


class WebhookCreateDataRequired(TypedDict):
    body: dict
    auth_password: str
    auth_user: str
    events: list
    url: str


class WebhookCreateData(WebhookCreateDataRequired, total=False):
    created_at: str
    id: str
    total_records: int
    webhook_id: str
    webhooks: list


class WebhookUpdateDataRequired(TypedDict):
    id: str
    body: dict


class WebhookUpdateData(WebhookUpdateDataRequired, total=False):
    auth_password: str
    auth_user: str
    created_at: str
    events: list
    total_records: int
    url: str
    webhook_id: str
    webhooks: list


class WebhookRemoveMatch(TypedDict):
    id: str


class Webinar(TypedDict, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    id: str
    join_url: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_records: int
    tracking_fields: list
    type: int
    user_type: str
    uuid: str
    webinars: list


class WebinarLoadMatchRequired(TypedDict):
    id: str


class WebinarLoadMatch(WebinarLoadMatchRequired, total=False):
    poll_id: str
    type: Any


class WebinarListMatchRequired(TypedDict):
    user_id: str


class WebinarListMatch(WebinarListMatchRequired, total=False):
    page_number: int
    page_size: int


class WebinarCreateDataRequired(TypedDict):
    user_id: str
    body: dict


class WebinarCreateData(WebinarCreateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    id: str
    join_url: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_records: int
    tracking_fields: list
    type: int
    user_type: str
    uuid: str
    webinars: list


class WebinarUpdateDataRequired(TypedDict):
    id: str
    poll_id: str
    body: Any


class WebinarUpdateData(WebinarUpdateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: str
    email: str
    end_time: str
    has_3rd_party_audio: bool
    has_pstn: bool
    has_recording: bool
    has_screen_share: bool
    has_sip: bool
    has_video: bool
    has_voip: bool
    host: str
    host_id: str
    join_url: str
    occurrences: list
    page_count: int
    page_number: int
    page_size: int
    participants: int
    questions: list
    settings: dict
    start_time: str
    start_url: str
    status: str
    timezone: str
    title: str
    topic: str
    total_records: int
    tracking_fields: list
    type: int
    user_type: str
    uuid: str
    webinars: list


class WebinarRemoveMatchRequired(TypedDict):
    id: str


class WebinarRemoveMatch(WebinarRemoveMatchRequired, total=False):
    occurrence_id: str
    panelist_id: str
    poll_id: str


class WebinarInstance(TypedDict, total=False):
    webinars: list


class WebinarInstanceListMatch(TypedDict):
    past_webinar_id: str


class WebinarPanelistList(TypedDict, total=False):
    id: str
    panelists: list
    total_records: int


class WebinarPanelistListListMatch(TypedDict):
    id: str


class WebinarRegistrantList(TypedDict, total=False):
    id: str


class WebinarRegistrantListLoadMatchRequired(TypedDict):
    id: str


class WebinarRegistrantListLoadMatch(WebinarRegistrantListLoadMatchRequired, total=False):
    occurrence_id: str
    page_number: int
    page_size: int
    status: Any


class ZoomRoomList(TypedDict, total=False):
    page_count: int
    page_number: int
    page_size: int
    total_records: int
    zoom_rooms: list


class ZoomRoomListListMatch(TypedDict, total=False):
    page_number: int
    page_size: int
