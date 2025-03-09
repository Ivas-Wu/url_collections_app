// const Redis = require('ioredis');

// class Cache {
//     constructor(config) {
//         this.client = null;
//         this.config = {
//             host: config.host || 'localhost',
//             port: config.port || 6379,
//             password: config.password,
//             db: config.db || 0,
//             retryStrategy: (times) => {
//                 const delay = Math.min(times * 50, 2000);
//                 return delay;
//             }
//         };
//     }

//     async connect() {
//         try {
//             this.client = new Redis(this.config);

//             this.client.on('error', (err) => {
//                 console.error('Redis Client Error:', err);
//             });

//             this.client.on('connect', () => {
//                 console.log('Redis Client Connected');
//             });

//             await this.client.ping();
//             return true;
//         } catch (error) {
//             console.error('Redis Connection Error:', error);
//             throw error;
//         }
//     }

//     async get(key) {
//         try {
//             const value = await this.client.get(key);
//             return value ? JSON.parse(value) : null;
//         } catch (error) {
//             console.error('Redis Get Error:', error);
//             return null;
//         }
//     }

//     async set(key, value, ttl = 3600) {
//         try {
//             await this.client.set(
//                 key,
//                 JSON.stringify(value),
//                 'EX',
//                 ttl
//             );
//             return true;
//         } catch (error) {
//             console.error('Redis Set Error:', error);
//             return false;
//         }
//     }

//     async delete(key) {
//         try {
//             await this.client.del(key);
//             return true;
//         } catch (error) {
//             console.error('Redis Delete Error:', error);
//             return false;
//         }
//     }

//     async disconnect() {
//         if (this.client) {
//             await this.client.quit();
//             console.log('Redis Client Disconnected');
//         }
//     }
// }

// module.exports = Cache; 