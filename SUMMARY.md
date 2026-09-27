# Zoom API

API Description

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 36 entities and 155 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Account](docs/api/account.html)

Results: Account Created; Account list returned; Account object returned; Account deleted; Account options updated; Account settings updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `accounts`: List of Account objects
- `id`: Account ID
- `meeting_connectors`: Meeting Connector, multiple values separated by comma
- `page_count`: The number of items returned on this page
- `page_number`: The page number of current results

### [AccountPlan](docs/api/account_plan.html)

Results: Account plans updated; Account plans returned.

SDK operations: `create`, `list`.

Key fields to recognise:

- `plan_audio`: Additional Audio Conferencing &lt;a href=&quot;#plans&quot;&gt;plan type&lt;/a&gt;
- `plan_base`: Account base plan object
- `plan_large_meeting`: Additional Large Meeting Plans
- `plan_recording`: Additional Cloud Recording Plan
- `plan_room_connector`: Account plan object

### [AccountSetting](docs/api/account_setting.html)

Results: Account settings returned.

SDK operations: `load`.

Key fields to recognise:

- `email_notification`: Account Settings: Notification
- `feature`: Account Settings: Feature
- `in_meeting`: Account Settings: In Meeting
- `integration`: Account Settings: Integration
- `recording`: Account Settings: Recording

### [Billing](docs/api/billing.html)

Results: Account plans updated; Account billing contact information returned; Account billing contact information updated.

SDK operations: `create`, `load`, `patch`, `update`.

Key fields to recognise:

- `address`: Billing Contact&#39;s address
- `apt`: Billing Contact&#39;s apartment/suite
- `city`: Billing Contact&#39;s city
- `country`: Billing Contact&#39;s country
- `email`: Billing Contact&#39;s email address

### [CloudRecording](docs/api/cloud_recording.html)

Results: Recording object returned; Meeting recording setting&#39;s updated; Meeting recording file deleted; Meeting recording deleted; Meeting recording recover.

