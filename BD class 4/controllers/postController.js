const Post = require("../models/postModel");

exports.createPost = async (req, res)=>{
    try{
        //fetch data
        const {title, body}= req.body;
        
        //create obj
        const post = new Post({
            title, body
        });

        //save obj in db
        const savedPost= await post.save();

        res.json({
            post:savedPost,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error while creating Post",
        })
    }
};


exports.getAllPosts = async (req, res)=>{
    try{
        const posts= await Post.find().populate("likes").populate("comments").exec();
        res.json({
            posts,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error while creating Post",
        })
    }
}