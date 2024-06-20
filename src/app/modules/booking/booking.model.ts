import mongoose, { Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
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
    default: null,
  },
  totalCost: {
    type: Schema.Types.Number,
    default: 0,
  },
  isReturned: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export const BookingModel = mongoose.model<TBooking>("booking", bookingSchema);
