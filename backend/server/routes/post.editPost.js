const express = require("express");
const router = express.Router();
const newPostModel = require('../models/postModel'); // Adjust the path as necessary

// Route to edit a post
router.post("/editPost", async (req, res) => { // Ensure this endpoint matches what the frontend calls
  const { postId, content, userId } = req.body; // Only `postId`, `content`, and `userId` are needed

  try {
    // Find and update the post, ensuring only the original user can edit it
    const updatedPost = await newPostModel.findOneAndUpdate(
      { _id: postId, userId: userId }, // Ensure only the creator can edit
      { content },                     // Fields to update
      { new: true }                    // Option to return the updated document
    );

    // If the post is not found, send an error
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found or unauthorized." });
    }

    // Send the updated post data in the response
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
