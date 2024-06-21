class DatabaseOperationFailedError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode: number, stack: string = "") {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default DatabaseOperationFailedError;