SDK operations: `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `id`: Meeting ID, also know as meeting number

### [Dashboard](docs/api/dashboard.html)

Results: Meetings Returned; IM setails returned; Meeting Participants Returned; Webinar Participants Returned; CRC Usage returned; Zoom Room returned.

SDK operations: `list`, `load`.

Key fields to recognise:

- `account_type`: Zoom Room email type
- `calender_name`: Zoom Calendar name
- `camera`: Zoom Room camera
- `device_ip`: Zoom Room device IP
- `email`: User email

### [Device](docs/api/device.html)

Results: H.323/SIP Device created; List of H.323/SIP Devices returned.; H.323/SIP Device deleted; H.323/SIP Device updated.

SDK operations: `create`, `list`, `remove`, `update`.

Key fields to recognise:

- `devices`: List of H.323/SIP Device objects
- `id`: Device ID
- `page_count`: The number of items returned on this page
- `page_number`: The page number of current results
- `page_size`: The number of records returned within a single API call

### [DomainsList](docs/api/domains_list.html)

Results: Account managed domains returned.

SDK operations: `list`.

Key fields to recognise:

- `domain`: Domain Name
- `status`: Domain Status

### [Group](docs/api/group.html)

Results: Member added; Group created; List of groups returned; Group object returned; Group member deleted; Group deleted; Group updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `id`: Group ID
- `name`: Group name
- `total_members`: Group member count

### [GroupMemberList](docs/api/group_member_list.html)

Results: Group member list returned; IM Group member list returned.

SDK operations: `list`.

Key fields to recognise:

- `id`: User ID
- `members`: List of Group member objects
- `page_count`: The number of items returned on this page
- `page_number`: The page number of current results
- `page_size`: The number of records returned within a single API call

### [ImChat](docs/api/im_chat.html)

Results: Archived IM Chat sessions Returned; Archived IM Chat messages Returned.

SDK operations: `list`, `load`.

Key fields to recognise:

- `from`: Start date
- `messages`: Array of session objects
- `next_page_token`: Next page token, used to paginate through large result sets. A next page token will be returned whenever the set of available result list exceeds page size. The expiration period is 15 minutes.
- `page_size`: The amount of records returns within a single API call.
- `session_id`: IM Chat session ID

### [ImGroup](docs/api/im_group.html)

Results: Member added; IM Group created; IM Group object returned; IM Group member deleted; IM Group deleted; IM Group updated.

SDK operations: `create`, `load`, `remove`, `update`.

Key fields to recognise:

- `id`: Group ID

### [ImGroupList](docs/api/im_group_list.html)

Results: List of IM Groups returned.

SDK operations: `list`.

Key fields to recognise:

- `groups`: List of Group objects
- `page_count`: The number of items returned on this page
- `page_number`: The page number of current results
- `page_size`: The number of records returned within a single API call
- `total_records`: The number of all records available across pages

### [Meeting](docs/api/meeting.html)

Results: Registration created; Meeting Poll Created; Meeting Created; List of Meeting objects returned; Meeting Participants Report Returned; Meeting Poll object returned; Meeting Returned; Meeting object returned; Meeting detail Returned; Meeting Updated; Meeting live stream Updated; Meeting deleted; Meeting Poll deleted; Registrant status updated; Meeting Poll Updated; Meeting updated.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `agenda`: Agenda
- `created_at`: Create time
- `duration`: Meeting duration
- `email`: User email
- `end_time`: Meeting end time

### [MeetingInstance](docs/api/meeting_instance.html)

Results: List of ended meeting instances.

SDK operations: `list`.

Key fields to recognise:

- `meetings`: List of ended meeting instances.

### [MeetingInvitation](docs/api/meeting_invitation.html)

Results: Meeting invitation Returned.

SDK operations: `load`.

Key fields to recognise:

- `invitation`: Meeting invitation

### [MeetingRegistrantList](docs/api/meeting_registrant_list.html)

Results: Success.

SDK operations: `load`.

### [Pac](docs/api/pac.html)

Results: PAC Account list returned.

SDK operations: `list`.

Key fields to recognise:

- `conference_id`: Conference ID
- `dedicated_dial_in_number`: List of Dedicated Dial In Numbers
- `global_dial_in_numbers`: List of Global Dial In Numbers
- `listen_only_password`: Listen-Only Password, numeric value, length is less than 6
- `participant_password`: Participant Password, numeric value, length is less than 6

### [Poll](docs/api/poll.html)

Results: List polls of a Meeting returned; List polls of a Webinar returned.

SDK operations: `list`.

Key fields to recognise:

- `polls`: Array of Polls
- `total_records`: The number of all records available across pages

### [Qos](docs/api/qos.html)

Results: Meeting Participants Returned; Webinar Participants Returned; Meeting Participant QOS Returned; Webinar Participant QOS Returned.

SDK operations: `list`, `load`.

Key fields to recognise:

- `as_input`: Quality of Service object
- `as_output`: Quality of Service object
- `audio_input`: Quality of Service object
- `audio_output`: Quality of Service object
- `date_time`: Datetime of QOS

### [Recording](docs/api/recording.html)

Results: List of Recording objects returned.

SDK operations: `list`.

Key fields to recognise:

- `from`: Start Date,
- `meetings`: List of Recording
- `next_page_token`: Next page token is used to paginate through large result sets. A next page token will be returned whenever the set of available results exceed the current page size. The expiration period for this token is 15 minutes.
- `page_count`: The number of items returned on this page
- `page_size`: The number of records returned within a single API call.

### [RecordingSetting](docs/api/recording_setting.html)

Results: Meeting recording settings returned.

SDK operations: `load`.

Key fields to recognise:

- `approval_type`: Approval type
- `on_demand`: Registration required
- `password`: Password protect
- `send_email_to_host`: Send an email to host when someone registers
- `share_recording`: Determine if the meeting recording is shared

### [Report](docs/api/report.html)

Results: Active/Inactive Hosts Report Returned; Telephone Report Returned; Meeting Participants Report Returned; Cloud Recording Report Returned; Daily Report Returned; Meeting Polls Report Returned; Webinar Polls Report Returned; Webinar Q&amp;A Report Returned; Meeting detail Returned; Webinar detail Returned.

SDK operations: `list`, `load`.

Key fields to recognise:

- `duration`: Meeting duration
- `email`: User email
- `end_time`: Meeting end time
- `from`: Start date for this report
- `id`: Meeting ID

### [TrackingField](docs/api/tracking_field.html)

Results: Tracking Field created; List of Tracking Fields returned.; Tracking Field object returned; Tracking Field deleted; Tracking Field updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `field`: Tracking Field Name
- `id`: Tracking Field ID
- `recommended_values`: Array of recommended values
- `required`: Tracking Field Required
- `total_records`: The number of all records available across pages

### [Tsp](docs/api/tsp.html)

Results: TSP Account added; TSP Account list returned; TSP account detail returned; TSP Account returned; TSP Account deleted; TSP Account updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `code`: Country Code
- `conference_code`: Conference code, numeric value, length is less than 16.
- `dial_in_numbers`: List of Dial In Numbers
- `leader_pin`: Leader PIN, numeric value, length is less than 16.
- `number`: Dial-in number, length is less than 16.

### [User](docs/api/user.html)

Results: Assitant Added; Picture Uploaded; User Created; User list returned; User object returned; Token returned; Success; User deleted; Assitant deleted; Scheduler deleted.; Assitants deleted; Schedulers deleted.; Token deleted; User updated; email updated; Password updated; User setting&#39;s updated; Status updated.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `created_at`: User create time
- `dept`: Department
- `email`: User&#39;s email address
- `first_name`: User&#39;s first name
- `id`: User ID

### [UserAssistantsList](docs/api/user_assistants_list.html)

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `id`: User ID

### [UserPermission](docs/api/user_permission.html)

Results: User permissions returned.

SDK operations: `list`.

Key fields to recognise:

- `permissions`: List of user permissions

### [UserSchedulersList](docs/api/user_schedulers_list.html)

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `id`: User ID

### [UserSetting](docs/api/user_setting.html)

Results: User settings returned.

SDK operations: `load`.

Key fields to recognise:

- `in_meeting`: IN meeting feature

### [Webhook](docs/api/webhook.html)

Results: Webhook Created; List of Webhook objects returned; Webhook object returned; Webhook deleted; Webhook Updated; Webhook Subscribe version update.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `auth_password`: Webhook auth password
- `auth_user`: Webhook auth user name
- `created_at`: Webhook create time
- `events`: List of events objects.
- `total_records`: The number of all records available across pages

### [Webinar](docs/api/webinar.html)

Results: Registration created; Panelist created; Webinar Poll Created; Webinar Created; List of Webinar objects returned; Webinar Poll object returned; Webinar Returned; Webinar object returned; Webinar Updated; Webinar deleted; Panelists removed; Webinar Poll deleted; Registrant status updated; Webinar Poll Updated; Webinar updated.

SDK operations: `create`, `list`, `load`, `patch`, `remove`, `update`.

Key fields to recognise:

- `agenda`: Webinar agenda
- `created_at`: Create time
- `duration`: Webinar duration
- `email`: User email
- `end_time`: Webinar end time

### [WebinarInstance](docs/api/webinar_instance.html)

Results: List of ended webinar instances.

SDK operations: `list`.

Key fields to recognise:

- `webinars`: List of ended webinar instances.

### [WebinarPanelistList](docs/api/webinar_panelist_list.html)

Results: Success.

SDK operations: `list`.

Key fields to recognise:

- `id`: Panelist&#39;s ID
- `panelists`: List of Panelist objects
- `total_records`: Total records

### [WebinarRegistrantList](docs/api/webinar_registrant_list.html)

Results: Success.

SDK operations: `load`.

### [ZoomRoomList](docs/api/zoom_room_list.html)

Results: List of Zoom Rooms returned.

SDK operations: `list`.

Key fields to recognise:

- `page_count`: The number of items returned on this page
- `page_number`: The page number of current results
- `page_size`: The number of records returned within a single API call
- `total_records`: The number of all records available across pages
- `zoom_rooms`: Array of Zoom Rooms

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Account](docs/api/account.html) | `create` | `POST /accounts` | Required |
| [Account](docs/api/account.html) | `list` | `GET /accounts` | Required |
| [Account](docs/api/account.html) | `load` | `GET /accounts/{accountId}` | Required |
| [Account](docs/api/account.html) | `remove` | `DELETE /accounts/{accountId}` | Required |
| [Account](docs/api/account.html) | `update` | `PATCH /accounts/{accountId}/options` | Required |
| [Account](docs/api/account.html) | `update` | `PATCH /accounts/{accountId}/settings` | Required |
| [AccountPlan](docs/api/account_plan.html) | `create` | `POST /accounts/{accountId}/plans` | Required |
| [AccountPlan](docs/api/account_plan.html) | `list` | `GET /accounts/{accountId}/plans` | Required |
| [AccountSetting](docs/api/account_setting.html) | `load` | `GET /accounts/{accountId}/settings` | Required |
| [Billing](docs/api/billing.html) | `create` | `POST /accounts/{accountId}/plans/addons` | Required |
| [Billing](docs/api/billing.html) | `load` | `GET /accounts/{accountId}/billing` | Required |
| [Billing](docs/api/billing.html) | `patch` | `PATCH /accounts/{accountId}/billing` | Required |
| [Billing](docs/api/billing.html) | `update` | `PUT /accounts/{accountId}/plans/addons` | Required |
| [Billing](docs/api/billing.html) | `update` | `PUT /accounts/{accountId}/plans/base` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `load` | `GET /meetings/{meetingId}/recordings` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `patch` | `PATCH /meetings/{meetingId}/recordings/settings` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `remove` | `DELETE /meetings/{meetingId}/recordings/{recordingId}` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `remove` | `DELETE /meetings/{meetingId}/recordings` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `update` | `PUT /meetings/{meetingId}/recordings/{recordingId}/status` | Required |
| [CloudRecording](docs/api/cloud_recording.html) | `update` | `PUT /meetings/{meetingId}/recordings/status` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/meetings` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/webinars` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/im` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/meetings/{meetingId}/participants` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/meetings/{meetingId}/participants/sharing` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/webinars/{webinarId}/participants` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/webinars/{webinarId}/participants/sharing` | Required |
| [Dashboard](docs/api/dashboard.html) | `list` | `GET /metrics/crc` | Required |
| [Dashboard](docs/api/dashboard.html) | `load` | `GET /metrics/zoomrooms/{zoomroomId}` | Required |
| [Device](docs/api/device.html) | `create` | `POST /h323/devices` | Required |
| [Device](docs/api/device.html) | `list` | `GET /h323/devices` | Required |
| [Device](docs/api/device.html) | `remove` | `DELETE /h323/devices/{deviceId}` | Required |
| [Device](docs/api/device.html) | `update` | `PATCH /h323/devices/{deviceId}` | Required |
| [DomainsList](docs/api/domains_list.html) | `list` | `GET /accounts/{accountId}/managed_domains` | Required |
| [Group](docs/api/group.html) | `create` | `POST /groups/{groupId}/members` | Required |
| [Group](docs/api/group.html) | `create` | `POST /groups` | Required |
| [Group](docs/api/group.html) | `list` | `GET /groups` | Required |
| [Group](docs/api/group.html) | `load` | `GET /groups/{groupId}` | Required |
| [Group](docs/api/group.html) | `remove` | `DELETE /groups/{groupId}/members/{memberId}` | Required |
| [Group](docs/api/group.html) | `remove` | `DELETE /groups/{groupId}` | Required |
| [Group](docs/api/group.html) | `update` | `PATCH /groups/{groupId}` | Required |
| [GroupMemberList](docs/api/group_member_list.html) | `list` | `GET /groups/{groupId}/members` | Required |
| [GroupMemberList](docs/api/group_member_list.html) | `list` | `GET /im/groups/{groupId}/members` | Required |
| [ImChat](docs/api/im_chat.html) | `list` | `GET /im/chat/sessions` | Required |
| [ImChat](docs/api/im_chat.html) | `load` | `GET /im/chat/sessions/{sessionId}` | Required |
| [ImGroup](docs/api/im_group.html) | `create` | `POST /im/groups/{groupId}/members` | Required |
| [ImGroup](docs/api/im_group.html) | `create` | `POST /im/groups` | Required |
| [ImGroup](docs/api/im_group.html) | `load` | `GET /im/groups/{groupId}` | Required |
| [ImGroup](docs/api/im_group.html) | `remove` | `DELETE /im/groups/{groupId}/members/{memberId}` | Required |
| [ImGroup](docs/api/im_group.html) | `remove` | `DELETE /im/groups/{groupId}` | Required |
| [ImGroup](docs/api/im_group.html) | `update` | `PATCH /im/groups/{groupId}` | Required |
| [ImGroupList](docs/api/im_group_list.html) | `list` | `GET /im/groups` | Required |
| [Meeting](docs/api/meeting.html) | `create` | `POST /meetings/{meetingId}/registrants` | Required |
| [Meeting](docs/api/meeting.html) | `create` | `POST /meetings/{meetingId}/polls` | Required |
| [Meeting](docs/api/meeting.html) | `create` | `POST /users/{userId}/meetings` | Required |
| [Meeting](docs/api/meeting.html) | `list` | `GET /users/{userId}/meetings` | Required |
| [Meeting](docs/api/meeting.html) | `list` | `GET /past_meetings/{meetingUUID}/participants` | Required |
| [Meeting](docs/api/meeting.html) | `load` | `GET /meetings/{meetingId}/polls/{pollId}` | Required |
| [Meeting](docs/api/meeting.html) | `load` | `GET /metrics/meetings/{meetingId}` | Required |
| [Meeting](docs/api/meeting.html) | `load` | `GET /meetings/{meetingId}` | Required |
| [Meeting](docs/api/meeting.html) | `load` | `GET /past_meetings/{meetingUUID}` | Required |
| [Meeting](docs/api/meeting.html) | `patch` | `PATCH /meetings/{meetingId}` | Required |
| [Meeting](docs/api/meeting.html) | `patch` | `PATCH /meetings/{meetingId}/livestream` | Required |
| [Meeting](docs/api/meeting.html) | `patch` | `PATCH /meetings/{meetingId}/livestream/status` | Required |
| [Meeting](docs/api/meeting.html) | `remove` | `DELETE /meetings/{meetingId}` | Required |
| [Meeting](docs/api/meeting.html) | `remove` | `DELETE /meetings/{meetingId}/polls/{pollId}` | Required |
| [Meeting](docs/api/meeting.html) | `update` | `PUT /meetings/{meetingId}/registrants/status` | Required |
| [Meeting](docs/api/meeting.html) | `update` | `PUT /meetings/{meetingId}/polls/{pollId}` | Required |
| [Meeting](docs/api/meeting.html) | `update` | `PUT /meetings/{meetingId}/status` | Required |
| [MeetingInstance](docs/api/meeting_instance.html) | `list` | `GET /past_meetings/{meetingId}/instances` | Required |
| [MeetingInvitation](docs/api/meeting_invitation.html) | `load` | `GET /meetings/{meetingId}/invitation` | Required |
| [MeetingRegistrantList](docs/api/meeting_registrant_list.html) | `load` | `GET /meetings/{meetingId}/registrants` | Required |
| [Pac](docs/api/pac.html) | `list` | `GET /users/{userId}/pac` | Required |
| [Poll](docs/api/poll.html) | `list` | `GET /meetings/{meetingId}/polls` | Required |
| [Poll](docs/api/poll.html) | `list` | `GET /webinars/{webinarId}/polls` | Required |
| [Qos](docs/api/qos.html) | `list` | `GET /metrics/meetings/{meetingId}/participants/qos` | Required |
| [Qos](docs/api/qos.html) | `list` | `GET /metrics/webinars/{webinarId}/participants/qos` | Required |
| [Qos](docs/api/qos.html) | `load` | `GET /metrics/meetings/{meetingId}/participants/{participantId}/qos` | Required |
| [Qos](docs/api/qos.html) | `load` | `GET /metrics/webinars/{webinarId}/participants/{participantId}/qos` | Required |
| [Recording](docs/api/recording.html) | `list` | `GET /users/{userId}/recordings` | Required |
| [RecordingSetting](docs/api/recording_setting.html) | `load` | `GET /meetings/{meetingId}/recordings/settings` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/users/{userId}/meetings` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/telephone` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/users` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/meetings/{meetingId}/participants` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/webinars/{webinarId}/participants` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/cloud_recording` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/daily` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/meetings/{meetingId}/polls` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/webinars/{webinarId}/polls` | Required |
| [Report](docs/api/report.html) | `list` | `GET /report/webinars/{webinarId}/qa` | Required |
| [Report](docs/api/report.html) | `load` | `GET /report/meetings/{meetingId}` | Required |
| [Report](docs/api/report.html) | `load` | `GET /report/webinars/{webinarId}` | Required |
| [TrackingField](docs/api/tracking_field.html) | `create` | `POST /v2/tracking_fields` | Required |
| [TrackingField](docs/api/tracking_field.html) | `list` | `GET /v2/tracking_fields` | Required |
| [TrackingField](docs/api/tracking_field.html) | `load` | `GET /v2/tracking_fields/{fieldId}` | Required |
| [TrackingField](docs/api/tracking_field.html) | `remove` | `DELETE /v2/tracking_fields/{fieldId}` | Required |
| [TrackingField](docs/api/tracking_field.html) | `update` | `PATCH /v2/tracking_fields/{fieldId}` | Required |
| [Tsp](docs/api/tsp.html) | `create` | `POST /users/{userId}/tsp` | Required |
| [Tsp](docs/api/tsp.html) | `list` | `GET /users/{userId}/tsp` | Required |
| [Tsp](docs/api/tsp.html) | `list` | `GET /tsp` | Required |
| [Tsp](docs/api/tsp.html) | `load` | `GET /users/{userId}/tsp/{tspId}` | Required |
| [Tsp](docs/api/tsp.html) | `remove` | `DELETE /users/{userId}/tsp/{tspId}` | Required |
| [Tsp](docs/api/tsp.html) | `update` | `PATCH /users/{userId}/tsp/{tspId}` | Required |
| [Tsp](docs/api/tsp.html) | `update` | `PATCH /tsp` | Required |
| [User](docs/api/user.html) | `create` | `POST /users/{userId}/assistants` | Required |
| [User](docs/api/user.html) | `create` | `POST /users/{userId}/picture` | Required |
| [User](docs/api/user.html) | `create` | `POST /users` | Required |
| [User](docs/api/user.html) | `list` | `GET /users` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/{userId}` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/{userId}/token` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/email` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/vanity_name` | Required |
| [User](docs/api/user.html) | `load` | `GET /users/zpk` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}/assistants/{assistantId}` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}/schedulers/{schedulerId}` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}/assistants` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}/schedulers` | Required |
| [User](docs/api/user.html) | `remove` | `DELETE /users/{userId}/token` | Required |
| [User](docs/api/user.html) | `update` | `PATCH /users/{userId}` | Required |
| [User](docs/api/user.html) | `update` | `PUT /users/{userId}/email` | Required |
| [User](docs/api/user.html) | `update` | `PUT /users/{userId}/password` | Required |
| [User](docs/api/user.html) | `update` | `PATCH /users/{userId}/settings` | Required |
| [User](docs/api/user.html) | `update` | `PUT /users/{userId}/status` | Required |
| [UserAssistantsList](docs/api/user_assistants_list.html) | `list` | `GET /users/{userId}/assistants` | Required |
| [UserPermission](docs/api/user_permission.html) | `list` | `GET /users/{userId}/permissions` | Required |
| [UserSchedulersList](docs/api/user_schedulers_list.html) | `list` | `GET /users/{userId}/schedulers` | Required |
| [UserSetting](docs/api/user_setting.html) | `load` | `GET /users/{userId}/settings` | Required |
| [Webhook](docs/api/webhook.html) | `create` | `POST /webhooks` | Required |
| [Webhook](docs/api/webhook.html) | `list` | `GET /webhooks` | Required |
| [Webhook](docs/api/webhook.html) | `load` | `GET /webhooks/{webhookId}` | Required |
| [Webhook](docs/api/webhook.html) | `remove` | `DELETE /webhooks/{webhookId}` | Required |
| [Webhook](docs/api/webhook.html) | `update` | `PATCH /webhooks/{webhookId}` | Required |
| [Webhook](docs/api/webhook.html) | `update` | `PATCH /webhooks/options` | Required |
| [Webinar](docs/api/webinar.html) | `create` | `POST /webinars/{webinarId}/registrants` | Required |
| [Webinar](docs/api/webinar.html) | `create` | `POST /webinars/{webinarId}/panelists` | Required |
| [Webinar](docs/api/webinar.html) | `create` | `POST /webinars/{webinarId}/polls` | Required |
| [Webinar](docs/api/webinar.html) | `create` | `POST /users/{userId}/webinars` | Required |
| [Webinar](docs/api/webinar.html) | `list` | `GET /users/{userId}/webinars` | Required |
| [Webinar](docs/api/webinar.html) | `load` | `GET /webinars/{webinarId}/polls/{pollId}` | Required |
| [Webinar](docs/api/webinar.html) | `load` | `GET /metrics/webinars/{webinarId}` | Required |
| [Webinar](docs/api/webinar.html) | `load` | `GET /webinars/{webinarId}` | Required |
| [Webinar](docs/api/webinar.html) | `patch` | `PATCH /webinars/{webinarId}` | Required |
| [Webinar](docs/api/webinar.html) | `remove` | `DELETE /webinars/{webinarId}` | Required |
| [Webinar](docs/api/webinar.html) | `remove` | `DELETE /webinars/{webinarId}/panelists/{panelistId}` | Required |
| [Webinar](docs/api/webinar.html) | `remove` | `DELETE /webinars/{webinarId}/polls/{pollId}` | Required |
| [Webinar](docs/api/webinar.html) | `remove` | `DELETE /webinars/{webinarId}/panelists` | Required |
| [Webinar](docs/api/webinar.html) | `update` | `PUT /webinars/{webinarId}/registrants/status` | Required |
| [Webinar](docs/api/webinar.html) | `update` | `PUT /webinars/{webinarId}/polls/{pollId}` | Required |
| [Webinar](docs/api/webinar.html) | `update` | `PUT /webinars/{webinarId}/status` | Required |
| [WebinarInstance](docs/api/webinar_instance.html) | `list` | `GET /past_webinars/{webinarId}/instances` | Required |
| [WebinarPanelistList](docs/api/webinar_panelist_list.html) | `list` | `GET /webinars/{webinarId}/panelists` | Required |
| [WebinarRegistrantList](docs/api/webinar_registrant_list.html) | `load` | `GET /webinars/{webinarId}/registrants` | Required |
| [ZoomRoomList](docs/api/zoom_room_list.html) | `list` | `GET /metrics/zoomrooms` | Required |

## Connect to the API

- API server: `https://api.zoom.us/v2`

The default credential is sent in the `access_token` query.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `zoom_list`: List records for an entity. Supported entities: `account`, `account_plan`, `dashboard`, `device`, `domains_list`, `group`, `group_member_list`, `im_chat`, `im_group_list`, `meeting`, `meeting_instance`, `pac`, `poll`, `qos`, `recording`, `report`, `tracking_field`, `tsp`, `user`, `user_assistants_list`, `user_permission`, `user_schedulers_list`, `webhook`, `webinar`, `webinar_instance`, `webinar_panelist_list`, `zoom_room_list`.
- `zoom_load`: Load one record for an entity. Supported entities: `account`, `account_setting`, `billing`, `cloud_recording`, `dashboard`, `group`, `im_chat`, `im_group`, `meeting`, `meeting_invitation`, `meeting_registrant_list`, `qos`, `recording_setting`, `report`, `tracking_field`, `tsp`, `user`, `user_setting`, `webhook`, `webinar`, `webinar_registrant_list`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

