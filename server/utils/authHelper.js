const jwt = require('jsonwebtoken');
const User = require('../models/Auth');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        req.user = null;
        return next(); // No token, continue without user
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Token is valid, attach user to the request
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.setHeader('WWW-Authenticate', 'Bearer realm="access_token", error="invalid_token", error_description="The token has expired"');
            res.status(401).json({ error: "Access token expired, please refresh" });
        } else {
            res.status(401).json({ error: "Invalid access token" });
        }
    }
};


const findUser = async (userId) => {
    if (userId) {
        const user = await User.findById(userId).lean();
        if (!user) return res.status(404).json({ error: 'User not found' });
        return user;
    }
    return null;
};

const findUserFull = async (userId) => {
    if (userId) {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        return user;
    }
    return null;
};

module.exports = {
    authenticate,
    findUser,
    findUserFull
};