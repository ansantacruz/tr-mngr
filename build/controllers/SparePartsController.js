"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const RequestLogger_1 = __importDefault(require("../utilities/RequestLogger"));
const http_status_1 = __importDefault(require("http-status"));
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const SparePartsService_1 = require("../services/SparePartsService");
const debug = (0, debug_1.default)('tc:SparePartsController');
const SparePartsController = (0, express_1.Router)();
SparePartsController.get('/motorcycles/get-motorcycles-brands', RequestLogger_1.default.basic, async (req, res) => {
    try {
        debug('ERROR: POST-SparePartsController: %j');
        const response = await SparePartsService_1.SparePartsService.getMotorcycleBrand();
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: POST-SparePartsController: %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
SparePartsController.get('/motorcycles/get-motorcycles-by-brand/:brand', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const brand = +req.params.brand;
        const response = await SparePartsService_1.SparePartsService.getMotorcyclebyBrand(brand);
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: POST-SparePartsController: %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
exports.default = SparePartsController;
//# sourceMappingURL=SparePartsController.js.map