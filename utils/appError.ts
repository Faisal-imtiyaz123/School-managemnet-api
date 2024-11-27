export class AppError extends Error {
    public statusCode: number;
    public status: string;
    public isOperational: boolean;
    public details?: any;

    constructor(message: string, statusCode: number, details?: any) {
        super(message);
        this.statusCode = statusCode;

        this.status = statusCode < 400 ? 'success' : 'error';  
        this.isOperational = true;
        this.details = details || null;

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

export class ValidationError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 400, details);
    }
}

export class DatabaseError extends AppError {
    constructor(message: string, details?: any) {
        super(message, 500, details);
    }
}

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}
