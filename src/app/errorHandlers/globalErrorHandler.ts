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
import UnauthorizedRouteError from "./UnauthorizedRouteError";
import BikeNotAvailableError from "./BikeNotAvailableError";
import NoBikeFoundError from "./NoBikeFoundError";
import mongoose from "mongoose";
import mongooseErrorHandler from "./mongooseErrorHandler";

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
  } else if (error instanceof mongoose.Error.CastError) {
    const castError = mongooseErrorHandler(error);
    message = castError.message;
    errorSources = castError.errorSources;
    return res.status(castError.statusCode as number).json({
      success: false,
      message,
      errorMessage: errorSources,
      stack: "error stack",
    });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const castError = mongooseErrorHandler(error);
    message = castError.message;
    errorSources = castError.errorSources;
    return res.status(castError.statusCode as number).json({
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
  } else if (error instanceof UnauthorizedRouteError) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: `User type is not have permission to access this route`,
      data: [],
    });
  } else if (error instanceof BikeNotAvailableError) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof NoBikeFoundError) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: error.message,
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
