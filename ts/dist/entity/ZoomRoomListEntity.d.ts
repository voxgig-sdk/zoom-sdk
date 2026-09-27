import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { ZoomRoomList, ZoomRoomListListMatch } from '../ZoomTypes';
declare class ZoomRoomListEntity extends ZoomEntityBase<ZoomRoomList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: ZoomRoomListEntity): ZoomRoomListEntity;
    list(this: any, reqmatch?: ZoomRoomListListMatch, ctrl?: Control): Promise<ZoomRoomListEntity[]>;
}
export { ZoomRoomListEntity };
