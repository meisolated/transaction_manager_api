import * as expressWinston from "express-winston"
import * as bodyParser from "body-parser"
import * as winston from "winston"
import * as http from "http"
import rateLimit from 'express-rate-limit'
import express from "express"
import debug from "debug"
import cors from "cors"
import { CommonRoutesConfig } from "./common/common.routes.config"
import { Ping } from "./routes/ping.route"
import { Signup } from "./routes/signup.route"
import { Login } from "./routes/login.route"

const app: express.Application = express()
const server: http.Server = http.createServer(app)
const port = 3001
const routes: Array<CommonRoutesConfig> = []
const debugLog: debug.IDebugger = debug("app")

// rate limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


app.use(apiLimiter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use(
    expressWinston.logger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    })
)

routes.push(new Ping(app))
routes.push(new Signup(app))
routes.push(new Login(app))

app.use(
    expressWinston.errorLogger({
        transports: [new winston.transports.Console()],
        format: winston.format.combine(winston.format.colorize(), winston.format.json()),
    })
)

app.get("/", (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server running at http://localhost:${port}`)
})

server.listen(port, () => {
    debugLog(`Server running at http://localhost:${port}`)
    routes.forEach((route: CommonRoutesConfig) => {
        debugLog(`Routes configured for ${route.getName()}`)
    })
})
