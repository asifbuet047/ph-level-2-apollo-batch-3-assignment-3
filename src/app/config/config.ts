/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT as string,
  database_url: process.env.DATABASE_URL as string,
  default_password: process.env.DEFAULT_PASS as string,
  default_salt_round: process.env.DEFAULT_SALT_ROUNDS as string,
  jwt_secret_key: process.env.JWT_SECRECT_KEY as string,
};
