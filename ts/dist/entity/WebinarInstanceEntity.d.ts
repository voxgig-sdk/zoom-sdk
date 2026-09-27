import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { WebinarInstance, WebinarInstanceListMatch } from '../ZoomTypes';
declare class WebinarInstanceEntity extends ZoomEntityBase<WebinarInstance> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: WebinarInstanceEntity): WebinarInstanceEntity;
    list(this: any, reqmatch?: WebinarInstanceListMatch, ctrl?: Control): Promise<WebinarInstanceEntity[]>;
}
export { WebinarInstanceEntity };
