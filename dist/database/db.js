"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
require("dotenv/config");
const logger_util_1 = __importDefault(require("../util/logger.util"));
let DATABASE = process.env.DATABASE;
let LOGGING = process.env.ENV === "prod" ? false : (msg) => logger_util_1.default.info(msg);
var sequelize = new sequelize_1.Sequelize(DATABASE, process.env.DB_USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    logging: LOGGING,
});
exports.default = sequelize;
//# sourceMappingURL=db.js.map