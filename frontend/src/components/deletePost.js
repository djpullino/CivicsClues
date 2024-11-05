import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, postUserId, currentUserId, onDelete }) => {

  const handleDelete = async () => {
    // Only allow deletion if the current user's ID matches the post's userId
    if (postUserId !== currentUserId) {
      alert("You can only delete your own posts.");
      return;
    }

    // Use window.confirm to ask for deletion confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) {
      return; // Exit if the user does not confirm
    }

    try {
      // Send a DELETE request including the postId and username
      await axios.delete(`http://localhost:8081/posts/deletePost`, {
        data: { postId, username: currentUserId } // Use username for verification
      });
      alert('Post deleted successfully');
      onDelete(); // Trigger a callback to refresh the posts list
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Could not delete post');
    }
  };

  return (
    <div>
      {/* Delete button */}
      <button className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]" onClick={handleDelete}>
        Delete Post
      </button>
    </div>
  );
};

export default DeletePost;
