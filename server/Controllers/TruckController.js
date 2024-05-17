import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const createTruck = asyncHandler(async (req, res) => {
  const { driverName, truckEmail, license, truckCapacity } = req.body.data;
  try {
    const truckExists = await prisma.Trucks.findUnique({
      where: { license: license },
    });
    if (!truckExists) {
      const truck = await prisma.Trucks.create({
        data: {
          driverName,
          owner: { connect: { email: truckEmail } },
          license,
          truckCapacity,
        },
      });
      res.send({ message: "Truck Created Successfully" });
    } else {
      res.status(201).send({ message: "Truck already exists" });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
