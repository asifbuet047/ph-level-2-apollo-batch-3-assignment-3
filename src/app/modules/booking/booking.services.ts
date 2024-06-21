import httpStatus from "http-status";
import BikeNotAvailableError from "../../errorHandlers/BikeNotAvailableError";
import NoBikeFoundError from "../../errorHandlers/NoBikeFoundError";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import { BikeServices } from "../bike/bike.services";
import { UserServices } from "../user/user.services";
import { TBooking, TBookingRental } from "./booking.interface";
import { BookingModel } from "./booking.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import DatabaseOperationFailedError from "../../errorHandlers/DatabaseOperationFailedError";
import { sendGenericSuccessfulResponse } from "../../utils/sendGenericResponse";
import mongoose from "mongoose";
import { BikeModel } from "../bike/bike.model";

const createBookingIntoDB = async (
  booking: TBookingRental,
  userEmail: string
) => {
  const mongooseTransactionSession = await mongoose.startSession();
  try {
    mongooseTransactionSession.startTransaction();
    console.log("Start transaction");

    const bikeId = booking.bikeId;
    const isBikeExits = await BikeServices.getSingleBikeFromDB(
      bikeId.toString()
    );
    if (isBikeExits) {
      if (isBikeExits.isAvailable) {
        const user =
          await UserServices.getSingleUserFromDbExcludingHashedPassword(
            userEmail
          );

        if (user) {
          const bookingData: TBooking = {
            userId: user._id,
            bikeId: bikeId,
            startTime: booking.startTime,
          };
          const rent = await BookingModel.create([bookingData], {
            session: mongooseTransactionSession,
          });
          if (rent.length) {
            const isChangeAvailability = await BikeModel.findByIdAndUpdate(
              [bikeId],
              {
                isAvailable: false,
              },
              {
                session: mongooseTransactionSession,
                new: true,
              }
            );
            console.log(isChangeAvailability);
            if (isChangeAvailability) {
              await mongooseTransactionSession.commitTransaction();
              console.log("Abort tranaction after successful operation");
              await mongooseTransactionSession.endSession();
              console.log("End session after successful opearation");
              return rent[0];
            } else {
              throw new DatabaseOperationFailedError(
                "Bike database write failed",
                httpStatus.FAILED_DEPENDENCY
              );
            }
          } else {
            throw new DatabaseOperationFailedError(
              "Booking database write failed",
              httpStatus.FAILED_DEPENDENCY
            );
          }
        } else {
          throw new NoDataFoundError("No user found", httpStatus.NOT_FOUND);
        }
      } else {
        throw new BikeNotAvailableError();
      }
    } else {
      throw new NoBikeFoundError();
    }
  } catch (error) {
    await mongooseTransactionSession.abortTransaction();
    console.log("Abort transaction after error");
    await mongooseTransactionSession.endSession();
    console.log("End session after error");
    throw error;
  }
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

const updateBookingIntoDB = async (booingId: string) => {
  const mongooseTransactionSession = await mongoose.startSession();
  try {
    mongooseTransactionSession.startTransaction();
    console.log("Start transaction");
    const existingBooking = await BookingModel.findById(booingId, {
      session: mongooseTransactionSession,
    }).lean();

    console.log(existingBooking);
    if (existingBooking) {
      const returnTime = new Date();
      const startTime = new Date(existingBooking?.startTime as Date);
      const totalTimeInMiliseconds: number =
        returnTime.getTime() - startTime.getTime();
      const totalTimeInHours = Math.floor(
        totalTimeInMiliseconds / (1000 * 60 * 60)
      );

      const bikeInfo = await BikeModel.findById([existingBooking?.bikeId], {
        session: mongooseTransactionSession,
      });

      if (bikeInfo) {
        const totalCost = (bikeInfo?.pricePerHour as number) * totalTimeInHours;

        const updateBooking = await BookingModel.findByIdAndUpdate(
          [booingId],
          {
            returnTime,
            totalCost,
            isReturned: true,
          },
          {
            session: mongooseTransactionSession,
            new: true,
          }
        );

        if (updateBooking) {
          await mongooseTransactionSession.commitTransaction();
          console.log("Abort tranaction after successful operation");
          await mongooseTransactionSession.endSession();
          console.log("End session after successful opearation");
          return updateBooking;
        } else {
          throw new DatabaseOperationFailedError(
            "Booking database update failed",
            httpStatus.FAILED_DEPENDENCY
          );
        }
      } else {
        throw new NoBikeFoundError();
      }
    } else {
      throw new NoDataFoundError("No booking found", httpStatus.NOT_FOUND);
    }
  } catch (error) {
    await mongooseTransactionSession.abortTransaction();
    console.log("Abort transaction after error");
    await mongooseTransactionSession.endSession();
    console.log("End session after error");
    throw error;
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
  updateBookingIntoDB,
};
