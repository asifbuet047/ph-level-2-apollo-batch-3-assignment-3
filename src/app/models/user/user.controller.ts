import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { UserServices } from "./user.services";
import httpStatus from "http-status";

const createUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUserIntoDB(req.body);
    console.log(result);

    res.status(httpStatus.OK).json({
      success: true,
      data: result,
    });
  },
);

export const UserController = {
  createUser,
};
