import { sign } from "jsonwebtoken";
import { TUSer } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.services";

const signupValidUserAndStoreIntoDB = async (userData: TUSer) => {
  const result = await UserServices.createUserIntoDB(userData);
  return result;
};

export const AuthServices = {
  signupValidUserAndStoreIntoDB,
};
