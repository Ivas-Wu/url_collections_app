/**
 * Interface for Collection Repository operations
 * @interface
 */
class ICollectionRepository {
    /**
     * Find a collection by its URL
     * @param {string} collectionUrl - The collection URL
     * @returns {Promise<Object>} The collection document
     */
    async findByUrl(collectionUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Find collections by name
     * @param {string} collectionName - The collection name to search for
     * @returns {Promise<Array>} Array of collection documents
     */
    async findByName(collectionName) {
        throw new Error('Method not implemented');
    }

    /**
     * Find collections for a user
     * @param {string} userEmail - The user's email
     * @returns {Promise<Array>} Array of collection documents
     */
    async findUserCollections(userEmail) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new collection
     * @param {Object} collectionData - The collection data
     * @returns {Promise<Object>} The created collection document
     */
    async create(collectionData) {
        throw new Error('Method not implemented');
    }

    /**
     * Add a URL to a collection
     * @param {string} collectionUrl - The collection URL
     * @param {string} shortUrl - The short URL to add
     * @returns {Promise<Object>} The updated collection document
     */
    async addUrlToCollection(collectionUrl, shortUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Remove a URL from a collection
     * @param {string} collectionUrl - The collection URL
     * @param {string} shortUrl - The short URL to remove
     * @returns {Promise<Object>} The updated collection document
     */
    async removeUrlFromCollection(collectionUrl, shortUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Update collection settings
     * @param {string} collectionUrl - The collection URL
     * @param {Object} settings - The settings to update
     * @param {string} [settings.collectionName] - New collection name
     * @param {string} [settings.visibility] - New visibility setting
     * @param {Array<string>} [settings.accessList] - New access list
     * @returns {Promise<Object>} The updated collection document
     */
    async updateSettings(collectionUrl, settings) {
        throw new Error('Method not implemented');
    }

    /**
     * Delete a collection
     * @param {string} collectionUrl - The collection URL
     * @returns {Promise<boolean>} True if deleted, false otherwise
     */
    async delete(collectionUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Check if a collection exists
     * @param {string} collectionUrl - The collection URL
     * @returns {Promise<boolean>} True if exists, false otherwise
     */
    async exists(collectionUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Get collection statistics
     * @param {string} collectionUrl - The collection URL
     * @returns {Promise<Object>} Collection statistics
     */
    async getStats(collectionUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Update collection metadata
     * @param {string} collectionUrl - The collection URL
     * @param {Object} metadata - The metadata to update
     * @returns {Promise<Object>} The updated collection document
     */
    async updateMetadata(collectionUrl, metadata) {
        throw new Error('Method not implemented');
    }
}

module.exports = ICollectionRepository; 