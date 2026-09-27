import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { CloudRecording, CloudRecordingLoadMatch, CloudRecordingUpdateData, CloudRecordingRemoveMatch } from '../ZoomTypes';
declare class CloudRecordingEntity extends ZoomEntityBase<CloudRecording> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: CloudRecordingEntity): CloudRecordingEntity;
    load(this: any, reqmatch?: CloudRecordingLoadMatch, ctrl?: Control): Promise<CloudRecordingEntity>;
    update(this: any, reqdata?: CloudRecordingUpdateData, ctrl?: Control): Promise<CloudRecordingEntity>;
    remove(this: any, reqmatch?: CloudRecordingRemoveMatch, ctrl?: Control): Promise<CloudRecordingEntity>;
}
export { CloudRecordingEntity };
