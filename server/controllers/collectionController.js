const Collection = require('../models/Collection');
const Url = require('../models/Url');
const { resultEnum } = require('../models/constants');
const { attemptToAddUrl } = require('../utils/urlHelper');
const { updateCollectionMetadataLogic, attemptToAddCollection, findCollectionAuth, verifyCollection } = require('../utils/collectionHelper');
const { findUser } = require('../utils/authHelper');

const createCollection = async (req, res) => {
    const { collectionName } = req.body;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)
        const newCollection = await attemptToAddCollection(collectionName, null, user);

        if (newCollection) {
            res.status(201).json({ message: 'New Collection created!', collectionUrl: newCollection });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error creating colletion', error: err });
    }
};
  
const addToCollection = async (req, res) => {
    var { collectionUrl, shortUrl, originalUrl, altName } = req.body.data;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)

        const collection = await findCollectionAuth(collectionUrl, user);
        if (collection == resultEnum.NOT_FOUND) {
            return res.status(404).json({ error: "Collection not found." });
        }
        else if (collection == resultEnum.NO_ACCESS) {
            return res.status(404).json({ error: "You do not have access to this collection." });
        }
        else if (!collection.collectionUrl) {
            // Check in case somehow it isn't a collection at this point
            return res.status(404).json({ error: "Bad data." });
        }
        
        let url = null;
        if (!shortUrl && originalUrl) {
            url = await Url.findOne({ shortUrl });
            if (!url) {
                url = await attemptToAddUrl(originalUrl, shortUrl, altName);
            }
            shortUrl = url.shortUrl;
        }
    
        // const result = await Collection.findOneAndUpdate(
        //     { collectionUrl, shortUrlList: { $ne: shortUrl } },
        //     {
        //         $push: { shortUrlList: shortUrl },
        //         $inc: { viewCount: 1 },
        //         $set: { updatedAt: Date.now() }
        //     },
        //     { new: true } 
        // );

        if (!collection.shortUrlList.includes(shortUrl)) {
            collection.shortUrlList.push(shortUrl);
        }
        else {
            return res.status(204).end(); 
        }

        collection.updatedAt = Date.now();
        await collection.save();
        return res.status(200).json(url);
    } catch (error) {
        return res.status(500).json({ error: "An error occurred", error: error.message });
    }
};

const deleteFromCollection = async (req, res) => {
    const { collectionUrl, shortUrl } = req.body.data;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)

        const collection = await findCollectionAuth(collectionUrl, user);
        await verifyCollection(collection);

        // const result = await Collection.findOneAndUpdate(
        //     { collectionUrl, shortUrlList: shortUrl }, 
        //     {
        //         $pull: { shortUrlList: shortUrl },
        //         $inc: { viewCount: 1 },              
        //         $set: { updatedAt: Date.now() } 
        //     },
        //     { new: true }
        // );

        const shortUrlIndex = collection.shortUrlList.indexOf(shortUrl);
        if (shortUrlIndex === -1) {
            return res.status(204).end(); 
        }
        
        collection.shortUrlList.splice(shortUrlIndex, 1);
        collection.updatedAt = Date.now(); 
        await collection.save();
        return res.status(204).end();  
    } catch (error) {
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

const getCollection = async (req, res) => {
    const collectionUrl = req.params.collectionUrl;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)
        const collection = await findCollectionAuth(collectionUrl, user);
        await verifyCollection(collection);
        
        if (collection) {
            const promises = collection.shortUrlList.map(async (shortUrl) => {
                const url = await Url.findOne({ shortUrl });
                return url;
            });
            const values = await Promise.all(promises);
            const customCollection = {
                ...collection.toObject(),
                urls: values,
        };
        res.status(200).json(customCollection);
        } else {
            res.status(404).json({ error: 'Collection not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

const updateCollectionMetadata = async (req, res) => { // Currently this is unused
    const { userId } = req.user || {};
    try {
        const user = await findUser(userId)
    }
    catch (err) {

    }
};

const findCollection = async (req, res) => { // Currently this is unused
    const collectionUrl = req.params.collectionUrl;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)

        var collection = null;
        collection = await Collection.findOne({ collectionUrl });
        if (!collection) {
            collection = await Collection.findOne({ collectionName: collectionUrl }); // TODO find all with the same name and display them all
        }
        
        if (collection) {
            res.status(200).json([collection]);
        } else {
            res.status(404).json({ error: 'Collection not found' }); // TODO return a list of possible collections
        }
    } catch (err) {
        res.status(500).json({ error: 'Error finding collection', error: err });
    }
};

module.exports = {
    createCollection,
    addToCollection,
    deleteFromCollection,
    getCollection,
    updateCollectionMetadata,
    findCollection,
};