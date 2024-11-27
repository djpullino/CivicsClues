import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getUserInfo from "../utilities/decodeJwt";

const EditUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    party: "",
  });

  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const { userId } = useParams();

  const partyOptions = ["Republican", "Democrat", "Independent", "Green", "Libertarian"]; // Party options

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = getUserInfo(); // Decode JWT to get user info
        if (userInfo && userInfo.id === userId) {
          setUser({
            username: userInfo.username,
            email: userInfo.email,
            party: userInfo.party || "",
          });
          setLoading(false); // Set loading to false after user data is loaded
        } else {
          alert("Unauthorized access. Redirecting to login.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handlePartyChange = async (e) => {
    const newParty = e.target.value;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/editUser/${userId}`,
        { party: newParty } // Send only the party in the request
      );
      setUser((prev) => ({ ...prev, party: response.data.party }));
      alert("Party updated successfully! This may take a minute, log out and back in for results!");
    } catch (error) {
      console.error("Error updating party:", error);
      alert("Failed to update party. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="edit-user-container">
      <h2>Edit User Party</h2>
      <div>
        <label htmlFor="party-select">Select Party:</label>
        <select
          id="party-select"
          value={user.party}
          onChange={handlePartyChange}
          className="party-dropdown"
        >
          <option value="" disabled>
            -- Select a Party --
          </option>
          {partyOptions.map((party) => (
            <option key={party} value={party}>
              {party}
            </option>
          ))}
        </select>
      </div>
      <button onClick={() => navigate("/home")} className="back-button">
        Back to Home
      </button>
    </div>
  );
};

export default EditUser;
