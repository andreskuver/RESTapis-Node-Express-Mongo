const express = require("express");
const router = express.Router();

// these are the controllers
const {
  createPost,
  getPostById,
  getPost,
  deletePost,
  getAllPosts,
  updatePost,
} = require("../controllers/Post");

//params
// it will fetch the value from the url
router.param("postId", getPostById);

// to get all the Posts
router.get("/posts", getAllPosts);

// to get a single Post
router.get("/posts/:postId", getPost);

// to create a Post
router.post("/posts", createPost);

// to update the Post
router.put("/posts/:postId", updatePost);

// to delete the Post
router.delete("/posts/:postId", deletePost);

// we will export the router to import it in index.js
module.exports = router;