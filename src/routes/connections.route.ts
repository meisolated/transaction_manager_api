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
                    let owner: any = await Connections.findOne({ where: { user_id: req.user.id } })
                    if (!owner) return res.status(200).send({ status: "error", message: "user not connected", code: 404 })
                    let ownerData: any = await User.findOne({ where: { id: owner.working_under_user_id } })
                    return res.status(200).send({ status: "success", message: "success", code: 200, owner, ownerData: { phone: ownerData.phone, name: ownerData.name } })
                // ---------------------------------------------------------------------------------------------------------------------
                case "get_members":
                    let members: any = await Connections.findAll({ where: { working_under_user_id: req.user.id } })
                    // get members data 
                    let membersData: any = []
                    for (let i = 0; i < members.length; i++) {
                        let _member: any = await User.findOne({ where: { id: members[i].user_id } })
                        membersData.push({ phone: _member.phone, name: _member.name, approved: members[i].approved })
                    }
                    if (!members) return res.status(200).send({ status: "error", message: "no users working under you", code: 404 })
                    return res.status(200).send({ status: "success", message: "success", code: 200, members, membersData })
                // ---------------------------------------------------------------------------------------------------------------------
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
                            return res.status(200).send({ status: "error", message: err.message, code: 400, err })
                        })
                    break
                // ---------------------------------------------------------------------------------------------------------------------
                case "remove_member":
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
                // ---------------------------------------------------------------------------------------------------------------------
                case "accept":
                    let userToAccept: any = await Connections.findOne({ where: { user_id: req.user.id } })
                    if (!userToAccept) return res.status(200).send({ status: "error", message: "user not found", code: 404 })
                    userToAccept.approved = true
                    userToAccept
                        .save()
                        .then((connection: any) => {
                            return res.status(200).send({ status: "success", message: "success", code: 200, connection })
                        })
                        .catch((err: any) => {
                            return res.status(200).send({ status: "error", message: "error", code: 400, err })
                        })
                    break
                case "leave_connection":
                    let connectionToLeave: any = await Connections.findOne({ where: { user_id: req.user.id } })
                    if (!connectionToLeave) return res.status(200).send({ status: "error", message: "user not connected", code: 404 })
                    connectionToLeave
                        .destroy()
                        .then((connection: any) => {
                            return res.status(200).send({ status: "success", message: "success", code: 200, connection })
                        }
                        )
                        .catch((err: any) => {
                            return res.status(200).send({ status: "error", message: "error", code: 400, err })
                        }
                        )
                    break
                // ---------------------------------------------------------------------------------------------------------------------
            }
        })
        return this.app
    }
}
