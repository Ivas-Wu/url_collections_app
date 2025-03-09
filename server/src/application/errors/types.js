/**
 * Base custom error class
 */
class BaseError extends Error {
    constructor(message, status = 500, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        this.data = data;
        this.timestamp = new Date();
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            error: {
                name: this.name,
                message: this.message,
                status: this.status,
                data: this.data,
                timestamp: this.timestamp
            }
        };
    }
}

/**
 * 400 Bad Request
 */
class ValidationError extends BaseError {
    constructor(message, data = {}) {
        super(message, 400, data);
    }
}

/**
 * 401 Unauthorized
 */
class UnauthorizedError extends BaseError {
    constructor(message, data = {}) {
        super(message, 401, {
            headers: {
                'WWW-Authenticate': 'Bearer realm="api"'
            },
            ...data
        });
    }
}

/**
 * 403 Forbidden
 */
class ForbiddenError extends BaseError {
    constructor(message, data = {}) {
        super(message, 403, data);
    }
}

/**
 * 404 Not Found
 */
class NotFoundError extends BaseError {
    constructor(message, data = {}) {
        super(message, 404, data);
    }
}

/**
 * 409 Conflict
 */
class ConflictError extends BaseError {
    constructor(message, data = {}) {
        super(message, 409, data);
    }
}

/**
 * 429 Too Many Requests
 */
class RateLimitError extends BaseError {
    constructor(message, data = {}) {
        super(message, 429, {
            headers: {
                'Retry-After': data.retryAfter || 60
            },
            ...data
        });
    }
}

/**
 * 500 Internal Server Error
 */
class DatabaseError extends BaseError {
    constructor(message, originalError = null) {
        super(
            message, 
            500, 
            { originalError: process.env.NODE_ENV === 'development' ? originalError : undefined }
        );
    }
}

/**
 * 503 Service Unavailable
 */
class ServiceUnavailableError extends BaseError {
    constructor(message, data = {}) {
        super(message, 503, data);
    }
}

module.exports = {
    BaseError,
    ValidationError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    RateLimitError,
    DatabaseError,
    ServiceUnavailableError
}; 