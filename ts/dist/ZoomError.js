"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomError = void 0;
class ZoomError extends Error {
    isZoomError = true;
    sdk = 'Zoom';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.ZoomError = ZoomError;
//# sourceMappingURL=ZoomError.js.map