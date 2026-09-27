import { ZoomEntityBase } from '../ZoomEntityBase';
import type { ZoomSDK } from '../ZoomSDK';
import type { Control } from '../types';
import type { Poll, PollListMatch } from '../ZoomTypes';
declare class PollEntity extends ZoomEntityBase<Poll> {
    constructor(client: ZoomSDK, entopts: any);
    make(this: PollEntity): PollEntity;
    list(this: any, reqmatch?: PollListMatch, ctrl?: Control): Promise<PollEntity[]>;
}
export { PollEntity };
