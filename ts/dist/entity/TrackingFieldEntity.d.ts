import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { TrackingField, TrackingFieldLoadMatch, TrackingFieldListMatch, TrackingFieldCreateData, TrackingFieldUpdateData, TrackingFieldRemoveMatch } from '../ZoomTypes';
declare class TrackingFieldEntity extends ZoomEntityBase<TrackingField> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: TrackingFieldEntity): TrackingFieldEntity;
    load(this: any, reqmatch?: TrackingFieldLoadMatch, ctrl?: Control): Promise<TrackingFieldEntity>;
    list(this: any, reqmatch?: TrackingFieldListMatch, ctrl?: Control): Promise<TrackingFieldEntity[]>;
    create(this: any, reqdata?: TrackingFieldCreateData, ctrl?: Control): Promise<TrackingFieldEntity>;
    update(this: any, reqdata?: TrackingFieldUpdateData, ctrl?: Control): Promise<TrackingFieldEntity>;
    remove(this: any, reqmatch?: TrackingFieldRemoveMatch, ctrl?: Control): Promise<TrackingFieldEntity>;
}
export { TrackingFieldEntity };
