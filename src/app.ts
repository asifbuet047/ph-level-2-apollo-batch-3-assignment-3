import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewires/globalErrorHandler";
import { UserRouter } from "./app/modules/user/user.route";
import { BikeRouter } from "./app/modules/bike/bike.routes";
import { BookingRouter } from "./app/modules/booking/booking.routes";
import { getPackageName } from "./app/utils/getPakageName";
import { AuthRouter } from "./app/modules/auth/auth.routes";
import notFoundRoute from "./app/middlewires/notFoundRoute";
import httpStatus from "http-status";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/bikes", BikeRouter.router);
app.use("/api/rentals", BookingRouter.router);
app.use("/api/auth", AuthRouter.router);
app.use("/api/users", UserRouter.router);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Bike rental Service is running",
  });
});

app.use(globalErrorHandler);
app.use(notFoundRoute);

export default app;
