//import the model

const Todo= require("../models/Todo");

//define route handler

exports.getTodo=async(req, res)=>{
    try{
           //fetch all todo item from database
           const todos=await Todo.find({}); 
           
           //response update into flag
           res.status(200)
            .json({
                success:true,
                data:todos,
                message:"entire Todo data is fetched."
            });

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

exports.getTodoById=async(req, res)=>{
    try{
           //extract todo items basis on id 
           const id=req.params.id; //way to fetch id
           const todo = await Todo.findById({_id: id });

           //data for given id not found
           if(!todo){
            return res.status(404).json({
                success:false,
                message:"no data found with given id",
            })
           }
           //data for given id found 
           res.status(200)
           .json({
            success: true,
            data:todo,
            message:`Todo ${id} data successfully fetched`,
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
//module.exports= {this.getTodo};