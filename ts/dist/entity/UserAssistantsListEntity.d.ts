import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { UserAssistantsList, UserAssistantsListListMatch } from '../ZoomTypes';
declare class UserAssistantsListEntity extends ZoomEntityBase<UserAssistantsList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: UserAssistantsListEntity): UserAssistantsListEntity;
    list(this: any, reqmatch?: UserAssistantsListListMatch, ctrl?: Control): Promise<UserAssistantsListEntity[]>;
}
export { UserAssistantsListEntity };
