import { TBike } from "./bike.interface";
import { BikeModel } from "./bike.model";

const createSingleBikeIntoDB = async (bike: TBike) => {
  const result = await BikeModel.create(bike);
  const pojo = result.toJSON();
  const { __v, ...final } = pojo;
  return final;
};

const getAllBikeFromDB = async () => {
  const result = await BikeModel.find();
  const refinedResult = result.map((bike) => {
    const pojo = bike.toJSON();
    const { __v, ...final } = pojo;
    return final;
  });
  return refinedResult;
};

const getSingleBikeFromDB = async (bikeId: string) => {
  const result = await BikeModel.findById(bikeId, { __v: false });
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
