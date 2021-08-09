
const express = require("express")
require("../db/mongoose")
const userRouter = require("./routers/user")
const todoRouter = require("./routers/todo")

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(todoRouter)

module.exports = app