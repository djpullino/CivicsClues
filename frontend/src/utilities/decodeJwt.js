import jwt_decode from 'jwt-decode';

const getUserInfo = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return undefined;

    const { exp } = jwt_decode(accessToken);
    // Check if the token is expired
    if (exp > (new Date().getTime() + 1) / 1000) {
        return jwt_decode(accessToken); // Returns the payload without password
    }
    return undefined; // Return undefined if expired
};

export default getUserInfo;
