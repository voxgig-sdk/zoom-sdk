import { Context } from './Context';
declare class ZoomError extends Error {
    isZoomError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { ZoomError };
