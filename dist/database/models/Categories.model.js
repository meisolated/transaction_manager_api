"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Live = void 0;
const db_js_1 = __importDefault(require("../db.js"));
const sequelize_1 = require("sequelize");
exports.Live = db_js_1.default.define("tbl_categories", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
    },
    user_id: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    picture: sequelize_1.DataTypes.STRING,
}, {
    timestamps: false,
});
//# sourceMappingURL=Categories.model.js.map