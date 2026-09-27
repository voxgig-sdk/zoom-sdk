import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Pac, PacListMatch } from '../ZoomTypes';
declare class PacEntity extends ZoomEntityBase<Pac> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: PacEntity): PacEntity;
    list(this: any, reqmatch?: PacListMatch, ctrl?: Control): Promise<PacEntity[]>;
}
export { PacEntity };
