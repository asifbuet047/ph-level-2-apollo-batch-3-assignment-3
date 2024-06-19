import httpStatus from "http-status";

class UnauthorizedRouteError extends Error {
  public statusCode: number;
  public message: string;

  constructor(
    message: string = "User does not have access to this route",
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

export default UnauthorizedRouteError;
