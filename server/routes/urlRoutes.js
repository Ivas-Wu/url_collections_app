const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  getUrls,
  getUrlByShortUrl,
  createCollection,
  addToCollection,
  deleteFromCollection,
  getCollection
} = require('../controllers/urlController');

router.get('/urls', getUrls);
router.get('/:shortUrl', getUrlByShortUrl);
router.get('/collections/:collectionUrl', getCollection);

router.post('/shorten', createShortUrl);
router.post('/collections/newCollection', createCollection);

router.patch('/collections/add', addToCollection);
router.patch('/collections/delete', deleteFromCollection);

module.exports = router;