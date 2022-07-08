"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const Settings_model_1 = require("../database/models/Settings.model");
class Ping extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "ping");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.get("/ping", (req, res) => {
            Settings_model_1.Settings.findAll()
                .then((settings) => {
                let finalRes = {};
                settings.map((setting) => {
                    setting = setting.dataValues;
                    finalRes[setting.name] = setting.value;
                });
                res.status(200).json(finalRes);
                // res.status(200).send(settings)
            })
                .catch((err) => {
                console.log(err);
            });
        });
        return this.app;
    }
}
exports.Ping = Ping;
//# sourceMappingURL=ping.route.js.map