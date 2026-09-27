import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { AccountSetting, AccountSettingLoadMatch } from '../ZoomTypes';
declare class AccountSettingEntity extends ZoomEntityBase<AccountSetting> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: AccountSettingEntity): AccountSettingEntity;
    load(this: any, reqmatch?: AccountSettingLoadMatch, ctrl?: Control): Promise<AccountSettingEntity>;
}
export { AccountSettingEntity };
