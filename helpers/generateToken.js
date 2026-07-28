const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAuthToken = (user) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }
    return jwt.sign(
        {
            sub: user._id,
            role: user.role,
            branchId: user.branchId,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

const genRefreshToken = (user) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error('JWT_REFRESH_SECRET is not configured');
    }
    return jwt.sign(
        { id: user._id, roles: [user.role] },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

const generateToken = (user) => {
    try {
        const accessToken = getAuthToken(user);
        const refreshToken = genRefreshToken(user);
        return { accessToken, refreshToken };
    } catch (error) {
        console.error('Token generation failed:', error.message);
        throw error;
    }
};

module.exports = generateToken;
