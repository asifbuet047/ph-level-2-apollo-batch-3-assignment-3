class NoDataFoundError extends Error {
  public statusCode: number = 404;
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

export default NoDataFoundError;
