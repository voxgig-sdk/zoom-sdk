import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Recording, RecordingListMatch } from '../ZoomTypes';
declare class RecordingEntity extends ZoomEntityBase<Recording> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: RecordingEntity): RecordingEntity;
    list(this: any, reqmatch?: RecordingListMatch, ctrl?: Control): Promise<RecordingEntity[]>;
}
export { RecordingEntity };
