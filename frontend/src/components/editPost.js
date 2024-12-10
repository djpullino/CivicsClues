import React from "react";
import axios from "axios";

const EditPostButton = ({ postId, initialContent, username, onUpdate }) => { // Use `username` instead of `userId`
  const handleEdit = async () => {
    const newContent = window.prompt("Edit your post:", initialContent);

    if (newContent && newContent !== initialContent) {
      try {
        console.log("Sending edit request with:", { postId, content: newContent, username });
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/posts/editPost`, {
          postId,
          content: newContent, 
          username, // Use `username` in the request
        }); 

        console.log("Edit response:", response.data);

        if (onUpdate) {
          onUpdate(response.data);
        }
      } catch (err) {
        console.error("Failed to update post:", err);
        alert("Error updating post. Please try again.");
      }
    }
  };
  

  return (
    <button
      className="px-4 py-2 bg-[#301952] text-white rounded hover:bg-[#431c6b]"
      onClick={handleEdit}
    >
      Edit
    </button>
  );
};

export default EditPostButton;
