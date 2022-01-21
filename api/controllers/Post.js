const Post = require("../models/Post");

exports.getPostById = (req, res, next, postId) => {
  // we will get postId from the router.param
  // we will use .findById() method to find the post which has id==postId
  Post.findById(postId).exec((err, post) => {
    if (err || !post) {
      return res.status(400).json({
        error: "404 post not found",
      });
    }
    // we will store that post in req.post
    req.post = post;
    // Because this is a middleware we have to call the next()
    next();
  });
};

exports.getAllPosts = (req, res) => {
  // simply use .find() method and it will return all the posts
  Post.find()
    .sort("-createdAt")
    .exec((err, posts) => {
      // error checking
      if (err || !posts) {
        return res.status(400).json({
          error: "Something went wrong in finding all posts",
        });
      }
      // return all the posts in json format
      res.json(posts);
    });
};

exports.getPost = (req, res) => {
  // this is pretty simple because we've already defined a middleware
  // to get a post from the URL id
  // this req.post is coming from that middleware
  return res.json(req.post);
};

exports.createPost = (req, res) => {
  // we will get json data from the frontend i.e. req.body
  const post = new Post(req.body);

  // create a post instance by passing 'content' field from 'req.body'
  post.save((err, content) => {
    if (err || !content) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }
    // post is created
    // send the created post as a json response
    res.json({ post });
  });
};

exports.updatePost = (req, res) => {
  // take req.post from getPostById() middleware and
  // fetch the post that user wants to update
  const post = req.post;
  // simply change the content of the post that user want to update by
  // the content that user has sent in req.body.content
  post.content = req.body.content;

  // simply save that updated post
  post.save((err, t) => {
    if (err || !t) {
      return res.status(400).json({
        error: "something went wrong while updating",
      });
    }
    // send the updated post as a json response
    res.json(t);
  });
};

exports.deletePost = (req, res) => {
  // take req.post from getPostById() middleware and
  // fetch the post that user wants to delete
  const post = req.post;
  // call .remove() method to delete it
  post.remove((err, content) => {
    if (err || !content) {
      return res.status(400).json({
        error: "something went wrong while deleting the category",
      });
    }
    // send deleted post and success message as a json response
    res.json({
      post_deleted: content,
      message: "Post deleted successfully!",
    });
  });
};