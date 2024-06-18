import express, { Request, Response } from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/errorHandlers/globalErrorHandler";
import { UserRouter } from "./app/modules/user/user.route";
import { BikeRouter } from "./app/modules/bike/bike.routes";
import { BookingRouter } from "./app/modules/booking/booking.routes";
import { getPackageName } from "./app/utils/getPakageName";
import { AuthRoute } from "./app/modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", UserRouter.router);
app.use("/api/bikes", BikeRouter.router);
app.use("/api/rentals", BookingRouter.router);
app.use("/api/auth", AuthRoute.route);

app.get("/", (req: Request, res: Response) => {
  res.send(getPackageName());
});

app.use(globalErrorHandler);

export default app;
