import express, { NextFunction, Request, Response } from "express";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { BikeValidation } from "./bike.validation";
import { BikeController } from "./bike.controller";
import checkTokenAndAllowIfAdmin from "../../middlewires/checkTokenAndAllowIfAdmin";
import { saveImageFileIntoLocalServersTempFolder } from "../../utils/saveImageFileIntoLocalServersTempFolder";

const router = express.Router();

router.post(
  "/",
  saveImageFileIntoLocalServersTempFolder.single("file"),
  (request: Request, response: Response, next: NextFunction) => {
    const temp = request.body;
    for (const key in temp) {
      if (key === "pricePerHour" || key === "cc" || key === "year") {
        temp[key] = Number.parseInt(temp[key]);
      }
    }
    next();
  },
  validateRequestPayloadWithSchema(BikeValidation.bikeCreationValidationSchema),
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
