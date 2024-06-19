import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";

const getAllUserProfiles = resolveRequestOrThrowError(
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
      throw new NoDataFoundError("No data found", 403);
    }
  }
);

const getUserProfile = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");
    console.log(authorizationHeader);
    const result = await UserServices.getSingleUserFromDB(
      "asifbuet047@gmail.com"
    );
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
      throw new NoDataFoundError("No data found", 403);
    }
  }
);

export const UserController = {
  getUserProfile,
};
