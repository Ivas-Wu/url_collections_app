const Url = require('../models/Url');
const Collection = require('../models/Collection');
const crypto = require('crypto'); 

// Helper function to generate a random short URL
const generateShortUrl = () => {
  return crypto.randomBytes(6).toString('hex'); // Generates a 12-character random string
};

const createShortUrl = async (req, res) => {
  const { originalUrl, shortUrl, altName } = req.body;

  try {
    // If no shortUrl is provided, generate one
    const urlToSave = new Url({
      originalUrl,
      shortUrl: shortUrl || generateShortUrl(),
      altName
    });

    await urlToSave.save();
    res.status(201).json({ message: 'URL shortened!', newUrl: urlToSave });
  } catch (err) {
    res.status(500).json({ message: 'Error creating URL', error: err });
  }
};

const createCollection = async (req, res) => {
  const { collectionName } = req.body;

  try {
    const newCollection = new Collection({
      collectionUrl: generateShortUrl(),
      collectionName
    });

    await newCollection.save();
    res.status(201).json({ message: 'New Collection created!', collectionUrl: newCollection });
  } catch (err) {
    res.status(500).json({ message: 'Error creating colletion', error: err });
  }
};

const addToCollection = async (req, res) => {
  var { collectionUrl, shortUrl, originalUrl, altName } = req.body.data;

  try {
      const collection = await Collection.findOne({ collectionUrl });
      if (!collection) {
          return res.status(404).json({ message: "Collection not found" });
      }
      var url = null;
      if (!shortUrl && originalUrl) {
        url = await Url.findOne({ shortUrl });
        if (!url) {
          const urlToSave = new Url({
            originalUrl,
            shortUrl: generateShortUrl(),
            altName
          });
      
          await urlToSave.save();
          url = urlToSave;
        }
        shortUrl = url.shortUrl;
      }
      if (collection.shortUrlList.includes(shortUrl)) {
        return res.status(204).end(); 
      }
      collection.shortUrlList.push(shortUrl);
      await collection.save();

      res.status(200).json(url);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};

const deleteFromCollection = async (req, res) => {
  const { collectionUrl, shortUrl } = req.body.data;

  try {
      const collection = await Collection.findOne({ collectionUrl });
      if (!collection) {
          return res.status(404).json({ message: "Collection not found" });
      }
      if (!collection.shortUrlList.includes(shortUrl)) {
          return res.status(204).end(); 
      }

      collection.shortUrlList = collection.shortUrlList.filter(
          (url) => url !== shortUrl
      );

      await collection.save();
      res.status(200).json(collection);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
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
    const url = await Url.findOne({ shortUrl });
    if (url) {
      res.status(200).send(url.originalUrl);
    } else {
      res.status(404).json({ message: 'URL not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
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

module.exports = {
  createShortUrl,
  createCollection,
  addToCollection,
  deleteFromCollection,
  getUrls,
  getUrlByShortUrl,
  getCollection,
};