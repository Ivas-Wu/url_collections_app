class BaseCacheRepository {
    constructor(redisConnection) {
        this.client = redisConnection.getClient();
    }

    async get(key) {
        const value = await this.client.get(key);
        return value ? JSON.parse(value) : null;
    }

    async set(key, value, ttl = 3600) {
        await this.client.set(
            key,
            JSON.stringify(value),
            'EX',
            ttl
        );
    }

    async delete(key) {
        await this.client.del(key);
    }

    async exists(key) {
        return await this.client.exists(key) === 1;
    }
}

module.exports = BaseCacheRepository; 