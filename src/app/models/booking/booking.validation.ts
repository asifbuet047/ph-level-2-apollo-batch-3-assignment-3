import { z } from "zod";

const timeDateStringValidationSchema = z.string().refine(
  (time) => {
    const regexExpressionISODateFormat =
      /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z)$/; // 2024-06-15T10:00:00.000Z
    return regexExpressionISODateFormat.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  }
);

const bookingCreationSchema = z.object({
  userId: z.string({ message: "userId is mujst when creating booking" }),
  bikeId: z.string({ message: "bikeId is mujst when creating booking" }),
  startTime: timeDateStringValidationSchema,
  returnTime: timeDateStringValidationSchema,
  totalCost: z.number({ message: "totast cost is required" }),
  isReturned: z.boolean({ message: "isReturn is boolean" }).optional(),
});

export const BookingValidation = {
  bookingCreationSchema,
};
