import express from "express";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { BookingValidation } from "./booking.validation";
import { BookingController } from "./booking.controller";
import checkTokenAndAllowIfAdmin from "../../middlewires/checkTokenAndAllowIfAdmin";

const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(
    BookingValidation.rentalRequestValidationSchema
  ),
  BookingController.createBooking
);

router.get("/", BookingController.getAllBookingsOfSingleUser);

router.put(
  "/:id/return",
  checkTokenAndAllowIfAdmin,
  BookingController.updateSingleBooking
);

export const BookingRouter = {
  router,
};
