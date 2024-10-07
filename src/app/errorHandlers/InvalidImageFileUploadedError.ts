import httpStatus from "http-status";

class InvalidImageFileUploadedError extends Error {
  public statusCode: number;
  public message: string;

  constructor(
    message: string = "Invalid Image File is uploaded",
    statusCode: number = httpStatus.CONFLICT,
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

export default InvalidImageFileUploadedError;
