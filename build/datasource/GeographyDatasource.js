"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const sequelize_1 = require("sequelize");
const debug_1 = __importDefault(require("debug"));
const database_1 = require("../database/database");
const debug = (0, debug_1.default)('tc:geographyDataSource');
class GeographyDataSource {
}
exports.default = GeographyDataSource;
_a = GeographyDataSource;
GeographyDataSource.getRangeByUser = async function (idBuyer) {
    debug('Starts the database query of the search range by user');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT com_rango_busqueda as rango
                FROM tr_data_base.comprador 
                WHERE com_id=$idBuyer;`, sequelize_1.QueryTypes.SELECT, { idBuyer });
        if (result.length > 0) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-RANGE-BY-USER-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-RANGE-BY-USER', Reason: err });
    }
};
GeographyDataSource.getOverwriteRange = async (rangoBusqueda, idComprador) => {
    debug('Starts the database query of the update');
    try {
        let result;
        result = await (0, database_1.executeSQL)(//El query esta mal, select solo es para traer datos, buscar como se hace un update en sql
        `UPDATE tr_data_base.comprador 
                SET com_rango_busqueda=$rangoBusqueda where com_id=$idComprador;`, sequelize_1.QueryTypes.UPDATE, // reemplazar la palabra select por UPDATE
        { rangoBusqueda, idComprador });
        console.log(result);
        if (result) {
            console.log("resultado", result);
            const response = {
                operationStatus: true,
                operationCode: "0000",
                operationMessage: "operacion exitosa"
            };
            return Promise.resolve(response);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyError = {
                CodeError: 'SELECT-SEARCH-PRODUCT-TYPES-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyError);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
    }
};
//# sourceMappingURL=GeographyDatasource.js.map