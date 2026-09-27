import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Qos, QosLoadMatch, QosListMatch } from '../ZoomTypes';
declare class QosEntity extends ZoomEntityBase<Qos> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: QosEntity): QosEntity;
    load(this: any, reqmatch?: QosLoadMatch, ctrl?: Control): Promise<QosEntity>;
    list(this: any, reqmatch?: QosListMatch, ctrl?: Control): Promise<QosEntity[]>;
}
export { QosEntity };
