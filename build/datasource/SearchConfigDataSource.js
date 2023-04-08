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
const debug = (0, debug_1.default)('tc:SearchConfigDataSource');
class SearchConfigDataSource {
}
exports.default = SearchConfigDataSource;
_a = SearchConfigDataSource;
SearchConfigDataSource.getSearchConfig = async () => {
    debug('Starts the database query of the search configuration');
    try {
        const rqUid = 'test';
        const result = await (0, database_1.executeSQL)(`SELECT
                    c.ciu_id as id,
                    c.ciu_descripcion as descripcion,
                    c.ciu_activo as estado
                FROM turepuesto_db.ciudad c;`, sequelize_1.QueryTypes.SELECT, {});
        if (result) {
            return Promise.resolve(result[0]);
        }
        else {
            debug(`[%s] ${DebugUtilities_1.MessageError}`, rqUid, '404 NOMBRE BASE DE DATOS '); // Ajustar el nombre de la base de datos
            const bodyErrorSearchConfigInfo = {
                CodeError: 'SELECT-SEARCH_CONFIG-ENTITY-404-DB',
                Reason: 'BD error NOMBRE BASE DE DATOS',
                StatusCode: '404',
            };
            return Promise.reject(bodyErrorSearchConfigInfo);
        }
    }
    catch (err) {
        debug(`[%s] ${DebugUtilities_1.MessageError}`, err);
        return Promise.reject({ Code: 'SELECT-SEARCH_CONFIG-ENTITY', Reason: err });
    }
};
//# sourceMappingURL=SearchConfigDataSource.js.map