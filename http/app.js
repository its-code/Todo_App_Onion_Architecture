
const express = require("express")
require("../db/mongoose/mongoose")
const userRouter = require("./routers/user")
const todoRouter = require("./routers/todo")
const authRouter = require("./routers/auth")
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(todoRouter)
app.use(authRouter)

module.exports = app