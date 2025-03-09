const crypto = require('crypto');
const { visibilityEnum, requestTypeEnum } = require('../../../models/constants');

class CollectionWriteService {
    constructor(collectionRepository, collectionCacheRepository, urlReadService, urlWriteService, userReadService, userWriteService, collectionReadService, userRepository) {
        this.collectionRepository = collectionRepository;
        this.collectionCacheRepository = collectionCacheRepository;
        this.urlReadService = urlReadService;
        this.urlWriteService = urlWriteService;
        this.userReadService = userReadService;
        this.userWriteService = userWriteService;
        this.collectionReadService = collectionReadService;
        this.userRepository = userRepository;
    }

    generateCollectionUrl() {
        return crypto.randomBytes(6).toString('hex');
    }

    getUserId(req) {
        return req.user.userId || null;
    }

    async attemptToCreateCollection(collectionName, collectionUrl, userId, visibility) {
        try {
            const user = await this.userReadService.findUser(userId);
            const collectionData = {
                collectionUrl: collectionUrl || this.generateCollectionUrl(),
                collectionName,
                visibility: Object.values(visibilityEnum).includes(visibility) ? visibility : visibilityEnum.PUBLIC,
                ownerName: user?.email,
                accessList: user ? [user.email] : [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            };

            const newCollection = await this.collectionRepository.create(collectionData);
            
            if (user) {
                await this.userWriteService.addCollectionToUser(userId, newCollection.collectionUrl);
                await this.collectionCacheRepository.invalidateUserCollections(userId);
            }

            return newCollection;
        } catch (err) {
            if (err.code === 11000) { // Duplicate key error
                // Try again with new URL
                return this.attemptToAddCollection(
                    collectionName, 
                    this.generateCollectionUrl(), 
                    user, 
                    visibility
                );
            }
            throw err;
        }
    }

    async addUrlToCollection(collectionUrl, shortUrl, originalUrl, altName, userId) {
        const [collection, userAccess] = await this.collectionReadService.findCollection(collectionUrl, userId, false, requestTypeEnum.MODIFY_ITEM);
        
        let url = null;
        if (shortUrl) {
            url = await this.urlReadService.getUrlByShortUrl(shortUrl);
        }
        if (originalUrl && !url) {
            url = await this.urlWriteService.createShortUrl(originalUrl, shortUrl, altName);
            shortUrl = url.shortUrl;
        }

        if (!url || !shortUrl) {
            throw new Error("Unable to generate short url.");
        }

        const updatedCollection = await this.collectionRepository.addUrlToCollection(collectionUrl, shortUrl, collection);

        if (!updatedCollection) {
            return false;
        }

        await this.collectionCacheRepository.invalidateCollection(collectionUrl);

        return true;
    }

    async removeUrlFromCollection(collectionUrl, shortUrl, userId) {
        await this.collectionReadService.findCollection(collectionUrl, userId, false, requestTypeEnum.MODIFY_ITEM); // Only need to verify access
        await this.collectionRepository.removeUrlFromCollection(collectionUrl, shortUrl);
        await this.collectionCacheRepository.invalidateCollection(collectionUrl);

        return true;
    }

    async updateCollectionSettings(collectionUrl, settings, userId) {
        const [collection, userAccess] = await this.collectionReadService.findCollection(collectionUrl, userId, false, requestTypeEnum.MODIFY_SETTING); // Only need to verify access
        if (!collection) {
            return false;
        }
        await this.collectionRepository.updateSettings(collectionUrl, settings);
        await this.collectionCacheRepository.invalidateCollection(collectionUrl);
        
        return true;
    }
}

module.exports = CollectionWriteService; 