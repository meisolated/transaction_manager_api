import winston from "winston"
import { dateNtime } from "./functions.util"

var LoggerUtil: any = {}

var logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize({
            all: true,
        }),
        winston.format.printf((data) => `[${dateNtime()}] [${data.level}] : ${data.message}`)
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
        }),
        new winston.transports.File({
            level: "silly",
            filename: "./dist/logs/ServerData.log",
        }),
    ],
})

LoggerUtil.silly = (message: string) => {
    logger.log("silly", message)
}

LoggerUtil.debug = (message: string) => {
    logger.log("debug", message)
}

LoggerUtil.verbose = (message: string) => {
    logger.log("verbose", message)
}

LoggerUtil.info = (message: string) => {
    logger.log("info", message)
}

LoggerUtil.warn = (message: string) => {
    logger.log("warn", message)
}

LoggerUtil.error = (message: string) => {
    logger.log("error", message)
}

export default LoggerUtil