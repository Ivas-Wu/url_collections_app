const BaseRepository = require('./BaseRepository');
const ICollectionRepository = require('../../../application/interfaces/repositories/ICollectionRepository');
const Collection = require('../../../models/Collection');

class CollectionRepository extends BaseRepository {
    constructor(connection) {
        super(connection, Collection);
    }

    async findByUrl(collectionUrl) {
        return this.findOne({ collectionUrl });
    }

    async findByName(collectionName) {
        return this.find({ collectionName });
    }

    async findUserCollections(userEmail) {
        return this.find({ 
            $or: [
                { ownerName: userEmail },
                { accessList: userEmail }
            ]
        });
    }

    async addUrlToCollection(collectionUrl, shortUrl) {
        return this.update(
            { collectionUrl },
            { 
                $addToSet: { shortUrlList: shortUrl },
                $set: { updatedAt: Date.now() }
            }
        );
    }

    async removeUrlFromCollection(collectionUrl, shortUrl) {
        return this.update(
            { collectionUrl },
            { 
                $pull: { shortUrlList: shortUrl },
                $set: { updatedAt: Date.now() }
            }
        );
    }

    async updateSettings(collectionUrl, settings) {
        return this.update(
            { collectionUrl },
            { 
                $set: {
                    ...settings,
                    updatedAt: Date.now()
                }
            }
        );
    }

    async findByUrls(urls) {
        return await Collection.find({ collectionUrl: { $in: urls } });
    }
}

module.exports = CollectionRepository; 