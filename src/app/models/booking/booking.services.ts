import { TBooking } from "./booking.interface";
import { BookingModel } from "./booking.model";

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
