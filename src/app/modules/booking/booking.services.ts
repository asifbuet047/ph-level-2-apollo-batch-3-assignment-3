import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import jwt, { JwtPayload } from "jsonwebtoken";

const createBookingIntoDB = async (booking: TBooking) => {
  const result = await BookingModel.create(booking);
  const pojo = result.toJSON();
  const { __v, ...final } = pojo;
  return final;
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
};
