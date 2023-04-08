"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MotorcycleAccessoriesService = void 0;
const debug_1 = __importDefault(require("debug"));
const MotorcycleAccessoriesDataSource_1 = __importDefault(require("../datasource/MotorcycleAccessoriesDataSource"));
const debug = (0, debug_1.default)('tc:MotorcycleAccessoriesService');
class MotorcycleAccessoriesService {
    static async getTypeOfAccesories() {
        try {
            const response = await MotorcycleAccessoriesDataSource_1.default.getTypeOfAccesories();
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain acesories types %s ', err);
            return Promise.reject(err);
        }
    }
    static async getBrandsOfSparePartsByType(accesory) {
        try {
            const response = await MotorcycleAccessoriesDataSource_1.default.getBrandsOfSparePartsByType(accesory);
            return Promise.resolve(response);
        }
        catch (err) {
            debug('Error trying to obtain acesories types %s ', err);
            return Promise.reject(err);
        }
    }
}
exports.MotorcycleAccessoriesService = MotorcycleAccessoriesService;
//# sourceMappingURL=MotorcycleAccessoriesService.js.map