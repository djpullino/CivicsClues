import React from 'react';
import axios from 'axios';

// Function to get user info from the JWT token stored in localStorage
const getUserInfo = () => {
  const token = localStorage.getItem("accessToken"); // Get the token from localStorage
  console.log("Stored Token:", token);
  if (!token) return null;
  
  try {
    // Decode the token to get user details
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    return decoded;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
};

const ManageUserRoleButton = ({ userId, onUpdate }) => {
  const userInfo = getUserInfo(); // Get the user info from the JWT token

  // Use the token directly from localStorage (no need to extract from userInfo)
  const token = localStorage.getItem("accessToken");

  // Ensure the token is logged for debugging
  console.log("Token:", token);

  const handlePromote = async () => {
    // Check if the user is authenticated (i.e., token exists)
    if (!token) {
      console.error('User is not authenticated');
      alert('You must be logged in to promote users.');
      return; // Stop if the user is not authenticated
    }

    // Show confirmation dialog before promoting the user
    const isConfirmed = window.confirm("Are you sure you want to promote this user?");
    if (!isConfirmed) {
      console.log("User promotion canceled.");
      return; // Stop if the user cancels the promotion
    }

    try {
      // Make the PUT request to promote the user
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/promoteUser/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in the Authorization header
        }
      });

      console.log("User promoted:", response.data);

      // Call onUpdate to update the UI state after successful promotion
      onUpdate(userId, "promote");
    } catch (error) {
      console.error('Error promoting user:', error);
      alert('Failed to promote user.');
    }
  };

  const handleDemote = async () => {
    // Check if the user is authenticated (i.e., token exists)
    if (!token) {
      console.error('User is not authenticated');
      alert('You must be logged in to demote users.');
      return; // Stop if the user is not authenticated
    }

    // Show confirmation dialog before demoting the user
    const isConfirmed = window.confirm("Are you sure you want to demote this user?");
    if (!isConfirmed) {
      console.log("User demotion canceled.");
      return; // Stop if the user cancels the demotion
    }

    try {
      // Make the PUT request to demote the user
      const response = await axios.put(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/demoteUser/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in the Authorization header
        }
      });

      console.log("User demoted:", response.data);

      // Call onUpdate to update the UI state after successful demotion
      onUpdate(userId, "demote");
    } catch (error) {
      console.error('Error demoting user:', error);
      alert('Failed to demote user.');
    }
  };

  return (
    <div>
      <button
        onClick={handlePromote}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
      >
        Promote to Admin
      </button>

      <button
        onClick={handleDemote}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
      >
        Demote from Admin
      </button>
    </div>
  );
};

export default ManageUserRoleButton;
