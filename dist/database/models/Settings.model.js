"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const sequelize_1 = require("sequelize");
exports.Settings = db_js_1.default.define("tbl_settings", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    name: sequelize_1.DataTypes.STRING,
    value: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
});
//# sourceMappingURL=Settings.model.js.map