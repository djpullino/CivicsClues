import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import getUserInfo from '../utilities/decodeJwt'; // Ensure this decodes correctly
import EditComment from "./editComment";
import DeleteComment from "./deleteComment";
import CreateComment from "./createComment"; // Import the CreateComment component

const CommentList = () => {
  const { postId } = useParams(); // Get the postId from the URL
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo(); // Decode the JWT
    setUser(userInfo); // Set user info from decoded JWT
    if (userInfo && userInfo.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        // Fetch the post details
        const postResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/${postId}`);
        setPost(postResponse.data);

        // Fetch the comments for this post
        const commentsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/getCommentById/${postId}`);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentDeleted = (commentId) => {
    // Remove the deleted comment from the comments list
    setComments((prevComments) => prevComments.filter((comment) => comment._id !== commentId));
  };

  const handleCommentEdited = (updatedComment) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === updatedComment._id ? updatedComment : comment
      )
    );
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-white">Loading...</div>;

  return (
    <div className="flex h-screen bg-[#301952] text-white">
      <div className="flex-grow flex flex-col items-center overflow-y-auto">
        {post && (
          <div className="w-3/4 max-w-4xl flex flex-col items-center bg-white rounded-lg shadow-lg p-6 mb-10 mt-8 text-center">
            <h2 className="text-xl font-bold text-[#301952]">{post.username}</h2>
            <p className="text-lg text-[#5B3B8C]">{post.content}</p>
          </div>
        )}

        {/* Create Comment Form */}
        {user.id && (
          <div>
            <CreateComment postId={postId} /> {/* Render the CreateComment component */}
          </div>
        )}

        <div className="w-3/4 max-w-4xl flex flex-col items-center">
          <h3 className="text-center pt-8 p-6 mb-4 text-2xl font-semibold text-white">Comments</h3>
          {comments.length === 0 ? (
            <div>No comments yet.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="bg-white p-4 rounded-lg shadow-md w-full mb-4 text-center">
                <p className="font-semibold text-[#5B3B8C]">{comment.username}:</p>
                <p className="text-[#301952]">{comment.commentContent}</p>

                {/* Edit and Delete buttons */}
                {comment.userId === user.id || isAdmin ? (
                  <div className="flex justify-center space-x-4 mt-4">
                    {comment.userId === user.id && ( 
                    <EditComment
                      commentId={comment._id}
                      commentUserId={comment.userId}
                      currentUserId={user.id}
                      initialContent={comment.commentContent}
                      onEdit={handleCommentEdited}
                    />
                    )}
                    <DeleteComment
                      commentId={comment._id}
                      commentUserId={comment.userId}
                      currentUserId={user.id}
                      isAdmin={isAdmin}
                      onDelete={() => handleCommentDeleted(comment._id)}
                    />
                  </div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentList;
