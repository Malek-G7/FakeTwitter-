const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  profilePic: {
    type: String,
  },
  posts: [
    {
      content: { type: String },
      likes: { type: Number },
    },
  ],
});

module.exports = mongoose.model('user',userSchema)