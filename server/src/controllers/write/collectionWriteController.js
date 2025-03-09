const express = require('express');

class CollectionWriteController {
    constructor(collectionWriteService) {
        this.collectionWriteService = collectionWriteService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/collections/new-collection', this.createCollection.bind(this));
        this.router.patch('/collections/add', this.addToCollection.bind(this));
        this.router.patch('/collections/delete', this.deleteFromCollection.bind(this));
        this.router.patch('/collections/update', this.updateCollectionSettings.bind(this));
    }

    async createCollection(req, res) {
        const { collectionName } = req.body;
        const userId = this.collectionWriteService.getUserId(req);

        try {
            const newCollection = await this.collectionWriteService.attemptToCreateCollection(collectionName, null, userId);
            if (newCollection) {
                res.status(201).json({ message: 'New Collection created!', collectionUrl: newCollection });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }

    async addToCollection(req, res) {
        const { collectionUrl, shortUrl, originalUrl, altName } = req.body.data;
        const userId = this.collectionWriteService.getUserId(req);

        try {
            const url = await this.collectionWriteService.addUrlToCollection(
                collectionUrl, 
                shortUrl, 
                originalUrl, 
                altName, 
                userId
            );
            return res.status(200).json(url);
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "An error occurred" });
        }
    }

    async deleteFromCollection(req, res) {
        const { collectionUrl, shortUrl } = req.body.data;
        const userId = this.collectionWriteService.getUserId(req);

        try {
            await this.collectionWriteService.removeUrlFromCollection(collectionUrl, shortUrl, userId);
            return res.status(204).end();
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }

    async updateCollectionSettings(req, res) {
        const { collectionUrl, collectionAccess, collectionName, accessList } = req.body.data;
        const userId = this.collectionWriteService.getUserId(req);

        try {
            const updated = await this.collectionWriteService.updateCollectionSettings(
                collectionUrl,
                { visibility:collectionAccess, collectionName:collectionName, accessList:accessList },
                userId
            );
            if (updated) {
                return res.status(204).end();
            } else {
                return res.status(404).json({ error: "Collection not found" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message ?? "Server error" });
        }
    }
}

module.exports = CollectionWriteController; 