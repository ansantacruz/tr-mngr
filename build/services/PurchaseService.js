"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseService = void 0;
const Endpoints_1 = require("../model/Endpoints");
const FetchService_1 = __importDefault(require("./FetchService"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('John');
class PurchaseService {
    constructor() { }
    static async putPurchase(dataRequest) {
        try {
            const fetchInfo = {
                codeError: 'Geography-mngr',
                debug: '',
                endpoint: `${Endpoints_1.Endpoints.GEOGRAPHYC_MANAGMENT}${Endpoints_1.Endpoints.GET_USER_NOTIFICATION}/${dataRequest.latitud}/${dataRequest.longitud}/${dataRequest.rangoDeBusqueda}`,
                method: 'GET',
            };
            const response = await FetchService_1.default.request(fetchInfo);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain products types- %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.PurchaseService = PurchaseService;
//# sourceMappingURL=PurchaseService.js.map