"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shops = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const sequelize_1 = require("sequelize");
exports.Shops = db_js_1.default.define("tbl_shops", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: sequelize_1.DataTypes.STRING,
    shop_id: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
    phone: sequelize_1.DataTypes.STRING,
    picture: sequelize_1.DataTypes.STRING,
    qr_code: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
});
//# sourceMappingURL=Shops.model.js.map