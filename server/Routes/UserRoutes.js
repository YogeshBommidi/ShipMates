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
router.get("/getAllUserLoads/:email",  userLoads);
router.get("/getAllUserTrucks", jwtCheck, userTrucks);
router.post("/:loadId", jwtCheck, truckPrice);
router.post("/:loadId/:truckEmail", jwtCheck, selectTruck);

export { router as UserRoute };
