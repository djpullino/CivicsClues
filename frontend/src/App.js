import React, { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import './css/card.css';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import FindLocalReps from  "./components/pages/findlocalreps";
import CommentList from './components/commentList';
import EditUser from "./components/editUser";
import AdminUserList from './components/adminUserList';

// Import the ElectoralMap component
import ElectoralMap from "./components/pages/electoralMap";

// Import the getUserInfo function
import getUserInfo from "./utilities/decodeJwt";

// Create the UserContext to provide user info globally
export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  const isAdmin = user && user.isAdmin;

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/electoral" element={<ElectoralMap />} /> {/* Embed the ElectoralMap component */}
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/findlocalreps" element={<FindLocalReps />} />
          <Route path="/commentList/:postId" element={<CommentList />} />
          <Route exact path="/editUser/:userId" element={<EditUser />} />
          <Route path="/admin/users" element={isAdmin ? <AdminUserList /> : <div>You are not authorized to access this page.</div>} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
