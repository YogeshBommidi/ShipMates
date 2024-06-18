import express from "express";
import {
  registerUser,
  selectTruck,
  truckPrice,
  userLoads,
  userTrucks,
} from "../Controllers/UserControllers.js";
import jwtCheck from "../Config/auth0Config.js";

const router = express.Router();

router.post("/registerUser", jwtCheck, registerUser);
router.get("/getAllUserLoads/:email", jwtCheck, userLoads);
router.get("/getAllUserTrucks", jwtCheck, userTrucks);
router.get("/:loadId", jwtCheck, truckPrice);
router.post("/:loadId/selectTruck", jwtCheck, selectTruck);

export { router as UserRoute };
