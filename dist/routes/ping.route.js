"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const Settings_model_1 = require("../database/models/Settings.model");
class Ping extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "ping");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.get("/ping", authenticateToken_middleware_1.default, (req, res) => {
            let finalRes = {};
            if (!req.user)
                finalRes.user = null;
            Settings_model_1.Settings.findAll()
                .then((settings) => {
                settings.map((setting) => {
                    setting = setting.dataValues;
                    finalRes[setting.name] = setting.value;
                });
                res.status(200).json(Object.assign(Object.assign({}, finalRes), { user: req.user }));
            })
                .catch((err) => {
                res.status(200).send(err);
            });
        });
        return this.app;
    }
}
exports.Ping = Ping;
//# sourceMappingURL=ping.route.js.map