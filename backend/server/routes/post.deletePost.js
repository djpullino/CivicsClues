const express = require("express");
const router = express.Router();
const newPostModel = require('../models/postModel'); // Adjust the path as necessary
const mongoose = require("mongoose");

// Assuming userId is sent in the request headers or body
router.delete("/deletePost", async (req, res) => {
  const { postId, userId } = req.body; // Get the post ID and user ID from the request body

  // Ensure postId and userId are present
  if (!postId || !userId) {
    return res.status(400).json({ error: 'Post ID and user ID are required.' });
  }

  try {
    // Find the post by ID
    const post = await newPostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the userId matches the post's userId
    if (!post.userId.equals(userId)) {
      return res.status(403).json({ error: 'You are not authorized to delete this post' });
    }

    // Delete the post
    await post.remove();
    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error deleting post:', err);
    res.status(500).json({ error: 'Could not delete post' });
  }
});

module.exports = router;
