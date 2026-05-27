const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

   const token = req.cookies.token

   if(!token){
    return res.status(401).json({
        message:"Token not provided, Unauthorized access"
    })
   }

   let decoded = null;
   
   try{
       decoded = jwt.verify(token,process.env.JWT_SECRET)
   }catch(err){
    return res.status(401).json({
        message:"user not authorized"
    })
   }
  
    
   const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName:"test",
    folder:"cohort-2-insta-clone-posts"
   })
    
   const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:decoded.id
   })
   
    res.status(201).json({
        message:"Post created successfully",
        post
    })

    res.send(file)
}

async function getPostController(req,res){

    const token = req.cookies.token

    let decoded;
    try{
      decoded =  jwt.verify(token , process.env.JWT_SECRET)
    }catch(err){
     return res.status(401).json({
        message:"Invalid token"
     })
    }

    const userId = decoded.id 

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
   
}

module.exports = {
    createPostController,
    getPostController
}