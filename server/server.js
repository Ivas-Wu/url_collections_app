const express = require('express');
const cors = require('cors');

const connectDB = require('./db');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express();
app.use(express.json()); // To parse incoming JSON requests
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
})); // Enable Cross-Origin Requests if you're using a separate frontend

connectDB();

app.use('/api', urlRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});