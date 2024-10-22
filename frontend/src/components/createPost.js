import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserInfo from '../utilities/decodeJwt';

const CreatePost = () => {
    const [postContent, setPostContent] = useState('');
    const [user, setUser] = useState({});



    const fetchUserInfo = async () => {
        try {
          const userInfo = await getUserInfo();
          if (userInfo) {
            setUser(userInfo);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
    
      useEffect(() => {
        fetchUserInfo();
      }, []);
    

      const handleCreatePost = async (e) => {
        e.preventDefault();
    
        if (!postContent.trim()) {
            alert("Post content cannot be empty.");
            return;
        }
    
        // Check if user info is properly set
        const { id: userId, username, party } = user;
        if (!userId || !username || !party) {
            alert("User information is missing. Please log in again.");
            return;
        }
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/createPost`,
                {
                    content: postContent,
                    userId: userId,
                    username: username,
                    party: party
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                }
            );
    
            if (response.status === 200) {
                setPostContent(''); // Clear the text area after successful post creation
                alert("Post created successfully.");
            }
        } catch (error) {
            console.error("Error creating post:", error.response?.data || error.message);
            alert("Failed to create post. Please try again.");
        }
    };
    

    return (
        <div className="w-1/3 p-6 bg-[#4A2A72] text-white rounded-lg shadow-lg">
            <h2 className="text-center mb-4">Create a New Post</h2>
            <form onSubmit={handleCreatePost}>
                <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full p-2 text-black rounded-md"
                    rows={5}
                    placeholder="What's on your mind?"
                />
                <button
                    type="submit"
                    className="mt-4 w-full px-4 py-2 bg-[#301952] border border-white text-white rounded-lg shadow hover:bg-[#5B3B8C]"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
