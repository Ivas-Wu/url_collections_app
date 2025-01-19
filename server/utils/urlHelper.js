const Url = require('../models/Url');
const { generateShortUrl } = require('./common');

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

const updateUrlMetadataLogic = async (url) => {
    // TODO
};

module.exports = {
    attemptToAddUrl,
    updateUrlMetadataLogic
};
  