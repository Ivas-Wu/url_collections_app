class UserWriteService {
    constructor(userRepository, userCacheRepository, authService) {
        this.userRepository = userRepository;
        this.userCacheRepository = userCacheRepository;
        this.authService = authService;
    }

    async registerUser(userData) {
        const user = await this.userRepository.create(userData);
        const tokens = this.authService.generateTokens(user._id, user.role);
        
        return {
            message: 'User registered successfully',
            user,
            ...tokens
        };
    }

    async loginUser(identifier, password) {
        const user = await this.userRepository.findOne({ email: identifier }) ?? await this.userRepository.findOne({ username: identifier });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const tokens = this.authService.generateTokens(user._id, user.role);
        return { user, ...tokens };
    }

    async refreshToken(refreshToken) {
        return this.authService.refreshAccessToken(refreshToken);
    }

    async addCollectionToUser(userId, collectionUrl) {
        await this.userRepository.update(
            { _id: userId },
            { $push: { collections: collectionUrl } }
        );
        
        await this.userCacheRepository.invalidateUser(userId);
    }

    async removeCollectionFromUser(userId, collectionUrl) {
        await this.userRepository.update(
            { _id: userId },
            { $pull: { collections: collectionUrl } }
        );
        
        // Invalidate user cache after modification
        await this.userCacheRepository.invalidateUser(userId);
    }
} 

module.exports = UserWriteService; 