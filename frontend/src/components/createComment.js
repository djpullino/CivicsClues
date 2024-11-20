import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserInfo from '../utilities/decodeJwt';

const CreateComment = ({ postId }) => {
    const [commentContent, setCommentContent] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };
        fetchUserInfo();
    }, []);

    const handleCreateComment = async (e) => {
        e.preventDefault();

        if (!commentContent.trim()) {
            alert("Comment cannot be empty.");
            return;
        }

        if (commentContent.length > 150) {
            alert("Comment cannot exceed 150 characters.");
            return;
        }

        const { id: userId, username } = user || {};
        if (!userId || !username) {
            alert("User information is missing. Please log in again.");
            return;
        }

        try {
            setLoading(true);  // Set loading to true while the request is ongoing
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_SERVER_URI}/comment/add`,
                {
                    postId,
                    userId,
                    username,
                    content: commentContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            if (response.status === 201) {
                setCommentContent('');
                alert("Comment added successfully!");
                // Redirect to the comment list page for this post (using postId)
                window.location.href = `/commentlist/${postId}`;
            }
        } catch (error) {
            console.error("Error creating comment:", error.response?.data || error.message);
            alert("Failed to add comment. Please try again.");
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
        <div className="mt-4 w-full p-4 bg-gray-100 rounded-md">
            <form onSubmit={handleCreateComment}>
                <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="w-full p-2 rounded border border-gray-300 text-black"
                    rows={3}
                    placeholder="Add a comment..."
                    maxLength={150}
                    disabled={loading}  // Disable textarea while loading
                />
                <div className="text-right text-sm text-black">
                    {commentContent.length}/150
                </div>
                <button
                    type="submit"
                    className="mt-2 w-full py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}  // Disable button while loading
                >
                    {loading ? "Posting..." : "Comment"}
                </button>
            </form>
        </div>
    );
};

export default CreateComment;
