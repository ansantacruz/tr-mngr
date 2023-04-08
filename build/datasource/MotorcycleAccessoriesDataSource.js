"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const sequelize_1 = require("sequelize");
const database_1 = require("../database/database");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const debug = (0, debug_1.default)('tc:MotorcycleAccessoriesDataSource');
class MotorcycleAccessoriesDataSource {
}
exports.default = MotorcycleAccessoriesDataSource;
_a = MotorcycleAccessoriesDataSource;
MotorcycleAccessoriesDataSource.getTypeOfAccesories = async () => {
    debug('Start the search for types of accessories');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    ta.tac_id as accesorieId,
                    ta.tac_descripcion as accesorieName,
                    ta.tac_logo as logo
                FROM tr_data_base.tipo_accesorio ta
                where ta.tac_estado = 1;`, sequelize_1.QueryTypes.SELECT, {});
        if (result) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-SEARCH-TYPE-OF-ACCESORIES-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-TYPE-OF-ACCESORIES', Reason: err });
    }
};
MotorcycleAccessoriesDataSource.getBrandsOfSparePartsByType = async (accesory) => {
    debug('Starts the search for brands selling a certain type of accessory ');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                    mp.mpr_descripcion as brandName,
                    mp.mpr_id as brandId
                FROM tr_data_base.marca_tipo_accesorio mta
                INNER JOIN tr_data_base.marca_producto mp
                     ON mp.mpr_id = mta.mtt_id_marca
                INNER JOIN tr_data_base.tipo_accesorio ta
                    ON ta.tac_id = mta.mtt_id_tipo_accesorio
                WHERE mta.mtt_id_tipo_accesorio = $accesory;`, sequelize_1.QueryTypes.SELECT, { accesory });
        if (result) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE');
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-ACCESORY-BRANDS-404-DB',
                Reason: 'BD error TR_DATA_BASE',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-ACCESORY-BRANDS', Reason: err });
    }
};
//# sourceMappingURL=MotorcycleAccessoriesDataSource.js.map