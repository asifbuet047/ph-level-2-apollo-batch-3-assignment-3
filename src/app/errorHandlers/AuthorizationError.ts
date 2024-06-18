import httpStatus from "http-status";

class AuthorizationError extends Error {
  public statusCode: number;
  public message: string;

  constructor(
    message: string = "Authorization failure. Current user does not have access requested resources",
    statusCode: number = httpStatus.FORBIDDEN,
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

export default AuthorizationError;
