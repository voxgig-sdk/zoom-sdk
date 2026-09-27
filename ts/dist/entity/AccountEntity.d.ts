import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Account, AccountLoadMatch, AccountListMatch, AccountCreateData, AccountUpdateData, AccountRemoveMatch } from '../ZoomTypes';
declare class AccountEntity extends ZoomEntityBase<Account> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: AccountEntity): AccountEntity;
    load(this: any, reqmatch?: AccountLoadMatch, ctrl?: Control): Promise<AccountEntity>;
    list(this: any, reqmatch?: AccountListMatch, ctrl?: Control): Promise<AccountEntity[]>;
    create(this: any, reqdata?: AccountCreateData, ctrl?: Control): Promise<AccountEntity>;
    update(this: any, reqdata?: AccountUpdateData, ctrl?: Control): Promise<AccountEntity>;
    remove(this: any, reqmatch?: AccountRemoveMatch, ctrl?: Control): Promise<AccountEntity>;
}
export { AccountEntity };
