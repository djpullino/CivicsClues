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

        console.log("Form submitted"); // Check if the form is being submitted
        // Check if the function is firing

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
            setLoading(true);
            console.log('Sending POST request to backend...');
            
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_SERVER_URI}/comments/comment/add`,
                {
                    postId,
                    userId,
                    username,
                    commentContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );

            console.log('API Response:', response);

            if (response.status === 201 || response.status === 200) {
                setCommentContent('');
                alert("Comment added successfully!");

                // Redirect to the comment list page, which reloads the page
                window.location.href = `/commentlist/${postId}`;
            } else {
                console.log('Unexpected response status:', response.status);
            }

        } catch (error) {
            console.error("Error creating comment:", error.response?.data || error.message);
            alert("Failed to add comment. Please try again.");
        } finally {
            setLoading(false);  // Reset loading state
        }
    };

    return (
    <div className="mt-4 p-6 bg-white text-[#301952] rounded-lg shadow-lg">
    <h2 className="text-center mb-4 text-[#301952]">Add a Comment</h2>
    <form onSubmit={handleCreateComment}>
        <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="w-full p-2 text-[#301952] rounded-md border-2 border-[#301952]"
            rows={3}  // Keep the row count as in your initial form
            placeholder="What's on your mind?"
            maxLength={150}
            disabled={loading}  // Disable textarea while loading
        />
        <div className="text-right text-sm text-gray-500">
            {commentContent.length}/150
        </div>
        <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-[#301952] border border-white text-white rounded-lg shadow hover:bg-[#5B3B8C]"
            disabled={loading}  // Disable button while loading
        >
            {loading ? "Posting..." : "Comment"}
        </button>
    </form>
</div>

    );
};

export default CreateComment;
