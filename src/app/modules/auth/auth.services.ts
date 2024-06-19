import { sign } from "jsonwebtoken";
import { TUSer, TUserCredentials } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.services";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DuplicateUserError from "../../errorHandlers/DuplicateUserError";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import config from "../../config/config";

const signupValidUserAndStoreIntoDB = async (userData: TUSer) => {
  const exitsUser = await UserServices.getSingleUserFromDB(userData.email);
  if (exitsUser) {
    throw new DuplicateUserError("User already registered", 404);
  } else {
    const result = await UserServices.createUserIntoDB(userData);
    return result;
  }
};

const loginValidUserByCredentialsStoredInDB = async (
  userCredential: TUserCredentials
) => {
  const exitsUser = await UserServices.getSingleUserFromDB(
    userCredential.email as string
  );
  if (exitsUser) {
    const hashedPaaword = exitsUser.password;
    const isValid = await bcrypt.compare(
      userCredential.password as string,
      hashedPaaword
    );
    if (isValid) {
      const jwtToken = jwt.sign(userCredential, config.jwt_secret_key, {
        expiresIn: "10h",
      });

      return {
        data: exitsUser,
        token: jwtToken,
      };
    } else {
      return {
        data: null,
        token: null,
      };
    }
  } else {
    throw new NoDataFoundError("User is not registered", 404);
  }
};

export const AuthServices = {
  signupValidUserAndStoreIntoDB,
  loginValidUserByCredentialsStoredInDB,
};
