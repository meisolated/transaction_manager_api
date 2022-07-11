import authenticateToken from "../middleware/authenticateToken.middleware"
import { CommonRoutesConfig } from "../common/common.routes.config"
import { User } from "../database/models/Users.model"
import { Connections } from "../database/models/Connections.model"
import { generateAccessToken } from "../jwt"
import express from "express"
import bcrypt from "bcrypt"

export class Connection extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "connection")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/connection", authenticateToken, async (req: any, res: express.Response) => {
            let params: any = req.body
            if (!params.method) return res.status(200).send({ status: "error", message: "invalid body", code: 400 })

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
                    let owner = await Connections.findOne({ where: { user_id: req.user.id } })
                    if (!owner) return res.status(200).send({ status: "error", message: "user not connected", code: 404 })
                    return res.status(200).send({ status: "success", message: "success", code: 200, owner })
                    break
                case "get_members":
                    let members = await Connections.findAll({ where: { working_under_user_id: req.user.id } })
                    if (!members) return res.status(200).send({ status: "error", message: "no users working under you", code: 404 })
                    return res.status(200).send({ status: "success", message: "success", code: 200, members })
                    break
                case "invite":
                    if (!params.phone || typeof params.phone === "number") return res.status(200).send({ status: "error", message: "invalid body", code: 400 })
                    let user: any = await User.findOne({ where: { phone: params.phone } })
                    if (!user) return res.status(200).send({ status: "error", message: "user not found", code: 404 })
                    if (!user.approved) return res.status(200).send({ status: "error", message: "user not approved", code: 401 })
                    if (user.id === req.user.id) return res.status(200).send({ status: "error", message: "you can't invite yourself", code: 401 })
                    Connections.create({ user_id: user.id, working_under_user_id: req.user.id, approved: false })
                        .then((connection: any) => {
                            return res.status(200).send({ status: "success", message: "success", code: 200, connection })
                        })
                        .catch((err: any) => {
                            return res.status(200).send({ status: "error", message: "error", code: 400, err })
                        })
                    break
                case "remove":
                    if (!params.phone || typeof params.phone === "number") return res.status(200).send({ status: "error", message: "invalid body", code: 400 })
                    let userToRemove: any = await User.findOne({ where: { phone: params.phone } })
                    if (!userToRemove) return res.status(200).send({ status: "error", message: "user not found", code: 404 })
                    if (!userToRemove.approved) return res.status(200).send({ status: "error", message: "user not approved", code: 401 })
                    let connectionToRemove: any = await Connections.findOne({ where: { user_id: userToRemove.id, working_under_user_id: req.user.id } })
                    if (!connectionToRemove) return res.status(200).send({ status: "error", message: "user not connected", code: 404 })
                    connectionToRemove
                        .destroy()
                        .then((connection: any) => {
                            return res.status(200).send({ status: "success", message: "success", code: 200, connection })
                        })
                        .catch((err: any) => {
                            return res.status(200).send({ status: "error", message: "error", code: 400, err })
                        })
                    break
                case "accept":
                    if (!params.phone || typeof params.phone === "number") return res.status(200).send({ status: "error", message: "invalid body", code: 400 })
                    let userToAccept: any = await User.findOne({ where: { phone: params.phone } })
                    if (!userToAccept) return res.status(200).send({ status: "error", message: "user not found", code: 404 })
                    if (!userToAccept.approved) return res.status(200).send({ status: "error", message: "user not approved", code: 401 })
                    let connectionToAccept: any = await Connections.findOne({ where: { user_id: userToAccept.id, working_under_user_id: req.user.id } })
                    if (!connectionToAccept) return res.status(200).send({ status: "error", message: "user not connected", code: 404 })
                    connectionToAccept.approved = true
                    connectionToAccept
                        .save()
                        .then((connection: any) => {
                            return res.status(200).send({ status: "success", message: "success", code: 200, connection })
                        })
                        .catch((err: any) => {
                            return res.status(200).send({ status: "error", message: "error", code: 400, err })
                        })
                    break
                // default:
                //     return res.status(200).send({ status: "error", message: "invalid body", code: 400 })

            }
        })
        return this.app
    }
}
