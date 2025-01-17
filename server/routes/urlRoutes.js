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
  updateCollectionMetadata,
  findCollection
} = require('../controllers/collectionController');

const {
  registerUser,
  userLogin
} = require('../controllers/authController');

const {
  authenticate
} = require('../utils/authHelper');

//URL
router.get('/urls', getUrls);
router.get('/:shortUrl', getUrlByShortUrl);

router.post('/shorten', authenticate, createShortUrl);

router.patch('/:shortUrl/update', authenticate,updateUrlMetadata);

//Collections
router.get('/collections/:collectionUrl', authenticate, getCollection);
router.get('/collections/find/:collectionUrl', authenticate, findCollection);

router.post('/collections/newCollection', authenticate, createCollection);

router.patch('/collections/add', authenticate, addToCollection);
router.patch('/collections/delete', authenticate, deleteFromCollection);
router.patch('/collections/:collectionUrl/update', authenticate, updateCollectionMetadata);


//Auth
router.post('/register', [body('email').isEmail().withMessage('Enter a valid email'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),body('username').isLength({ max: 15 }).withMessage('Username can be a maximum of 15 characters')], registerUser);
router.post('/login', [body('password').exists(),], userLogin);

module.exports = router;