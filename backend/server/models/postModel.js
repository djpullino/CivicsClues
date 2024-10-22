const mongoose = require("mongoose");

// Post schema/model
const newPostSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    username: { type: String, required: true },
    party: {type: String, required: true},
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
  },
  { collection: "posts" }
);

module.exports = mongoose.model("posts", newPostSchema);