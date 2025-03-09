const mongoose = require('mongoose');

class MongoDBConnection {
    constructor(config) {
        this.config = config;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mongoose.connect(this.config.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // ... other MongoDB options
            });
            console.log('MongoDB Connected');
            return this.connection;
        } catch (error) {
            console.error('MongoDB Connection Error:', error);
            throw error;
        }
    }

    async disconnect() {
        if (this.connection) {
            await mongoose.disconnect();
            this.connection = null;
        }
    }

    getConnection() {
        return this.connection;
    }
}

module.exports = MongoDBConnection; 