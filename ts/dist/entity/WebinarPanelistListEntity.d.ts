import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { WebinarPanelistList, WebinarPanelistListListMatch } from '../ZoomTypes';
declare class WebinarPanelistListEntity extends ZoomEntityBase<WebinarPanelistList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: WebinarPanelistListEntity): WebinarPanelistListEntity;
    list(this: any, reqmatch?: WebinarPanelistListListMatch, ctrl?: Control): Promise<WebinarPanelistListEntity[]>;
}
export { WebinarPanelistListEntity };
