import { TUSer } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUSer) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (mail: string) => {
  const result = await UserModel.findOne({ email: mail });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
