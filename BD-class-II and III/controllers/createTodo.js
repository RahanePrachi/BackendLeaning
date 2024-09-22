//import the model

const Todo= require("../models/Todo");

//define route handler

exports.createTodo=async(req, res)=>{
    try{
            //extract title and description from request body
            const {title, description}= req.body;
            //create a new todo obj  and insert into db
            const response= await Todo.create({title,description});// create() se ham insert karte the
            //send a json response with a success flag
            res.status(200).json(
                {
                    success:true,
                    data:response,
                    message:"entry creadted successfully"
                }
            );
    }
    catch(err){
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}

//module.exports= {this.createTodo};