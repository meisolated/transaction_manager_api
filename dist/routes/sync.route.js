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
exports.Sync = void 0;
const ProductsAttribute_model_1 = require("../database/models/ProductsAttribute.model");
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const Connections_model_1 = require("../database/models/Connections.model");
const Categories_model_1 = require("../database/models/Categories.model");
const Suppliers_model_1 = require("../database/models/Suppliers.model");
const Products_model_1 = require("../database/models/Products.model");
const Shops_model_1 = require("../database/models/Shops.model");
class Sync extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "sync");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/sync", authenticateToken_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            let owner = yield Connections_model_1.Connections.findOne({ where: { user_id: req.user.id } });
            owner = owner ? owner.working_under_user_id : req.user.id;
            if (params.method === "get") {
                let categories = yield Categories_model_1.Categories.findAll({ where: { user_id: owner } });
                let suppliers = yield Suppliers_model_1.Suppliers.findAll({ where: { user_id: owner } });
                let products = yield Products_model_1.Products.findAll({ where: { user_id: owner } });
                let shops = yield Shops_model_1.Shops.findAll({ where: { user_id: owner } });
                let productsAttributes = yield ProductsAttribute_model_1.ProductsAttribute.findAll({ where: { user_id: owner } });
                return res.status(200).send({
                    categories,
                    suppliers,
                    products,
                    shops,
                    productsAttributes
                });
            }
            else if (params.method === "set") {
            }
            else {
                return res.status(400).send({ message: "method not found", code: 400 });
            }
        }));
        return this.app;
    }
}
exports.Sync = Sync;
//# sourceMappingURL=sync.route.js.map