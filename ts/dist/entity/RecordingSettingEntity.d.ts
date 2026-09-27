import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { RecordingSetting, RecordingSettingLoadMatch } from '../ZoomTypes';
declare class RecordingSettingEntity extends ZoomEntityBase<RecordingSetting> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: RecordingSettingEntity): RecordingSettingEntity;
    load(this: any, reqmatch?: RecordingSettingLoadMatch, ctrl?: Control): Promise<RecordingSettingEntity>;
}
export { RecordingSettingEntity };
