// Typed models for the Zoom SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Account {
  accounts?: any[]
  id?: string
  meeting_connectors?: string
  page_count?: number
  page_number?: number
  page_size?: number
  pay_mode?: string
  room_connectors?: string
  share_mc?: boolean
  share_rc?: boolean
  total_records?: number
}

export interface AccountLoadMatch {
  id: string
}

export interface AccountListMatch {
  page_number?: number
  page_size?: number
}

export interface AccountCreateData {
  body: Record<string, any>
  accounts?: any[]
  id?: string
  meeting_connectors?: string
  page_count?: number
  page_number?: number
  page_size?: number
  pay_mode?: string
  room_connectors?: string
  share_mc?: boolean
  share_rc?: boolean
  total_records?: number
}

export interface AccountUpdateData {
  id: string
  body: Record<string, any>
  accounts?: any[]
  meeting_connectors?: string
  page_count?: number
  page_number?: number
  page_size?: number
  pay_mode?: string
  room_connectors?: string
  share_mc?: boolean
  share_rc?: boolean
  total_records?: number

  // Selects a custom action instead of the plain update:
  //   'option' | 'setting'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface AccountRemoveMatch {
  id: string
}

export interface AccountPlan {
  id?: string
  plan_audio?: Record<string, any>
  plan_base: Record<string, any>
  plan_large_meeting?: any[]
  plan_recording?: string
  plan_room_connector?: Record<string, any>
  plan_webinar?: any[]
  plan_zoom_rooms?: Record<string, any>
}

export interface AccountPlanListMatch {
  id: string
}

export interface AccountPlanCreateData {
  id: string
  body: any
  plan_audio?: Record<string, any>
  plan_base: Record<string, any>
  plan_large_meeting?: any[]
  plan_recording?: string
  plan_room_connector?: Record<string, any>
  plan_webinar?: any[]
  plan_zoom_rooms?: Record<string, any>
}

export interface AccountSetting {
  email_notification?: Record<string, any>
  feature?: Record<string, any>
  id?: string
  in_meeting?: Record<string, any>
  integration?: Record<string, any>
  recording?: Record<string, any>
  schedule_meting?: Record<string, any>
  security?: Record<string, any>
  telephony?: Record<string, any>
  zoom_rooms?: Record<string, any>
}

export interface AccountSettingLoadMatch {
  id: string
}

export interface Billing {
  address: string
  apt?: string
  city: string
  country: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  state: string
  zip: string
}

export interface BillingLoadMatch {
  account_id: string
}

export interface BillingCreateData {
  account_id: string
  body: Record<string, any>
  address: string
  apt?: string
  city: string
  country: string
  email: string
  first_name: string
  last_name: string
  phone_number: string
  state: string
  zip: string
}

export interface BillingUpdateData {
  account_id: string
  body: Record<string, any>
  address?: string
  apt?: string
  city?: string
  country?: string
  email?: string
  first_name?: string
  last_name?: string
  phone_number?: string
  state?: string
  zip?: string
}

export interface CloudRecording {
  id?: string
}

export interface CloudRecordingLoadMatch {
  meeting_id: string
}

export interface CloudRecordingUpdateData {
  meeting_id: string
  body: any
  id?: string

  // Selects a custom action instead of the plain update:
  //   'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface CloudRecordingRemoveMatch {
  id?: string
  meeting_id: string
  action?: any
}

export interface Dashboard {
  account_type?: string
  calender_name?: string
  camera?: string
  crc_ports_usage?: any[]
  device_ip?: string
  email?: string
  from?: string
  id?: string
  last_start_time?: string
  live_meeting?: Record<string, any>
  meetings?: any[]
  microphone?: string
  next_page_token?: string
  page_count?: number
  page_size?: number
  participants?: any[]
  past_meetings?: Record<string, any>
  room_name?: string
  speaker?: string
  status?: string
  to?: string
  total_records?: number
  users?: any[]
  webinars?: any[]
}

