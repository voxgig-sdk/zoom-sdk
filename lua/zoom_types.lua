-- Typed models for the Zoom SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Meeting
---@field agenda? string
---@field created_at? string
---@field duration? number
---@field host_id? string
---@field host_video? boolean
---@field id? number
---@field join_before_host? boolean
---@field join_url? string
---@field mute_upon_entry? boolean
---@field participant_video? boolean
---@field password? string
---@field settings? table
---@field start_time? string
---@field status? string
---@field timezone? string
---@field topic string
---@field type? number
---@field uuid? string
---@field waiting_room? boolean

---@class MeetingLoadMatch
---@field id number

---@class MeetingListMatch
---@field user_id string

---@class MeetingCreateData
---@field user_id string
---@field agenda? string
---@field created_at? string
---@field duration? number
---@field host_id? string
---@field host_video? boolean
---@field id? number
---@field join_before_host? boolean
---@field join_url? string
---@field mute_upon_entry? boolean
---@field participant_video? boolean
---@field password? string
---@field settings? table
---@field start_time? string
---@field status? string
---@field timezone? string
---@field topic string
---@field type? number
---@field uuid? string
---@field waiting_room? boolean

---@class MeetingUpdateData
---@field id number
---@field agenda? string
---@field created_at? string
---@field duration? number
---@field host_id? string
---@field host_video? boolean
---@field join_before_host? boolean
---@field join_url? string
---@field mute_upon_entry? boolean
---@field participant_video? boolean
---@field password? string
---@field settings? table
---@field start_time? string
---@field status? string
---@field timezone? string
---@field topic? string
---@field type? number
---@field uuid? string
---@field waiting_room? boolean

---@class MeetingRemoveMatch
---@field id number

local M = {}

return M
