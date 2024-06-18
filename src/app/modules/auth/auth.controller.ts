import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { AuthServices } from "./auth.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";

const signpValidUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthServices.signupValidUserAndStoreIntoDB(req.body);

    sendGenericSuccessfulResponse(
      res,
      {
        message: "User registered successfully",
        data: result,
      },
      201
    );
  }
);

export const AuthController = {
  signpValidUser,
};
