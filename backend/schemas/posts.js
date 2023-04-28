const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  username: { type: String },
  image: { type: String },
  content: { type: String },
  likes: { type: Number },
});

module.exports = mongoose.model("post", postsSchema);
