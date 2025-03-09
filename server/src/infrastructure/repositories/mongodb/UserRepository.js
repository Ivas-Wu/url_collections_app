const BaseRepository = require('./BaseRepository');
const User = require('../../../models/Auth');
const { DatabaseError } = require('../../../application/errors');

class UserRepository extends BaseRepository {
    constructor(connection) {
        super(connection, User);
    }

    /**
     * Find user by ID
     * @param {string} userId - User ID
     * @param {Object} options - Query options
     * @param {boolean} options.lean - Whether to return plain object
     * @param {Array<string>} options.select - Fields to select
     * @returns {Promise<Object>} User document
     */
    async findById(userId, options = {}) {
        try {
            let query = this.model.findById(userId);
            
            if (options.select) {
                query = query.select(options.select.join(' '));
            }
            
            if (options.lean) {
                query = query.lean();
            }

            const user = await query.exec();
            return user;
        } catch (error) {
            throw new DatabaseError('Error finding user by ID', error);
        }
    }

    /**
     * Find user by email
     * @param {string} email - User email
     * @param {Object} options - Query options
     * @returns {Promise<Object>} User document
     */
    async findByEmail(email, options = {}) {
        try {
            let query = this.model.findOne({ email });

            if (options.select) {
                query = query.select(options.select.join(' '));
            }

            if (options.lean) {
                query = query.lean();
            }

            return await query.exec();
        } catch (error) {
            throw new DatabaseError('Error finding user by email', error);
        }
    }

    /**
     * Create new user
     * @param {Object} userData - User data
     * @returns {Promise<Object>} Created user document
     */
    async createUser(userData) {
        try {
            const user = new this.model(userData);
            await user.save();
            return user;
        } catch (error) {
            if (error.code === 11000) {
                throw new DatabaseError('User with this email already exists', error);
            }
            throw new DatabaseError('Error creating user', error);
        }
    }

    /**
     * Update user by ID
     * @param {string} userId - User ID
     * @param {Object} updateData - Data to update
     * @param {Object} options - Update options
     * @returns {Promise<Object>} Updated user document
     */
    async updateUser(userId, updateData, options = {}) {
        try {
            const updateOptions = {
                new: true,
                runValidators: true,
                ...options
            };

            const user = await this.model.findByIdAndUpdate(
                userId,
                updateData,
                updateOptions
            );

            return user;
        } catch (error) {
            throw new DatabaseError('Error updating user', error);
        }
    }

    /**
     * Add collection to user's collections list
     * @param {string} userId - User ID
     * @param {string} collectionUrl - Collection URL to add
     * @returns {Promise<Object>} Updated user document
     */
    async addCollection(userId, collectionUrl) {
        try {
            return await this.model.findByIdAndUpdate(
                userId,
                {
                    $addToSet: { collections: collectionUrl }
                },
                { new: true }
            );
        } catch (error) {
            throw new DatabaseError('Error adding collection to user', error);
        }
    }

    /**
     * Remove collection from user's collections list
     * @param {string} userId - User ID
     * @param {string} collectionUrl - Collection URL to remove
     * @returns {Promise<Object>} Updated user document
     */
    async removeCollection(userId, collectionUrl) {
        try {
            return await this.model.findByIdAndUpdate(
                userId,
                {
                    $pull: { collections: collectionUrl }
                },
                { new: true }
            );
        } catch (error) {
            throw new DatabaseError('Error removing collection from user', error);
        }
    }

    /**
     * Change user password
     * @param {string} userId - User ID
     * @param {string} hashedPassword - New hashed password
     * @returns {Promise<Object>} Updated user document
     */
    async updatePassword(userId, hashedPassword) {
        try {
            return await this.model.findByIdAndUpdate(
                userId,
                {
                    password: hashedPassword,
                    passwordChangedAt: Date.now()
                },
                { new: true }
            );
        } catch (error) {
            throw new DatabaseError('Error updating user password', error);
        }
    }

    /**
     * Get user's collections with pagination
     * @param {string} userId - User ID
     * @param {Object} options - Pagination options
     * @returns {Promise<Object>} Collections with pagination info
     */
    async getUserCollections(userId, options = {}) {
        try {
            const page = options.page || 1;
            const limit = options.limit || 10;
            const skip = (page - 1) * limit;

            const user = await this.model
                .findById(userId)
                .select('collections')
                .skip(skip)
                .limit(limit);

            const total = await this.model
                .findById(userId)
                .select('collections')
                .countDocuments();

            return {
                collections: user.collections,
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new DatabaseError('Error getting user collections', error);
        }
    }

    /**
     * Check if email exists
     * @param {string} email - Email to check
     * @returns {Promise<boolean>} True if email exists
     */
    async emailExists(email) {
        try {
            const count = await this.model.countDocuments({ email });
            return count > 0;
        } catch (error) {
            throw new DatabaseError('Error checking email existence', error);
        }
    }

    /**
     * Delete user account
     * @param {string} userId - User ID
     * @returns {Promise<Object>} Deleted user document
     */
    async deleteUser(userId) {
        try {
            return await this.model.findByIdAndDelete(userId);
        } catch (error) {
            throw new DatabaseError('Error deleting user', error);
        }
    }
}

module.exports = UserRepository; 