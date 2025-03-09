/**
 * Interface for URL Repository operations
 * @interface
 */
class IUrlRepository {
    /**
     * Find a URL by its short code
     * @param {string} shortUrl - The short URL code
     * @returns {Promise<Object>} The URL document
     */
    async findByShortUrl(shortUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Create a new URL
     * @param {Object} urlData - The URL data
     * @param {string} urlData.originalUrl - The original URL
     * @param {string} urlData.shortUrl - The short URL code
     * @param {string} [urlData.altName] - Alternative name for the URL
     * @returns {Promise<Object>} The created URL document
     */
    async create(urlData) {
        throw new Error('Method not implemented');
    }

    /**
     * Update a URL by its short code
     * @param {string} shortUrl - The short URL code
     * @param {Object} updateData - The data to update
     * @returns {Promise<Object>} The updated URL document
     */
    async update(shortUrl, updateData) {
        throw new Error('Method not implemented');
    }

    /**
     * Delete a URL by its short code
     * @param {string} shortUrl - The short URL code
     * @returns {Promise<boolean>} True if deleted, false otherwise
     */
    async delete(shortUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Increment the view count for a URL
     * @param {string} shortUrl - The short URL code
     * @returns {Promise<Object>} The updated URL document
     */
    async incrementViewCount(shortUrl) {
        throw new Error('Method not implemented');
    }

    /**
     * Find URLs by owner
     * @param {string} ownerEmail - The owner's email
     * @returns {Promise<Array>} Array of URL documents
     */
    async findByOwner(ownerEmail) {
        throw new Error('Method not implemented');
    }

    /**
     * Find URLs by multiple short codes
     * @param {Array<string>} shortUrls - Array of short URL codes
     * @returns {Promise<Array>} Array of URL documents
     */
    async findByShortUrls(shortUrls) {
        throw new Error('Method not implemented');
    }
}

module.exports = IUrlRepository; 