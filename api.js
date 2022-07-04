import express from "express"
const app = express()

app.post("/", (req, res) => {
    res.send("hello world")
})

app.listen(3000)
