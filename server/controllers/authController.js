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
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    registerUser,
    userLogin
};