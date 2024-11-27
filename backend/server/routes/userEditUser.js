const express = require("express");
const bcrypt = require("bcrypt");  // Import bcrypt to hash passwords
const router = express.Router();
const newUserModel = require('../models/userModel');  // Ensure this points to your User model

// PUT route to edit user
router.put('/editUser/:userId', async (req, res) => {
  const { userId } = req.params;  // Get userId from URL parameter
  const { username, email, party, password } = req.body;  // Get data from request body
  
  try {
    const user = await newUserModel.findById(userId);  // Find the user by ID

    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Update user fields
    if (username) user.username = username;
    if (email) user.email = email;
    if (party) user.party = party;

    // Only update password if it's provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);  // Hash the new password
      user.password = hashedPassword;
    }

    // Save the updated user
    await user.save();

    return res.json(user);  // Return updated user data
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error updating user.");
  }
});

module.exports = router;  // Export the router for use in server.js
