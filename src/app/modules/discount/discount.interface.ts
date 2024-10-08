import { model, ObjectId, Schema } from "mongoose";

export interface TDiscount {
  title: string;
  bike_name: string;
  bike_pricePerHour: number;
  bike_discount: number;
  bikeId: ObjectId;
}
