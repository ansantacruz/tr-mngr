"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const node_fetch_1 = __importDefault(require("node-fetch"));
const Constants_1 = __importDefault(require("../utilities/Constants"));
const config_1 = __importDefault(require("../config"));
const debug_1 = __importDefault(require("debug"));
class FetchService {
    static async request(fetchInfo) {
        const debug = (0, debug_1.default)('bdb:FetchService:'.concat(fetchInfo.debug));
        const codeError = fetchInfo.codeError;
        const { customTimeout, endpoint, headers, body, method } = fetchInfo;
        try {
            const fetchParams = {
                body: JSON.stringify(body),
                method,
                headers,
                timeout: customTimeout !== undefined ? customTimeout : Number(config_1.default.fetchTimeout)
            };
            const res = await (0, node_fetch_1.default)(endpoint, fetchParams); // NOSONAR
            const resPayload = await res;
            debug('[%s] FetchEndpoint: %j, FetchParams: %j', endpoint, fetchParams);
            debug('[%s] FetchStatus: %s', res.status);
            debug('[%s] FetchResponse: %j', resPayload);
            if (Constants_1.default.acceptHttpStatusCode.includes(res.status)) {
                if (res.status !== 202) {
                    return resPayload.json();
                }
                return { status: 200, response: 'successful OK' };
            }
            else {
                const reason = resPayload.json();
                debug(`[%s] ${DebugUtilities_1.MessageError}`, reason);
                return Promise.reject({ Code: codeError, StatusCode: res.status, Reason: reason });
            }
        }
        catch (err) {
            const reason = DebugUtilities_1.DebugUtilities.getMessage(err);
            debug(`[%s] ${DebugUtilities_1.MessageError}`, reason);
            return Promise.reject({ Code: codeError, Reason: reason });
        }
    }
}
exports.default = FetchService;
FetchService.JsonHeaders = {
    'Content-Type': 'application/json'
};
//# sourceMappingURL=FetchService.js.map