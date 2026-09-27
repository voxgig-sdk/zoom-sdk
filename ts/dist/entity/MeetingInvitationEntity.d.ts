import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { MeetingInvitation, MeetingInvitationLoadMatch } from '../ZoomTypes';
declare class MeetingInvitationEntity extends ZoomEntityBase<MeetingInvitation> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: MeetingInvitationEntity): MeetingInvitationEntity;
    load(this: any, reqmatch?: MeetingInvitationLoadMatch, ctrl?: Control): Promise<MeetingInvitationEntity>;
}
export { MeetingInvitationEntity };
