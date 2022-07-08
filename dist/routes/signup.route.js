"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signup = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const Users_model_1 = require("../database/models/Users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../jwt");
class Signup extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "signup");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/signup", (req, res) => {
            let params = req.body;
            if (!params.phone || !params.name || typeof params.phone === "number")
                return res.status(400).send({ message: "Invalid body", code: 400 });
            //@TEMP SOLUTION will later start using password or will remove it 
            let password = !params.password ? "fJtJSPfs9uhrF75zYMjFybK6H56b5umVk3kZZSLqrtyMcLRgY" : params.password;
            password = bcrypt_1.default.hashSync(password, 10);
            Users_model_1.User.create({
                name: params["name"],
                phone: params["phone"],
                password: password,
                approved: true,
            })
                .then((user) => {
                let token = (0, jwt_1.generateAccessToken)({ id: user.id, name: user.name, phone: user.phone });
                return res.status(200).send({ token });
            })
                .catch((err) => {
                let err_msg = err.errors[0].message ? err.errors[0].message : "Error while creating user";
                return res.status(500).send({ message: err_msg, status: 500 });
            });
        });
        return this.app;
    }
}
exports.Signup = Signup;
//# sourceMappingURL=signup.route.js.map