import React from 'react';
import axios from 'axios';

const DeleteComment = ({ commentId, commentUserId, currentUserId, isAdmin, onDelete }) => {
  const handleDelete = async () => {
    // Allow admins to delete any comment
    if (commentUserId !== currentUserId && !isAdmin) {
      alert("You can only delete your own comments.");
      return;
    }

    // Ask for deletion confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) {
      return;
    }

    try {
      // Send DELETE request
      await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      });
      alert('Comment deleted successfully');
      if (onDelete) {
        onDelete(); // Trigger callback to refresh the comments list
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Could not delete comment');
    }
  };

  return (
    <div>
      {/* Delete button */}
      <button 
        className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]" 
        onClick={handleDelete}
      >
        Delete Comment
      </button>
    </div>
  );
};

export default DeleteComment;
