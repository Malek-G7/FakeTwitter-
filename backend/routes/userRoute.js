const express = require("express");
const router = express.Router();
const passport = require("passport");
const Post = require("../schemas/posts");
const User = require("../schemas/user");
const dotenv = require("dotenv");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtString = process.env.JWT_STRING;
dotenv.config();
const { S3Client } = require("@aws-sdk/client-s3")
const { PutObjectCommand ,GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const crypto = require("crypto")

const bucketName = 'house-swiper'
const bucketRegion = 'eu-west-1'
const accessKey =  ''
const secretAccessKey =  ''

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion 
})


router.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

router.get("/test", (req, res, next) => {
  console.log("route works!!");
  res.sendStatus(200);
});

router.post("/signup", async (req, res, next) => {
  try {
    const checkUser = await User.findOne({ email: req.query.email });
    if (checkUser) {
      res.send({ status: "fail", message: "user already exists !" });
    } else {
      hashedPassword = bcrypt.hashSync(
        req.query.password + process.env.EXTRA_BCRYPT_STRING,
        12
      );
      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/signin", async (req, res, next) => {
  const user = await User.findOne({ email: req.query.email });
  if (!user) {
    res.status(201).json({ isLoggedIn: false });
  } else {
    const checkPass = bcrypt.compare(
      req.query.password + process.env.EXTRA_BCRYPT_STRING,
      user.password
    );
    if (!checkPass) {
      res.status(201).json({ isLoggedIn: false });
    } else {
      res.status(201).json({ isLoggedIn: true });
    }
  }
});

router.post("/addPost", async (req, res, next) => {
  try {
    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
    const imageName = randomImageName()
    const base64Image = req.body.image;
    const buffer = Buffer.from(base64Image, 'base64');

    const params = {
      Bucket : bucketName,
      Key: imageName,
      Body : buffer,
      ContentType: 'image/jpeg'
  }
  const command = new PutObjectCommand(params)
  s3.send(command)

  const post = new Post({
      username: req.body.username,
      content: req.body.content,
      likes: "0",
      image: imageName
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
    console.log(allPosts);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/getSpecificPosts", async (req, res, next) => {
  try {
    const allPosts = await Post.find({username: req.body.username});
    res.json(allPosts);
    console.log(allPosts);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.get("/getAllUsers", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
    console.log(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/likePost", async (req, res, next) => {
  try {
    const likePost = await Post.findOneAndUpdate(
      { _id: req.body._id },
      { $inc: { likes: 1 } },
      { new: true, upsert: true }
    );
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

router.post("/unlikePost", async (req, res, next) => {
  try {
    const likePost = await Post.findOneAndUpdate(
      { _id: req.body._id },
      { $inc: { likes: -1 } },
      { new: true, upsert: true }
    );
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
    const deletePost = await Post.findOneAndDelete({ _id: req.body._id });
    res.json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = router;
