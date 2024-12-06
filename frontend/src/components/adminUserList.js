import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getUserInfo from '../utilities/decodeJwt';
import DeleteUserButton from './deleteUser';  // Import the DeleteUserButton component

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userInfo = getUserInfo(); // Get the user info from JWT
  const isAdmin = userInfo?.isAdmin; // Check if the current user is an admin

  useEffect(() => {
    if (!isAdmin) {
      setError('You are not authorized to view this page.');
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_SERVER_URI}/user/getAll`, {
          headers: {
            Authorization: `Bearer ${userInfo?.token}` // Add token for auth
          }
        });
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAdmin, userInfo?.token]);

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user._id !== userId));  // Remove the deleted user from the state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-user-list-container">
      <h1 className="text-center text-xl font-semibold mb-4">All Users</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Email</th>
            {isAdmin && <th className="border border-gray-300 p-2">Actions</th>} {/* Render the Actions column only for admins */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border border-gray-300 p-2">{user.username}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              {isAdmin && (
                <td className="border border-gray-300 p-2">
                  <DeleteUserButton userId={user._id} onDelete={handleDeleteUser} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
