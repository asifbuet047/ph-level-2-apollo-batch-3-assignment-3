import { NextFunction, Request, RequestHandler, Response } from "express";

//Higher order function to handle a RequestHanlder type function
export const resolveRequestOrThrowError = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};
