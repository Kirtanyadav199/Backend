const express = require('express')
const jwt = require('jsonwebtoken')

const userModel = require('../models/user.model')

const authRouter = express.Router() 


authRouter.post("/register",async (req,res)=>{
    const{name,email,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user already exists with this email address"
        })
    }

    const user = await userModel.create({
       name,email,password
    })
    
    const token = jwt.sign(
        {
            id:user._id,
            email:user.email,
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_cookie",token)

    res.status(201).json({
        message:"user regsitered",
        user,
        token
    })
})

module.exports = authRouter

