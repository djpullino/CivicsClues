import React from 'react';
import axios from 'axios';

const EditComment = ({ commentId, commentUserId, currentUserId, initialContent, onEdit }) => {
  
  console.log("Backend URI:", process.env.REACT_APP_BACKEND_SERVER_URI);
  

  const handleEdit = async () => {
    if (commentUserId !== currentUserId) {
      alert("You can only edit your own comments.");
      return;
    }

    const newContent = window.prompt("Edit your comment:", initialContent);
    
    if (newContent === null) return;

    if (newContent === initialContent) {
      alert("No changes were made.");
      return;
    }

    try {
      // Send PUT request and receive the updated comment
      const response = await axios.put(
  `${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/update/${commentId}`,
  {
    commentContent: newContent,
  }
);


      const updatedComment = response.data.updatedComment;  // Ensure the response contains the updated comment
      alert('Comment updated successfully');
      
      if (onEdit) {
        onEdit(updatedComment);  // Pass the updated comment to handleCommentEdited
      }
    } catch (error) {
      console.error('Error editing comment:', error);
      alert('Could not edit comment');
    }
  };

  return (
    <button
      className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]"
      onClick={handleEdit}
    >
      Edit Comment
    </button>
  );
};

export default EditComment;
