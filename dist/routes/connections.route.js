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
exports.Connection = void 0;
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const Users_model_1 = require("../database/models/Users.model");
const Connections_model_1 = require("../database/models/Connections.model");
class Connection extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, "connection");
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post("/connection", authenticateToken_middleware_1.default, (req, res) => __awaiter(this, void 0, void 0, function* () {
            let params = req.body;
            if (!params.method)
                return res.status(200).send({ status: "error", message: "invalid body", code: 400 });
            /**
             * @methods
             * 1. get owner of the connection
             * 2. get all members of the connection
             * 3. invite a user to the connection
             * 4. remove a user from the connection
             * 5. accept invitation
             */
            switch (params.method) {
                case "get_owner":
                    let owner = yield Connections_model_1.Connections.findOne({ where: { user_id: req.user.id } });
                    if (!owner)
                        return res.status(200).send({ status: "error", message: "user not connected", code: 404 });
                    let ownerData = yield Users_model_1.User.findOne({ where: { id: owner.working_under_user_id } });
                    return res.status(200).send({ status: "success", message: "success", code: 200, owner, ownerData: { phone: ownerData.phone, name: ownerData.name } });
                // ---------------------------------------------------------------------------------------------------------------------
                case "get_members":
                    let members = yield Connections_model_1.Connections.findAll({ where: { working_under_user_id: req.user.id } });
                    // get members data 
                    let membersData = [];
                    for (let i = 0; i < members.length; i++) {
                        let _member = yield Users_model_1.User.findOne({ where: { id: members[i].user_id } });
                        membersData.push({ phone: _member.phone, name: _member.name, approved: members[i].approved });
                    }
                    if (!members)
                        return res.status(200).send({ status: "error", message: "no users working under you", code: 404 });
                    return res.status(200).send({ status: "success", message: "success", code: 200, members, membersData });
                // ---------------------------------------------------------------------------------------------------------------------
                case "invite":
                    if (!params.phone || typeof params.phone === "number")
                        return res.status(200).send({ status: "error", message: "invalid body", code: 400 });
                    let user = yield Users_model_1.User.findOne({ where: { phone: params.phone } });
                    if (!user)
                        return res.status(200).send({ status: "error", message: "user not found", code: 404 });
                    if (!user.approved)
                        return res.status(200).send({ status: "error", message: "user not approved", code: 401 });
                    if (user.id === req.user.id)
                        return res.status(200).send({ status: "error", message: "you can't invite yourself", code: 401 });
                    Connections_model_1.Connections.create({ user_id: user.id, working_under_user_id: req.user.id, approved: false })
                        .then((connection) => {
                        return res.status(200).send({ status: "success", message: "success", code: 200, connection });
                    })
                        .catch((err) => {
                        return res.status(200).send({ status: "error", message: err.message, code: 400, err });
                    });
                    break;
                // ---------------------------------------------------------------------------------------------------------------------
                case "remove_member":
                    if (!params.phone || typeof params.phone === "number")
                        return res.status(200).send({ status: "error", message: "invalid body", code: 400 });
                    let userToRemove = yield Users_model_1.User.findOne({ where: { phone: params.phone } });
                    if (!userToRemove)
                        return res.status(200).send({ status: "error", message: "user not found", code: 404 });
                    if (!userToRemove.approved)
                        return res.status(200).send({ status: "error", message: "user not approved", code: 401 });
                    let connectionToRemove = yield Connections_model_1.Connections.findOne({ where: { user_id: userToRemove.id, working_under_user_id: req.user.id } });
                    if (!connectionToRemove)
                        return res.status(200).send({ status: "error", message: "user not connected", code: 404 });
                    connectionToRemove
                        .destroy()
                        .then((connection) => {
                        return res.status(200).send({ status: "success", message: "success", code: 200, connection });
                    })
                        .catch((err) => {
                        return res.status(200).send({ status: "error", message: "error", code: 400, err });
                    });
                    break;
                // ---------------------------------------------------------------------------------------------------------------------
                case "accept":
                    let userToAccept = yield Connections_model_1.Connections.findOne({ where: { user_id: req.user.id } });
                    if (!userToAccept)
                        return res.status(200).send({ status: "error", message: "user not found", code: 404 });
                    userToAccept.approved = true;
                    userToAccept
                        .save()
                        .then((connection) => {
                        return res.status(200).send({ status: "success", message: "success", code: 200, connection });
                    })
                        .catch((err) => {
                        return res.status(200).send({ status: "error", message: "error", code: 400, err });
                    });
                    break;
                case "leave_connection":
                    let connectionToLeave = yield Connections_model_1.Connections.findOne({ where: { user_id: req.user.id } });
                    if (!connectionToLeave)
                        return res.status(200).send({ status: "error", message: "user not connected", code: 404 });
                    connectionToLeave
                        .destroy()
                        .then((connection) => {
                        return res.status(200).send({ status: "success", message: "success", code: 200, connection });
                    })
                        .catch((err) => {
                        return res.status(200).send({ status: "error", message: "error", code: 400, err });
                    });
                    break;
                // ---------------------------------------------------------------------------------------------------------------------
            }
        }));
        return this.app;
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connections.route.js.map