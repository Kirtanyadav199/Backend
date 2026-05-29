const express = require('express')
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router()
const userController = require("../controllers/user.controller")


userRouter.post("/follow/:userId",identifyUser,userController.sendFollowRequestController)
userRouter.get("/follow/requests",identifyUser,userController.getFollowRequestController)
userRouter.put("/follow/accept/:id",identifyUser,userController.acceptFollowRequestController)
userRouter.put("/follow/reject/:id",identifyUser,userController.rejectFollowRequestController)
userRouter.delete("/follow/unfollow/:id",identifyUser,userController.unfollowUserController)


module.exports = userRouter