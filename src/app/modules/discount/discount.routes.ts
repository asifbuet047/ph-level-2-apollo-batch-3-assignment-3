import express from "express";
import { DiscountController } from "./discount.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { DiscountValidation } from "./discount.validation";
const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(
    DiscountValidation.discountCreationValidationSchema
  ),
  DiscountController.createDiscount
);

router.put(
  "/:id",
  validateRequestPayloadWithSchema(
    DiscountValidation.discountUpdateValidationSchema
  ),
  DiscountController.updateDiscount
);

router.get("/", DiscountController.getAllDiscount);

router.delete("/:id", DiscountController.deleteDiscount);

export const DiscountRouter = {
  router,
};
