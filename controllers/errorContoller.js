"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = require("./../utils/appError"); // Import the custom error class
// Development Error Handler (Exposes full error details)
const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            error: err,
            message: err.message,
            stack: err.stack, // Exposes full error stack trace in development
        });
    }
    console.error('ERROR 💥', err);
    return res.status(err.statusCode || 500).render('error', {
        title: 'Something went wrong!',
        msg: err.message,
    });
};
// Production Error Handler (Hides internal error details)
const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        const cleanMessage = err.message.replace(/^(.*?error:)/i, '').trim(); // Removes "Conflict error: Databse error: etc from error message" 
        err.message = cleanMessage;
        return res.status(err.statusCode || 500).json({
            status: err.status || 'error',
            message: err.message,
        });
    }
    console.error('ERROR 💥', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went very wrong!',
    });
};
// Global Error Handler
const globalErrorHandler = (err, req, res, next) => {
    var _a;
    const error = err;
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    if (error instanceof appError_1.ValidationError) {
        error.message = `Invalid input data: ${((_a = error.details) === null || _a === void 0 ? void 0 : _a.join('. ')) || error.message}`;
        error.statusCode = 400;
    }
    else if (error instanceof appError_1.DatabaseError) {
        error.message = `Database error: ${error.message}`;
        error.statusCode = 500;
    }
    else if (error instanceof appError_1.ConflictError) {
        error.message = `Conflict error: ${error.message}`;
        error.statusCode = 409;
    }
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(error, req, res);
    }
    else {
        sendErrorProd(error, req, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
