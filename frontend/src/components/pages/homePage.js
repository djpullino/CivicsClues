import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'; // Ensure this decodes correctly
import CreatePost from '../createPost';
import DeletePost from '../deletePost';
import Post from '../post';
import EditPost from '../editPost';
import CreateComment from '../createComment';
import Comment from '../comment';

const HomePage = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken');
        return navigate('/');
    };

    useEffect(() => {
        const userInfo = getUserInfo(); // Decode the JWT
        console.log('Decoded User Info:', userInfo); // Log to see if 'id' is correctly decoded
        setUser(userInfo); // Set user info from decoded JWT
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/getAllPosts`);
                setPosts(response.data); // Set the fetched posts
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts();
    }, []);

    const handleDeleteConfirmed = (deletedPostId) => {
        setPosts(posts.filter(post => post._id !== deletedPostId));
    };

    const handleUpdatePost = (updatedPost) => {
        setPosts(posts.map(post => 
            post._id === updatedPost._id ? updatedPost : post
        ));
    };

    const handleCommentSubmit = (postId, comment) => {
        axios.post(`${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/${postId}/comments`, {
            username: user.username,
            comment: comment,
        })
        .then(response => {
            setPosts(posts.map(post => 
                post._id === postId ? { ...post, comments: [...post.comments, response.data] } : post
            ));
        })
        .catch(error => {
            console.error("Error adding comment:", error);
        });
    };

    const handlePostCreated = () => {
        console.log('Post created! Refreshing posts...');
        axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/posts/getAllPosts`)
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    };

    if (!user || !user.username) return (
        <div className="flex justify-center items-center h-screen">
            <h4>Log in to view this page.</h4>
        </div>
    );

    const { id, username, party } = user; // Use 'id' instead of '_id' here

    return (
        <div className="flex h-screen bg-[#301952] text-white">
            <div className="w-1/3 p-6 border-r border-white"> {/* Sidebar */}
                <h1 className="text-center mb-4">Profile Info</h1>
                <div className="text-center mb-4">
                    <h3 className="mb-2">Username:</h3>
                    <p className="username">{username}</p>
                </div>
                <div className="text-center mb-4">
                    <h3 className="mb-2">Your email is:</h3>
                    <p className="email">{user.email}</p>
                </div>
                <div className="text-center mb-4">
                    <h3 className="mb-2">Your party is:</h3>
                    <p className="party">{party}</p>
                </div>
                <div className="text-center">
                    <button
                        className="mt-4 px-4 py-2 bg-[#301952] border border-white text-white rounded-lg shadow hover:bg-[#5B3B8C]"
                        onClick={handleClick}
                    >
                        Log Out
                    </button>
                </div>
                <div className="text-center mb-4">
                    <button
                         className="mt-4 px-4 py-2 bg-[#5B3B8C] text-white rounded-lg shadow hover:bg-[#301952]"
                         onClick={() => navigate(`/editUser/${id}`)} // Use 'id' instead of '_id'
                     >
                            Edit Party
                     </button>
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center overflow-y-auto"> {/* Main area for content */}
                <div className="w-full flex flex-col items-center mb-10"> {/* Full width for CreatePost */}
                    <CreatePost onPostCreated={handlePostCreated} />
                </div>
                <div className="w-full flex flex-col items-center">
                    {posts.length === 0 ? (
                        <div>No posts available.</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="flex-grow flex flex-col items-center bg-white rounded shadow-md p-2 mb-4">
                                <Post post={post} />
                                
                                {/* Comment section */}
                                <div className="w-full">
                                    <h3 className="text-center mb-2">Comments</h3>
                                    {post.comments && post.comments.length > 0 ? (
                                        post.comments.map((comment, index) => (
                                            <Comment key={index} comment={comment} />
                                        ))
                                    ) : (
                                        <div>No comments yet.</div>
                                    )}
                                    <CreateComment onSubmit={(comment) => handleCommentSubmit(post._id, comment)} />
                                </div>

                                {post.username === username && (
                                    <div className="flex space-x-2 mt-2"> {/* Added a small margin on top */}
                                        <DeletePost 
                                            postId={post._id}
                                            postUserId={post.username} // Post username
                                            currentUserId={username} // Current user's username
                                            onDelete={() => handleDeleteConfirmed(post._id)}
                                        />
                                        <EditPost 
                                            postId={post._id}
                                            username={post.username}
                                            onUpdate={handleUpdatePost}
                                        />
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
