const express = require('express');

class UserReadController {
    constructor(userReadService) {
        this.userReadService = userReadService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/:userId', this.getUser.bind(this));
    }

    async getUser(req, res) {
        try {
            const userId = req.params.userId;
            const user = await this.userReadService.findUser(userId);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}

module.exports = UserReadController; 