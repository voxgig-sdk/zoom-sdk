// Typed models for the Zoom SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Account
 * @property {Array} [accounts]
 * @property {string} [id]
 * @property {string} [meeting_connectors]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [pay_mode]
 * @property {string} [room_connectors]
 * @property {boolean} [share_mc]
 * @property {boolean} [share_rc]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} AccountLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} AccountListMatch
 * @property {number} [page_number]
 * @property {number} [page_size]
 */

/**
 * @typedef {Object} AccountCreateData
 * @property {Object} body
 * @property {Array} [accounts]
 * @property {string} [id]
 * @property {string} [meeting_connectors]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [pay_mode]
 * @property {string} [room_connectors]
 * @property {boolean} [share_mc]
 * @property {boolean} [share_rc]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} AccountUpdateData
 * @property {string} id
 * @property {Object} body
 * @property {Array} [accounts]
 * @property {string} [meeting_connectors]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [pay_mode]
 * @property {string} [room_connectors]
 * @property {boolean} [share_mc]
 * @property {boolean} [share_rc]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} AccountRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} AccountPlan
 * @property {string} [id]
 * @property {Object} [plan_audio]
 * @property {Object} plan_base
 * @property {Array} [plan_large_meeting]
 * @property {string} [plan_recording]
 * @property {Object} [plan_room_connector]
 * @property {Array} [plan_webinar]
 * @property {Object} [plan_zoom_rooms]
 */

/**
 * @typedef {Object} AccountPlanListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} AccountPlanCreateData
 * @property {string} id
 * @property {*} body
 * @property {Object} [plan_audio]
 * @property {Object} plan_base
 * @property {Array} [plan_large_meeting]
 * @property {string} [plan_recording]
 * @property {Object} [plan_room_connector]
 * @property {Array} [plan_webinar]
 * @property {Object} [plan_zoom_rooms]
 */

/**
 * @typedef {Object} AccountSetting
 * @property {Object} [email_notification]
 * @property {Object} [feature]
 * @property {string} [id]
 * @property {Object} [in_meeting]
 * @property {Object} [integration]
 * @property {Object} [recording]
 * @property {Object} [schedule_meting]
 * @property {Object} [security]
 * @property {Object} [telephony]
 * @property {Object} [zoom_rooms]
 */

/**
 * @typedef {Object} AccountSettingLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Billing
 * @property {string} address
 * @property {string} [apt]
 * @property {string} city
 * @property {string} country
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} phone_number
 * @property {string} state
 * @property {string} zip
 */

/**
 * @typedef {Object} BillingLoadMatch
 * @property {string} account_id
 */

/**
 * @typedef {Object} BillingCreateData
 * @property {string} account_id
 * @property {Object} body
 * @property {string} address
 * @property {string} [apt]
 * @property {string} city
 * @property {string} country
 * @property {string} email
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} phone_number
 * @property {string} state
 * @property {string} zip
 */

/**
 * @typedef {Object} BillingUpdateData
 * @property {string} account_id
 * @property {Object} body
 * @property {string} [address]
 * @property {string} [apt]
 * @property {string} [city]
 * @property {string} [country]
 * @property {string} [email]
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [phone_number]
 * @property {string} [state]
 * @property {string} [zip]
 */

/**
 * @typedef {Object} CloudRecording
 * @property {string} [id]
 */

/**
 * @typedef {Object} CloudRecordingLoadMatch
 * @property {string} meeting_id
 */

/**
 * @typedef {Object} CloudRecordingUpdateData
 * @property {string} meeting_id
 * @property {*} body
 * @property {string} [id]
 */

/**
 * @typedef {Object} CloudRecordingRemoveMatch
 * @property {string} [id]
 * @property {string} meeting_id
 * @property {*} [action]
 */

