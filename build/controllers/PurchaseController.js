"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DebugUtilities_1 = require("../utilities/DebugUtilities");
const http_status_1 = __importDefault(require("http-status"));
const PurchaseService_1 = require("../services/PurchaseService");
const RequestLogger_1 = __importDefault(require("../utilities/RequestLogger"));
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('tc:purchaseontroller');
const Purchaseontroller = (0, express_1.Router)();
Purchaseontroller.put('/purchaseManager/package', RequestLogger_1.default.basic, async (req, res) => {
    try {
        const response = await PurchaseService_1.PurchaseService.putPurchase(req.body);
        res.status(http_status_1.default.OK).send(response);
    }
    catch (err) {
        const error = DebugUtilities_1.DebugUtilities.error(err, 'Error');
        debug('ERROR: POST-ProductsController: %j', error.statusError);
        res.status(error.codeStatusError).send(error.statusError);
    }
});
exports.default = Purchaseontroller;
//# sourceMappingURL=PurchaseController.js.map