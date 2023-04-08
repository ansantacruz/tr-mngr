"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeographyService = void 0;
const GeographyDatasource_1 = __importDefault(require("../datasource/GeographyDatasource"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('John');
class GeographyService {
    static getGeography() {
        throw new Error('Method not implemented.');
    }
    static async getRangeByUser(idBuyer) {
        try {
            const response = await GeographyDatasource_1.default.getRangeByUser(idBuyer);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain motorcycle brands %s ', err);
            return Promise.reject(err);
        }
    }
    static async getOverwriteRange(dataRequest) {
        try {
            const response = await GeographyDatasource_1.default.getOverwriteRange(dataRequest.rangoBusqueda, dataRequest.idComprador); //debe enviar el id del usuario al que se quiere modificar el valor y el nuevo valor 
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain products types- %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.GeographyService = GeographyService;
//# sourceMappingURL=GeographyService.js.map