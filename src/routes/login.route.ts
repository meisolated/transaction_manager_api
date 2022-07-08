import { CommonRoutesConfig } from "../common/common.routes.config"
import { User } from "../database/models/Users.model"
import { generateAccessToken } from "../jwt"
import express from "express"
import bcrypt from "bcrypt"

export class Login extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "login")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/login", async (req: express.Request, res: express.Response) => {
            let params: any = req.body
            if (!params.phone || typeof params.phone === "number") return res.status(400).send({ message: "invalid body", code: 400 })

            let user: any = await User.findOne({ where: { phone: params.phone } })
            if (!user) return res.status(404).send({ message: "user not found", code: 404 })
            if (!user.approved) return res.status(401).send({ message: "user not approved", code: 401 })
            if (user.logged_in) return res.status(401).send({ message: "user already logged in", code: 401 })
            if (params.password && !bcrypt.compareSync(params.password, user.password)) return res.status(401).send({ message: "invalid password", code: 401 })

            user.logged_in = true
            await user.save()
            let token = generateAccessToken({ id: user.id, name: user.name, phone: user.phone })
            return res.status(200).send({ token, message: "login success", code: 200 })
        })
        return this.app
    }
}
