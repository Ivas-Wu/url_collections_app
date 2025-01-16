const Collection = require('../models/Collection');
const Url = require('../models/Url');
const { attemptToAddUrl, attemptToAddCollection } = require('../utils/urlHelper');
const { updateCollectionMetadataLogic } = require('../utils/collectionHelper');

const createCollection = async (req, res) => {
    const { collectionName } = req.body;
  
    try {
      const newCollection = await attemptToAddCollection(collectionName);
      if (newCollection) {
        res.status(201).json({ message: 'New Collection created!', collectionUrl: newCollection });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error creating colletion', error: err });
    }
};
  
const addToCollection = async (req, res) => {
    var { collectionUrl, shortUrl, originalUrl, altName } = req.body.data;

    try {
        let url = null;
        if (!shortUrl && originalUrl) {
            url = await Url.findOne({ shortUrl });
            if (!url) {
                url = await attemptToAddUrl(originalUrl, shortUrl, altName);
            }
            shortUrl = url.shortUrl;
        }
    
        const result = await Collection.findOneAndUpdate(
            { collectionUrl, shortUrlList: { $ne: shortUrl } },
            {
                $push: { shortUrlList: shortUrl },
                $inc: { viewCount: 1 },
                $set: { updatedAt: Date.now() }
            },
            { new: true } 
        );
    
        if (!result) {
            const collection = await Collection.findOne({ collectionUrl });
            if (collection) {
                return res.status(204).end();  
            }
            return res.status(404).json({ message: "Collection not found or shortUrl already exists" });
        }
    
        return res.status(200).json(url);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
    }
    
};

const deleteFromCollection = async (req, res) => {
    const { collectionUrl, shortUrl } = req.body.data;

    try {
        const result = await Collection.findOneAndUpdate(
            { collectionUrl, shortUrlList: shortUrl }, 
            {
                $pull: { shortUrlList: shortUrl },
                $inc: { viewCount: 1 },              
                $set: { updatedAt: Date.now() } 
            },
            { new: true }
        );
        
        if (!result) {
            return res.status(404).json({ message: "Collection or URL not found" });
        }

        return res.status(204).end();  
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

const getCollection = async (req, res) => {
    const collectionUrl = req.params.collectionUrl;
    try {

        const collection = await Collection.findOne({ collectionUrl });
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
        res.status(404).json({ message: 'Collection not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error finding collection', error: err });
    }
};

const updateCollectionMetadata = async (req, res) => { // Currently this is unused
    // TODO
};

const findCollection = async (req, res) => { // Currently this is unused
    const collectionUrl = req.params.collectionUrl;
    try {
        var collection = null;
        collection = await Collection.findOne({ collectionUrl });
        if (!collection) {
            collection = await Collection.findOne({ collectionName: collectionUrl }); // TODO find all with the same name and display them all
        }
        
        if (collection) {
            res.status(200).json([collection]);
        } else {
            res.status(404).json({ message: 'Collection not found' }); // TODO return a list of possible collections
        }
    } catch (err) {
        res.status(500).json({ message: 'Error finding collection', error: err });
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