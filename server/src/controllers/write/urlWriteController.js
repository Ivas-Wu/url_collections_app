const express = require('express');

class UrlWriteController {
    constructor(urlWriteService) {
        this.urlWriteService = urlWriteService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post('/url/shorten', this.createShortUrl.bind(this));
        this.router.patch('/url/update', this.updateUrlMetadata.bind(this));
    }

    async createShortUrl(req, res) {
        const { originalUrl, shortUrl, altName } = req.body;

        try {
            const urlToSave = await this.urlWriteService.createShortUrl(originalUrl, shortUrl, altName);
            if (urlToSave) {
                res.status(201).json({ message: 'URL shortened!', newUrl: urlToSave });
            }
        } catch (err) {
            res.status(500).json({ error: 'Error creating URL', details: err.message });
        }
    }

    async updateUrlMetadata(req, res) {
        try {
            const { shortUrl, metadata } = req.body;
            await this.urlWriteService.updateUrlMetadata(shortUrl, metadata);
            res.status(200).json({ message: 'Metadata updated successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Error updating metadata', details: err.message });
        }
    }
}

module.exports = UrlWriteController;