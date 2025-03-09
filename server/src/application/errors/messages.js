/**
 * Predefined error messages
 */
const ErrorMessages = {
    Auth: {
        INVALID_CREDENTIALS: 'Invalid email or password',
        TOKEN_EXPIRED: 'Access token has expired',
        TOKEN_INVALID: 'Invalid access token',
        TOKEN_MISSING: 'Access token is required',
        UNAUTHORIZED: 'You are not authorized to perform this action',
        FORBIDDEN: 'You do not have permission to access this resource'
    },
    User: {
        NOT_FOUND: 'User not found',
        ALREADY_EXISTS: 'User with this email already exists',
        INVALID_PASSWORD: 'Password must be at least 6 characters long',
        INVALID_EMAIL: 'Invalid email format'
    },
    Collection: {
        NOT_FOUND: 'Collection not found',
        ACCESS_DENIED: 'You do not have access to this collection',
        MODIFY_DENIED: 'You do not have permission to modify this collection',
        ALREADY_EXISTS: 'Collection with this name already exists'
    },
    Url: {
        NOT_FOUND: 'URL not found',
        INVALID_URL: 'Invalid URL format',
        GENERATION_FAILED: 'Failed to generate short URL'
    },
    Database: {
        CONNECTION_ERROR: 'Database connection error',
        QUERY_ERROR: 'Database query error',
        VALIDATION_ERROR: 'Database validation error'
    },
    Redis: {
        CONNECTION_ERROR: 'Redis connection error',
        OPERATION_FAILED: 'Redis operation failed'
    },
    General: {
        INVALID_INPUT: 'Invalid input provided',
        RATE_LIMIT: 'Too many requests, please try again later',
        SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
        INTERNAL_ERROR: 'An internal error occurred'
    }
};

module.exports = ErrorMessages; 