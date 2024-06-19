import express from "express";
import { UserController } from "./user.controller";
import { validateRequestPayloadWithSchema } from "../../middlewires/validateRequestPayloadWithSchema";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/me", UserController.getUserProfile);

export const UserRouter = {
  router,
};
