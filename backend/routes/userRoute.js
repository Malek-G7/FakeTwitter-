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
  const user = await Post.find();
  const post = { content: req.body.content, likes: req.body.likes };
  console.log("Test");
  const response = await Post.findByIdAndUpdate(
    user[0]._id,
    { "$addToSet": { "posts": post } },
    { "new": true, "upsert": true }
  );
  console.log(response);
  res.sendStatus(200);
});

router.get("/getAllPosts", async (req, res, next) => {
  try {
    allPosts = await Post.find();
    res.json(allPosts);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
