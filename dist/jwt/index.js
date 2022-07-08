"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: 30 * 24 * 60 * 60,
    });
}
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=index.js.map