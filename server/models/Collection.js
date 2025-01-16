const mongoose = require('mongoose');

const collectionMapping = new mongoose.Schema({
    collectionUrl: { type: String, required: true, unique: true },
    shortUrlList: { type: [String], required: false },
    collectionName: { type: String, default: "New Collection", required: true },
    viewCount: { type: Number, default: 0 },
    upCount: { type: Number, default: 0 },
    downCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Collection = mongoose.model('Collection', collectionMapping);

module.exports = Collection;
