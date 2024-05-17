import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { UserRoute } from "./Routes/UserRoutes.js";
import { LoadRoute } from "./Routes/LoadRoutes.js";
import { TruckRoute } from "./Routes/TruckRoutes.js";
import { TruckPriceRoute } from "./Routes/TruckPriceRoutes.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});

app.use("/api/user", UserRoute);
app.use("/api/load", LoadRoute);
app.use("/api/truck", TruckRoute);
app.use("/api/truckprice", TruckPriceRoute);
