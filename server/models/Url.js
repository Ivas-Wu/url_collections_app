const mongoose = require('mongoose');

const urlMapping = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  altName: { type: String, required: false },
  viewCount: { type: Number, default: 0 },
  upCount: { type: Number, default: 0 },
  downCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlMapping);

module.exports = Url;