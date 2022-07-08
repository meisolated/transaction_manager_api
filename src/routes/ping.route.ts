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
        this.app.get("/ping", (req: express.Request, res: express.Response) => {
            Settings.findAll()
                .then((settings: Array<any>) => {
                    let finalRes: any = {}
                    settings.map((setting: any) => {
                        setting = setting.dataValues
                        finalRes[setting.name] = setting.value
                    })
                    res.status(200).json(finalRes)
                    // res.status(200).send(settings)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        })
        return this.app
    }
}
