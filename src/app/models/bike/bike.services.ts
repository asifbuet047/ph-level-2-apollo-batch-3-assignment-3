import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";

const createSingleBikeIntoDB = async (bike: TBike) => {
  const result = await BikeModel.create(bike);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await BikeModel.find();
  return result;
};

const getSingleBikeFromDB = async (bikeId: string) => {
  const result = await BikeModel.findById(bikeId);
  return result;
};

const updateBikeIntoDB = async (
  bikeId: string,
  updatedBike: Partial<TBike>
) => {
  const result = await BikeModel.findByIdAndUpdate(bikeId, updatedBike, {
    new: true,
  });
  return result;
};

const deleteSingleBikeFromDB = async (bikeId: string) => {
  const result = await BikeModel.findByIdAndDelete(bikeId);
  return result;
};

export const BikeServices = {
  createSingleBikeIntoDB,
  getSingleBikeFromDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteSingleBikeFromDB,
};
