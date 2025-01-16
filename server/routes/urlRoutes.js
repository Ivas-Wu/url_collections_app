const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrls,
  getUrlByShortUrl,
  updateUrlMetadata
} = require('../controllers/urlController');

const {
  createCollection,
  addToCollection,
  deleteFromCollection,
  getCollection,
  updateCollectionMetadata,
  findCollection
} = require('../controllers/collectionController');

//URL
router.get('/urls', getUrls);
router.get('/:shortUrl', getUrlByShortUrl);

router.post('/shorten', createShortUrl);

router.patch('/:shortUrl/update', updateUrlMetadata);

//Collections
router.get('/collections/:collectionUrl', getCollection);
router.get('/collections/find/:collectionUrl', findCollection);

router.post('/collections/newCollection', createCollection);

router.patch('/collections/add', addToCollection);
router.patch('/collections/delete', deleteFromCollection);
router.patch('/collections/:collectionUrl/update', updateCollectionMetadata);

module.exports = router;