const { NotFoundError } = require('../../errors');

class UserReadService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async findUser(userId, options = { lean: true }) {
        if (!userId) return null;
        
        const user = await this.userRepository.findById(userId, options);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        return user;
    }

    async findByIdentifier(identifier) {
        let user = await this.userRepository.findOne({ email: identifier });
        if (!user) {
            user = await this.userRepository.findOne({ username: identifier });
        }
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
} 

module.exports = UserReadService; 