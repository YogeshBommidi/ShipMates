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
router.get("/getAllUserLoads", userLoads);
router.get("/getAllUserTrucks", userTrucks);
router.get("/:loadId", truckPrice);
router.post("/:loadId/selectTruck", selectTruck);

export { router as UserRoute };
