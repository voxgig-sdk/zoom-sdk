"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('AccountEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ZOOM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ZOOM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.ZoomSDK.test();
        const ent = testsdk.Account();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ZOOM_TEST_LIVE;
        for (const op of ['create', 'list', 'update', 'load', 'remove']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'account.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "accounts": { "a": true, "h": "Accounts", "n": "accounts", "r": false, "sh": "List of Account objects", "t": "`$ARRAY`", "key$": "accounts", "index$": 0 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 1 }, "meeting_connectors": { "a": true, "h": "Meeting Connectors", "n": "meeting_connectors", "r": false, "sh": "Meeting Connector, multiple values separated by comma", "t": "`$STRING`", "key$": "meeting_connectors", "index$": 2 }, "page_count": { "a": true, "h": "Page Count", "n": "page_count", "r": false, "sh": "The number of items returned on this page", "t": "`$INTEGER`", "key$": "page_count", "index$": 3 }, "page_number": { "a": true, "h": "Page Number", "n": "page_number", "r": false, "sh": "The page number of current results", "t": "`$INTEGER`", "key$": "page_number", "index$": 4 }, "page_size": { "a": true, "h": "Page Size", "n": "page_size", "r": false, "sh": "The number of records returned within a single API call", "t": "`$INTEGER`", "key$": "page_size", "index$": 5 }, "pay_mode": { "a": true, "h": "Pay Mode", "n": "pay_mode", "r": false, "sh": "Payee", "t": "`$STRING`", "key$": "pay_mode", "index$": 6 }, "room_connectors": { "a": true, "h": "Room Connectors", "n": "room_connectors", "r": false, "sh": "Virtual Room Connector, multiple value separated by comma", "t": "`$STRING`", "key$": "room_connectors", "index$": 7 }, "share_mc": { "a": true, "h": "Share Mc", "n": "share_mc", "r": false, "sh": "Enable Share Meeting Connector", "t": "`$BOOLEAN`", "key$": "share_mc", "index$": 8 }, "share_rc": { "a": true, "h": "Share Rc", "n": "share_rc", "r": false, "sh": "Enable Share Virtual Room Connector", "t": "`$BOOLEAN`", "key$": "share_rc", "index$": 9 }, "total_records": { "a": true, "h": "Total Records", "n": "total_records", "r": false, "sh": "The number of all records available across pages", "t": "`$INTEGER`", "key$": "total_records", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "account", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /accounts", "source": "swagger2", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "POST", "o": "/accounts", "q": { "exist": ["body"] }, "r": {}, "s": [{ "lit": "accounts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /accounts", "source": "swagger2", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "page_number", "or": "page_number", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/accounts", "q": { "exist": ["page_number", "page_size"] }, "r": {}, "s": [{ "lit": "accounts" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /accounts/{accountId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/accounts/{accountId}", "q": { "exist": ["id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.options`" }, "index$": 0 }], "key$": "load" }, "remove": { "input": "data", "name": "remove", "points": [{ "a": true, "co": { "id": "DELETE /accounts/{accountId}", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "DELETE", "o": "/accounts/{accountId}", "q": { "exist": ["id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "remove" }, "update": { "input": "data", "name": "update", "points": [{ "a": true, "co": { "id": "PATCH /accounts/{accountId}/options", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/accounts/{accountId}/options", "q": { "$action": "option", "exist": ["body", "id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }, { "lit": "options" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "a": true, "co": { "id": "PATCH /accounts/{accountId}/settings", "source": "swagger2", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "account_id", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "body", "or": "body", "r": true, "t": "`$OBJECT`", "index$": 0 }] }, "k": "http", "m": "PATCH", "o": "/accounts/{accountId}/settings", "q": { "$action": "setting", "exist": ["body", "id"] }, "r": { "param": { "accountId": "id" } }, "s": [{ "lit": "accounts" }, { "var": "id" }, { "lit": "settings" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "update" } }, "relations": { "ancestors": [] }, "key$": "account", "name__orig": "account", "Name": "Account", "name_": "account", "name-": "account", "NAME": "ACCOUNT", "index$": 0 }, { "active": true, "entity": "account", "key$": "BasicAccountFlow", "kind": "basic", "name": "BasicAccountFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "account_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }, { "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "account_ref01" } }], "index$": 1 }, { "a": true, "d": {}, "i": { "ref": "account_ref01", "srcdatavar": "account_ref01_data", "suffix": "_up0", "textfield": "meeting_connectors" }, "m": {}, "o": "update", "s": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-account_ref01" } }], "v": [], "index$": 2 }, { "a": true, "d": {}, "i": { "ref": "account_ref01", "srcdatavar": "account_ref01_data", "suffix": "_dt0" }, "m": { "id": "account01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-account_ref01" } }], "index$": 3 }, { "a": true, "d": {}, "i": { "ref": "account_ref01", "suffix": "_rm0" }, "m": { "id": "account01" }, "o": "remove", "s": [], "v": [], "index$": 4 }, { "a": true, "d": {}, "i": { "suffix": "_rt0" }, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemNotExists", "def": { "ref": "account_ref01" } }], "index$": 5 }] }, 'Account', { "POST /accounts": { "protocol": "http", "parameters": [{ "in": "body", "name": "body", "required": true, "description": "Account", "schema": { "type": "object", "description": "The account object represents an account on zoom. The person who created the account, or who the account was created for, is referred to as the account owner. You can read more about the Zoom account structure <a href='https://developer.zoom.us/blog/a-brief-look-at-zoom-account-structures/' target='_blank'>here</a>.", "required": ["email", "first_name", "last_name", "password"], "properties": { "first_name": { "type": "string", "description": "User's first name" }, "last_name": { "type": "string", "description": "User's last name" }, "email": { "type": "string", "description": "User's email address" }, "password": { "type": "string", "description": "User's password", "minimum": 8 }, "options": { "type": "object", "description": "Account options object", "properties": { "share_rc": { "type": "boolean", "description": "Enable Share Virtual Room Connector", "default": false, "key$": "share_rc" }, "room_connectors": { "type": "string", "description": "Virtual Room Connector, multiple value separated by comma", "key$": "room_connectors" }, "share_mc": { "type": "boolean", "description": "Enable Share Meeting Connector", "default": false, "key$": "share_mc" }, "meeting_connectors": { "type": "string", "description": "Meeting Connector, multiple values separated by comma", "key$": "meeting_connectors" }, "pay_mode": { "type": "string", "description": "Payee", "enum": ["master", "sub"], "x-enum-descriptions": ["Master account holder pays", "Sub account holder pays"], "default": "master", "key$": "pay_mode" } }, "x-ref": "#/definitions/AccountOptions" } }, "x-ref": "#/definitions/Account" }, "index$": 0 }] }, "GET /accounts": { "protocol": "http", "parameters": [{ "in": "query", "name": "page_size", "description": "The number of records returned within a single API call", "type": "integer", "default": 30, "maximum": 300, "x-ref": "#/parameters/PageSize", "index$": 0 }, { "in": "query", "name": "page_number", "description": "Current page number of returned records", "type": "integer", "default": 1, "x-ref": "#/parameters/PageNumber", "index$": 1 }] }, "GET /accounts/{accountId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }] }, "DELETE /accounts/{accountId}": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }] }, "PATCH /accounts/{accountId}/options": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "type": "object", "description": "Account options object", "properties": { "share_rc": { "type": "boolean", "description": "Enable Share Virtual Room Connector", "default": false, "key$": "share_rc" }, "room_connectors": { "type": "string", "description": "Virtual Room Connector, multiple value separated by comma", "key$": "room_connectors" }, "share_mc": { "type": "boolean", "description": "Enable Share Meeting Connector", "default": false, "key$": "share_mc" }, "meeting_connectors": { "type": "string", "description": "Meeting Connector, multiple values separated by comma", "key$": "meeting_connectors" }, "pay_mode": { "type": "string", "description": "Payee", "enum": ["master", "sub"], "x-enum-descriptions": ["Master account holder pays", "Sub account holder pays"], "default": "master", "key$": "pay_mode" } }, "x-ref": "#/definitions/AccountOptions" }, "index$": 1 }] }, "PATCH /accounts/{accountId}/settings": { "protocol": "http", "parameters": [{ "in": "path", "name": "accountId", "description": "The account ID", "type": "string", "required": true, "x-ref": "#/parameters/AccountId", "index$": 0 }, { "in": "body", "name": "body", "required": true, "schema": { "title": "Account settings", "type": "object", "properties": { "schedule_meting": { "description": "Account Settings: Schedule Meeting", "key$": "schedule_meting", "properties": { "audio_type": { "default": "both", "description": "Determine how participants can join the audio portion of the meeting", "enum": ["both", "telephony", "voip", "thirdParty"], "type": "string", "x-enum-descriptions": ["Telephony and VoIP", "Audio PSTN telephony only", "VoIP only", "3rd party audio conference"] }, "enforce_login": { "description": "Only signed-in (Zoom users) users can join meetings", "type": "boolean" }, "enforce_login_domains": { "description": "Only signed-in users with a specified domains", "type": "string" }, "enforce_login_with_domains": { "description": "Only signed-in users with a specific domain can join meetings", "type": "boolean" }, "force_pmi_jbh_password": { "description": "Require a password for Personal Meetings if attendees can join before host", "type": "boolean" }, "host_video": { "description": "Start meetings with host video on", "type": "boolean" }, "join_before_host": { "description": "Allow participants to join the meeting before the host arrives", "type": "boolean" }, "not_store_meeting_topic": { "description": "Always display \"Zoom Meeting\" as the meeting topic", "type": "boolean" }, "participant_video": { "description": "Start meetings with participant video on. Participants can change this during the meeting.", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsScheduleMeeting" }, "in_meeting": { "description": "Account Settings: In Meeting", "key$": "in_meeting", "properties": { "alert_guest_join": { "description": "Identify guest participants in the meeting/webinar", "type": "boolean" }, "allow_live_streaming": { "description": "Allow live streaming", "type": "boolean" }, "allow_show_zoom_windows": { "description": "Show Zoom Desktop application when sharing screen", "type": "boolean" }, "annotation": { "description": "Allow participants to use annotation tools to add information to shared screens", "type": "boolean" }, "anonymous_question_answer": { "description": "Allow Anonymous Q&A in Webinar", "type": "boolean" }, "attendee_on_hold": { "description": "Allow hosts to temporarily remove an attendee from the meeting", "type": "boolean" }, "attention_tracking": { "description": "Lets the host see an indicator in the participant panel if a meeting/webinar attendee does not have Zoom in focus during screen sharing", "type": "boolean" }, "auto_answer": { "description": "Enable users to see and add contacts to 'auto-answer group' in the contact list on chat. Any call from members of this group will be automatically answered.", "type": "boolean" }, "auto_saving_chat": { "description": "Automatically save all in-meeting chats so that hosts do not need to manually save the text of the chat after the meeting starts", "type": "boolean" }, "breakout_room": { "description": "Allow host to split meeting participants into separate, smaller rooms", "type": "boolean" }, "chat": { "description": "Allow meeting participants to send a message visible to all participants", "type": "boolean" }, "closed_caption": { "description": "Allow host to type closed captions or assign a participant/third party device to add closed captions", "type": "boolean" }, "co_host": { "description": "Allow the host to add co-hosts", "type": "boolean" }, "custom_live_streaming": { "description": "Custom live streaming", "type": "boolean" }, "custom_service_instructions": { "description": "Custom service instructions", "type": "string" }, "dscp_audio": { "description": "DSCP Audio", "maximum": 63, "minimum": 1, "type": "integer" }, "dscp_marking": { "description": "DSCP marking", "type": "boolean" }, "dscp_video": { "description": "DSCP Video", "maximum": 63, "minimum": 1, "type": "integer" }, "e2e_encryption": { "description": "Require that all meetings are encrypted using AES", "type": "boolean" }, "far_end_camera_control": { "description": "Allow another user to take control of your camera during a meeting", "type": "boolean" }, "feedback": { "description": "Add a Feedback tab to the Windows Settings or Mac Preferences dialog, and also enable users to provide feedback to Zoom at the end of the meeting", "type": "boolean" }, "file_transfer": { "description": "Hosts and participants can send files through the in-meeting chat", "type": "boolean" }, "group_hd": { "description": "Activate higher quality video for host and participants. (This will use more bandwidth.)", "type": "boolean" }, "original_audio": { "description": "Allow users to select original sound in their client settings", "type": "boolean" }, "p2p_connetion": { "description": "Peer to Peer connection while only 2 people are in a meeting", "type": "boolean" }, "p2p_ports": { "description": "P2P listening ports range", "type": "boolean" }, "polling": { "description": "Add 'Polls' to the meeting controls.", "type": "boolean" }, "ports_range": { "default": "", "description": "Listening ports range, separated by comma (ex 55,56). The ports range must be between 1 to 65535.", "type": "string" }, "post_meeting_feedback": { "description": "Display a thumbs up/down survey at the end of each meeting", "type": "boolean" }, "private_chat": { "description": "Allow meeting participants to send a private 1:1 message to another participants", "type": "boolean" }, "remote_control": { "description": "Allow users to request remote control", "type": "boolean" }, "screen_sharing": { "description": "Allow screen sharing", "type": "boolean" }, "sending_default_email_invites": { "description": "Only show default email when sending email invites", "type": "boolean" }, "show_meeting_control_toolbar": { "description": "Always show meeting control toolbar", "type": "boolean" }, "stereo_audio": { "description": "Allow users to select stereo audio in their client settings", "type": "boolean" }, "use_html_format_email": { "description": "Use HTML format email for Outlook plugin", "type": "boolean" }, "virtual_background": { "description": "Allow users to replace their background with any selected image. Choose or upload an image in the Zoom Desktop application settings.", "type": "boolean" }, "watermark": { "description": "Add watermark when viewing shared screen", "type": "boolean" }, "webinar_question_answer": { "description": "Q&A in webinar", "type": "boolean" }, "whiteboard": { "description": "Allow participants to share a whiteboard that includes annotation tools", "type": "boolean" }, "workplace_by_facebook": { "description": "Workplace by facebook", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsInMeeting" }, "email_notification": { "description": "Account Settings: Notification", "key$": "email_notification", "properties": { "alternative_host_reminder": { "description": "Notify when an alternative host is set or removed from a meeting", "type": "boolean" }, "cancel_meeting_reminder": { "description": "Notify host and participants when the meeting is cancelled", "type": "boolean" }, "cloud_recording_avaliable_reminder": { "description": "Notify host when cloud recording is available", "type": "boolean" }, "jbh_reminder": { "description": "Notify host when participants join the meeting before them", "type": "boolean" }, "low_host_count_reminder": { "description": "Notify when host licenses are running low", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsEmailNotification" }, "zoom_rooms": { "description": "Account Settings: Zoom Rooms", "key$": "zoom_rooms", "properties": { "auto_start_stop_scheduled_meetings": { "description": "Automatic start/stop for scheduled meetings", "type": "boolean" }, "cmr_for_instant_meeting": { "description": "Cloud recording for instant meetings", "type": "boolean" }, "force_private_meeting": { "description": "Transform all meetings to private", "type": "boolean" }, "hide_host_information": { "description": "Hide host and meeting ID from private meetings", "type": "boolean" }, "list_meetings_with_calendar": { "description": "Display meeting list with calendar integration", "type": "boolean" }, "start_airplay_manually": { "description": "Start AirPlay service manually", "type": "boolean" }, "ultrasonic": { "description": "Automatic direct sharing using ultrasonic proximity signal", "type": "boolean" }, "upcoming_meeting_alert": { "description": "Upcoming meeting alert", "type": "boolean" }, "weekly_system_restart": { "description": "Weekly system restart", "type": "boolean" }, "zr_post_meeting_feedback": { "description": "Zoom Room post meeting feedback", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsZoomRooms" }, "security": { "description": "Account Settings: Security", "key$": "security", "properties": { "admin_change_name_pic": { "description": "Only account administrators can change user's username and picture", "type": "boolean" }, "hide_billing_info": { "description": "Hide billing information", "type": "boolean" }, "import_photos_from_devices": { "description": "Allow importing of photos from photo library on the user's device", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsSecurity" }, "recording": { "description": "Account Settings: Recording", "key$": "recording", "properties": { "account_user_access_recording": { "description": "Cloud recordings are only accessible to account members. People outside of your organization cannot open links that provide access to cloud recordings.", "type": "boolean" }, "auto_delete_cmr": { "description": "Allow Zoom to automatically delete recordings permanently after a specified number of days", "type": "boolean" }, "auto_delete_cmr_days": { "description": "When `auto_delete_cmr` is 'true' this value will set the number of days before auto deletion of cloud recordings", "type": "integer" }, "auto_recording": { "description": "Record meetings automatically as they start", "enum": ["local", "cloud", "none"], "type": "string", "x-enum-descriptions": ["Record on local", "Record on cloud", "Disabled"] }, "cloud_recording": { "description": "Allow hosts to record and save the meeting in the cloud", "type": "boolean" }, "cloud_recording_download": { "description": "Cloud Recording Downloads", "type": "boolean" }, "cloud_recording_download_host": { "description": "Only the host can download cloud recordings", "type": "boolean" }, "local_recording": { "description": "Allow hosts and participants to record the meeting to a local file", "type": "boolean" }, "record_audio_file": { "description": "Record an audio only file", "type": "boolean" }, "record_gallery_view": { "description": "Record gallery view with shared screen", "type": "boolean" }, "record_speaker_view": { "description": "Record active speaker with shared screen", "type": "boolean" }, "recording_audio_transcript": { "description": "Automatically transcribe the audio of the meeting or webinar to the cloud", "type": "boolean" }, "save_chat_text": { "description": "Save chat text from the meeting", "type": "boolean" }, "show_timestamp": { "description": "Add a timestamp to the recording", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsRecording" }, "telephony": { "description": "Account Settings: Telephony", "key$": "telephony", "properties": { "audio_conference_info": { "description": "3rd party audio conference info", "type": "string" }, "third_party_audio": { "description": "Users can join the meeting using the existing 3rd party audio configuration", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsTelephony" }, "integration": { "description": "Account Settings: Integration", "key$": "integration", "properties": { "box": { "description": "Enables users who join a meeting from their mobile device to share content from their Box account", "type": "boolean" }, "dropbox": { "description": "Enables users who join a meeting from their mobile device to share content from their Dropbox account", "type": "boolean" }, "google_calendar": { "description": "Enables meetings to be scheduled using Google Calendars", "type": "boolean" }, "google_drive": { "description": "Enables users who join a meeting from their mobile device to share content from their Google Drive", "type": "boolean" }, "kubi": { "description": "Enables users to control a connected Kubi device from within a Zoom meeting", "type": "boolean" }, "microsoft_one_drive": { "description": "Enables users who join a meeting from their mobile device to share content from their Microsoft OneDrive account", "type": "boolean" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsIntegration" }, "feature": { "description": "Account Settings: Feature", "key$": "feature", "properties": { "meeting_capacity": { "default": 100, "description": "Set the maximum number of participants this user can have in a single meeting", "type": "integer" } }, "type": "object", "x-ref": "#/definitions/AccountSettingsFeature" } }, "x-ref": "#/definitions/AccountSettings" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const account_ref01_ent = client.Account();
        let account_ref01_data = setup.data.new.account['account_ref01'];
        account_ref01_data = (await account_ref01_ent.create(account_ref01_data)).data();
        (0, node_assert_1.default)(null != account_ref01_data.id);
        // LIST
        const account_ref01_match = {};
        const account_ref01_list = (await account_ref01_ent.list(account_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(account_ref01_list, { id: account_ref01_data.id })));
        // UPDATE
        const account_ref01_data_up0 = {};
        account_ref01_data_up0.id = account_ref01_data.id;
        const account_ref01_markdef_up0 = { name: 'meeting_connectors', value: 'Mark01-account_ref01_' + setup.now };
        account_ref01_data_up0[account_ref01_markdef_up0.name] = account_ref01_markdef_up0.value;
        const account_ref01_resdata_up0 = (await account_ref01_ent.update(account_ref01_data_up0)).data();
        (0, node_assert_1.default)(account_ref01_resdata_up0.id === account_ref01_data_up0.id);
        (0, node_assert_1.default)(account_ref01_resdata_up0[account_ref01_markdef_up0.name] === account_ref01_markdef_up0.value);
        // LOAD
        const account_ref01_match_dt0 = {};
        account_ref01_match_dt0.id = account_ref01_data.id;
        const account_ref01_data_dt0 = (await account_ref01_ent.load(account_ref01_match_dt0)).data();
        (0, node_assert_1.default)(account_ref01_data_dt0.id === account_ref01_data.id);
        // REMOVE
        const account_ref01_match_rm0 = { id: account_ref01_data.id };
        await account_ref01_ent.remove(account_ref01_match_rm0);
        // LIST
        const account_ref01_match_rt0 = {};
        const account_ref01_list_rt0 = (await account_ref01_ent.list(account_ref01_match_rt0)).map((e) => e.data());
        (0, node_assert_1.default)(isempty(select(account_ref01_list_rt0, { id: account_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/account/AccountTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.ZoomSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['account01', 'account02', 'account03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ZOOM_TEST_ACCOUNT_ENTID': idmap,
        'ZOOM_TEST_LIVE': 'FALSE',
        'ZOOM_TEST_EXPLAIN': 'FALSE',
        'ZOOM_APIKEY': '',
    });
    idmap = env['ZOOM_TEST_ACCOUNT_ENTID'];
    const live = 'TRUE' === env.ZOOM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ZOOM_TEST_ACCOUNT_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.ZoomSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.ZOOM_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ZOOM_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=AccountEntity.test.js.map