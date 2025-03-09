// const mongoose = require('mongoose');
// require('dotenv').config({ path: './.env' });

// class Database {
//     constructor() {
//         this.uri = process.env.MONGO_URI;
//         this.options = {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         };
//     }

//     async connect() {
//         try {
//             await mongoose.connect(this.uri, this.options);
//             console.log('MongoDB connected');
//         } catch (err) {
//             console.error(err.message);
//             process.exit(1);
//         }
//     }

//     async disconnect() {
//         try {
//             await mongoose.disconnect();
//             console.log('MongoDB disconnected');
//         } catch (err) {
//             console.error('Error disconnecting from MongoDB:', err.message);
//             process.exit(1);
//         }
//     }
// }

// module.exports = {
//     Database,
// }; 