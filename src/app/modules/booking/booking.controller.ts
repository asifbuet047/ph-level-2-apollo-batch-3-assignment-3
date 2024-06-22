import { NextFunction, Request, Response } from "express";
import { resolveRequestOrThrowError } from "../../utils/resolveRequestOrThrowError";
import { BookingServices } from "./booking.services";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import { TUserJwtPayload } from "../user/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config/config";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.services";
import httpStatus from "http-status";
import { BikeServices } from "../bike/bike.services";
import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";
import { validateDataWithZodSchema } from "../../utils/validateDataWithZodSchema";
import { BookingValidation } from "./booking.validation";
import { ZodError } from "zod";
import mongoose from "mongoose";
import BikeNotAvailableError from "../../errorHandlers/BikeNotAvailableError";

const createBooking = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");
    const decodedPayload: TUserJwtPayload = jwt.verify(
      authorizationHeader?.split(" ")[1] as string,
      config.jwt_secret_key
    ) as TUserJwtPayload;

    if (decodedPayload?.email) {
      const result = await BookingServices.createBookingIntoDB(
        req.body,
        decodedPayload.email
      );
      sendGenericSuccessfulResponse(
        res,
        {
          message: "Rental created successfully",
          data: result,
        },
        httpStatus.OK
      );
    } else {
      throw new NoDataFoundError("No user found", httpStatus.NOT_FOUND);
    }
  }
);

const getAllBooking = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.getAllBookingsFromDB();
    if (result.length) {
      sendGenericSuccessfulResponse(res, {
        message: "Rentals retrived successfully",
        data: result,
      });
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

const updateSingleBooking = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await BookingServices.updateBookingIntoDB(req.params.id);
    if (result) {
      sendGenericSuccessfulResponse(
        res,
        {
          message: "Bike return successfully",
          data: result,
        },
        httpStatus.OK
      );
    } else {
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

const getAllBookingsOfSingleUser = resolveRequestOrThrowError(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorizationHeader = req.header("Authorization");
    const decodedPayload: TUserJwtPayload = jwt.verify(
      authorizationHeader?.split(" ")[1] as string,
      config.jwt_secret_key
    ) as TUserJwtPayload;
    if (decodedPayload?.email) {
      const result = await BookingServices.getAllBookingsOfSingleUserFromDB(
        decodedPayload.email
      );
      if (result.length) {
        sendGenericSuccessfulResponse(
          res,
          {
            message: `Rentalsretried successfully`,
            data: result,
          },
          httpStatus.OK
        );
      } else {
        throw new NoDataFoundError("No Data Found", 403);
      }
    } else {
      throw new NoDataFoundError("No user found", httpStatus.NOT_FOUND);
    }
  }
);

export const BookingController = {
  createBooking,
  getAllBooking,
  updateSingleBooking,
  getAllBookingsOfSingleUser,
};
