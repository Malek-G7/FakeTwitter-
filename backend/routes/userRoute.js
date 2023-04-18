const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../schemas/user");
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
    const user = new User({
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
router.get("/getAllUsers", async (req, res, next) => {
  try {
    allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}); 

module.exports = router;
