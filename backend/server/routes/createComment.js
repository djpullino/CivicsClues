const express = require("express");
const commentRoutes = express.Router();
const comment = require("../models/commentModel");
const mongoose = require("mongoose");

// Route to reply to a comment
commentRoutes.post("/comment/reply/:id", async (req, res) => {
  const { commentContent } = req.body;
  const { id } = req.params;

  if (!id || !commentContent) return res.status(403).json("Please provide the required fields");

  const data = await comment.findById(id);
  if (!data) return res.status(404).json("Comment does not exist");

  try {
    const updatedComment = await comment.findByIdAndUpdate(
      id,
      { $addToSet: { replies: commentContent } },
      { new: true, upsert: true }
    );
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ error: "Failed to add reply" });
  }
});

// Get a list of all comments
commentRoutes.get("/comment", async (req, res) => {
  try {
    const comments = await comment.find();
    res.json(comments);
  } catch (err) {
    res.status(404).json({ commentsfound: "No comments found" });
  }
});

// Find a specific comment by ID
commentRoutes.get("/comment/:id", async (req, res) => {
  try {
    const foundComment = await comment.findById(req.params.id);
    if (!foundComment) return res.status(404).json({ commentnotfound: "No comment found" });
    res.json(foundComment);
  } catch (err) {
    res.status(404).json({ commentnotfound: "No comment found" });
  }
});

// Get comments by post ID
commentRoutes.get("/comment/getCommentById/:postId", async (req, res) => {
  try {
    const comments = await comment.find({ postId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(404).json({ commentnotfound: "No comments found" });
  }
});

// Create a new comment
commentRoutes.post("/comment/add", async (req, res) => {
  try {
    const newComment = await comment.create(req.body);
    res.json({ msg: "Comment added", newComment });
  } catch (err) {
    res.status(400).json({ error: "Unable to add this comment" });
  }
});

// Update a comment by username
commentRoutes.put("/comment/update/:username", async (req, res) => {
  try {
    const updatedComment = await comment.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true }
    );
    if (!updatedComment) return res.status(404).json({ error: "No comment found for this username" });
    res.json({ msg: "Updated successfully", updatedComment });
  } catch (err) {
    res.status(400).json({ error: "Unable to update the Database" });
  }
});

// Delete a comment by username
commentRoutes.delete("/comment/:username", async (req, res) => {
  try {
    const deletedComment = await comment.findOneAndRemove({ username: req.params.username });
    if (!deletedComment) return res.status(404).json({ error: "No comment found for this username" });
    res.json({ msg: "Comment deleted successfully" });
  } catch (err) {
    res.status(404).json({ error: "No comment found" });
  }
});

module.exports = commentRoutes;
