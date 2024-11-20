import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommentPage = () => {
  const { postId } = useParams(); // Get the postId from URL params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Fetch post and comments on component mount
  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch the post
        const postResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/${postId}`);
        setPost(postResponse.data);

        // Fetch comments for the post
        const commentsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/getCommentById/${postId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  // Handle comment form input change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle comment submission
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim() === '') return;

    try {
      // Send the new comment to the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/add`, {
        postId,
        commentContent: newComment,
      });

      // Add the new comment to the local state
      setComments((prevComments) => [...prevComments, response.data.newComment]);

      // Clear the input field
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comment-page">
      <div className="post">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
      </div>

      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows="4"
          cols="50"
        />
        <button type="submit">Submit Comment</button>
      </form>

      <div className="comments">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.commentContent}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentPage;
