import authenticateToken from "../middleware/authenticateToken.middleware"
import { CommonRoutesConfig } from "../common/common.routes.config"
import { User } from "../database/models/Users.model"
import express from "express"


export class Logout extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "logout")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/logout", authenticateToken, async (req: any, res: express.Response) => {
            let user: any = await User.findOne({ where: { id: req.user.id } })
            if (!user) return res.status(404).send({ message: "user not found", code: 404 })
            if (!user.approved) return res.status(401).send({ message: "user not approved", code: 401 })
            if (!user.logged_in) return res.status(401).send({ message: "user not logged in", code: 401 })
            user.logged_in = false
            await user.save()
            return res.status(200).send({ message: "logout success", code: 200 })
        })
        return this.app
    }

}