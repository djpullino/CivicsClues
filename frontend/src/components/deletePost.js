import React from 'react';
import axios from 'axios';

const DeletePost = ({ postId, postUserId, currentUserId, isAdmin, onDelete }) => {
  const handleDelete = async () => {
    // Allow admins to bypass the ownership check
    if (!isAdmin && postUserId !== currentUserId) {
      alert("You can only delete your own posts.");
      return;
    }
  
    // Ask for deletion confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) {
      return;
    }
  
    try {
      // Send DELETE request
      await axios.delete('http://localhost:8081/posts/deletePost', {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        data: { postId, username: currentUserId } // Explicitly include the payload here
      });
      alert('Post deleted successfully');
      if (onDelete) {
        onDelete(); // Trigger callback to refresh the posts list
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Could not delete post');
    }
  };
  

  return (
    <div>
      {/* Delete button */}
      <button 
        className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#5B3B8C]" 
        onClick={handleDelete}
      >
        Delete Post
      </button>
    </div>
  );
};

export default DeletePost;
