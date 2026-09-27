import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { MeetingInstance, MeetingInstanceListMatch } from '../ZoomTypes';
declare class MeetingInstanceEntity extends ZoomEntityBase<MeetingInstance> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: MeetingInstanceEntity): MeetingInstanceEntity;
    list(this: any, reqmatch?: MeetingInstanceListMatch, ctrl?: Control): Promise<MeetingInstanceEntity[]>;
}
export { MeetingInstanceEntity };
