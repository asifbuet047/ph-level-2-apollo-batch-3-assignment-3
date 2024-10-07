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
import { sendImageFileToCloudinaryHostingServer } from "../../utils/sendImageFileToCloudinaryHostingServer";
import DatabaseOperationFailedError from "../../errorHandlers/DatabaseOperationFailedError";
import httpStatus from "http-status";

const createSinglebike = resolveRequestOrThrowError(
  async (request: Request, response: Response, next: NextFunction) => {
    const filePath = request.file?.path;
    const fileName = request.file?.originalname;
    const info = await sendImageFileToCloudinaryHostingServer(
      fileName as string,
      filePath as string
    );
    request.body.bike_image = info?.secure_url as string;
    const result = await BikeServices.createSingleBikeIntoDB(request.body);
    if (result) {
      sendGenericSuccessfulResponse(response, {
        message: "Bike added successfully",
        data: result,
      });
    } else {
      throw new DatabaseOperationFailedError(
        "Product creation operation failed",
        httpStatus.INSUFFICIENT_STORAGE
      );
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

const getAllBikes = resolveRequestOrThrowError(
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
    const result = await BikeServices.deleteSingleBikeFromDB(req.params.id);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike deleted successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Bike Found", 403);
    }
  }
);

export const BikeController = {
  createSinglebike,
  getSingleBike,
  getAllBikes,
  updateSingleBike,
  deleteSingleBike,
};
