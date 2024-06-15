import express from "express";
import { UserController } from "./user.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequestPayloadWithSchema(UserValidation.userCreationValidationSchema),
  UserController.createUser
);

export const UserRouter = {
  router,
};
