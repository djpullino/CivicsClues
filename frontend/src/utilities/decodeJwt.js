import jwt_decode from "jwt-decode";

const getUserInfo = () => {
  const token = localStorage.getItem('accessToken'); // Get the token from localStorage
  
  // Check if token exists
  if (!token) {
    console.error('No access token found in localStorage');
    return null; // Return null if no token is found
  }

  try {
    // Decode the token only if it exists
    const decoded = jwt_decode(token); 
    return decoded;
  } catch (error) {
    // Handle the error from jwt-decode (invalid token)
    console.error('Error decoding token:', error);
    return null; // Return null if the token is invalid
  }
};


export default getUserInfo;
