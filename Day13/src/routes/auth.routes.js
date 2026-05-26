const express = require('express')
const userModel = require('../models/user.model')

const jwt  = require('jsonwebtoken')
const authController = require('../controllers/auth.controllers')
const authRouter = express.Router()

    /**  
  * POST /api/auth/register 

  */
authRouter.post("/register",authController.RegisterController)

authRouter.post("/login",authController.LoginController)

module.exports= authRouter