import mongoose, { Schema, SchemaType } from "mongoose";
import { TBike } from "./bike.interface";

const bikeSchema = new Schema<TBike>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
  },
  pricePerHour: {
    type: Schema.Types.Number,
    required: true,
  },
  cc: {
    type: Schema.Types.Number,
    required: true,
  },
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  model: {
    type: Schema.Types.String,
    required: true,
  },
  isAvailable: {
    type: Schema.Types.Boolean,
    default: true,
  },
  bike_image: {
    type: Schema.Types.String,
  },
});

export const BikeModel = mongoose.model<TBike>("bike", bikeSchema);
