// Typed models for the Zoom SDK (JSDoc typedefs).
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
// edit by hand.

/**
 * @typedef {Object} Meeting
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {number} [duration]
 * @property {string} [host_id]
 * @property {boolean} [host_video]
 * @property {number} [id]
 * @property {boolean} [join_before_host]
 * @property {string} [join_url]
 * @property {boolean} [mute_upon_entry]
 * @property {boolean} [participant_video]
 * @property {string} [password]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} topic
 * @property {number} [type]
 * @property {string} [uuid]
 * @property {boolean} [waiting_room]
 */

/**
 * @typedef {Object} MeetingLoadMatch
 * @property {number} id
 */

/**
 * @typedef {Object} MeetingListMatch
 * @property {string} user_id
 */

/**
 * @typedef {Object} MeetingCreateData
 * @property {string} user_id
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {number} [duration]
 * @property {string} [host_id]
 * @property {boolean} [host_video]
 * @property {number} [id]
 * @property {boolean} [join_before_host]
 * @property {string} [join_url]
 * @property {boolean} [mute_upon_entry]
 * @property {boolean} [participant_video]
 * @property {string} [password]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} topic
 * @property {number} [type]
 * @property {string} [uuid]
 * @property {boolean} [waiting_room]
 */

/**
 * @typedef {Object} MeetingUpdateData
 * @property {number} id
 * @property {string} [agenda]
 * @property {string} [created_at]
 * @property {number} [duration]
 * @property {string} [host_id]
 * @property {boolean} [host_video]
 * @property {boolean} [join_before_host]
 * @property {string} [join_url]
 * @property {boolean} [mute_upon_entry]
 * @property {boolean} [participant_video]
 * @property {string} [password]
 * @property {Object} [settings]
 * @property {string} [start_time]
 * @property {string} [status]
 * @property {string} [timezone]
 * @property {string} [topic]
 * @property {number} [type]
 * @property {string} [uuid]
 * @property {boolean} [waiting_room]
 */

/**
 * @typedef {Object} MeetingRemoveMatch
 * @property {number} id
 */

