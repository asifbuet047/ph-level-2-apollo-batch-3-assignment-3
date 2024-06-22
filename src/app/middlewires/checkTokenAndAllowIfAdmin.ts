import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus, { NOT_FOUND } from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
import { TUserJwtPayload } from "../modules/user/user.interface";
import AuthenticationError from "../errorHandlers/AuthenticationError";
import UnauthorizedRouteError from "../errorHandlers/UnauthorizedRouteError";

const checkTokenAndAllowIfAdmin: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (token) {
    const decodedPayload: TUserJwtPayload = jwt.verify(
      token as string,
      config.jwt_secret_key
    ) as TUserJwtPayload;
    if (decodedPayload.role === "admin") {
      next();
    } else {
      throw new UnauthorizedRouteError();
    }
  } else {
    throw new AuthenticationError("No token found is authentication header");
  }
};

export default checkTokenAndAllowIfAdmin;
