import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/errorHandlers/globalErrorHandler";
import { UserRouter } from "./app/models/user/user.route";
import { BikeRouter } from "./app/models/bike/bike.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", UserRouter.router);
app.use("/api/bikes", BikeRouter.router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler);

export default app;
