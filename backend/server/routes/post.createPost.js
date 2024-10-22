const express = require("express");
const router = express.Router();
const newPostModel = require('../models/postModel'); // Adjust the path as necessary
const mongoose = require("mongoose");

// Assuming you get the user data from the request body or another source
router.post("/createPost", async (req, res) => {
  const { content, userId, username, party } = req.body; // Get content and user details from the request body

  // Ensure all required fields are present
  if (!content || !userId || !username || !party) {
    return res.status(400).json({ error: 'Content, userId, username, and party are required.' });
  }

  const createNewPost = new newPostModel({
    userId: mongoose.Types.ObjectId(userId), // Use the userId from the request
    username: username,
    party: party,
    content: content,
  });

  try {
    await createNewPost.save(); // Save the post
    res.json({ msg: 'Post created successfully' });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Could not create post' });
  }
});

module.exports = router;
