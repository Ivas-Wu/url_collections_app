const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const container = require('./src/config/container');

require('dotenv').config();

async function startServer() {
    await container.initialize();

    const app = express();

    app.use(express.json());
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
    }));
    app.use(cookieParser());

    container.registerRoutes(app);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    const db = container.get('database');
    await db.disconnect();
    process.exit(0);
});