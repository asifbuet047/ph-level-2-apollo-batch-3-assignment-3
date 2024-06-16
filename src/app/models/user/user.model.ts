import mongoose, { Schema } from "mongoose";
import { TUSer } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config/config";

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

userSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(user.password, Number(config.default_salt));
  user.password = hash;
  next();
});

export const UserModel = mongoose.model<TUSer>("user", userSchema);
