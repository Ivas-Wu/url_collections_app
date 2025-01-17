const crypto = require('crypto'); 

const generateShortUrl = () => {
    return crypto.randomBytes(6).toString('hex'); // Generates a 12-character random string
};

module.exports = {
    generateShortUrl
};