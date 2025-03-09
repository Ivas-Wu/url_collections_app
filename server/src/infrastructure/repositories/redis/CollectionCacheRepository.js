const BaseCacheRepository = require('./BaseCacheRepository');

class CollectionCacheRepository extends BaseCacheRepository {
    constructor(redisConnection) {
        super(redisConnection);
        this.keyPrefix = 'collection:';
        this.userCollectionsPrefix = 'user-collections:';
    }

    generateKey(collectionUrl) {
        return `${this.keyPrefix}${collectionUrl}`;
    }

    generateUserKey(userId) {
        return `${this.userCollectionsPrefix}${userId}`;
    }

    async getCollection(collectionUrl) {
        return this.get(this.generateKey(collectionUrl));
    }

    async setCollection(collectionUrl, collectionData, ttl = 300) {
        await this.set(this.generateKey(collectionUrl), collectionData, ttl);
    }

    async getUserCollections(userId) {
        return this.get(this.generateUserKey(userId));
    }

    async setUserCollections(userId, collections, ttl = 3600) {
        await this.set(this.generateUserKey(userId), collections, ttl);
    }

    async invalidateCollection(collectionUrl) {
        await this.delete(this.generateKey(collectionUrl));
    }

    async invalidateUserCollections(userId) {
        await this.delete(this.generateUserKey(userId));
    }
}

module.exports = CollectionCacheRepository; 