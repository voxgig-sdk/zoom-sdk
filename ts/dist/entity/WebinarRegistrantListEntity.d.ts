import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { WebinarRegistrantList, WebinarRegistrantListLoadMatch } from '../ZoomTypes';
declare class WebinarRegistrantListEntity extends ZoomEntityBase<WebinarRegistrantList> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: WebinarRegistrantListEntity): WebinarRegistrantListEntity;
    load(this: any, reqmatch?: WebinarRegistrantListLoadMatch, ctrl?: Control): Promise<WebinarRegistrantListEntity>;
}
export { WebinarRegistrantListEntity };
