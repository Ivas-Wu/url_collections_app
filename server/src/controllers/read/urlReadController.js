const express = require('express');

class UrlReadController {
    constructor(urlReadService) {
        this.urlReadService = urlReadService;
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/url/urls', this.getUrls.bind(this));
        this.router.get('/url/:shortUrl', this.getUrlByShortUrl.bind(this));
    }

    async getUrls(req, res) {
        try {
            const urls = await this.urlReadService.getAllUrls();
            res.status(200).json(urls);
        } catch (err) {
            res.status(500).json({ error: 'Error retrieving URLs', details: err.message });
        }
    }

    async getUrlByShortUrl(req, res) {
        const shortUrl = req.params.shortUrl;
        try {
            const result = await this.urlReadService.getUrlByShortUrl(shortUrl);
            return res.status(200).send(result.originalUrl);
        } catch (error) {
            if (error.message === 'URL not found') {
                return res.status(404).json({ error: 'URL not found' });
            }
            res.status(500).json({ error: 'Server error', details: error.message });
        }
    }
}

module.exports = UrlReadController;