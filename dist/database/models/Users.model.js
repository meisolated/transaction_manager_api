"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const sequelize_1 = require("sequelize");
exports.User = db_js_1.default.define("tbl_users", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    phone: sequelize_1.DataTypes.INTEGER,
    password: sequelize_1.DataTypes.STRING,
    approved: sequelize_1.DataTypes.BOOLEAN,
    logged_in: sequelize_1.DataTypes.BOOLEAN,
}, {
    timestamps: false,
});
//# sourceMappingURL=Users.model.js.map