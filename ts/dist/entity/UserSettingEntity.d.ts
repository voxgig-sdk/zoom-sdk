import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { UserSetting, UserSettingLoadMatch } from '../ZoomTypes';
declare class UserSettingEntity extends ZoomEntityBase<UserSetting> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: UserSettingEntity): UserSettingEntity;
    load(this: any, reqmatch?: UserSettingLoadMatch, ctrl?: Control): Promise<UserSettingEntity>;
}
export { UserSettingEntity };
