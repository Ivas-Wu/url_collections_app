const express = require('express');

class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/refresh-token', this.refreshAccessToken.bind(this));
    }

    async refreshAccessToken(req, res) {
        try {
            const result = await this.authService.refreshAccessToken(req.cookies.refreshToken);
            res.status(200).json(result);
        } catch (error) {
            res.status(403).json({ error: "Invalid or expired refresh token" });
        }
    }
}

module.exports = AuthController;