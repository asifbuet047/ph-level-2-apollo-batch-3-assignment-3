import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { AuthServices } from "./auth.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import httpStatus from "http-status";
import AuthenticationError from "../../errorHandlers/AuthenticationError";

const signpValidUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.signupValidUserAndStoreIntoDB(req.body);
    sendGenericSuccessfulResponse(
      res,
      {
        message: "User registered successfully",
        data: result,
      },
      httpStatus.CREATED
    );
  }
);

const loginValidUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.loginValidUserByCredentialsStoredInDB(
      req.body
    );
    if (result.token) {
      res.setHeader("Authorization", `Bearer ${result.token}`);
      res.status(httpStatus.OK).json({
        success: true,
        statusCode: httpStatus.OK,
        message: "User logged in successfully",
        token: result.token,
        data: result.data,
      });
    } else {
      throw new AuthenticationError();
    }
  }
);

export const AuthController = {
  signpValidUser,
  loginValidUser,
};
