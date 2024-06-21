import { Types } from "mongoose";

export interface TBookingRental {
  bikeId: Types.ObjectId;
  startTime: Date;
}

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime?: Date;
  totalCost?: number;
  isReturned?: boolean;
};
