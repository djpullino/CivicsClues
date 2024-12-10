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


// Route to delete a specific user by their ID (Admin only)
router.delete("/deleteUser/:id", verifyAdmin, async (req, res) => {
  const userId = req.params.id; // Get the user ID from the URL params

  try {
    const userToDelete = await newUserModel.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ message: "User not found." });
    }

    await newUserModel.findByIdAndDelete(userId); // Delete the user by ID
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(500).json({ message: "Server error, unable to delete user." });
  }
});

module.exports = router;
