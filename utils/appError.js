"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictError = exports.DatabaseError = exports.ValidationError = exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.status = statusCode < 400 ? 'success' : 'error';
        this.isOperational = true;
        this.details = details || null;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message, details) {
        super(message, 400, details);
    }
}
exports.ValidationError = ValidationError;
class DatabaseError extends AppError {
    constructor(message, details) {
        super(message, 500, details);
    }
}
exports.DatabaseError = DatabaseError;
class ConflictError extends AppError {
    constructor(message) {
        super(message, 409);
    }
}
exports.ConflictError = ConflictError;
