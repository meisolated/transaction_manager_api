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
exports.Logout = void 0;
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const Users_model_1 = require("../database/models/Users.model");
class Logout extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "logout");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/logout", authenticateToken_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let user = yield Users_model_1.User.findOne({ where: { id: req.user.id } });
            if (!user)
                return res.status(404).send({ message: "user not found", code: 404 });
            if (!user.approved)
                return res.status(401).send({ message: "user not approved", code: 401 });
            if (!user.logged_in)
                return res.status(401).send({ message: "user not logged in", code: 401 });
            user.logged_in = false;
            yield user.save();
            return res.status(200).send({ message: "logout success", code: 200 });
        }));
        return this.app;
    }
}
exports.Logout = Logout;
//# sourceMappingURL=logout.route.js.map