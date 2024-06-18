import httpStatus from "http-status";

class AuthenticationError extends Error {
  public statusCode: number;
  public message: string;

  constructor(
    message: string = "Authentication failure. User credentails are mismatches",
    statusCode: number = httpStatus.UNAUTHORIZED,
    stack: string = ""
  ) {
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

export default AuthenticationError;
