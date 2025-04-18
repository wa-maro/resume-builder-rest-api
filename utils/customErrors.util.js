class CustomError extends Error {
  constructor(message = "Internal Server Error", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Invalid request payload or syntax.
export class BadRequestError extends CustomError {
  constructor(message = "Bad Request") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

// Authentication required.
export class UnauthorizedError extends CustomError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

// Authenticated, but not authorized.
export class ForbiddenError extends CustomError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

// Resource not found.
export class NotFoundError extends CustomError {
  constructor(message = "Not Found") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

// Conflict with current state.
export class ConflictError extends CustomError {
  constructor(message = "Conflict") {
    super(message, 409);
    this.name = "ConflictError";
  }
}
