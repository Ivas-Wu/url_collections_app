const { body } = require('express-validator'); 
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
  updateCollectionSettings,
  findCollection,
  getUserCollections
} = require('../controllers/collectionController');

const {
  registerUser,
  userLogin,
  refreshAccessToken
} = require('../controllers/authController');

const {
  authenticate
} = require('../utils/authHelper');

//URL
router.get('/url/urls', getUrls);
router.get('/url/:shortUrl', getUrlByShortUrl);

router.post('/url/shorten', authenticate, createShortUrl);

router.patch('/url/update', authenticate, updateUrlMetadata);

//Collections
router.get('/collections/find/:collectionUrl', authenticate, findCollection);
router.get('/collections/user', authenticate, getUserCollections);
router.get('/collections/:collectionUrl', authenticate, getCollection);

router.post('/collections/new-collection', authenticate, createCollection);

router.patch('/collections/add', authenticate, addToCollection);
router.patch('/collections/delete', authenticate, deleteFromCollection);
router.patch('/collections/update', authenticate, updateCollectionSettings);

//Auth
router.post('/auth/register', [body('email').isEmail().withMessage('Enter a valid email'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),body('username').isLength({ max: 15 }).withMessage('Username can be a maximum of 15 characters')], registerUser);
router.post('/auth/login', [body('password').exists(),], userLogin);
router.post('/auth/refresh-token', refreshAccessToken);

module.exports = router;