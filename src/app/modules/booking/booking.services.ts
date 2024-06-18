import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";
import bcrypt from "bcrypt";

const hash = "$2b$08$MSdoojg34UohwFWe3ZvaBuv4Hlc4xkDDfZ.rwM8gwE8a61i5t59qe";

const createBookingIntoDB = async (booking: TBooking) => {
  const result = await BookingModel.create(booking);
  return result;
};

const getAllBookingFromDB = async () => {
  const result = await BookingModel.find();
  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingFromDB,
};