/**
 * @typedef {Object} Dashboard
 * @property {string} [account_type]
 * @property {string} [calender_name]
 * @property {string} [camera]
 * @property {Array} [crc_ports_usage]
 * @property {string} [device_ip]
 * @property {string} [email]
 * @property {string} [from]
 * @property {string} [id]
 * @property {string} [last_start_time]
 * @property {Object} [live_meeting]
 * @property {Array} [meetings]
 * @property {string} [microphone]
 * @property {string} [next_page_token]
 * @property {number} [page_count]
 * @property {number} [page_size]
 * @property {Array} [participants]
 * @property {Object} [past_meetings]
 * @property {string} [room_name]
 * @property {string} [speaker]
 * @property {string} [status]
 * @property {string} [to]
 * @property {number} [total_records]
 * @property {Array} [users]
 * @property {Array} [webinars]
 */

/**
 * @typedef {Object} DashboardLoadMatch
 * @property {string} zoomroom_id
 * @property {*} from
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {*} to
 */

/**
 * @typedef {Object} DashboardListMatch
 * @property {*} from
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} to
 * @property {*} [type]
 */

/**
 * @typedef {Object} Device
 * @property {Array} [devices]
 * @property {string} [id]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} DeviceListMatch
 * @property {Array} [devices]
 * @property {string} [id]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} DeviceCreateData
 * @property {Object} body
 * @property {Array} [devices]
 * @property {string} [id]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} DeviceUpdateData
 * @property {string} id
 * @property {Object} body
 * @property {Array} [devices]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} DeviceRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} DomainsList
 * @property {string} [domain]
 * @property {string} [status]
 */

/**
 * @typedef {Object} DomainsListListMatch
 * @property {string} account_id
 */

/**
 * @typedef {Object} Group
 * @property {string} [id]
 * @property {string} [name]
 * @property {number} [total_members]
 */

/**
 * @typedef {Object} GroupLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} GroupListMatch
 * @property {string} [id]
 * @property {string} [name]
 * @property {number} [total_members]
 */

/**
 * @typedef {Object} GroupCreateData
 * @property {*} body
 * @property {string} [id]
 * @property {string} [name]
 * @property {number} [total_members]
 */

/**
 * @typedef {Object} GroupUpdateData
 * @property {string} id
 * @property {*} body
 * @property {string} [name]
 * @property {number} [total_members]
 */

/**
 * @typedef {Object} GroupRemoveMatch
 * @property {string} id
 * @property {string} [member_id]
 */

/**
 * @typedef {Object} GroupMemberList
 * @property {string} [id]
 * @property {Array} [members]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} GroupMemberListListMatch
 * @property {string} id
 * @property {number} [page_number]
 * @property {number} [page_size]
 */

/**
 * @typedef {Object} ImChat
 * @property {string} [from]
 * @property {Array} [messages]
 * @property {string} [next_page_token]
 * @property {number} [page_size]
 * @property {string} [session_id]
 * @property {Array} [sessions]
 * @property {string} [to]
 */

/**
 * @typedef {Object} ImChatLoadMatch
 * @property {string} session_id
 * @property {*} from
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} to
 */

/**
 * @typedef {Object} ImChatListMatch
 * @property {*} from
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} to
 */

/**
 * @typedef {Object} ImGroup
 * @property {string} [id]
 */

/**
 * @typedef {Object} ImGroupLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ImGroupCreateData
 * @property {string} [group_id]
 * @property {*} body
 * @property {string} [id]
 */

/**
 * @typedef {Object} ImGroupUpdateData
 * @property {string} id
 * @property {*} body
 */

/**
 * @typedef {Object} ImGroupRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} ImGroupList
 * @property {Array} [groups]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} ImGroupListListMatch
 * @property {Array} [groups]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} Meeting
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {string} [h323_password]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [id]
 * @property {string} [join_url]
 * @property {Array} [meetings]
 * @property {string} [next_page_token]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {number} [participants_count]
 * @property {string} [password]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_minutes]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_email]
 * @property {string} [user_name]
 * @property {string} [user_type]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} MeetingLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} MeetingListMatch
 * @property {string} user_id
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {*} [type]
 */

