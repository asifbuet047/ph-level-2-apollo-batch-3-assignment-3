/* eslint-disable no-undef */
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASS,
  default_salt: process.env.DEFAULT_ENCRIPTION_SALT,
};
