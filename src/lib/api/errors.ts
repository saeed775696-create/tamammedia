export class AppError extends Error {
  public statusCode: number;
  public code: string;
  public details?: unknown;
  public timestamp: string;
  public requestId?: string;

  constructor({
    message,
    statusCode = 500,
    code = 'INTERNAL_SERVER_ERROR',
    details,
    requestId,
  }: {
    message: string;
    statusCode?: number;
    code?: string;
    details?: unknown;
    requestId?: string;
  }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.timestamp = new Date().toISOString();
    this.requestId = requestId;
    
    // Set prototype explicitly for built-in Error subclassing in TS
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: unknown) {
    super({ message, statusCode: 404, code: 'NOT_FOUND', details });
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details?: unknown) {
    super({ message, statusCode: 400, code: 'VALIDATION_ERROR', details });
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access', details?: unknown) {
    super({ message, statusCode: 401, code: 'UNAUTHORIZED', details });
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden', details?: unknown) {
    super({ message, statusCode: 403, code: 'FORBIDDEN', details });
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict', details?: unknown) {
    super({ message, statusCode: 409, code: 'CONFLICT', details });
  }
}
