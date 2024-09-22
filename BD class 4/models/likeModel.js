//import mongoose
const mongoose=require("mongoose");

//route handler
const likeSchema= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post", //this is reference to the post mode
    },

    user:{
        type:String,
        required:true,
    },
});

//export
module.exports=mongoose.model("Like", likeSchema);