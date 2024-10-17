import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../utilities/decodeJwt';

const HomePage = () => {
    const [user, setUser] = useState({});
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
            <div className="flex-grow flex justify-center items-center"> {/* Main area, if you need additional content */}
                {/* Add any additional content here, if needed */}
            </div>
        </div>
    );
};

export default HomePage;
