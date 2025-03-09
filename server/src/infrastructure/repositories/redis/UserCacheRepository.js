const BaseCacheRepository = require('./BaseCacheRepository');
const ICacheRepository = require('../../../application/interfaces/repositories/ICacheRepository');

class UserCacheRepository extends BaseCacheRepository {
    constructor(redisConnection) {
        super(redisConnection);
        this.keyPrefix = 'user:';
    }

    generateKey(userId) {
        return `${this.keyPrefix}${userId}`;
    }

    async getUser(userId) {
        return this.get(this.generateKey(userId));
    }

    async setUser(userId, userData, ttl = 3600) {
        await this.set(this.generateKey(userId), userData, ttl);
    }

    async deleteUser(userId) {
        await this.delete(this.generateKey(userId));
    }

    async invalidateUser(userId) {
        await this.deleteUser(userId);
    }
}

module.exports = UserCacheRepository;
