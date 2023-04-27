const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../schemas/posts");
const dotenv = require("dotenv");
dotenv.config();

router.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

router.get("/test", (req, res, next) => {
  console.log("route works!!");
  res.sendStatus(200);
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = new Post({
      username: req.body.username,
      password: req.body.password,
      age: req.body.age,
      gender: req.body.gender,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/addPost", async (req, res, next) => {
  try {
    const post = new Post({
      username: req.body.username,
      content : req.body.content,
      likes: "0",
      image: req.body.image ? req.body.image : "" 
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/getAllPosts", async (req, res, next) => {
  try {
    const allPosts = await Post.find();
    res.json(allPosts);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.patch("/likePost", async (req, res, next) => {
  try {
    const likePost = await Post.findOneAndUpdate({ _id: req.body._id },
      {$inc : {'likes' : 1}},
      {new:true , upsert : true})
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.patch("/unlikePost", async (req, res, next) => {
  try {
    const likePost = await Post.findOneAndUpdate({ _id: req.body._id },
      {$inc : {'likes' : -1}},
      {new:true , upsert : true})
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.patch("/editPost", async (req, res, next) => {
  try {
    const editPost = await Post.findOneAndUpdate(
      { _id: req.body._id }, 
      { content: req.body.content },
      { new: true } 
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/deletePost", async (req, res, next) => {
  try {
    const deletePost = await Post.findOneAndDelete({ _id: req.body._id })
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
