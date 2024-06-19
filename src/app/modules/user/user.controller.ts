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

    const userCredential = jwt.verify(
      authorizationHeader?.split(" ")[1] as string,
      config.jwt_secret_key
    );

    const result =
      await UserServices.getSingleUserFromDbExcludingHashedPassword(
        userCredential?.email
      );

    if (result) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "User profile retrived successfully",
          data: result,
        },
        httpStatus.OK
      );
    } else {
      throw new NoDataFoundError("No data found", 403);
    }
  }
);

const updateLoggedInUserProfile = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");

    const userCredential = jwt.verify(
      authorizationHeader?.split(" ")[1] as string,
      config.jwt_secret_key
    );

    console.log(userCredential.email);
    const updatedUser = await UserServices.updateSingleUserIntoDB(
      userCredential?.email,
      req.body
    );
    if (updatedUser) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "Profile updated successfully",
          data: updatedUser,
        },
        httpStatus.OK
      );
    } else {
      throw new NoDataFoundError("No data found", httpStatus.NOT_FOUND);
    }
  }
);

export const UserController = {
  getLoggedInUserProfile,
  updateLoggedInUserProfile,
};
