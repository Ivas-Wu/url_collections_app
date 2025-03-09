class UrlWriteService {
    constructor(urlRepository, urlCacheRepository) {
        this.urlRepository = urlRepository;
        this.urlCacheRepository = urlCacheRepository;
    }

    async createShortUrl(originalUrl, shortUrl = null, altName = null) {
        const urlData = {
            originalUrl,
            shortUrl: shortUrl || this.generateShortUrl(),
            altName,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        const newUrl = await this.urlRepository.create(urlData);
        await this.urlCacheRepository.setUrl(newUrl.shortUrl, newUrl);
        
        return newUrl;
    }

    async updateUrlMetadata(shortUrl, metadata) {
        const updatedUrl = await this.urlRepository.update(
            { shortUrl },
            {
                ...metadata,
                updatedAt: Date.now()
            }
        );

        if (!updatedUrl) {
            throw new Error('URL not found');
        }

        await this.urlCacheRepository.setUrl(shortUrl, updatedUrl);
        return updatedUrl;
    }

    generateShortUrl() {
        // Implementation of short URL generation
        // You might want to move this to a separate utility
        return Math.random().toString(36).substring(2, 8);
    }
}

module.exports = UrlWriteService; 