const express = require('express')
const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt  = require('jsonwebtoken')
const authRouter = express.Router()

    /**  
  * POST /api/auth/register 

  */
authRouter.post("/register",async (req,res)=>{

    const{username,email,password,bio,profileImage} = req.body

//     const isUserExistsByEmail = await userModel.findOne({email})
//     if(isUserExistsByEmail){
//    return res.status(409).json({
//     message:"User with this email exists"
//    })
//     }

//     const isUserExistsByUsername = await userModel.findOne({username})
//     if(isUserExistsByUsername){
//         return res.status(409).json({
//             message:"User with this email exists"
//         })
//     }

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists "+(isUserAlreadyExists.email == email ? "Email already exists":"Username already exists")
        })
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex')

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage,
    })

    const token = jwt.sign(
        {
        id:user._id,

    },
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
)

  res.cookie("token",token)

  res.status(201).json({
    message:"User Registered Successfully",
    user:{
        email:user.email,
        username:user.username,
        bio:user.bio,
        profileImage:user.profileImage
    }
  })
})


module.exports= authRouter