/**
 * @typedef {Object} MeetingCreateData
 * @property {string} user_id
 * @property {*} body
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {string} [h323_password]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [id]
 * @property {string} [join_url]
 * @property {Array} [meetings]
 * @property {string} [next_page_token]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {number} [participants_count]
 * @property {string} [password]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_minutes]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_email]
 * @property {string} [user_name]
 * @property {string} [user_type]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} MeetingUpdateData
 * @property {string} id
 * @property {string} poll_id
 * @property {*} body
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {string} [h323_password]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [join_url]
 * @property {Array} [meetings]
 * @property {string} [next_page_token]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {number} [participants_count]
 * @property {string} [password]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_minutes]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_email]
 * @property {string} [user_name]
 * @property {string} [user_type]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} MeetingRemoveMatch
 * @property {string} id
 * @property {string} [occurrence_id]
 * @property {string} [poll_id]
 */

/**
 * @typedef {Object} MeetingInstance
 * @property {Array} [meetings]
 */

/**
 * @typedef {Object} MeetingInstanceListMatch
 * @property {string} past_meeting_id
 */

/**
 * @typedef {Object} MeetingInvitation
 * @property {string} [id]
 * @property {string} [invitation]
 */

/**
 * @typedef {Object} MeetingInvitationLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} MeetingRegistrantList
 * @property {string} [id]
 */

/**
 * @typedef {Object} MeetingRegistrantListLoadMatch
 * @property {string} id
 * @property {string} [occurrence_id]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {*} [status]
 */

/**
 * @typedef {Object} Pac
 * @property {number} [conference_id]
 * @property {Array} dedicated_dial_in_number
 * @property {Array} global_dial_in_numbers
 * @property {string} [listen_only_password]
 * @property {string} [participant_password]
 */

/**
 * @typedef {Object} PacListMatch
 * @property {string} user_id
 */

/**
 * @typedef {Object} Poll
 * @property {Array} [polls]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} PollListMatch
 * @property {string} meeting_id
 */

/**
 * @typedef {Object} Qos
 * @property {Object} [as_input]
 * @property {Object} [as_output]
 * @property {Object} [audio_input]
 * @property {Object} [audio_output]
 * @property {*} [cpu_usage]
 * @property {string} [date_time]
 * @property {string} [next_page_token]
 * @property {number} [page_count]
 * @property {number} [page_size]
 * @property {Array} [participants]
 * @property {number} [total_records]
 * @property {Object} [video_input]
 * @property {Object} [video_output]
 */

/**
 * @typedef {Object} QosLoadMatch
 * @property {string} [meeting_id]
 * @property {string} participant_id
 * @property {*} [type]
 * @property {string} [webinar_id]
 */

/**
 * @typedef {Object} QosListMatch
 * @property {string} meeting_id
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} [type]
 */

/**
 * @typedef {Object} Recording
 * @property {string} [from]
 * @property {Array} [meetings]
 * @property {string} [next_page_token]
 * @property {number} [page_count]
 * @property {number} [page_size]
 * @property {string} [to]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} RecordingListMatch
 * @property {string} user_id
 * @property {*} from
 * @property {*} [mc]
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} to
 * @property {*} [trash]
 */

/**
 * @typedef {Object} RecordingSetting
 * @property {number} [approval_type]
 * @property {boolean} [on_demand]
 * @property {string} [password]
 * @property {boolean} [send_email_to_host]
 * @property {string} [share_recording]
 * @property {boolean} [show_social_share_buttons]
 * @property {boolean} [viewer_download]
 */

/**
 * @typedef {Object} RecordingSettingLoadMatch
 * @property {string} meeting_id
 */

