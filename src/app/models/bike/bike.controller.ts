import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { BikeServices } from "./bike.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";

const createSinglebike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BikeServices.createSingleBikeIntoDB(req.body);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike added successfully",
        data: result,
      });
    }
  }
);

const getSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const result = await BikeServices.getSingleBikeFromDB(id);
    console.log(result);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

const getAllBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BikeServices.getAllBikeFromDB();
    console.log(result);
    if (result.length) {
      sendGenericSuccessfulResponse(res, {
        message: "Bikes retrived successfully",
        data: result,
      });
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
      sendGenericSuccessfulResponse(res, {
        message: "Bike updated successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

const deleteSingleBike = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(id);
    const result = await BikeServices.deleteSingleBikeFromDB(id);
    console.log(result);
    if (result) {
      sendGenericSuccessfulResponse(res, {
        message: "Bike deleted successfully",
        data: result,
      });
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
