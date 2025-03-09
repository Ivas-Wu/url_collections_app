require('dotenv').config();

const requiredEnvVars = {
    development: [
        'MONGO_URI',
        'REDIS_HOST',
        'REDIS_PORT'
    ],
    production: [
        'MONGO_URI',
        'REDIS_HOST',
        'REDIS_PORT',
        'REDIS_PASSWORD'
    ]
};

const env = process.env.NODE_ENV || 'development';

const missingVars = requiredEnvVars[env].filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const mongoConfig = {
    development: {
        uri: process.env.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME || 'url_shortener_dev'
        }
    },
    production: {
        uri: process.env.MONGO_URI,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB_NAME,
            maxPoolSize: parseInt(process.env.MONGO_MAX_POOL_SIZE || '10'),
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        }
    }
};

const redisConfig = {
    development: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD || undefined,
        db: parseInt(process.env.REDIS_DB || '0'),
        retryStrategy: (times) => Math.min(times * 50, 2000)
    },
    production: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        db: parseInt(process.env.REDIS_DB || '0'),
        retryStrategy: (times) => Math.min(times * 50, 2000),
        maxRetriesPerRequest: 3,
        enableReadyCheck: true,
        connectTimeout: 10000
    }
};

function validateConfig(config, name) {
    if (!config[env]) {
        throw new Error(`Missing ${name} configuration for environment: ${env}`);
    }
    return config[env];
}

module.exports = {
    mongoConfig: validateConfig(mongoConfig, 'MongoDB'),
    redisConfig: validateConfig(redisConfig, 'Redis')
}; 