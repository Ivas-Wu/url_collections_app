const mongoose = require('mongoose');

const urlMapping = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  altName: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlMapping);

module.exports = Url;