import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Report, ReportLoadMatch, ReportListMatch } from '../ZoomTypes';
declare class ReportEntity extends ZoomEntityBase<Report> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: ReportEntity): ReportEntity;
    load(this: any, reqmatch?: ReportLoadMatch, ctrl?: Control): Promise<ReportEntity>;
    list(this: any, reqmatch?: ReportListMatch, ctrl?: Control): Promise<ReportEntity[]>;
}
export { ReportEntity };
