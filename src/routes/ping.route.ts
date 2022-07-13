import authenticateToken from "../middleware/authenticateToken.middleware"
import { CommonRoutesConfig } from "../common/common.routes.config"
import { Settings } from "../database/models/Settings.model"
import express from "express"

export class Ping extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "ping")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.get("/ping", authenticateToken, (req: any, res: express.Response) => {
            let finalRes: any = {}
            if (!req.user) finalRes.user = null
            Settings.findAll()
                .then((settings: Array<any>) => {
                    settings.map((setting: any) => {
                        setting = setting.dataValues
                        finalRes[setting.name] = setting.value
                    })
                    res.status(200).json({ ...finalRes, user: req.user })
                })
                .catch((err: any) => {
                    res.status(200).send(err)
                })
        })
        return this.app
    }
}
