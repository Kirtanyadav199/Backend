const express = require('express')
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()
const userController = require("../controllers/user.controller")


userRouter.post("/follow/:username",identifyUser,userController.followUserController)


module.exports = userRouter