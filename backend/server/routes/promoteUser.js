const express = require("express");
const router = express.Router();
const newUserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Middleware to check if the user is an admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token

  if (!token) {
    return res.status(403).json({ message: "No token provided, access denied." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); // Use ACCESS_TOKEN_SECRET
    if (decoded.isAdmin) {
      next(); // User is admin, continue with the request
    } else {
      return res.status(403).json({ message: "Not authorized as admin." });
    }
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Route to promote a user to admin (Admin only)
router.put("/promoteUser/:id", verifyAdmin, async (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL params
  
    try {
      const userToPromote = await newUserModel.findById(userId);
  
      if (!userToPromote) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update the user's role to "admin"
      userToPromote.isAdmin = true; // Set the user's isAdmin field to true
  
      // Save the updated user
      await userToPromote.save();
  
      // Generate a new token for the user after promoting
      const token = jwt.sign(
        { _id: userToPromote._id, username: userToPromote.username, isAdmin: userToPromote.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Set your token expiration as needed
      );
  
      return res.status(200).json({
        message: "User promoted to admin successfully.",
        token: token, // Send the new token back to the client
      });
    } catch (error) {
      console.error("Error promoting user:", error.message);
      return res.status(500).json({ message: "Server error, unable to promote user." });
    }
  });
  

// Route to demote a user from admin (Admin only)
router.put("/demoteUser/:id", verifyAdmin, async (req, res) => {
    const userId = req.params.id; // Get the user ID from the URL params
  
    try {
      const userToDemote = await newUserModel.findById(userId);
  
      if (!userToDemote) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Update the user's role to "not admin"
      userToDemote.isAdmin = false; // Set the user's isAdmin field to false
  
      // Save the updated user
      await userToDemote.save();
  
      // Generate a new token for the user after demoting
      const token = jwt.sign(
        { _id: userToDemote._id, username: userToDemote.username, isAdmin: userToDemote.isAdmin },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Set your token expiration as needed
      );
  
      return res.status(200).json({
        message: "User demoted successfully.",
        token: token, // Send the new token back to the client
      });
    } catch (error) {
      console.error("Error demoting user:", error.message);
      return res.status(500).json({ message: "Server error, unable to demote user." });
    }
  });
  

module.exports = router;
