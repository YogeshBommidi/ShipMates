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
import jwtCheck from "../Config/auth0Config.js";

const router = express.Router();

router.post("/registerTruck", registerTruck);
router.post("/bidForLoad/:loadId", jwtCheck, bidForLoad);
router.get("/getAllBids", getAllBids);
router.post("/cancelBid/:loadId",jwtCheck, cancelBid);
router.post("/toFav/:loadId", toFav);
router.get("/getAllFav", getAllFav);
router.get("/getAllBookings", getAllBookings);

export { router as TruckRoute };
