import { z } from "zod";

export const bikeCreationValidationSchema = z.object({
  name: z.string({ message: "Name of bike is must" }),
  description: z.string({ message: "Description of bike is must" }),
  pricePerHour: z
    .number({ message: "Price per hour of bike is must" })
    .min(0, { message: "Price per hour must be greater than 0" }),
  cc: z.number({ message: "CC of bike is must" }),
  year: z.number({ message: "Manufacturing year of bike is must" }),
  model: z.string({ message: "Model of bike is must" }),
  brand: z.string({ message: "Brand of bike is must" }),
});

export const bikeUpdateValidationSchema = z.object({
  name: z.string({ message: "Name of bike is must" }).optional(),
  description: z.string({ message: "Description of bike is must" }).optional(),
  pricePerHour: z
    .number({ message: "Price per hour of bike is must" })
    .min(0, { message: "Price per hour must be greater than 0" }),
  cc: z.number({ message: "CC of bike is must" }),
  year: z.number({ message: "Manufacturing year of bike is must" }),
  model: z.string({ message: "Model of bike is must" }),
  brand: z.string({ message: "Brand of bike is must" }),
});

export const BikeValidation = {
  bikeCreationValidationSchema,
  bikeUpdateValidationSchema,
};
