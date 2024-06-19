import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { zodErrorHandler } from "./zodErrorHandler";
import { TErrorSources } from "./errorResponse.interface";
import NoDataFoundError from "./NoDataFoundError";
import DuplicateUserError from "./DuplicateUserError";
import AuthenticationError from "./AuthenticationError";
import AuthorizationError from "./AuthorizationError";
import { JsonWebTokenError } from "jsonwebtoken";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];
  if (error instanceof ZodError) {
    const zodError = zodErrorHandler(error);
    message = zodError.message;
    errorSources = zodError.errorMessages;
    return res.status(400).json({
      success: false,
      message,
      errorMessage: errorSources,
      stack: "error stack",
    });
  } else if (error instanceof NoDataFoundError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof DuplicateUserError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof AuthenticationError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof AuthorizationError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof JsonWebTokenError) {
    return res.status(400).json({
      success: false,
      message: `${error.message}. Token is not verified`,
      data: [],
    });
  } else {
    return res.status(400).json({
      success: false,
      message: error,
      errorMessage: errorSources,
      stack: "error stack",
    });
  }
};
