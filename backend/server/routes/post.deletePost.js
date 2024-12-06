const express = require("express");
const jwt = require("jsonwebtoken");
const newPostModel = require("../models/postModel");
const router = express.Router();

// Delete post route
router.delete("/deletePost", async (req, res) => {
  const { postId, username } = req.body; // Get post ID and username from request body
  const token = req.header("Authorization")?.replace("Bearer ", ""); // Extract token from headers

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    // Ensure the token can be decoded with the secret from .env
    console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET); // Debugging line
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Verify token using the correct secret

    const isAdmin = decoded.isAdmin;
    const currentUser = decoded.username;

    const post = await newPostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (isAdmin || post.username === currentUser) {
      await post.remove();
      return res.json({ msg: "Post deleted successfully." });
    }

    return res.status(403).json({ error: "You are not authorized to delete this post." });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ error: "Could not delete post." });
  }
});

module.exports = router;
