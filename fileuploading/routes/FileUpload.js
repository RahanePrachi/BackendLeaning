const express=require("express");
const router=express.Router();

//const {imageUpload, videoUpload, imageReducerUpload, localFileUpload}= require("../controllers/fileUpload");
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer}= require("../controllers/fileUpload");
//api route
router.post("/imageUpload", imageUpload);
router.post("/localFileUpload", localFileUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);


module.exports=router;
