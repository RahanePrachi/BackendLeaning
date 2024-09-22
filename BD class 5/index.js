//import express js framework
const express= require("express");
const app= express(); //able to create application

const port =3000;
//middleware
app.use(express.json());


//import routes

const dummy= require("./routes/dummy");

//mount
//app.use("/", dummy);
app.use("/api/v1", dummy);

app.get("/", (req, res)=>{
    res.send( `<h1>This is heading</h1>`)
})

app.post("/car", (req, res)=>{
    res.send(`<h1>Received post request.</h1>`)
})
app.listen(port, ()=>{
    console.log(`app listening on ${port}`);
})

