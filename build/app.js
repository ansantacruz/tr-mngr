"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PurchaseController_1 = __importDefault(require("./controllers/PurchaseController"));
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const actuator = require("express-actuator");
const app = (0, express_1.default)();
const apiPath = config_1.default.apiPath;
const fullApiPath = `${apiPath}/V1/`;
app.disable('x-powered-by');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
// Configurar cabeceras y cors
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // NOSONAR
    res.header('Access-Control-Allow-Headers', '*'); // NOSONAR
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE'); // NOSONAR
    next(); // NOSONAR
});
// add the controllers you need here
app.use(actuator({
    basePath: '/management',
}));
app.use(fullApiPath, PurchaseController_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map