import { z } from "zod";

const discountCreationValidationSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be string",
  }),
  bike_name: z.string({
    invalid_type_error: "Name must be string",
  }),
  bike_pricePerHour: z.number({
    invalid_type_error: "Price must be number",
  }),
  bike_discount: z.number({
    invalid_type_error: "Discount must be number",
  }),
  bikeId: z.string({
    invalid_type_error: "Id must be MongoDB Id",
  }),
});

const discountUpdateValidationSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be string",
    })
    .optional(),
  bike_name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .optional(),
  bike_pricePerHour: z
    .number({
      invalid_type_error: "Price must be number",
    })
    .optional(),
  bike_discount: z
    .number({
      invalid_type_error: "Discount must be number",
    })
    .optional(),
  bikeid: z
    .string({
      invalid_type_error: "Id must be MongoDB Id",
    })
    .optional(),
});

export const DiscountValidation = {
  discountCreationValidationSchema,
  discountUpdateValidationSchema,
};
