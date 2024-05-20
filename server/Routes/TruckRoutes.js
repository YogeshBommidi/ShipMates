import express from "express";
import {
  bidForLoad,
  cancelBid,
  getAllBids,
  getAllBookings,
  getAllFav,
  registerTruck,
  toFav,
} from "../Controllers/TruckController.js";

const router = express.Router();

router.post("/registerTruck", registerTruck);
router.post("/bidForLoad/:loadId", bidForLoad);
router.get("/getAllBids", getAllBids);
router.post("/cancelBid/:loadId", cancelBid);
router.post("/toFav/:loadId", toFav);
router.get("/getAllFav", getAllFav);
router.get("/getAllBookings", getAllBookings);

export { router as TruckRoute };
