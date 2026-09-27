import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { UserSchedulersList, UserSchedulersListListMatch } from '../ZoomTypes';
declare class UserSchedulersListEntity extends ZoomEntityBase<UserSchedulersList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: UserSchedulersListEntity): UserSchedulersListEntity;
    list(this: any, reqmatch?: UserSchedulersListListMatch, ctrl?: Control): Promise<UserSchedulersListEntity[]>;
}
export { UserSchedulersListEntity };
