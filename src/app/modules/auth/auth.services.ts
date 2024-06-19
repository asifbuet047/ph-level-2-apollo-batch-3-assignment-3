import { sign } from "jsonwebtoken";
import { TUSer, TUserCredentials } from "../user/user.interface";
import { UserModel } from "../user/user.model";
import { UserServices } from "../user/user.services";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import DuplicateUserError from "../../errorHandlers/DuplicateUserError";
import NoDataFoundError from "../../errorHandlers/NoDataFoundError";
import config from "../../config/config";
import httpStatus from "http-status";
import AuthenticationError from "../../errorHandlers/AuthenticationError";

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
  console.log(userCredential);
  const exitsUser = await UserServices.getSingleUserFromDB(
    userCredential.email as string
  );
  if (exitsUser) {
    console.log(exitsUser);
    const hashedPassword = exitsUser.password;
    const isValid = await bcrypt.compare(
      userCredential.password as string,
      hashedPassword
    );
    if (isValid) {
      const jwtToken = jwt.sign(
        { email: userCredential.email },
        config.jwt_secret_key,
        {
          expiresIn: "2h",
        }
      );
      const { password, createdAt, updatedAt, __v, ...loggedinUser } =
        exitsUser;
      return {
        data: loggedinUser,
        token: jwtToken,
      };
    } else {
      throw new AuthenticationError();
    }
  } else {
    throw new NoDataFoundError("User is not registered", httpStatus.NOT_FOUND);
  }
};

export const AuthServices = {
  signupValidUserAndStoreIntoDB,
  loginValidUserByCredentialsStoredInDB,
};
