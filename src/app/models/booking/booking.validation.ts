import { z } from "zod";

const bookingCreationSchema = z.object({
  userId: z.string({ message: "userId is mujst when creating booking" }),
  bikeId: z.string({ message: "bikeId is mujst when creating booking" }),
  startTime: z.date({ message: "Date is required when creating booking" }),
  returnTime: z.date({ message: "Date is required when creating booking" }),
  totalCost: z.number({ message: "totast cost is required" }),
  isReturned: z.boolean({ message: "isReturn is boolean" }),
});

export const BookingValidation = {
  bookingCreationSchema,
};
