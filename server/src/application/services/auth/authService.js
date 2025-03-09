const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../../errors');

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET;
        this.refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    }

    /**
     * Verify and decode JWT token
     * @param {string} token - JWT token to verify
     * @returns {Object} Decoded token payload
     * @throws {UnauthorizedError} If token is invalid or expired
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedError('Access token expired, please refresh', {
                    headers: {
                        'WWW-Authenticate': 'Bearer realm="access_token", error="invalid_token", error_description="The token has expired"'
                    }
                });
            }
            throw new UnauthorizedError('Invalid access token');
        }
    }

    /**
     * Extract token from authorization header
     * @param {string} authHeader - Authorization header value
     * @returns {string|null} Extracted token or null
     */
    extractTokenFromHeader(authHeader) {
        if (!authHeader) return null;
        const [bearer, token] = authHeader.split(' ');
        return bearer === 'Bearer' ? token : null;
    }

    /**
     * Generate new JWT token
     * @param {Object} payload - Token payload
     * @param {Object} options - JWT sign options
     * @returns {string} Generated token
     */
    generateToken(payload, options = {}) {
        const { secret, ...restOptions } = options;
        return jwt.sign(payload, secret || this.jwtSecret, {
            expiresIn: '1h',
            ...restOptions
        });
    }

    /**
     * Authenticate middleware factory
     * @returns {Function} Express middleware function
     */
    createAuthMiddleware() {
        return async (req, res, next) => {
            try {
                const token = this.extractTokenFromHeader(req.headers.authorization);
                
                if (!token) {
                    req.user = null;
                    return next();
                }

                const decoded = this.verifyToken(token);
                req.user = decoded;
                next();
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    res.set(error.headers || {});
                    res.status(401).json({ error: error.message });
                } else {
                    next(error);
                }
            }
        };
    }

    generateTokens(userId, userRole) {
        const payload = { userId, role: userRole };
        
        const accessToken = this.generateToken(
            payload,
            { expiresIn: '1h' }
        );

        const refreshToken = this.generateToken(
            payload,
            { 
                expiresIn: '7d',
                secret: this.refreshSecret 
            }
        );

        return { accessToken, refreshToken };
    }

    async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            throw new Error('No refresh token provided');
        }

        const decoded = jwt.verify(refreshToken, this.refreshSecret);
        const newAccessToken = this.generateToken(
            { userId: decoded.userId },
            { expiresIn: "1h" }
        );

        return { accessToken: newAccessToken };
    }
}

module.exports = AuthService; 