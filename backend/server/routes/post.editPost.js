const express = require("express");
const router = express.Router();
const newPostModel = require('../models/postModel'); // Adjust the path if necessary

// Route to edit a post
router.post("/editPost", async (req, res) => {
  const { postId, content, username } = req.body; // Use `username` here

  console.log("Received edit request:", { postId, content, username }); // Debugging log

  try {
    const updatedPost = await newPostModel.findOneAndUpdate(
      { _id: postId, username: username }, // Match by `username` instead of `userId`
      { content },
      { new: true }
    );

    if (!updatedPost) {
      console.log("Post not found or unauthorized");
      return res.status(404).json({ message: "Post not found or unauthorized." });
    }

    console.log("Updated post:", updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
