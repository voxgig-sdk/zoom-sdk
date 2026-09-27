import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Webinar, WebinarLoadMatch, WebinarListMatch, WebinarCreateData, WebinarUpdateData, WebinarRemoveMatch } from '../ZoomTypes';
declare class WebinarEntity extends ZoomEntityBase<Webinar> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: WebinarEntity): WebinarEntity;
    load(this: any, reqmatch?: WebinarLoadMatch, ctrl?: Control): Promise<WebinarEntity>;
    list(this: any, reqmatch?: WebinarListMatch, ctrl?: Control): Promise<WebinarEntity[]>;
    create(this: any, reqdata?: WebinarCreateData, ctrl?: Control): Promise<WebinarEntity>;
    update(this: any, reqdata?: WebinarUpdateData, ctrl?: Control): Promise<WebinarEntity>;
    remove(this: any, reqmatch?: WebinarRemoveMatch, ctrl?: Control): Promise<WebinarEntity>;
}
export { WebinarEntity };
