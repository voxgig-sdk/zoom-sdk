import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { GroupMemberList, GroupMemberListListMatch } from '../ZoomTypes';
declare class GroupMemberListEntity extends ZoomEntityBase<GroupMemberList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: GroupMemberListEntity): GroupMemberListEntity;
    list(this: any, reqmatch?: GroupMemberListListMatch, ctrl?: Control): Promise<GroupMemberListEntity[]>;
}
export { GroupMemberListEntity };