export interface DashboardLoadMatch {
  zoomroom_id: string
  from: any
  page_number?: number
  page_size?: number
  to: any
}

export interface DashboardListMatch {
  from: any
  next_page_token?: any
  page_size?: number
  to: any
  type?: any
}

export interface Device {
  devices?: any[]
  id?: string
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface DeviceListMatch {
  devices?: any[]
  id?: string
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface DeviceCreateData {
  body: Record<string, any>
  devices?: any[]
  id?: string
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface DeviceUpdateData {
  id: string
  body: Record<string, any>
  devices?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface DeviceRemoveMatch {
  id: string
}

export interface DomainsList {
  domain?: string
  status?: string
}

export interface DomainsListListMatch {
  account_id: string
}

export interface Group {
  id?: string
  name?: string
  total_members?: number
}

export interface GroupLoadMatch {
  id: string
}

export interface GroupListMatch {
  id?: string
  name?: string
  total_members?: number
}

export interface GroupCreateData {
  body: any
  id?: string
  name?: string
  total_members?: number

  // Selects a custom action instead of the plain create:
  //   'member'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface GroupUpdateData {
  id: string
  body: any
  name?: string
  total_members?: number
}

export interface GroupRemoveMatch {
  id: string
  member_id?: string
}

export interface GroupMemberList {
  id?: string
  members?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface GroupMemberListListMatch {
  id: string
  page_number?: number
  page_size?: number

  // Selects a custom action instead of the plain list:
  //   'members' | 'members'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ImChat {
  from?: string
  messages?: any[]
  next_page_token?: string
  page_size?: number
  session_id?: string
  sessions?: any[]
  to?: string
}

export interface ImChatLoadMatch {
  session_id: string
  from: any
  next_page_token?: any
  page_size?: number
  to: any
}

export interface ImChatListMatch {
  from: any
  next_page_token?: any
  page_size?: number
  to: any
}

export interface ImGroup {
  id?: string
}

export interface ImGroupLoadMatch {
  id: string
}

export interface ImGroupCreateData {
  group_id?: string
  body: any
  id?: string
}

export interface ImGroupUpdateData {
  id: string
  body: any
}

export interface ImGroupRemoveMatch {
  id: string
}

export interface ImGroupList {
  groups?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface ImGroupListListMatch {
  groups?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
}

export interface Meeting {
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  h323_password?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  id?: string
  join_url?: string
  meetings?: any[]
  next_page_token?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  participants_count?: number
  password?: string
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_minutes?: number
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_email?: string
  user_name?: string
  user_type?: string
  uuid?: string
}

export interface MeetingLoadMatch {
  id: string
}

export interface MeetingListMatch {
  user_id: string
  page_number?: number
  page_size?: number
  type?: any
}

export interface MeetingCreateData {
  user_id: string
  body: any
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  h323_password?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  id?: string
  join_url?: string
  meetings?: any[]
  next_page_token?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  participants_count?: number
  password?: string
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_minutes?: number
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_email?: string
  user_name?: string
  user_type?: string
  uuid?: string

  // Selects a custom action instead of the plain create:
  //   'poll' | 'registrant'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeetingUpdateData {
  id: string
  poll_id: string
  body: any
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  h323_password?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  join_url?: string
  meetings?: any[]
  next_page_token?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  participants_count?: number
  password?: string
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_minutes?: number
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_email?: string
  user_name?: string
  user_type?: string
  uuid?: string

  // Selects a custom action instead of the plain update:
  //   'registrant_status' | 'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface MeetingRemoveMatch {
  id: string
  occurrence_id?: string
  poll_id?: string
}

export interface MeetingInstance {
  meetings?: any[]
}

export interface MeetingInstanceListMatch {
  past_meeting_id: string
}

export interface MeetingInvitation {
  id?: string
  invitation?: string
}

export interface MeetingInvitationLoadMatch {
  id: string
}

export interface MeetingRegistrantList {
  id?: string
}

export interface MeetingRegistrantListLoadMatch {
  id: string
  occurrence_id?: string
  page_number?: number
  page_size?: number
  status?: any

  // Selects a custom action instead of the plain load:
  //   'registrants'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface Pac {
  conference_id?: number
  dedicated_dial_in_number: any[]
  global_dial_in_numbers: any[]
  listen_only_password?: string
  participant_password?: string
}

export interface PacListMatch {
  user_id: string
}

export interface Poll {
  polls?: any[]
  total_records?: number
}

export interface PollListMatch {
  meeting_id: string
}

export interface Qos {
  as_input?: Record<string, any>
  as_output?: Record<string, any>
  audio_input?: Record<string, any>
  audio_output?: Record<string, any>
  cpu_usage?: any
  date_time?: string
  next_page_token?: string
  page_count?: number
  page_size?: number
  participants?: any[]
  total_records?: number
  video_input?: Record<string, any>
  video_output?: Record<string, any>
}

export interface QosLoadMatch {
  meeting_id?: string
  participant_id: string
  type?: any
  webinar_id?: string
}

export interface QosListMatch {
  meeting_id: string
  next_page_token?: any
  page_size?: number
  type?: any
}

export interface Recording {
  from?: string
  meetings?: any[]
  next_page_token?: string
  page_count?: number
  page_size?: number
  to?: string
  total_records?: number
}

export interface RecordingListMatch {
  user_id: string
  from: any
  mc?: any
  next_page_token?: any
  page_size?: number
  to: any
  trash?: any
}

export interface RecordingSetting {
  approval_type?: number
  on_demand?: boolean
  password?: string
  send_email_to_host?: boolean
  share_recording?: string
  show_social_share_buttons?: boolean
  viewer_download?: boolean
}

export interface RecordingSettingLoadMatch {
  meeting_id: string
}

export interface Report {
  duration?: number
  email?: string
  end_time?: string
  from?: string
  id?: number
  meetings?: any[]
  name?: string
  next_page_token?: string
  page_count?: number
  page_size?: number
  participants?: any[]
  participants_count?: number
  question_details?: any[]
  start_time?: string
  to?: string
  topic?: string
  total_minutes?: number
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_email?: string
  user_name?: string
  uuid?: string
}

export interface ReportLoadMatch {
  meeting_id: string
}

export interface ReportListMatch {
  user_id: string
  from: any
  next_page_token?: any
  page_size?: number
  to: any

  // Selects a custom action instead of the plain list:
  //   'cloud_recording' | 'daily' | 'telephone' | 'user'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface TrackingField {
  field?: string
  id?: string
  recommended_values?: any[]
  required?: boolean
  total_records?: number
  tracking_fields?: any[]
  visible?: boolean
}

export interface TrackingFieldLoadMatch {
  id: string
}

export interface TrackingFieldListMatch {
  field?: string
  id?: string
  recommended_values?: any[]
  required?: boolean
  total_records?: number
  tracking_fields?: any[]
  visible?: boolean
}

export interface TrackingFieldCreateData {
  body: Record<string, any>
  field?: string
  id?: string
  recommended_values?: any[]
  required?: boolean
  total_records?: number
  tracking_fields?: any[]
  visible?: boolean
}

export interface TrackingFieldUpdateData {
  id: string
  body: Record<string, any>
  field?: string
  recommended_values?: any[]
  required?: boolean
  total_records?: number
  tracking_fields?: any[]
  visible?: boolean
}

export interface TrackingFieldRemoveMatch {
  id: string
}

export interface Tsp {
  code?: string
  conference_code: string
  dial_in_numbers: any[]
  id?: string
  leader_pin: string
  number?: string
  type?: string
}

export interface TspLoadMatch {
  id: string
  user_id: string
}

export interface TspListMatch {
  code?: string
  conference_code?: string
  dial_in_numbers?: any[]
  id?: string
  leader_pin?: string
  number?: string
  type?: string
}

export interface TspCreateData {
  user_id: string
  body: Record<string, any>
  code?: string
  conference_code: string
  dial_in_numbers: any[]
  id?: string
  leader_pin: string
  number?: string
  type?: string
}

export interface TspUpdateData {
  id?: string
  user_id?: string
  body: Record<string, any>
  code?: string
  conference_code?: string
  dial_in_numbers?: any[]
  leader_pin?: string
  number?: string
  type?: string
}

export interface TspRemoveMatch {
  id: string
  user_id: string
}

export interface User {
  account_id?: string
  cms_user_id?: string
  created_at?: string
  dept?: string
  email: string
  first_name?: string
  group_ids?: any[]
  host_key?: string
  id?: string
  im_group_ids?: any[]
  language?: string
  last_client_version?: string
  last_login_time?: string
  last_name?: string
  page_count?: number
  page_number?: number
  page_size?: number
  personal_meeting_url?: string
  pic_url?: string
  pmi?: string
  timezone?: string
  total_records?: number
  type: number
  use_pmi?: boolean
  users?: any[]
  vanity_url?: string
  verified?: number
}

export interface UserLoadMatch {
  id: string
  login_type?: any

  // Selects a custom action instead of the plain load:
  //   'email' | 'token' | 'vanity_name' | 'zpk'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserListMatch {
  page_number?: number
  page_size?: number
  status?: any
}

export interface UserCreateData {
  body: Record<string, any>
  account_id?: string
  cms_user_id?: string
  created_at?: string
  dept?: string
  email: string
  first_name?: string
  group_ids?: any[]
  host_key?: string
  id?: string
  im_group_ids?: any[]
  language?: string
  last_client_version?: string
  last_login_time?: string
  last_name?: string
  page_count?: number
  page_number?: number
  page_size?: number
  personal_meeting_url?: string
  pic_url?: string
  pmi?: string
  timezone?: string
  total_records?: number
  type: number
  use_pmi?: boolean
  users?: any[]
  vanity_url?: string
  verified?: number

  // Selects a custom action instead of the plain create:
  //   'assistant' | 'picture'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserUpdateData {
  id: string
  body: Record<string, any>
  account_id?: string
  cms_user_id?: string
  created_at?: string
  dept?: string
  email?: string
  first_name?: string
  group_ids?: any[]
  host_key?: string
  im_group_ids?: any[]
  language?: string
  last_client_version?: string
  last_login_time?: string
  last_name?: string
  page_count?: number
  page_number?: number
  page_size?: number
  personal_meeting_url?: string
  pic_url?: string
  pmi?: string
  timezone?: string
  total_records?: number
  type?: number
  use_pmi?: boolean
  users?: any[]
  vanity_url?: string
  verified?: number

  // Selects a custom action instead of the plain update:
  //   'email' | 'password' | 'setting' | 'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserRemoveMatch {
  id: string
  action?: any
  transfer_email?: any
  transfer_meeting?: any
  transfer_recording?: any
  transfer_webinar?: any
  assistant_id?: string
  scheduler_id?: string

  // Selects a custom action instead of the plain remove:
  //   'assistant' | 'scheduler' | 'token'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserAssistantsList {
  id?: string
}

export interface UserAssistantsListListMatch {
  id: string

  // Selects a custom action instead of the plain list:
  //   'assistants'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserPermission {
  id?: string
  permissions?: any[]
}

export interface UserPermissionListMatch {
  id: string
}

export interface UserSchedulersList {
  id?: string
}

export interface UserSchedulersListListMatch {
  id: string

  // Selects a custom action instead of the plain list:
  //   'schedulers'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface UserSetting {
  email_notification?: Record<string, any>
  feature?: Record<string, any>
  id?: string
  in_meeting?: Record<string, any>
  recording?: Record<string, any>
  schedule_meeting?: Record<string, any>
  telephony?: Record<string, any>
}

export interface UserSettingLoadMatch {
  id: string
  login_type?: any
}

export interface Webhook {
  auth_password: string
  auth_user: string
  created_at?: string
  events: any[]
  id?: string
  total_records?: number
  url: string
  webhook_id?: string
  webhooks?: any[]
}

export interface WebhookLoadMatch {
  id: string
}

export interface WebhookListMatch {
  auth_password?: string
  auth_user?: string
  created_at?: string
  events?: any[]
  id?: string
  total_records?: number
  url?: string
  webhook_id?: string
  webhooks?: any[]
}

export interface WebhookCreateData {
  body: Record<string, any>
  auth_password: string
  auth_user: string
  created_at?: string
  events: any[]
  id?: string
  total_records?: number
  url: string
  webhook_id?: string
  webhooks?: any[]
}

export interface WebhookUpdateData {
  id: string
  body: Record<string, any>
  auth_password?: string
  auth_user?: string
  created_at?: string
  events?: any[]
  total_records?: number
  url?: string
  webhook_id?: string
  webhooks?: any[]

  // Selects a custom action instead of the plain update:
  //   'option'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WebhookRemoveMatch {
  id: string
}

export interface Webinar {
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  id?: string
  join_url?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_type?: string
  uuid?: string
  webinars?: any[]
}

export interface WebinarLoadMatch {
  id: string
  poll_id?: string
  type?: any
}

export interface WebinarListMatch {
  user_id: string
  page_number?: number
  page_size?: number
}

export interface WebinarCreateData {
  user_id: string
  body: Record<string, any>
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  id?: string
  join_url?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_type?: string
  uuid?: string
  webinars?: any[]

  // Selects a custom action instead of the plain create:
  //   'panelist' | 'poll' | 'registrant'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WebinarUpdateData {
  id: string
  poll_id: string
  body: any
  agenda?: string
  created_at?: string
  duration?: string
  email?: string
  end_time?: string
  has_3rd_party_audio?: boolean
  has_pstn?: boolean
  has_recording?: boolean
  has_screen_share?: boolean
  has_sip?: boolean
  has_video?: boolean
  has_voip?: boolean
  host?: string
  host_id?: string
  join_url?: string
  occurrences?: any[]
  page_count?: number
  page_number?: number
  page_size?: number
  participants?: number
  questions?: any[]
  settings?: Record<string, any>
  start_time?: string
  start_url?: string
  status?: string
  timezone?: string
  title?: string
  topic?: string
  total_records?: number
  tracking_fields?: any[]
  type?: number
  user_type?: string
  uuid?: string
  webinars?: any[]

  // Selects a custom action instead of the plain update:
  //   'registrant_status' | 'status'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WebinarRemoveMatch {
  id: string
  occurrence_id?: string
  panelist_id?: string
  poll_id?: string

  // Selects a custom action instead of the plain remove:
  //   'panelist'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WebinarInstance {
  webinars?: any[]
}

export interface WebinarInstanceListMatch {
  past_webinar_id: string
}

export interface WebinarPanelistList {
  id?: string
  panelists?: any[]
  total_records?: number
}

export interface WebinarPanelistListListMatch {
  id: string

  // Selects a custom action instead of the plain list:
  //   'panelists'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface WebinarRegistrantList {
  id?: string
}

export interface WebinarRegistrantListLoadMatch {
  id: string
  occurrence_id?: string
  page_number?: number
  page_size?: number
  status?: any

  // Selects a custom action instead of the plain load:
  //   'registrants'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ZoomRoomList {
  page_count?: number
  page_number?: number
  page_size?: number
  total_records?: number
  zoom_rooms?: any[]
}

export interface ZoomRoomListListMatch {
  page_number?: number
  page_size?: number
}