/**
 * @typedef {Object} Report
 * @property {number} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {string} [from]
 * @property {number} [id]
 * @property {Array} [meetings]
 * @property {string} [name]
 * @property {string} [next_page_token]
 * @property {number} [page_count]
 * @property {number} [page_size]
 * @property {Array} [participants]
 * @property {number} [participants_count]
 * @property {Array} [question_details]
 * @property {string} [start_time]
 * @property {string} [to]
 * @property {string} [topic]
 * @property {number} [total_minutes]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_email]
 * @property {string} [user_name]
 * @property {string} [uuid]
 */

/**
 * @typedef {Object} ReportLoadMatch
 * @property {string} meeting_id
 */

/**
 * @typedef {Object} ReportListMatch
 * @property {string} user_id
 * @property {*} from
 * @property {*} [next_page_token]
 * @property {number} [page_size]
 * @property {*} to
 */

/**
 * @typedef {Object} TrackingField
 * @property {string} [field]
 * @property {string} [id]
 * @property {Array} [recommended_values]
 * @property {boolean} [required]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {boolean} [visible]
 */

/**
 * @typedef {Object} TrackingFieldLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} TrackingFieldListMatch
 * @property {string} [field]
 * @property {string} [id]
 * @property {Array} [recommended_values]
 * @property {boolean} [required]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {boolean} [visible]
 */

/**
 * @typedef {Object} TrackingFieldCreateData
 * @property {Object} body
 * @property {string} [field]
 * @property {string} [id]
 * @property {Array} [recommended_values]
 * @property {boolean} [required]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {boolean} [visible]
 */

/**
 * @typedef {Object} TrackingFieldUpdateData
 * @property {string} id
 * @property {Object} body
 * @property {string} [field]
 * @property {Array} [recommended_values]
 * @property {boolean} [required]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {boolean} [visible]
 */

/**
 * @typedef {Object} TrackingFieldRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Tsp
 * @property {string} [code]
 * @property {string} conference_code
 * @property {Array} dial_in_numbers
 * @property {string} [id]
 * @property {string} leader_pin
 * @property {string} [number]
 * @property {string} [type]
 */

/**
 * @typedef {Object} TspLoadMatch
 * @property {string} id
 * @property {string} user_id
 */

/**
 * @typedef {Object} TspListMatch
 * @property {string} [code]
 * @property {string} [conference_code]
 * @property {Array} [dial_in_numbers]
 * @property {string} [id]
 * @property {string} [leader_pin]
 * @property {string} [number]
 * @property {string} [type]
 */

/**
 * @typedef {Object} TspCreateData
 * @property {string} user_id
 * @property {Object} body
 * @property {string} [code]
 * @property {string} conference_code
 * @property {Array} dial_in_numbers
 * @property {string} [id]
 * @property {string} leader_pin
 * @property {string} [number]
 * @property {string} [type]
 */

/**
 * @typedef {Object} TspUpdateData
 * @property {string} [id]
 * @property {string} [user_id]
 * @property {Object} body
 * @property {string} [code]
 * @property {string} [conference_code]
 * @property {Array} [dial_in_numbers]
 * @property {string} [leader_pin]
 * @property {string} [number]
 * @property {string} [type]
 */

/**
 * @typedef {Object} TspRemoveMatch
 * @property {string} id
 * @property {string} user_id
 */

/**
 * @typedef {Object} User
 * @property {string} [account_id]
 * @property {string} [cms_user_id]
 * @property {string} [created_at]
 * @property {string} [dept]
 * @property {string} email
 * @property {string} [first_name]
 * @property {Array} [group_ids]
 * @property {string} [host_key]
 * @property {string} [id]
 * @property {Array} [im_group_ids]
 * @property {string} [language]
 * @property {string} [last_client_version]
 * @property {string} [last_login_time]
 * @property {string} [last_name]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [personal_meeting_url]
 * @property {string} [pic_url]
 * @property {string} [pmi]
 * @property {string} [timezone]
 * @property {number} [total_records]
 * @property {number} type
 * @property {boolean} [use_pmi]
 * @property {Array} [users]
 * @property {string} [vanity_url]
 * @property {number} [verified]
 */

