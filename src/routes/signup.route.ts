import { CommonRoutesConfig } from "../common/common.routes.config"
import express from "express"
import { User } from "../database/models/Users.model"
import bcrypt from "bcrypt"
import { generateAccessToken } from "../jwt"
export class Signup extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "signup")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/signup", (req: express.Request, res: express.Response) => {
            let params: any = req.body
            if (!params.phone || !params.name || typeof params.phone === "number") return res.status(400).send({ message: "invalid body", code: 400 })

            //@TEMP SOLUTION will later start using password or will remove it entirely
            let password = !params.password ? "fJtJSPfs9uhrF75zYMjFybK6H56b5umVk3kZZSLqrtyMcLRgY" : params.password
            password = bcrypt.hashSync(password, 10)

            User.create({
                name: params["name"],
                phone: params["phone"],
                password: password,
                approved: true,
            })
                .then((user: any) => {
                    let token = generateAccessToken({ id: user.id, name: user.name, phone: user.phone })
                    return res.status(200).send({ token })
                })
                .catch((err: any) => {
                    let err_msg = err.errors[0].message ? err.errors[0].message : "error while creating user"
                    return res.status(500).send({ message: err_msg, status: 500 })
                })
        })
        return this.app
    }
}
