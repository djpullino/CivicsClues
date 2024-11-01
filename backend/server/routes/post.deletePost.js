const express = require("express");
const router = express.Router();
const newPostModel = require('../models/postModel'); // Adjust the path as necessary

// Delete post by username
router.delete("/deletePost", async (req, res) => {
  const { postId, username } = req.body; // Get the post ID and username from the request body

  // Ensure postId and username are present
  if (!postId || !username) {
    return res.status(400).json({ error: 'Post ID and username are required.' });
  }

  try {
    // Find the post by ID
    const post = await newPostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the username matches the post's username
    if (post.username !== username) {
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
