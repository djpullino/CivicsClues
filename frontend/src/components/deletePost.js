import React, { useState } from 'react';
import axios from 'axios';

const DeletePost = ({ postId, postUserId, currentUserId, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = async () => {
    // Only allow deletion if the current user's ID matches the post's userId
    if (postUserId !== currentUserId) {
      alert("You can only delete your own posts.");
      setShowConfirmation(false);
      return;
    }
    
    try {
      // Include the currentUserId in the request body for validation on the server side
      await axios.delete(`http://localhost:8081/posts/deletePost`, {
        data: { postId, userId: currentUserId } // Include userId to verify ownership on the server
      });
      alert('Post deleted successfully');
      onDelete(); // Trigger a callback to refresh the posts list
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Could not delete post');
    }
    setShowConfirmation(false); // Hide confirmation dialog
  };

  return (
    <div>
      {/* Delete button */}
      <button onClick={() => setShowConfirmation(true)}>Delete Post</button>

      {/* Confirmation dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
