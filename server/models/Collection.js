const mongoose = require('mongoose');

const collectionMapping = new mongoose.Schema({
    collectionUrl: { type: String, required: true, unique: true },
    shortUrlList: { type: [String], required: false },
    collectionName: { type: String, default: "New Collection", required: true },
    createdAt: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionMapping);

module.exports = Collection;
