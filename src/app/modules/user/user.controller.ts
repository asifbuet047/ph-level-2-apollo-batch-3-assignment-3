import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { UserServices } from "./user.services";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import { TUserCredentials } from "./user.interface";
import config from "../../config/config";

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

const getLoggedInUserProfile = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");

    const userCredentials: JwtPayload = jwt.verify(
      authorizationHeader?.split(" ")[1] as string,
      config.jwt_secret_key
    );

    console.log(userCredentials);
    const result = await UserServices.getSingleUserFromDBExcludeHashedPassword(
      userCredentials?.email
    );
    if (result) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "User profile retrived successfully",
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
  getLoggedInUserProfile,
};
