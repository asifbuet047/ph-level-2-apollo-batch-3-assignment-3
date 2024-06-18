import { z } from "zod";

const userCreationValidationSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(4, { message: "Name length cant be less than 4" })
    .max(20, { message: "Name length be more than 20" }),
  email: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Must be string",
    })
    .email({ message: "Mail must be validate" }),
  password: z
    .string({ message: "Password must be included" })
    .min(5, { message: "Password length must be bat least 5" })
    .max(20, { message: "Password length must be between 5 to 20" }),
  phone: z.string().startsWith("0"),
  address: z.string({ message: "Address must be inserted" }),
  role: z.enum(["user", "admin"], { message: "Only user or admin" }),
});

const userUpdateValidationSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(4, { message: "Name length cant be less than 4" })
    .max(20, { message: "Name length be more than 20" })
    .optional(),
  email: z
    .string({ message: "Mail address must be needed" })
    .email({ message: "Mail must be validate" })
    .optional(),
  password: z
    .string({ message: "Password must be included" })
    .min(5, { message: "Password length must be bat least 5" })
    .max(20, { message: "Password length must be between 5 to 20" })
    .optional(),
  phone: z.string().startsWith("0").optional(),
  address: z.string({ message: "Address must be inserted" }).optional(),
  role: z.enum(["user", "admin"], { message: "Only user or admin" }).optional(),
});

const userLoginValidationSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be string",
      required_error: "Must be string",
    })
    .email({ message: "Mail must be validated" }),
  password: z
    .string({
      invalid_type_error: "Password must be string",
      required_error: "Password be string",
    })
    .min(5, { message: "Password length must be at least 5" })
    .max(20, { message: "Password length maximum   20" }),
});

export const UserValidation = {
  userCreationValidationSchema,
  userUpdateValidationSchema,
  userLoginValidationSchema,
};
