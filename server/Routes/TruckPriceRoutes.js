import express from "express";
import { bidding } from "../Controllers/TruckPriceController.js";

const router = express.Router();

router.post("/bidding", bidding);

export { router as TruckPriceRoute };
