const BaseCacheRepository = require('./BaseCacheRepository');
const ICacheRepository = require('../../../application/interfaces/repositories/ICacheRepository');

class UrlCacheRepository extends BaseCacheRepository {
    constructor(redisConnection) {
        super(redisConnection);
        this.keyPrefix = 'url:';
    }

    generateKey(shortUrl) {
        return `${this.keyPrefix}${shortUrl}`;
    }

    async getUrl(shortUrl) {
        return this.get(this.generateKey(shortUrl));
    }

    async setUrl(shortUrl, urlData, ttl = 3600) {
        await this.set(this.generateKey(shortUrl), urlData, ttl);
    }

    async deleteUrl(shortUrl) {
        await this.delete(this.generateKey(shortUrl));
    }

    // Additional URL-specific caching methods
}

module.exports = UrlCacheRepository; 