/**
 * @typedef {Object} UserLoadMatch
 * @property {string} id
 * @property {*} [login_type]
 */

/**
 * @typedef {Object} UserListMatch
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {*} [status]
 */

/**
 * @typedef {Object} UserCreateData
 * @property {Object} body
 * @property {string} [account_id]
 * @property {string} [cms_user_id]
 * @property {string} [created_at]
 * @property {string} [dept]
 * @property {string} email
 * @property {string} [first_name]
 * @property {Array} [group_ids]
 * @property {string} [host_key]
 * @property {string} [id]
 * @property {Array} [im_group_ids]
 * @property {string} [language]
 * @property {string} [last_client_version]
 * @property {string} [last_login_time]
 * @property {string} [last_name]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [personal_meeting_url]
 * @property {string} [pic_url]
 * @property {string} [pmi]
 * @property {string} [timezone]
 * @property {number} [total_records]
 * @property {number} type
 * @property {boolean} [use_pmi]
 * @property {Array} [users]
 * @property {string} [vanity_url]
 * @property {number} [verified]
 */

/**
 * @typedef {Object} UserUpdateData
 * @property {string} id
 * @property {Object} body
 * @property {string} [account_id]
 * @property {string} [cms_user_id]
 * @property {string} [created_at]
 * @property {string} [dept]
 * @property {string} [email]
 * @property {string} [first_name]
 * @property {Array} [group_ids]
 * @property {string} [host_key]
 * @property {Array} [im_group_ids]
 * @property {string} [language]
 * @property {string} [last_client_version]
 * @property {string} [last_login_time]
 * @property {string} [last_name]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {string} [personal_meeting_url]
 * @property {string} [pic_url]
 * @property {string} [pmi]
 * @property {string} [timezone]
 * @property {number} [total_records]
 * @property {number} [type]
 * @property {boolean} [use_pmi]
 * @property {Array} [users]
 * @property {string} [vanity_url]
 * @property {number} [verified]
 */

/**
 * @typedef {Object} UserRemoveMatch
 * @property {string} id
 * @property {*} [action]
 * @property {*} [transfer_email]
 * @property {*} [transfer_meeting]
 * @property {*} [transfer_recording]
 * @property {*} [transfer_webinar]
 * @property {string} [assistant_id]
 * @property {string} [scheduler_id]
 */

/**
 * @typedef {Object} UserAssistantsList
 * @property {string} [id]
 */

/**
 * @typedef {Object} UserAssistantsListListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} UserPermission
 * @property {string} [id]
 * @property {Array} [permissions]
 */

/**
 * @typedef {Object} UserPermissionListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} UserSchedulersList
 * @property {string} [id]
 */

/**
 * @typedef {Object} UserSchedulersListListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} UserSetting
 * @property {Object} [email_notification]
 * @property {Object} [feature]
 * @property {string} [id]
 * @property {Object} [in_meeting]
 * @property {Object} [recording]
 * @property {Object} [schedule_meeting]
 * @property {Object} [telephony]
 */

/**
 * @typedef {Object} UserSettingLoadMatch
 * @property {string} id
 * @property {*} [login_type]
 */

/**
 * @typedef {Object} Webhook
 * @property {string} auth_password
 * @property {string} auth_user
 * @property {string} [created_at]
 * @property {Array} events
 * @property {string} [id]
 * @property {number} [total_records]
 * @property {string} url
 * @property {string} [webhook_id]
 * @property {Array} [webhooks]
 */

/**
 * @typedef {Object} WebhookLoadMatch
 * @property {string} id
 */

/**
 * @typedef {Object} WebhookListMatch
 * @property {string} [auth_password]
 * @property {string} [auth_user]
 * @property {string} [created_at]
 * @property {Array} [events]
 * @property {string} [id]
 * @property {number} [total_records]
 * @property {string} [url]
 * @property {string} [webhook_id]
 * @property {Array} [webhooks]
 */

