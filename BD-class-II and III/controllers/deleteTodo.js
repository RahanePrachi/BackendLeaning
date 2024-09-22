//import model
const Todo= require("../models/Todo");

//define route handler

exports.deleteTodo= async(req, res)=>{
    try{
        //fetch id
        const {id}= req.params;
        
        //delete
        await Todo.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            message:"Todo Deleted successfully."
        })

    }
    catch(err){
        console.error(err);
        res.status(500)
        .json({
            success:false,
            error:err.message,
            message:"server error"
        })
    }
}