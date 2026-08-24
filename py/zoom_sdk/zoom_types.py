# Typed models for the Zoom SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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


class MeetingRequired(TypedDict):
    topic: str


class Meeting(MeetingRequired, total=False):
    agenda: str
    created_at: str
    duration: int
    host_id: str
    host_video: bool
    id: int
    join_before_host: bool
    join_url: str
    mute_upon_entry: bool
    participant_video: bool
    password: str
    settings: dict
    start_time: str
    status: str
    timezone: str
    type: int
    uuid: str
    waiting_room: bool


class MeetingLoadMatch(TypedDict):
    id: int


class MeetingListMatch(TypedDict):
    user_id: str


class MeetingCreateDataRequired(TypedDict):
    user_id: str
    topic: str


class MeetingCreateData(MeetingCreateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: int
    host_id: str
    host_video: bool
    id: int
    join_before_host: bool
    join_url: str
    mute_upon_entry: bool
    participant_video: bool
    password: str
    settings: dict
    start_time: str
    status: str
    timezone: str
    type: int
    uuid: str
    waiting_room: bool


class MeetingUpdateDataRequired(TypedDict):
    id: int


class MeetingUpdateData(MeetingUpdateDataRequired, total=False):
    agenda: str
    created_at: str
    duration: int
    host_id: str
    host_video: bool
    join_before_host: bool
    join_url: str
    mute_upon_entry: bool
    participant_video: bool
    password: str
    settings: dict
    start_time: str
    status: str
    timezone: str
    topic: str
    type: int
    uuid: str
    waiting_room: bool


class MeetingRemoveMatch(TypedDict):
    id: int
