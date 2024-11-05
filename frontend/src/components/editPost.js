import React from "react";
import axios from "axios";

const EditPostButton = ({ postId, initialContent, userId, onUpdate }) => {
  const handleEdit = async () => {
    // Prompt user to enter new content
    const newContent = window.prompt("Edit your post:", initialContent);
    
    // Check if the user entered something
    if (newContent && newContent !== initialContent) {
      try {
        const response = await axios.post("http://localhost:8081/posts/editPost", { // Ensure the path matches your backend
          postId,
          content: newContent,
          userId,
        });

        // Call onUpdate to refresh the data in the parent component
        if (onUpdate) {
          onUpdate(response.data);
        }
      } catch (err) {
        console.error("Failed to update post:", err);
        alert("Error updating post. Please try again.");
      }
    }
  };

  return <button className = "px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]" onClick={handleEdit}>Edit</button>;
};

export default EditPostButton;
