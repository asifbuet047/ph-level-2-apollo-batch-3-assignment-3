import express from "express";
import { UserController } from "./user.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/me", UserController.getLoggedInUserProfile);
router.put("/me", UserController.updateLoggedInUserProfile);

export const UserRouter = {
  router,
};
