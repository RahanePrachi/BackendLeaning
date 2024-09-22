const express = require("express");
const router= express.Router();

//import controller
const {dummy}=require('../controllers/dummyController');

//mapping
router.get("/dummy", dummy);
// router.get("/dummy", (req, res)=>{
//     res.send("hello this dummy page.")
// });

//export
module.exports = router;