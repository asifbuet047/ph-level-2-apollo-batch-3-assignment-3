import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { zodErrorHandler } from "../errorHandlers/zodErrorHandler";
import { TErrorSources } from "../errorHandlers/errorResponse.interface";
import NoDataFoundError from "../errorHandlers/NoDataFoundError";
import DuplicateUserError from "../errorHandlers/DuplicateUserError";
import AuthenticationError from "../errorHandlers/AuthenticationError";
import AuthorizationError from "../errorHandlers/AuthorizationError";
import { JsonWebTokenError } from "jsonwebtoken";
import UnauthorizedRouteError from "../errorHandlers/UnauthorizedRouteError";
import BikeNotAvailableError from "../errorHandlers/BikeNotAvailableError";
import NoBikeFoundError from "../errorHandlers/NoBikeFoundError";
import mongoose from "mongoose";
import mongooseErrorHandler from "../errorHandlers/mongooseErrorHandler";
import InvalidImageFileUploadedError from "../errorHandlers/InvalidImageFileUploadedError";

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
    return res.status(httpStatus.BAD_REQUEST).json({
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
      statusCode: error.statusCode,
      message: error.message,
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

    // @ts-ignore
  } else if (error instanceof SyntaxError && error?.statusCode === 400) {
    errorSources[0].path = "Request body holds inappropriate JSON object";
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: "Bad request. Invalid JSON",
      errorMessage: errorSources,
      stack: "error stack",
    });
  } else if (error instanceof InvalidImageFileUploadedError) {
    return res.status(httpStatus.CONFLICT).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else {
    return res.status(httpStatus.BAD_REQUEST).json({
      success: false,
      message: error,
      errorMessage: errorSources,
      stack: "error stack",
    });
  }
};
