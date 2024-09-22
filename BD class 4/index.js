const express = require('express');
const app= express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware
app.use(express.json());

//import routes

const blog= require("./routes/blog");

//mount
app.use("/api/v1", blog);

//db connection

const connectWithDB =require("./config/database");
connectWithDB();

//start server
app.listen(PORT, ()=>{
    console.log(`app is started at port number ${PORT}`)
})



app.get("/", (req, res)=>{
   res.send(`<h1>This is home page .</h1>`)
})