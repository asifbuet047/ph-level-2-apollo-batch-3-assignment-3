import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";

const getAllUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUserFromDB();

    if (result.length) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "Users retrived successfully",
          data: result,
        },
        200
      );
    } else {
      throw new NoDataFoundError("No data found");
    }
  }
);

const getSingleUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUserFromDB(id);
    if (result) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "Users retrived successfully",
          data: result,
        },
        200
      );
    } else {
      throw new NoDataFoundError("No data found");
    }
  }
);

export const UserController = {};
