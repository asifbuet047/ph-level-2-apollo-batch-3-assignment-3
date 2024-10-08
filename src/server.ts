import app from "./app";
import mongoose from "mongoose";
import config from "./app/config/config";
import { Server } from "http";

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(
        `ph-level-2-apollo-batch-3-assignment-3-bike-rental-service app listening on port ${config.port} and succesfully connected to mongodb`
      );
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on("unhandledRejection", () => {
  console.log(
    `unahandledRejection is detected. Nodejs server is shutting down gracefully`
  );
  // if (server) {
  //   server.close(() => {
  //     process.exit(1);
  //   });
  // }
  // process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(
    `uncaughtException is detected. Nodejs server is shutting down gracefully`
  );
  // process.exit(1);
});
