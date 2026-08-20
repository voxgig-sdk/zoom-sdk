export interface Meeting {
    agenda?: string;
    created_at?: string;
    duration?: number;
    host_id?: string;
    host_video?: boolean;
    id?: number;
    join_before_host?: boolean;
    join_url?: string;
    mute_upon_entry?: boolean;
    participant_video?: boolean;
    password?: string;
    settings?: Record<string, any>;
    start_time?: string;
    status?: string;
    timezone?: string;
    topic: string;
    type?: number;
    uuid?: string;
    waiting_room?: boolean;
}
export interface MeetingLoadMatch {
    id: number;
}
export interface MeetingListMatch {
    user_id: string;
}
export interface MeetingCreateData {
    user_id: string;
    agenda?: string;
    created_at?: string;
    duration?: number;
    host_id?: string;
    host_video?: boolean;
    id?: number;
    join_before_host?: boolean;
    join_url?: string;
    mute_upon_entry?: boolean;
    participant_video?: boolean;
    password?: string;
    settings?: Record<string, any>;
    start_time?: string;
    status?: string;
    timezone?: string;
    topic: string;
    type?: number;
    uuid?: string;
    waiting_room?: boolean;
}
export interface MeetingUpdateData {
    id: number;
    agenda?: string;
    created_at?: string;
    duration?: number;
    host_id?: string;
    host_video?: boolean;
    join_before_host?: boolean;
    join_url?: string;
    mute_upon_entry?: boolean;
    participant_video?: boolean;
    password?: string;
    settings?: Record<string, any>;
    start_time?: string;
    status?: string;
    timezone?: string;
    topic?: string;
    type?: number;
    uuid?: string;
    waiting_room?: boolean;
}
export interface MeetingRemoveMatch {
    id: number;
}
