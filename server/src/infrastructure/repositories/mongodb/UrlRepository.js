const BaseRepository = require('./BaseRepository');
// const IUrlRepository = require('../../../application/interfaces/repositories/IUrlRepository');
const UrlModel = require('../../../models/Url');

class UrlRepository extends BaseRepository {
    constructor(connection) {
        super(connection, UrlModel);
    }

    async findByShortUrl(shortUrl) {
        return this.findOne({ shortUrl });
    }

    async findByShortUrls(shortUrls) {
        return this.find({ shortUrl: { $in: shortUrls } });
    }

    async incrementViewCount(shortUrl) {
        return this.update(
            { shortUrl },
            { 
                $inc: { viewCount: 1 },
                $set: { updatedAt: Date.now() }
            }
        );
    }

    // Additional URL-specific repository methods
}

module.exports = UrlRepository; 