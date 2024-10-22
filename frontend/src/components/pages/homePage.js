import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt';
import CreatePost from '../createPost';
import Post from '../post';

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
        const userInfo = getUserInfo();
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


    if (!user || !user.username) return (
        <div className="flex justify-center items-center h-screen">
            <h4>Log in to view this page.</h4>
        </div>
    );

    const { email, username, party } = user;

    return (
        <div className="flex h-screen bg-[#301952] text-white">
            <div className="w-1/3 p-6 border-r border-white"> {/* Sidebar */}
                <h1 className="text-center mb-4">Profile Info</h1>
                <div className="text-center mb-4"> {/* Center text inside the card */}
                    <h3 className="mb-2">Username:</h3>
                    <p className="username">{username}</p>
                </div>
                <div className="text-center mb-4"> {/* Center text inside the card */}
                    <h3 className="mb-2">Your email is:</h3>
                    <p className="email">{email}</p>
                </div>
                <div className="text-center mb-4"> {/* Center text inside the card */}
                    <h3 className="mb-2">Your party is:</h3>
                    <p className="party">{party}</p>
                </div>
                <div className="text-center">
                    <button
                        className="mt-4 px-4 py-2 bg-[#301952] border border-white text-white rounded-lg shadow hover:bg-[#5B3B8C]"
                        onClick={(e) => handleClick(e)}
                    >
                        Log Out
                    </button>
                </div>
            </div>
            <div className="flex-grow flex flex-col items-center"> {/* Main area for content */}
                <div className="w-full flex flex-col items-center mb-10"> {/* Full width for CreatePost */}
                    <CreatePost />
                </div>
                {/* Display posts directly below CreatePost */}
                <div className="w-full flex flex-col items-center"> {/* Add margin for spacing */}
                    {posts.length === 0 ? (
                        <div>No posts available.</div>
                    ) : (
                        posts.map((post) => (
                            <div key={post._id} className="mb-10"> {/* Margin bottom for individual posts */}
                            <Post post={post} />
                        </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
