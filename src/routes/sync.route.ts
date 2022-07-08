import { ProductsAttribute } from "../database/models/ProductsAttribute.model"
import authenticateToken from "../middleware/authenticateToken.middleware"
import { CommonRoutesConfig } from "../common/common.routes.config"
import { Categories } from "../database/models/Categories.model"
import { Suppliers } from "../database/models/Suppliers.model"
import { Products } from "../database/models/Products.model"
import { Shops } from "../database/models/Shops.model"
import { User } from "../database/models/Users.model"
import express from "express"

export class Sync extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, "sync")
        this.configureRoutes()
    }
    configureRoutes(): express.Application {
        this.app.post("/sync", authenticateToken, async (req: any, res: any) => {

        })
        return this.app
    }
}