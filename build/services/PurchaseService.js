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
                headers: this.buildOfficesHeadersNormal(),
                endpoint: `${Endpoints_1.Endpoints.GEOGRAPHYC_MANAGMENT}${Endpoints_1.Endpoints.GET_USER_NOTIFICATION}/${dataRequest.latitud}/${dataRequest.longitud}/${dataRequest.rangoDeBusqueda}`,
                method: 'GET',
            };
            const response = await FetchService_1.default.request(fetchInfo);
            response.forEach(async (obj) => {
                const fetchRequest = {
                    codeError: 'Vendedor notification',
                    debug: '',
                    endpoint: `https://fcm.googleapis.com/fcm/send`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn`,
                    },
                    body: {
                        to: obj.usu_token,
                        notification: {
                            title: 'Tienes una nueva compra para ofertar',
                            body: 'Revisa tu telefono, tienes una nueva compra para que construyas una oferta',
                            click_action: 'https://ejemplo.com',
                            sound: 'default'
                        },
                        data: { package: dataRequest.package }
                    }
                };
                await FetchService_1.default.request(fetchRequest);
            });
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain products types- %s ', err);
            return Promise.reject(err);
        }
    }
    static buildOfficesHeaders() {
        return {
            'Authorization': 'key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn',
            'Content-Type': 'application/json',
        };
    }
    ;
    static buildOfficesHeadersNormal() {
        return {
            'Content-Type': 'application/json',
        };
    }
}
exports.PurchaseService = PurchaseService;
PurchaseService.JsonHeaders = {
    'Content-Type': 'application/json',
    'Authorization': 'key=AAAAx2UUDLc:APA91bHe9qAS83UlGWWvxGYgpROuFknrSzPgv2OsusF89K8kXCCy2fe6k3tBMXuYuW2WcZwt8MpAvDfObUDmSab7KZh9saaYT1STWLF6bLj7fNUa_BtFpAtrKg-cyxX3XYyJqDrsl5Fn',
};
PurchaseService.JsonHeadersTwo = {
    'Content-Type': 'application/json',
};
//# sourceMappingURL=PurchaseService.js.map