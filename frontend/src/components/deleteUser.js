import React from 'react';
import axios from 'axios';
import getUserInfo from '../utilities/decodeJwt'; // Function to decode JWT token

const DeleteUserButton = ({ userId, onDelete }) => {
  const userInfo = getUserInfo(); // Get the user info from JWT
  const token = userInfo?.token; // Get the token from userInfo

  const handleDelete = async () => {
    if (!token) {
      console.error('User is not authenticated');
      return; // Stop if the user is not authenticated
    }

    try {
      // Make the DELETE request with the token in the headers
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/deleteUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include token in Authorization header
        }
      });

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
