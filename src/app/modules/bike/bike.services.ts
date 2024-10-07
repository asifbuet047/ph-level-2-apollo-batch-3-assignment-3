import { ClientSession } from "mongoose";
import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";

const createSingleBikeIntoDB = async (bike: TBike) => {
  const result = await BikeModel.create(bike);
  const pojo = result.toJSON();
  // @ts-ignore
  const { __v, ...final } = pojo;
  return final;
};

const getAllBikeFromDB = async () => {
  const result = await BikeModel.find();
  const refinedResult = result.map((bike) => {
    const pojo = bike.toJSON();
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { __v, ...final } = pojo;
    return final;
  });
  return refinedResult;
};

const getSingleBikeFromDB = async (bikeId: string) => {
  const result = await BikeModel.findById(bikeId, { __v: false }).lean();
  return result;
};

const updateBikeIntoDB = async (
  bikeId: string,
  updatedBike: Partial<TBike>
) => {
  const result = await BikeModel.findByIdAndUpdate(bikeId, updatedBike, {
    new: true,
  }).lean();
  return result;
};

const deleteSingleBikeFromDB = async (bikeId: string) => {
  const result = await BikeModel.findByIdAndDelete(bikeId, {
    new: true,
  }).lean();
  return result;
};

export const BikeServices = {
  createSingleBikeIntoDB,
  getSingleBikeFromDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteSingleBikeFromDB,
};
