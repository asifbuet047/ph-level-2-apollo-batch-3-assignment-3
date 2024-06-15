import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(400).json({
    success: false,
    message: error?.message,
    errorMessage: error,
    stack: "error stack",
  });
};
