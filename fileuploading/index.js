const express = require("express");
const app = express();

//port find karna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

//connect to db
const db= require("./config/database");
db.connect();

//cloud se connect karna h
const cloudinary=require("./config/cloudinary");
cloudinary.cloudinaryConnect();


//api route mount karna h
const Upload=require("./routes/FileUpload");
const { connect } = require("mongoose");
app.use("/api/v1/upload", Upload);

//start the server
app.listen(PORT, () => {
    console.log(`App is running at Port no ${PORT}`);
})
app.get("/", (req, res) => {
   res.send("hello jee kay hal chaal...");
})