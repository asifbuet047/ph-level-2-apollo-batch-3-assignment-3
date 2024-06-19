import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { BikeServices } from "./bike.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import AuthenticationError from "../../errorHandlers/AuthenticationError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserJwtPayload } from "../user/user.interface";
import config from "../../config/config";
import UnauthorizedRouteError from "../../errorHandlers/UnauthorizedRouteError";

const createSinglebike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (token) {
      const decodedPayload: TUserJwtPayload = jwt.verify(
        token as string,
        config.jwt_secret_key
      );

      if (decodedPayload.role === "admin") {
        const result = await BikeServices.createSingleBikeIntoDB(req.body);
        if (result) {
          sendGenericSuccessfulResponse(res, {
            message: "Bike added successfully",
            data: result,
          });
        }
      } else {
        throw new UnauthorizedRouteError();
      }
    } else {
      throw new AuthenticationError();
    }
  }
);

const getSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(id);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

const getAllBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BikeServices.getAllBikeFromDB();
    if (result.length) {
      sendGenericSuccessfulResponse(res, {
        message: "Bikes retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

const updateSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BikeServices.updateBikeIntoDB(id, req.body);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike updated successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

const deleteSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BikeServices.deleteSingleBikeFromDB(id);
    console.log(result);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike deleted successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

export const BikeController = {
  createSinglebike,
  getSingleBike,
  getAllBike,
  updateSingleBike,
  deleteSingleBike,
};
