const MongoDBConnection = require('../infrastructure/database/mongodb/connection');
const RedisConnection = require('../infrastructure/database/redis/connection');
const { mongoConfig, redisConfig } = require('./database');

// Repositories
const MongoUrlRepository = require('../infrastructure/repositories/mongodb/UrlRepository');
const MongoCollectionRepository = require('../infrastructure/repositories/mongodb/CollectionRepository');
const UrlCacheRepository = require('../infrastructure/repositories/redis/UrlCacheRepository');
const CollectionCacheRepository = require('../infrastructure/repositories/redis/CollectionCacheRepository');
const UserRepository = require('../infrastructure/repositories/mongodb/UserRepository');
const UserCacheRepository = require('../infrastructure/repositories/redis/UserCacheRepository');

// Application Services
const UrlReadService = require('../application/services/read/urlReadService');
const UrlWriteService = require('../application/services/write/urlWriteService');
const CollectionReadService = require('../application/services/read/collectionReadService');
const CollectionWriteService = require('../application/services/write/collectionWriteService');
const AuthService = require('../application/services/auth/authService');
const UserReadService = require('../application/services/read/userReadService');
const UserWriteService = require('../application/services/write/userWriteService');

// Controllers
const UrlReadController = require('../controllers/read/urlReadController');
const UrlWriteController = require('../controllers/write/urlWriteController');
const CollectionReadController = require('../controllers/read/collectionReadController');
const CollectionWriteController = require('../controllers/write/collectionWriteController');
const UserWriteController = require('../controllers/write/userWriteController');
const UserReadController = require('../controllers/read/userReadController');
const AuthController = require('../controllers/auth/authController');
class Container {
    constructor() {
        this.services = {};
    }

    async initialize() {
        try {
            // Initialize Database Connections
            await this.initializeDatabases();
            
            // Initialize Repositories
            await this.initializeRepositories();
            
            // Initialize Application Services
            await this.initializeServices();
            
            // Initialize Controllers
            await this.initializeControllers();
            
        } catch (error) {
            console.error('Container initialization error:', error);
            throw error;
        }
    }

    async initializeDatabases() {
        // MongoDB Connection
        this.services.mongoConnection = new MongoDBConnection(mongoConfig);
        await this.services.mongoConnection.connect();

        // Redis Connection
        this.services.redisConnection = new RedisConnection(redisConfig);
        await this.services.redisConnection.connect();
    }

    async initializeRepositories() {
        // MongoDB Repositories
        this.services.urlRepository = new MongoUrlRepository(
            this.services.mongoConnection
        );
        this.services.collectionRepository = new MongoCollectionRepository(
            this.services.mongoConnection
        );

        // Redis Cache Repositories
        this.services.urlCacheRepository = new UrlCacheRepository(
            this.services.redisConnection
        );
        this.services.collectionCacheRepository = new CollectionCacheRepository(
            this.services.redisConnection
        );

        // Add User Repository
        this.services.userRepository = new UserRepository(
            this.services.mongoConnection
        );
        this.services.userCacheRepository = new UserCacheRepository(
            this.services.redisConnection
        );
    }

    async initializeServices() {
        this.services.authService = new AuthService();
        
        this.services.userWriteService = new UserWriteService(
            this.services.userRepository,
            this.services.userCacheRepository,
            this.services.authService
        );

        this.services.userReadService = new UserReadService(
            this.services.userRepository
        );

        // Create auth middleware and bind it correctly
        const authMiddleware = this.services.authService.createAuthMiddleware();
        this.services.authenticate = authMiddleware.bind(this.services.authService);

        this.services.urlReadService = new UrlReadService(
            this.services.urlRepository,
            this.services.urlCacheRepository
        );
        this.services.urlWriteService = new UrlWriteService(
            this.services.urlRepository,
            this.services.urlCacheRepository
        );

        this.services.collectionReadService = new CollectionReadService(
            this.services.collectionRepository,
            this.services.collectionCacheRepository,
            this.services.urlReadService,
            this.services.userReadService
        );
        this.services.collectionWriteService = new CollectionWriteService(
            this.services.collectionRepository,
            this.services.collectionCacheRepository,
            this.services.urlReadService,
            this.services.urlWriteService,
            this.services.userReadService,
            this.services.userWriteService,
            this.services.collectionReadService
        );
    }

    async initializeControllers() {
        this.services.authController = new AuthController(
            this.services.authService
        );
        
        this.services.userReadController = new UserReadController(
            this.services.userReadService
        );
        this.services.userWriteController = new UserWriteController(
            this.services.userWriteService
        );

        this.services.urlReadController = new UrlReadController(
            this.services.urlReadService
        );
        this.services.urlWriteController = new UrlWriteController(
            this.services.urlWriteService
        );

        this.services.collectionReadController = new CollectionReadController(
            this.services.collectionReadService
        );
        this.services.collectionWriteController = new CollectionWriteController(
            this.services.collectionWriteService
        );
    }

    async cleanup() {
        // Properly close database connections
        if (this.services.mongoConnection) {
            await this.services.mongoConnection.disconnect();
        }
        if (this.services.redisConnection) {
            await this.services.redisConnection.disconnect();
        }
    }

    get(serviceName) {
        if (!this.services[serviceName]) {
            throw new Error(`Service ${serviceName} not found`);
        }
        return this.services[serviceName];
    }

    registerRoutes(app, basePath = '/api') {
        const controllerServices = [
            'urlReadController',
            'urlWriteController',
            'collectionReadController',
            'collectionWriteController',
            'userReadController',
            'userWriteController',
            'authController'
        ];

        app.use(basePath, this.services.authenticate);

        controllerServices.forEach(controllerName => {
            const controller = this.get(controllerName);
            if (controller && controller.router) {
                if (controllerName === 'userWriteController' || controllerName === 'authController') {
                    app.use(basePath, controller.router);
                } else {
                    app.use(basePath, this.services.authenticate, controller.router);
                }
            } else {
                console.warn(`Warning: Controller ${controllerName} not found or has no router`);
            }
        });
    }
}

// Create and export a singleton instance
const container = new Container();
module.exports = container; 