import jwt from "jsonwebtoken"

export function generateAccessToken(user: object) {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: 30 * 24 * 60 * 60,
    })
}
