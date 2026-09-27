import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { DomainsList, DomainsListListMatch } from '../ZoomTypes';
declare class DomainsListEntity extends ZoomEntityBase<DomainsList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: DomainsListEntity): DomainsListEntity;
    list(this: any, reqmatch?: DomainsListListMatch, ctrl?: Control): Promise<DomainsListEntity[]>;
}
export { DomainsListEntity };
