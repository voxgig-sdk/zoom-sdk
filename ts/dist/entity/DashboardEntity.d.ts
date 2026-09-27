import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Dashboard, DashboardLoadMatch, DashboardListMatch } from '../ZoomTypes';
declare class DashboardEntity extends ZoomEntityBase<Dashboard> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: DashboardEntity): DashboardEntity;
    load(this: any, reqmatch?: DashboardLoadMatch, ctrl?: Control): Promise<DashboardEntity>;
    list(this: any, reqmatch?: DashboardListMatch, ctrl?: Control): Promise<DashboardEntity[]>;
}
export { DashboardEntity };
