import { TUSer } from "./user.interface";
import { UserModel } from "./user.model";

const createUserIntoDB = async (user: TUSer) => {
  const result = (await UserModel.create(user)).toJSON({ flattenMaps: true });
  const { password, ...newUser } = result; //convert mongoose Documnet<> object to plain POJO to easily destructe the object and exclude password field
  return newUser;
  // const { _id, name, email, phone, address, role, createdAt, updatedAt } =
  //   result;
  // return {
  //   _id,
  //   name,
  //   email,
  //   phone,
  //   address,
  //   role,
  //   createdAt,
  //   updatedAt,
  // }; before comverting POJO
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
