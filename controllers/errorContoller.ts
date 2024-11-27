import { Request, Response, NextFunction } from 'express';
import { AppError, ConflictError, DatabaseError, ValidationError } from './../utils/appError'; // Import the custom error class

// Development Error Handler (Exposes full error details)
const sendErrorDev = (err: AppError, req: Request, res: Response) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode || 500).json({
      status: err.status || 'error',
      error: err,
      message: err.message,
      stack: err.stack,  // Exposes full error stack trace in development
    });
  }

  console.error('ERROR 💥', err); 
  return res.status(err.statusCode || 500).render('error', {
    title: 'Something went wrong!',
    msg: err.message,
  });
};

// Production Error Handler (Hides internal error details)
const sendErrorProd = (err: AppError, req: Request, res: Response) => {
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
export const globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err as AppError;
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (error instanceof ValidationError) {
    error.message = `Invalid input data: ${error.details?.join('. ') || error.message}`;
    error.statusCode = 400;
  } else if (error instanceof DatabaseError) {
    error.message = `Database error: ${error.message}`;
    error.statusCode = 500;
  } else if (error instanceof ConflictError) {
    error.message = `Conflict error: ${error.message}`;
    error.statusCode = 409;
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);  
  } else {
    sendErrorProd(error, req, res); 
  }
};

