import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { ImGroupList, ImGroupListListMatch } from '../ZoomTypes';
declare class ImGroupListEntity extends ZoomEntityBase<ImGroupList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: ImGroupListEntity): ImGroupListEntity;
    list(this: any, reqmatch?: ImGroupListListMatch, ctrl?: Control): Promise<ImGroupListEntity[]>;
}
export { ImGroupListEntity };
