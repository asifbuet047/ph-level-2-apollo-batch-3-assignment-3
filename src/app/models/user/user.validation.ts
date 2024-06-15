import { z } from "zod";

const userCreationValidation = z.object({
  name: z.string({ message: "" }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password length must be bat least 5" })
    .max(20, { message: "Password length must be between 5 to 20" }),
  phone: z.string().startsWith("0"),
  address: z.string({ message: "Address must be inserted" }),
  role: z.enum(["user", "admin"], { message: "Only a user or admin" }),
});

const userUpdateValidation = z.object({
  name: z.string({ message: "" }).optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(5, { message: "Password length must be bat least 5" })
    .max(20, { message: "Password length must be between 5 to 20" })
    .optional(),
  phone: z
    .string()
    .startsWith("0")
    .regex(
      RegExp("^d+$"),
      "Phone number start with 0 and only contains numeric number"
    )
    .optional(),
  address: z.string({ message: "Address must be inserted" }).optional(),
  role: z
    .enum(["user", "admin"], { message: "Only a user or admin" })
    .optional(),
});

export const UserValidation = {
  userCreationValidation,
  userUpdateValidation,
};
