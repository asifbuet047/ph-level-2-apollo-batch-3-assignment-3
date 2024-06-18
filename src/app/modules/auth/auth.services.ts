import { sign } from "jsonwebtoken";
import { TUSer } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.services";
import jwt from "jsonwebtoken";
import DuplicateUserError from "../../errorHandlers/DuplicateUserError";

const signupValidUserAndStoreIntoDB = async (userData: TUSer) => {
  const exitsUser = await UserServices.getSingleUserFromDB(userData.email);
  if (exitsUser) {
    throw new DuplicateUserError("User already registered");
  } else {
    console.log(exitsUser);
  }
};

const loginValidUserByCredentialsStoredInDb = async (
  userCredential: Partial<TUSer>
) => {};

export const AuthServices = {
  signupValidUserAndStoreIntoDB,
};
