const Collection = require('../models/Collection');
const Url = require('../models/Url');
const { attemptToAddUrl } = require('../utils/urlHelper');
const { updateCollectionMetadataLogic, attemptToAddCollection, findCollectionAuth } = require('../utils/collectionHelper');
const { findUser } = require('../utils/authHelper');
const {  requestTypeEnum } = require('../models/constants');

const getCollection = async (req, res) => {
    const collectionUrl = req.params.collectionUrl;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)
        const [collection, userAccess] = await findCollectionAuth(collectionUrl, user, false, requestTypeEnum.VIEW);
        
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
            res.status(200).json({ collection: customCollection, userAccess: userAccess });
        } else {
            res.status(404).json({ error: 'Collection not found' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

const findCollection = async (req, res) => { 
    const collectionUrl = req.params.collectionUrl;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)
        const [collection, userAccess] = await findCollectionAuth(collectionUrl, user, true, requestTypeEnum.VIEW);
        
        res.status(200).json([collection]); // TODO return a list of collections with same name if found
    } catch (error) {
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

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
        const user = await findUser(userId);
        const [collection, userAccess] = await findCollectionAuth(collectionUrl, user, false, requestTypeEnum.MODIFY_ITEM);
        let url = null;

        if (!shortUrl && originalUrl) {
            url = await Url.findOne({ shortUrl });
            if (!url) {
                url = await attemptToAddUrl(originalUrl, shortUrl, altName);
            }
            shortUrl = url.shortUrl;
        }
        if (!url || !shortUrl) {
            return res.status(500).json({ error: "Unable to generate short url." });
        }

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
        return res.status(500).json({ error: error.message ?? "An error occurred" });
    }
};

const deleteFromCollection = async (req, res) => {
    const { collectionUrl, shortUrl } = req.body.data;
    const { userId } = req.user || {};

    try {
        const user = await findUser(userId)
        const [collection, userAccess] = await findCollectionAuth(collectionUrl, user, false, requestTypeEnum.MODIFY_ITEM);
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

const updateCollectionSettings = async (req, res) => {
    const { collectionUrl, collectionAccess, collectionName, accessList } = req.body.data;
    const { userId } = req.user || {};
    try {
        const user = await findUser(userId);
        const [collection, userAccess] = await findCollectionAuth(collectionUrl, user, false, requestTypeEnum.MODIFY_SETTING);
        if (collection) {
            collection.visibility = collectionAccess;
            collection.accessList = accessList;
            collection.collectionName = collectionName;
            await collection.save()
            return res.status(204).end();
        }
    } catch (error) {
        return res.status(500).json({ error: error.message || "Server error" });
    }
};

module.exports = {
    createCollection,
    addToCollection,
    deleteFromCollection,
    getCollection,
    updateCollectionSettings,
    findCollection,
};