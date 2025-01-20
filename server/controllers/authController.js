const User = require('../models/Auth');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password, username } = req.body;
        const user = new User({ email, password, username });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const userLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
        var user = await User.findOne({ email });
        if (!user) user = await User.findOne({ username: email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        // Generate JWT
        const { accessToken, refreshToken } = generateTokens(user._id, user.role);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const generateTokens = (userId, userRole) => {
    const accessToken = jwt.sign({ userId: userId, role: userRole }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    const refreshToken = jwt.sign({ userId: userId, role: userRole }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });

    return { accessToken, refreshToken };
};

const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ accessToken: newAccessToken });
    } catch (err) {
        res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};


module.exports = {
    registerUser,
    userLogin,
    refreshAccessToken
};