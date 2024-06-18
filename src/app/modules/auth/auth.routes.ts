import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { UserValidation } from "../user/user.validation";

const router = express.Router();

router.post(
  "/signup",
  validateRequestPayloadWithSchema(UserValidation.userCreationValidationSchema),
  AuthController.signpValidUser
);

router.post(
  "/login",
  validateRequestPayloadWithSchema(UserValidation.userLoginValidationSchema)
);

export const AuthRouter = {
  router,
};
