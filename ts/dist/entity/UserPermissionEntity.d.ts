import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { UserPermission, UserPermissionListMatch } from '../ZoomTypes';
declare class UserPermissionEntity extends ZoomEntityBase<UserPermission> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: UserPermissionEntity): UserPermissionEntity;
    list(this: any, reqmatch?: UserPermissionListMatch, ctrl?: Control): Promise<UserPermissionEntity[]>;
}
export { UserPermissionEntity };
