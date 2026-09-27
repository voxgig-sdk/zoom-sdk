import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { ImChat, ImChatLoadMatch, ImChatListMatch } from '../ZoomTypes';
declare class ImChatEntity extends ZoomEntityBase<ImChat> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: ImChatEntity): ImChatEntity;
    load(this: any, reqmatch?: ImChatLoadMatch, ctrl?: Control): Promise<ImChatEntity>;
    list(this: any, reqmatch?: ImChatListMatch, ctrl?: Control): Promise<ImChatEntity[]>;
}
export { ImChatEntity };
