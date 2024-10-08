import mongoose, { Schema, SchemaType } from "mongoose";
import { TDiscount } from "./discount.interface";

const DiscountSchema = new Schema<TDiscount>({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  bike_name: {
    type: Schema.Types.String,
    required: true,
  },
  bike_pricePerHour: {
    type: Schema.Types.Number,
    required: true,
  },
  bike_discount: {
    type: Schema.Types.Number,
    required: true,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
});

export const DiscountModel = mongoose.model("discount", DiscountSchema);
