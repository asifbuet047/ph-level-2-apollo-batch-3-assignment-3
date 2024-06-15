import app from "./app";
import mongoose from "mongoose";
import config from "./app/config/config";

async function main() {
  try {

    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(
        `PH-bike-rental-service app listening on port ${config.port} and succesfully connected to mongodb`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();
