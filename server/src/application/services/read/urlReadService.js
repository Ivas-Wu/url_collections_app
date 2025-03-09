class UrlReadService {
    constructor(urlRepository, cacheRepository) {
        this.urlRepository = urlRepository;
        this.cacheRepository = cacheRepository;
    }

    async getUrlByShortUrl(shortUrl) {
        const cacheKey = `url:${shortUrl}`;
        
        // Try cache first
        const cachedUrl = await this.cacheRepository.get(cacheKey);
        if (cachedUrl) {
            return cachedUrl;
        }

        // If not in cache, get from database
        const result = await this.urlRepository.findByShortUrl(shortUrl);
        if (!result) {
            throw new Error('URL not found');
        }

        // Increment view count
        await this.urlRepository.incrementViewCount(shortUrl);

        // Cache the result
        await this.cacheRepository.set(cacheKey, result, 3600);
        
        return result;
    }

    async findByShortUrls(shortUrls) {
        const urls = [];
        const uncachedShortUrls = [];

        await Promise.all(
            shortUrls.map(async (shortUrl) => {
                const cached = await this.cacheRepository.getUrl(shortUrl);
                if (cached) {
                    urls.push(cached);
                } else {
                    uncachedShortUrls.push(shortUrl);
                }
            })
        );

        if (uncachedShortUrls.length > 0) {
            const dbUrls = await this.urlRepository.findByShortUrls(uncachedShortUrls);
            
            const urlsArray = Array.isArray(dbUrls) ? dbUrls : [dbUrls];
            await Promise.all(
                urlsArray.map(url => this.cacheRepository.setUrl(url.shortUrl, url))
            );
            
            urls.push(...urlsArray);
        }

        return urls;
    }
}

module.exports = UrlReadService; 