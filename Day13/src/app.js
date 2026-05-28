// server banana 
// server config krna

require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')
const postRouter = require('../src/routes/post.routes')
const userRouter = require("../src/routes/user.routes")


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use("/api/posts",postRouter)
app.use("/api/user",userRouter)


module.exports = app

