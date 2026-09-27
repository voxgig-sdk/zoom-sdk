import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { MeetingRegistrantList, MeetingRegistrantListLoadMatch } from '../ZoomTypes';
declare class MeetingRegistrantListEntity extends ZoomEntityBase<MeetingRegistrantList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: MeetingRegistrantListEntity): MeetingRegistrantListEntity;
    load(this: any, reqmatch?: MeetingRegistrantListLoadMatch, ctrl?: Control): Promise<MeetingRegistrantListEntity>;
}
export { MeetingRegistrantListEntity };
