"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('tc:RequestLogger');
const uuid_1 = require("uuid");
class RequestLogger {
}
exports.default = RequestLogger;
_a = RequestLogger;
RequestLogger.basic = async (req, _res, next) => {
    let rqUid = req.headers['x-rquid'];
    if (!rqUid) {
        rqUid = (0, uuid_1.v4)();
        req.headers['x-rquid'] = rqUid;
    }
    debug('[%s] Params: %o', rqUid, req.params);
    debug('[%s] Query: %o', rqUid, req.query);
    debug('[%s] Headers: %o', rqUid, req.headers);
    debug('[%s] Body: %o', rqUid, req.body);
    next();
};
//# sourceMappingURL=RequestLogger.js.map