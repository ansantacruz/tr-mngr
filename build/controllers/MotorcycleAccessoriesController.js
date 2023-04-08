"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const RequestLogger_1 = __importDefault(require("../utilities/RequestLogger"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('tc:MotorcycleAccessoriesController');
const MotorcycleAccessoriesController = (0, express_1.Router)();
MotorcycleAccessoriesController.get('/accessories/get-types-of-accessories', RequestLogger_1.default.basic, async (req, res) => {
    try {
        console.log("Esta funcionando");
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-types-of-accessories %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
exports.default = MotorcycleAccessoriesController;
//# sourceMappingURL=MotorcycleAccessoriesController.js.map