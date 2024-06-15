import express from "express";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { BikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";

const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(BikeValidation.bikeCreationValidationSchema),
  BikeController.createSinglebike
);

router.get("/", BikeController.getAllBike);
router.get("/bikeId", BikeController.getSingleBike);
router.put(
  "/:id",
  validateRequestPayloadWithSchema(BikeValidation.bikeUpdateValidationSchema),
  BikeController.updateSingleBike
);
router.delete("/:id", BikeController.deleteSingleBike);

export const BikeRouter = {
  router,
};
