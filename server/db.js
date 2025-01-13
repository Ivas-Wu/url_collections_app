const mongoose = require('mongoose');
const uri = "mongodb+srv://ivaswu:JA92iwtXA7kqBQZg@url-shortener-db.6m0o7.mongodb.net/?retryWrites=true&w=majority&appName=url-shortener-db";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;