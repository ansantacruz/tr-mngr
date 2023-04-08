"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchEngineService = void 0;
const debug_1 = __importDefault(require("debug"));
const SearchConfigDataSource_1 = __importDefault(require("../datasource/SearchConfigDataSource"));
const debug = (0, debug_1.default)('tc:SearchEngineService');
class SearchEngineService {
    static async getSearchConfig() {
        try {
            const response = await SearchConfigDataSource_1.default.getSearchConfig();
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain the search configuration %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.SearchEngineService = SearchEngineService;
//# sourceMappingURL=SearchEngineService.js.map