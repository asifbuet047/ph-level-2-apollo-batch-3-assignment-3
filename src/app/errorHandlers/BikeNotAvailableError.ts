import httpStatus from "http-status";

class BikeNotAvailableError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message?: string, statusCode?: number, stack: string = "") {
    super(message);
    this.message = "Bike is not available";
    this.statusCode = httpStatus.NOT_FOUND;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BikeNotAvailableError;
