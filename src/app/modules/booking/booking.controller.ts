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
    );

    const session = await mongoose.startSession();
    session.startTransaction();
    console.log("Tranasaction is started");
    try {
      const user =
        await UserServices.getSingleUserFromDbExcludingHashedPassword(
          decodedPayload.email
        );

      if (user) {
        const bikeId = req.body?.bikeId;
        const requestedBike = await BikeServices.getSingleBikeFromDB(bikeId);
        if (requestedBike?.isAvailable) {
          const booking: TBooking = {
            userId: user._id,
            bikeId: bikeId,
            startTime: new Date(),
          };
          const rental = await BookingServices.createBookingIntoDB(booking);
          if (rental) {
            const bikeUpdate = await BikeServices.updateBikeIntoDB(bikeId, {
              isAvailable: false,
            });
            if (!bikeUpdate?.isAvailable) {
              sendGenericSuccessfulResponse(
                res,
                {
                  message: "Rental created successfully",
                  data: rental,
                },
                httpStatus.OK
              );
            } else {
              throw new NoDataFoundError(
                "No rental request created. Rental request terminated",
                httpStatus.NOT_FOUND
              );
            }
          } else {
            throw new NoDataFoundError(
              "No rental request created. Rental request terminated",
              httpStatus.NOT_FOUND
            );
          }
        } else {
          throw new BikeNotAvailableError();
        }
      } else {
        throw new NoDataFoundError("No user found", httpStatus.NOT_FOUND);
      }
      await session.commitTransaction();
      console.log("Tranasaction is committed");
    } catch (error) {
      await session.abortTransaction();
      console.log("Tranasaction is aborted");
      throw error;
    } finally {
      session.endSession();
    }
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
      throw new NoDataFoundError("No Data Found", 403);
    }
  }
);

export const BookingController = {
  createBooking,
  getAllBooking,
};
