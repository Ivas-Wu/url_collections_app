const Redis = require('ioredis');

class RedisConnection {
    constructor(config) {
        this.config = config;
        this.client = null;
    }

    async connect() {
        try {
            this.client = new Redis(this.config);
            await this.client.ping();
            console.log('Redis Connected');
            return this.client;
        } catch (error) {
            console.error('Redis Connection Error:', error);
            throw error;
        }
    }

    async disconnect() {
        if (this.client) {
            await this.client.quit();
            this.client = null;
        }
    }

    getClient() {
        return this.client;
    }
}

module.exports = RedisConnection;