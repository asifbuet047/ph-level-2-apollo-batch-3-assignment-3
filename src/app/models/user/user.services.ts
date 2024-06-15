import { TUSer } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUSer) => {
  const result = await UserModel.create(user);
  console.log(result);
  return result;
};

export const UserServices = {
  createUserIntoDB,
};
