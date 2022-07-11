"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsAttribute = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const sequelize_1 = require("sequelize");
exports.ProductsAttribute = db_js_1.default.define("tbl_products_attributes", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: sequelize_1.DataTypes.STRING,
    product_id: sequelize_1.DataTypes.INTEGER,
    number: sequelize_1.DataTypes.STRING,
    metric: sequelize_1.DataTypes.STRING,
    cost_price: sequelize_1.DataTypes.STRING,
    price: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
});
//# sourceMappingURL=ProductsAttribute.model.js.map