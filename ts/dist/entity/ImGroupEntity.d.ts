import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { ImGroup, ImGroupLoadMatch, ImGroupCreateData, ImGroupUpdateData, ImGroupRemoveMatch } from '../ZoomTypes';
declare class ImGroupEntity extends ZoomEntityBase<ImGroup> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: ImGroupEntity): ImGroupEntity;
    load(this: any, reqmatch?: ImGroupLoadMatch, ctrl?: Control): Promise<ImGroupEntity>;
    create(this: any, reqdata?: ImGroupCreateData, ctrl?: Control): Promise<ImGroupEntity>;
    update(this: any, reqdata?: ImGroupUpdateData, ctrl?: Control): Promise<ImGroupEntity>;
    remove(this: any, reqmatch?: ImGroupRemoveMatch, ctrl?: Control): Promise<ImGroupEntity>;
}
export { ImGroupEntity };
