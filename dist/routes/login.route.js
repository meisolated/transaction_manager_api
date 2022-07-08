"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const Users_model_1 = require("../database/models/Users.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../jwt");
class login extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "login");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            if (!params.phone || typeof params.phone === "number")
                return res.status(400).send({ message: "Invalid body", code: 400 });
            let user = yield Users_model_1.User.findOne({ where: { phone: params.phone } });
            if (!user)
                return res.status(404).send({ message: "User not found", code: 404 });
            if (!user.approved)
                return res.status(401).send({ message: "User not approved", code: 401 });
            if (user.logged_in)
                return res.status(401).send({ message: "User already logged in", code: 401 });
            if (params.password && !bcrypt_1.default.compareSync(params.password, user.password))
                return res.status(401).send({ message: "Invalid password", code: 401 });
            user.logged_in = true;
            yield user.save();
            let token = (0, jwt_1.generateAccessToken)({ id: user.id, name: user.name, phone: user.phone });
            return res.status(200).send({ token });
        }));
        return this.app;
    }
}
exports.login = login;
//# sourceMappingURL=login.route.js.map