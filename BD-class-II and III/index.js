
// const express=require("express");
// const app =express();

// app.listen(3000, ()=>{
//     console.log("App is running successfully");
// })

const express=require("express");
const app= express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import routes for TODO API
const todoRoutes =require("./routes/todos");
//mount the todo API routes
app.use("/api/v1", todoRoutes);

//start server
app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`)
});

//connection to the db
const dbConnect=require("./config/database");
dbConnect();

//default route
app.get("/", (req, res)=>{
    res.send(`<h1>This is home page prachi.</h1>`)
})

