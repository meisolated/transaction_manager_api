"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const functions_util_1 = require("./functions.util");
var LoggerUtil = {};
var logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.colorize({
        all: true,
    }), winston_1.default.format.printf((data) => `[${(0, functions_util_1.dateNtime)()}] [${data.level}] : ${data.message}`)),
    transports: [
        new winston_1.default.transports.Console({
            level: "silly",
        }),
        new winston_1.default.transports.File({
            level: "silly",
            filename: "./dist/logs/ServerData.log",
        }),
    ],
});
LoggerUtil.silly = (message) => {
    logger.log("silly", message);
};
LoggerUtil.debug = (message) => {
    logger.log("debug", message);
};
LoggerUtil.verbose = (message) => {
    logger.log("verbose", message);
};
LoggerUtil.info = (message) => {
    logger.log("info", message);
};
LoggerUtil.warn = (message) => {
    logger.log("warn", message);
};
LoggerUtil.error = (message) => {
    logger.log("error", message);
};
exports.default = LoggerUtil;
//# sourceMappingURL=logger.util.js.map