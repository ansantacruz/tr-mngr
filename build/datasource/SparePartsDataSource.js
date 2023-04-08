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
const debug = (0, debug_1.default)('tc:SparePartsDataSource');
class SparePartsDataSource {
}
exports.default = SparePartsDataSource;
_a = SparePartsDataSource;
SparePartsDataSource.getMotorcycleBrand = async () => {
    debug('Starts the database query of the search motorcycle brands');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT
                mmo_id as id,
                mmo_descripcion as marca,
                mmo_logo as logo
            FROM tr_data_base.marca_motocicleta;`, sequelize_1.QueryTypes.SELECT, {});
        if (result) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE'); // Ajustar el nombre de la base de datos
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-SEARCH-MOTORCYCLE-BRANDS-404-DB',
                Reason: 'BD error NOMBRE BASE DE DATOS',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-MOTORCYCLE-BRANDS', Reason: err });
    }
};
SparePartsDataSource.getMotorcyclebyBrand = async (brand) => {
    debug('Starts the database query of the search motorcycle brands');
    try {
        const result = await (0, database_1.executeSQL)(`SELECT 
                    mo.mot_id,            
                    mo.mot_nombre,
                    tpm.tmo_descripcion
                FROM tr_data_base.motocicleta mo
                INNER JOIN tr_data_base.tipo_motocicleta tpm
                    ON mo.mot_tipoMotocicleta=tpm.tmo_id
                WHERE mo.mot_marca=$brand;`, sequelize_1.QueryTypes.SELECT, { brand });
        if (result) {
            return Promise.resolve(result);
        }
        else {
            debug(`${DebugUtilities_1.MessageError}`, '404 TR_DATA_BASE'); // Ajustar el nombre de la base de datos
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-SEARCH-MOTORCYCLE-BRANDS-404-DB',
                Reason: 'BD error NOMBRE BASE DE DATOS',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH-MOTORCYCLE-BRANDS', Reason: err });
    }
};
//# sourceMappingURL=SparePartsDataSource.js.map