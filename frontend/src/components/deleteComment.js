import React from 'react';
import axios from 'axios';

const DeleteComment = ({ commentId, commentUserId, currentUserId, onDelete }) => {
  const handleDelete = async () => {
    // Only allow deletion if the current user's ID matches the comment's userId
    if (commentUserId !== currentUserId) {
      alert("You can only delete your own comments.");
      return;
    }

    // Use window.confirm to ask for deletion confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
    if (!confirmDelete) {
      return; // Exit if the user does not confirm
    }

    try {
      // Send a DELETE request to the backend using the correct route
      await axios.delete(`http://localhost:8081/comments/comment/${commentId}`);
      alert('Comment deleted successfully');
      if (onDelete) {
        onDelete(); // Trigger a callback to refresh the comments list
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Could not delete comment');
      console.log(commentId);
    }
  };

  return (
    <div>
      {/* Delete button */}
      <button className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]" onClick={handleDelete}>
        Delete Comment
      </button>
    </div>
  );
};

export default DeleteComment;
