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

router.post("/registerTruck", jwtCheck, registerTruck);
router.post("/bidForLoad/:loadId", jwtCheck, bidForLoad);
router.post("/getAllBids", jwtCheck, getAllBids);
router.post("/cancelBid/:loadId", jwtCheck, cancelBid);
router.post("/toFav/:loadId", jwtCheck, toFav);
router.post("/getAllFav",jwtCheck, getAllFav);
router.post("/getAllBookings", jwtCheck, getAllBookings);

export { router as TruckRoute };
