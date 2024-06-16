import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    ref: "bikes",
    required: true,
  },
  startTime: {
    type: Schema.Types.Date,
    required: true,
  },
  returnTime: {
    type: Schema.Types.Date,
    required: true,
    default: null,
  },
  totalCost: {
    type: Schema.Types.Number,
    required: true,
  },
  isReturned: {
    type: Schema.Types.Boolean,
    required: true,
    default: false,
  },
});

export const BookingModel = mongoose.model<TBooking>("booking", bookingSchema);
