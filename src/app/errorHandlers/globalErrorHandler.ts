import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import { zodErrorHandler } from "./zodErrorHandler";
import { TErrorSources } from "./errorResponse.interface";
import NoDataFoundError from "./NoDataFoundError";
import DuplicateUserError from "./DuplicateUserError";

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
    // message = "No Data Found";
    return res.status(404).json({
      success: false,
      message: error.message,
      data: [],
    });
  } else if (error instanceof DuplicateUserError) {
    //message = "No Data Found";
    return res.status(404).json({
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