/**
 * @typedef {Object} WebhookCreateData
 * @property {Object} body
 * @property {string} auth_password
 * @property {string} auth_user
 * @property {string} [created_at]
 * @property {Array} events
 * @property {string} [id]
 * @property {number} [total_records]
 * @property {string} url
 * @property {string} [webhook_id]
 * @property {Array} [webhooks]
 */

/**
 * @typedef {Object} WebhookUpdateData
 * @property {string} id
 * @property {Object} body
 * @property {string} [auth_password]
 * @property {string} [auth_user]
 * @property {string} [created_at]
 * @property {Array} [events]
 * @property {number} [total_records]
 * @property {string} [url]
 * @property {string} [webhook_id]
 * @property {Array} [webhooks]
 */

/**
 * @typedef {Object} WebhookRemoveMatch
 * @property {string} id
 */

/**
 * @typedef {Object} Webinar
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [id]
 * @property {string} [join_url]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_type]
 * @property {string} [uuid]
 * @property {Array} [webinars]
 */

/**
 * @typedef {Object} WebinarLoadMatch
 * @property {string} id
 * @property {string} [poll_id]
 * @property {*} [type]
 */

/**
 * @typedef {Object} WebinarListMatch
 * @property {string} user_id
 * @property {number} [page_number]
 * @property {number} [page_size]
 */

/**
 * @typedef {Object} WebinarCreateData
 * @property {string} user_id
 * @property {Object} body
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [id]
 * @property {string} [join_url]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_type]
 * @property {string} [uuid]
 * @property {Array} [webinars]
 */

/**
 * @typedef {Object} WebinarUpdateData
 * @property {string} id
 * @property {string} poll_id
 * @property {*} body
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {string} [duration]
 * @property {string} [email]
 * @property {string} [end_time]
 * @property {boolean} [has_3rd_party_audio]
 * @property {boolean} [has_pstn]
 * @property {boolean} [has_recording]
 * @property {boolean} [has_screen_share]
 * @property {boolean} [has_sip]
 * @property {boolean} [has_video]
 * @property {boolean} [has_voip]
 * @property {string} [host]
 * @property {string} [host_id]
 * @property {string} [join_url]
 * @property {Array} [occurrences]
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [participants]
 * @property {Array} [questions]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [start_url]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [title]
 * @property {string} [topic]
 * @property {number} [total_records]
 * @property {Array} [tracking_fields]
 * @property {number} [type]
 * @property {string} [user_type]
 * @property {string} [uuid]
 * @property {Array} [webinars]
 */

/**
 * @typedef {Object} WebinarRemoveMatch
 * @property {string} id
 * @property {string} [occurrence_id]
 * @property {string} [panelist_id]
 * @property {string} [poll_id]
 */

/**
 * @typedef {Object} WebinarInstance
 * @property {Array} [webinars]
 */

/**
 * @typedef {Object} WebinarInstanceListMatch
 * @property {string} past_webinar_id
 */

/**
 * @typedef {Object} WebinarPanelistList
 * @property {string} [id]
 * @property {Array} [panelists]
 * @property {number} [total_records]
 */

/**
 * @typedef {Object} WebinarPanelistListListMatch
 * @property {string} id
 */

/**
 * @typedef {Object} WebinarRegistrantList
 * @property {string} [id]
 */

/**
 * @typedef {Object} WebinarRegistrantListLoadMatch
 * @property {string} id
 * @property {string} [occurrence_id]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {*} [status]
 */

/**
 * @typedef {Object} ZoomRoomList
 * @property {number} [page_count]
 * @property {number} [page_number]
 * @property {number} [page_size]
 * @property {number} [total_records]
 * @property {Array} [zoom_rooms]
 */

/**
 * @typedef {Object} ZoomRoomListListMatch
 * @property {number} [page_number]
 * @property {number} [page_size]
 */

