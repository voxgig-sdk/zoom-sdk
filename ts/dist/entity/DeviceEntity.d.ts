import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Device, DeviceListMatch, DeviceCreateData, DeviceUpdateData, DeviceRemoveMatch } from '../ZoomTypes';
declare class DeviceEntity extends ZoomEntityBase<Device> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: DeviceEntity): DeviceEntity;
    list(this: any, reqmatch?: DeviceListMatch, ctrl?: Control): Promise<DeviceEntity[]>;
    create(this: any, reqdata?: DeviceCreateData, ctrl?: Control): Promise<DeviceEntity>;
    update(this: any, reqdata?: DeviceUpdateData, ctrl?: Control): Promise<DeviceEntity>;
    remove(this: any, reqmatch?: DeviceRemoveMatch, ctrl?: Control): Promise<DeviceEntity>;
}
export { DeviceEntity };
