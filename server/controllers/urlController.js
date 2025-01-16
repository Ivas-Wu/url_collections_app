const Url = require('../models/Url');
const { attemptToAddUrl } = require('../utils/urlHelper');

const createShortUrl = async (req, res) => {
  const { originalUrl, shortUrl, altName } = req.body;

  try {
    let urlToSave = await attemptToAddUrl(originalUrl, shortUrl, altName);
    if (urlToSave) {
      res.status(201).json({ message: 'URL shortened!', newUrl: urlToSave });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error creating URL', error: err });
  }
};

// Get all URLs
const getUrls = async (req, res) => {
  try {
    const urls = await Url.find();
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving URLs', error: err });
  }
};

// Get URL by shortUrl
const getUrlByShortUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const result = await Url.findOneAndUpdate(
      { shortUrl },
      {
          $inc: { viewCount: 1 },
          $set: { updatedAt: Date.now() }
      },
      { new: true } 
    );

    if (!result) {
        return res.status(404).json({ message: 'URL not found' });
    }
    return res.status(200).send(result.originalUrl);  
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateUrlMetadata = async (req, res) => { // Unused
  // TODO
};

module.exports = {
  createShortUrl,
  getUrls,
  getUrlByShortUrl,
  updateUrlMetadata,
};