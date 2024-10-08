import { TDiscount } from "./discount.interface";
import { DiscountModel } from "./discount.model";

const createDiscountIntoDB = async (discount: TDiscount) => {
  const result = (await DiscountModel.create(discount)).toJSON();
  return result;
};

const updateDiscountIntoDB = async (
  discountId: string,
  discount: Partial<TDiscount>
) => {
  const result = await DiscountModel.findByIdAndUpdate(discountId, discount, {
    new: true,
  }).lean();
  return result;
};

const getAllDiscountsFromDB = async () => {
  const result = await DiscountModel.find();
  const refinedResult = result.map((discount) => {
    const simple = discount.toJSON();
    return simple;
  });
  return refinedResult;
};

const deleteDiscountFromDB = async (discountId: string) => {
  const result = await DiscountModel.findByIdAndDelete(discountId, {
    new: true,
  });
  return result;
};

export const DiscountServices = {
  createDiscountIntoDB,
  updateDiscountIntoDB,
  getAllDiscountsFromDB,
  deleteDiscountFromDB,
};
