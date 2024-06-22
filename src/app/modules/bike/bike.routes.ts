import express from "express";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { BikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";
import checkTokenAndAllowIfAdmin from "../../middlewires/checkTokenAndAllowIfAdmin";

const router = express.Router();

router.post(
  "/",
  validateRequestPayloadWithSchema(BikeValidation.bikeCreationValidationSchema),
  checkTokenAndAllowIfAdmin,
  BikeController.createSinglebike
);

router.get("/", BikeController.getAllBikes);

router.get("/:id", BikeController.getSingleBike);

router.put(
  "/:id",
  validateRequestPayloadWithSchema(BikeValidation.bikeUpdateValidationSchema),
  checkTokenAndAllowIfAdmin,
  BikeController.updateSingleBike
);
router.delete(
  "/:id",
  checkTokenAndAllowIfAdmin,
  BikeController.deleteSingleBike
);

export const BikeRouter = {
  router,
};
