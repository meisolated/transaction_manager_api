import { Sequelize } from "sequelize"
import "dotenv/config"
import LoggerUtil from "../util/logger.util"

let DATABASE: string = process.env.DATABASE
let LOGGING = process.env.ENV === "prod" ? false : (msg: string) => LoggerUtil.info(msg)
var sequelize = new Sequelize(DATABASE, process.env.DB_USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql",
    logging: LOGGING,
})

export default sequelize
