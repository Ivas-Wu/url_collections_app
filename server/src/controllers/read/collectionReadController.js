const express = require('express');

class CollectionReadController {
    constructor(collectionReadService) {
        this.collectionReadService = collectionReadService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/collections/find/:collectionUrl', this.findCollection.bind(this));
        this.router.get('/collections/user', this.getUserCollections.bind(this));
        this.router.get('/collections/:collectionUrl', this.getCollection.bind(this));
    }

    async getCollection(req, res) {
        const collectionUrl = req.params.collectionUrl;
        const userId = this.collectionReadService.getUserId(req);

        try {
            const [collection, userAccess] = await this.collectionReadService.getCollection(collectionUrl, userId);
            if (collection) {
                res.status(200).json({ collection: collection, userAccess: userAccess });
            } else {
                res.status(404).json({ error: 'Collection not found' });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }

    async findCollection(req, res) {
        const collectionUrl = req.params.collectionUrl;
        const userId = this.collectionReadService.getUserId(req);

        try {
            const collections = await this.collectionReadService.findCollection(collectionUrl, userId, true);
            res.status(200).json([collections]);
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }

    async getUserCollections(req, res) {
        const userId = this.collectionReadService.getUserId(req);

        try {
            const collections = await this.collectionReadService.getUserCollections(userId);
            res.status(200).json({ collections });
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }
}

module.exports = CollectionReadController; 