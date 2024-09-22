//import model

const Post=require("../models/postModel");
const Comment=require("../models/commentModel");

//business logic

exports.createComment= async (req, res)=>{
    try{
        //create object ->fetch data from req body this is an another way to create
        const {post , user, body}= req.body;

        //create comment object
        const comment= new Comment({
            post, user,body
        });

        // save/store object into the db
        const  savedComment= await comment.save();

        //find the post by id , add the new comment to its comments array(means if new comment enter then accordingly, post me comment array ke under bjius user ki id add karni chahiye)
        //push=> used to update new entry
        //pull => used to remove new entry
        const updatedPost=await Post.findByIdAndUpdate(post, {$push:{comments:savedComment._id}}, {new:true})
                                .populate("comments") //populate the comments array with comment document
                                .exec();
        res.json({
            post:updatedPost, 
        });
    }
    catch(error){
        return res.status(500).json({
            error:"error while creating comments",
        })
    }
}

