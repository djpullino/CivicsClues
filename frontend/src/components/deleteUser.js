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

const DeleteUserButton = ({ userId, onDelete }) => {
  const userInfo = getUserInfo(); // Get the user info from the JWT token

  // Use the token directly from localStorage (no need to extract from userInfo)
  const token = localStorage.getItem("accessToken");

  // Ensure the token is logged for debugging
  console.log("Token:", token);

  const handleDelete = async () => {
    // Check if the user is authenticated (i.e., token exists)
    if (!token) {
      console.error('User is not authenticated');
      alert('You must be logged in to delete users.');
      return; // Stop if the user is not authenticated
    }

    // Show confirmation dialog before deleting the user
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (!isConfirmed) {
      console.log("User deletion canceled.");
      return; // Stop if the user cancels the deletion
    }

    try {
      // Make the DELETE request with the token in the headers
      const response = await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in the Authorization header
        }
      });

      console.log("User deleted:", response.data);

      // Call onDelete to remove the user from the UI state after successful deletion
      onDelete(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Delete
    </button>
  );
};

export default DeleteUserButton;
