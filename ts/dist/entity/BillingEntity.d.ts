import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Billing, BillingLoadMatch, BillingCreateData, BillingUpdateData } from '../ZoomTypes';
declare class BillingEntity extends ZoomEntityBase<Billing> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: BillingEntity): BillingEntity;
    load(this: any, reqmatch?: BillingLoadMatch, ctrl?: Control): Promise<BillingEntity>;
    create(this: any, reqdata?: BillingCreateData, ctrl?: Control): Promise<BillingEntity>;
    update(this: any, reqdata?: BillingUpdateData, ctrl?: Control): Promise<BillingEntity>;
}
export { BillingEntity };
