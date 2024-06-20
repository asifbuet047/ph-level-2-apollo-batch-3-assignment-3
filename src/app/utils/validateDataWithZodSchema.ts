import { AnyZodObject } from "zod";

export const validateDataWithZodSchema = async (
  data: any,
  zodSchema: AnyZodObject
) => {
  return await zodSchema.safeParseAsync(data);
};
