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
exports.Backup = void 0;
const ProductsAttributes_model_1 = require("../database/models/ProductsAttributes.model");
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const Connections_model_1 = require("../database/models/Connections.model");
const Categories_model_1 = require("../database/models/Categories.model");
const Suppliers_model_1 = require("../database/models/Suppliers.model");
const Products_model_1 = require("../database/models/Products.model");
const Shops_model_1 = require("../database/models/Shops.model");
class Backup extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "backup");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/backup", authenticateToken_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            let owner = yield Connections_model_1.Connections.findOne({ where: { user_id: req.user.id } });
            owner = owner ? owner.working_under_user_id : req.user.id;
            if (params.method === "get") {
                let categories = yield Categories_model_1.Categories.findAll({ where: { user_id: owner } });
                let suppliers = yield Suppliers_model_1.Suppliers.findAll({ where: { user_id: owner } });
                let products = yield Products_model_1.Products.findAll({ where: { user_id: owner } });
                let shops = yield Shops_model_1.Shops.findAll({ where: { user_id: owner } });
                let productsAttributes = yield ProductsAttributes_model_1.ProductsAttribute.findAll({ where: { user_id: owner } });
                return res.status(200).send({
                    categories,
                    suppliers,
                    products,
                    shops,
                    productsAttributes,
                });
            }
            else if (params.method === "take") {
                if (params.table === "categories") {
                    const backUpCategories = () => {
                        params.data.map((category, index) => __awaiter(this, void 0, void 0, function* () {
                            yield Categories_model_1.Categories.create({
                                user_id: owner,
                                name: category.name,
                                picture: category.picture,
                            }).catch(err => {
                                console.log(err);
                            });
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Categories successfully taken",
                                });
                            }
                        }));
                    };
                    let categories = yield Categories_model_1.Categories.findAll({ where: { user_id: owner } });
                    if (categories.length == 0)
                        return backUpCategories();
                    categories.map((category, index) => __awaiter(this, void 0, void 0, function* () {
                        yield category.destroy();
                        if (index === categories.length - 1) {
                            backUpCategories();
                        }
                    }));
                }
                else if (params.table === "suppliers") {
                    const backUpSuppliers = () => {
                        params.data.map((supplier, index) => __awaiter(this, void 0, void 0, function* () {
                            yield Suppliers_model_1.Suppliers.create({
                                user_id: owner,
                                name: supplier.name,
                                picture: supplier.picture,
                            });
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Suppliers successfully taken",
                                });
                            }
                        }));
                    };
                    let suppliers = yield Suppliers_model_1.Suppliers.findAll({ where: { user_id: owner } });
                    if (suppliers.length == 0)
                        return backUpSuppliers();
                    suppliers.map((supplier, index) => __awaiter(this, void 0, void 0, function* () {
                        yield supplier.destroy();
                        if (index === suppliers.length - 1) {
                            backUpSuppliers();
                        }
                    }));
                }
                else if (params.table === "products") {
                    const backUpProducts = () => {
                        params.data.map((product, index) => __awaiter(this, void 0, void 0, function* () {
                            yield Products_model_1.Products.create({
                                user_id: owner,
                                product_id: product.product_id,
                                name: product.name,
                                picture: product.picture,
                                description: product.description,
                                qr_code: product.qr_code,
                                category: product.category,
                                supplier: product.supplier,
                            });
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Products successfully taken",
                                });
                            }
                        }));
                    };
                    let products = yield Products_model_1.Products.findAll({ where: { user_id: owner } });
                    if (products.length == 0)
                        return backUpProducts();
                    products.map((product, index) => __awaiter(this, void 0, void 0, function* () {
                        yield product.destroy();
                        if (index === products.length - 1) {
                            backUpProducts();
                        }
                    }));
                }
                else if (params.table === "products_attributes") {
                    const backUpProductsAttributes = () => {
                        params.data.map((productAttribute, index) => __awaiter(this, void 0, void 0, function* () {
                            yield ProductsAttributes_model_1.ProductsAttribute.create({
                                user_id: owner,
                                product_id: productAttribute.product_id,
                                number: productAttribute.number,
                                metric: productAttribute.metric,
                                cost_price: productAttribute.cost_price,
                                price: productAttribute.price,
                            });
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Products attributes successfully taken",
                                });
                            }
                        }));
                    };
                    let productsAttributes = yield ProductsAttributes_model_1.ProductsAttribute.findAll({ where: { user_id: owner } });
                    if (productsAttributes.length == 0)
                        return backUpProductsAttributes();
                    productsAttributes.map((productAttribute, index) => __awaiter(this, void 0, void 0, function* () {
                        yield productAttribute.destroy();
                        if (index === productsAttributes.length - 1) {
                            backUpProductsAttributes();
                        }
                    }));
                }
                else if (params.table === "shops") {
                    const backUpShops = () => {
                        params.data.map((shop, index) => __awaiter(this, void 0, void 0, function* () {
                            yield Shops_model_1.Shops.create({
                                user_id: owner,
                                shop_id: shop.shop_id,
                                name: shop.name,
                                address: shop.address,
                                phone: shop.phone,
                                picture: shop.picture,
                                qr_code: shop.qr_code,
                            });
                            if (index === params.data.length - 1) {
                                return res.status(200).send({
                                    message: "Shops successfully taken",
                                });
                            }
                        }));
                    };
                    let shops = yield Shops_model_1.Shops.findAll({ where: { user_id: owner } });
                    if (shops.length == 0)
                        return backUpShops();
                    shops.map((shop, index) => __awaiter(this, void 0, void 0, function* () {
                        yield shop.destroy();
                        if (index === shops.length - 1) {
                            backUpShops();
                        }
                    }));
                }
                else {
                    return res.status(200).send({
                        message: "No table selected",
                    });
                }
            }
            else {
                return res.status(400).send({ message: "method not found", code: 400 });
            }
        }));
        return this.app;
    }
}
exports.Backup = Backup;
//# sourceMappingURL=backup.route.js.map