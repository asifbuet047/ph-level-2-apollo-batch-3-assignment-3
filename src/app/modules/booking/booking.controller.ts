import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { BookingServices } from "./booking.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";

const createBooing = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.createBookingIntoDB(req.body);
    sendGenericSuccessfulResponse(res, {
      message: "Rental created successfully",
      data: result,
    });
  }
);

const getAllBooking = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.getAllBookingFromDB();
    if (result.length) {
      sendGenericSuccessfulResponse(res, {
        message: "Rentals retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found");
    }
  }
);

export const BookingController = {
  createBooing,
  getAllBooking,
};
