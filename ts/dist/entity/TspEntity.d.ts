import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Tsp, TspLoadMatch, TspListMatch, TspCreateData, TspUpdateData, TspRemoveMatch } from '../ZoomTypes';
declare class TspEntity extends ZoomEntityBase<Tsp> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: TspEntity): TspEntity;
    load(this: any, reqmatch?: TspLoadMatch, ctrl?: Control): Promise<TspEntity>;
    list(this: any, reqmatch?: TspListMatch, ctrl?: Control): Promise<TspEntity[]>;
    create(this: any, reqdata?: TspCreateData, ctrl?: Control): Promise<TspEntity>;
    update(this: any, reqdata?: TspUpdateData, ctrl?: Control): Promise<TspEntity>;
    remove(this: any, reqmatch?: TspRemoveMatch, ctrl?: Control): Promise<TspEntity>;
}
export { TspEntity };
