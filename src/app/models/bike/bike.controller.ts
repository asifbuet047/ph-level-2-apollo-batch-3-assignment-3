import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { BikeServices } from "./bike.services";
import { sendGenericResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";

const createSinglebike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BikeServices.createSingleBikeIntoDB(req.body);
    if (result) {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Bike added successfully",
        data: result,
      });
    }
  }
);

const getSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bikeId: id } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(id);
    if (result) {
      sendGenericResponse(true, 200, "Bike retrived successfully", result);
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

const getAllBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BikeServices.getAllBikeFromDB();
    if (result) {
      sendGenericResponse(true, 200, "Bikes retrived successfully", result);
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

const updateSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BikeServices.updateBikeIntoDB(id, req.body);
    if (result) {
      sendGenericResponse(true, 200, "Bike updated successfully", result);
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

const deleteSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { bikeId: id } = req.params;
    const result = await BikeServices.deleteSingleBikeFromDB(id);
    if (result) {
      sendGenericResponse(true, 200, "Bike deleted successfully", result);
    } else {
      throw new NoDataFoundError("No Data Found");
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
