const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const jwt = require('jsonwebtoken')
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){

   const file = await imagekit.files.upload({
    file: req.file.buffer.toString("base64"),
    fileName:"test",
    folder:"cohort-2-insta-clone-posts"
   })
    
   const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:req.user.id
   })
   
    res.status(201).json({
        message:"Post created successfully",
        post
    })

    res.send(file)
}

async function getPostController(req,res){

   

    const userId = req.user.id

    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
   
}


async function getPostDetailsController(req,res){

   

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"Post not found."
        })
    }

    const isValidUser = post.user.toString() === userId
    
    if(!isValidUser){
        return res.status(403).json({
            message:"Forbidden content"
        })
    }

    return res.status(200).json({
        message:"Post fetch successfully",
        post
    })

}


async function likePostController(req,res){

    const postId = req.params.postId
    const username = req.user.username

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isAlreadyLiked = await likeModel.find({
        post:postId,
        user:username
    })

    if(isAlreadyLiked){
        return res.status(409).json({
            message:"The post is already liked"
        })
    }

   const like =  await likeModel.create({
        post:postId,
        user:username
    })

    res.status(200).json({
        message:"Post liked successfully",
        like
    })

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}

