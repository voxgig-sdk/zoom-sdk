import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Meeting, MeetingLoadMatch, MeetingListMatch, MeetingCreateData, MeetingUpdateData, MeetingRemoveMatch } from '../ZoomTypes';
declare class MeetingEntity extends ZoomEntityBase<Meeting> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: MeetingEntity): MeetingEntity;
    load(this: any, reqmatch?: MeetingLoadMatch, ctrl?: Control): Promise<MeetingEntity>;
    list(this: any, reqmatch?: MeetingListMatch, ctrl?: Control): Promise<MeetingEntity[]>;
    create(this: any, reqdata?: MeetingCreateData, ctrl?: Control): Promise<MeetingEntity>;
    update(this: any, reqdata?: MeetingUpdateData, ctrl?: Control): Promise<MeetingEntity>;
    remove(this: any, reqmatch?: MeetingRemoveMatch, ctrl?: Control): Promise<MeetingEntity>;
}
export { MeetingEntity };
