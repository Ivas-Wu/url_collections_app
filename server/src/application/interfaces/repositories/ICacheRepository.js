class ICacheRepository {
    async get(key) { throw new Error('Not implemented'); }
    async set(key, value, ttl) { throw new Error('Not implemented'); }
    async delete(key) { throw new Error('Not implemented'); }
    async exists(key) { throw new Error('Not implemented'); }
}

module.exports = ICacheRepository;