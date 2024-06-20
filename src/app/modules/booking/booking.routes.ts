import express from "express";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(
    BookingValidation.rentalRequestValidationSchema
  ),
  BookingController.createBooking
);

router.get("/", BookingController.getAllBooking);

export const BookingRouter = {
  router,
};
