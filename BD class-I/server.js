//step1 : create a folder
//step2 : move into that folder
//step3 : npm init -y run this command in terminal
//step4 : open that folder using vs code
//step5 : npm i express
//step6 : create server.js file 

//creating your own server
const express = require('express');
const app = express();

//request ki body me data parse karna hai
const bodyParser=require('body-parser'); //used to parse req.body in express -> PUT or POST
app.use(bodyParser.json());  //specifically parse data and add it to the request.body object

//server ko 3000 port number pe live kar diya hai
app.listen(4000, ()=>{
    console.log("Server Started at port no.4000");
});

const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/PrachiNewProject',{
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then(()=>{console.log("connection successful.")})
.catch((error)=>{console.log("received an error")});

// //lets creat a route
app.get('/', (request, response)=>{
    response.send("hello jee , kaise ho saare");
})

app.post('/api/cars', (request, response)=>{
    const {name, brand}=request.body;
    console.log(name);
    console.log(brand);
    response.send("car submitted successfully");
})

