import mongoose, { Schema } from "mongoose";
import { TUSer } from "./user.interface";

const userSchema = new Schema<TUSer>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<TUSer>("user", userSchema);
