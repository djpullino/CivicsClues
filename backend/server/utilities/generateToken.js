const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (userId, email, username, party) => {
    return jwt.sign(
        { id: userId, email, username, party }, // Avoid including sensitive info like password
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Adjusted expiration to a more standard duration
    );
};

module.exports.generateAccessToken = generateAccessToken;
