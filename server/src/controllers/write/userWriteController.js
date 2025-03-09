const { body, validationResult } = require('express-validator');
const express = require('express');

class UserController {
    constructor(userWriteService) {
        this.userWriteService = userWriteService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/register', [
            body('email').isEmail().withMessage('Enter a valid email'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
            body('username').isLength({ max: 15 }).withMessage('Username can be a maximum of 15 characters')
        ], this.register.bind(this));

        this.router.post('/login', [
            body('password').exists()
        ], this.login.bind(this));
    }

    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password, username } = req.body;
            const result = await this.userWriteService.registerUser({ email, password, username });

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            res.status(201).json({
                message: result.message,
                user: result.user,
                accessToken: result.accessToken
            });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const result = await this.userWriteService.loginUser(email, password);

            res.cookie("refreshToken", result.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            res.status(200).json({
                user: result.user,
                accessToken: result.accessToken
            });
        } catch (error) {
            if (error.message === 'User not found') {
                return res.status(404).json({ error: error.message });
            }
            if (error.message === 'Invalid credentials') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = UserController; 