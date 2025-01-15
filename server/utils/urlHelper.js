const crypto = require('crypto'); 
const Url = require('../models/Url');
const Collection = require('../models/Collection');

const generateShortUrl = () => {
    return crypto.randomBytes(6).toString('hex'); // Generates a 12-character random string
};
  
const attemptToAddUrl = async (originalUrl, shortUrl, altName) => {
    try {
        let shortUrlToUse = shortUrl || generateShortUrl();

        const urlToSave = new Url({
            originalUrl,
            shortUrl: shortUrlToUse,
            altName,
        });

        await urlToSave.save();
        return urlToSave;
    } catch (err) {
        if (err.code === 11000) { 
            attemptToAddUrl(originalUrl, generateShortUrl(), altName);
        } else {
            throw err;
        }
    }
};

const attemptToAddCollection = async (collectionName, collectionUrl) => {
    try {
        const newCollection = new Collection({
            collectionUrl: collectionUrl || generateShortUrl(),
            collectionName
          });
      
        await newCollection.save();
        return newCollection;
    } catch (err) {
        if (err.code === 11000) { 
            attemptToAddCollection(collectionName, generateShortUrl());
        } else {
            throw err;
        }
    }
};

module.exports = {
    attemptToAddUrl,
    attemptToAddCollection,
};
  