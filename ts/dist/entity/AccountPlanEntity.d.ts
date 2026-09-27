import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { AccountPlan, AccountPlanListMatch, AccountPlanCreateData } from '../ZoomTypes';
declare class AccountPlanEntity extends ZoomEntityBase<AccountPlan> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: AccountPlanEntity): AccountPlanEntity;
    list(this: any, reqmatch?: AccountPlanListMatch, ctrl?: Control): Promise<AccountPlanEntity[]>;
    create(this: any, reqdata?: AccountPlanCreateData, ctrl?: Control): Promise<AccountPlanEntity>;
}
export { AccountPlanEntity };
