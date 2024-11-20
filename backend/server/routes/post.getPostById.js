// post.getPostById.js
const express = require('express');
const router = express.Router();
const newPostModel = require('../models/postModel');

// Function to fetch a post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await newPostModel.findById(req.params.id)
      .populate('userId', 'username') // Populate userId with username if needed
      .exec();

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post); // Return the post data
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; // Export the router correctly
