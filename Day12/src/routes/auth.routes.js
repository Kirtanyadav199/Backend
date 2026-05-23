const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
       name,email,password:hash
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

authRouter.post("/protected",(req,res)=>{
    console.log(req.cookies);
    res.status(200).json({
        message:"This is protected route"
    })
})

authRouter.post("/login",async (req,res)=>{
    const{email,password} = req.body
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"user not found with this email address"
        })
    }
    
    const isPasswordMatched = user.password == crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched){
        return res.status(400).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },
    process.env.JWT_SECRET
)

   res.cookie("jwt_token",token)

   res.status(200).json({
    message:"user logged in",
    user,
   })
})



module.exports = authRouter

