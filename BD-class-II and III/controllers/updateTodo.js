//import the model
const Todo= require("../models/Todo");

//define route handler

exports.updateTodo=async(req, res)=>{
    try{
           //fetch id in 2nd way 
           const {id}=req.params;
           const {title, description}=req.body;

            //here Todo is model name
           const todo= await Todo.findByIdAndUpdate(
            {_id: id},
            {title, description, updatedAt:Date.now()},

           )

           res.status(200).json(
            {
                success:true,
                data:todo,
                message:`Updated successfully`,
            }
           )

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
