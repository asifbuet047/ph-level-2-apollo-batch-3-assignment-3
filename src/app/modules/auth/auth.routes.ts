import express from "express";
import { AuthController } from "./auth.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { UserValidation } from "../user/user.validation";

const route = express.Router();

route.post(
  "/signup",
  validateRequestPayloadWithSchema(UserValidation.userCreationValidationSchema),
  AuthController.signpValidUser
);

export const AuthRoute = {
  route,
};
