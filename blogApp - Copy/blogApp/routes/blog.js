const express = require("express");
const router = express.Router();


//Import Controller
const { dummyLink, likePost, unlikePost } = require("../controllers/LikeController");
const {createComment} = require("../controllers/CommentController");




//Mapping Create
router.get("/dummyroute", dummyLink);
router.post("/comments/create", createComment);


//export
module.exports = router;
