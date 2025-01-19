const jwt = require('jsonwebtoken');
const User = require('../models/Auth');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        req.user = null;
        next();
    }
    else{
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(403).json({ error: "Invalid or expired access token" });
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

module.exports = {
    authenticate,
    findUser
};