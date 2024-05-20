import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";
import { json } from "express";

export const registerTruck = asyncHandler(async (req, res) => {
  const { driverName, truckEmail, license, truckCapacity } = req.body.data;
  try {
    const truckExists = await prisma.Truck.findUnique({
      where: { license: license },
    });
    if (!truckExists) {
      const truck = await prisma.Truck.create({
        data: {
          driverName,
          truckOwner: { connect: { email: truckEmail } },
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

export const bidForLoad = asyncHandler(async (req, res) => {
  const { loadId } = req.params;
  const { quotedPrice, truckPriceEmail } = req.body.data;

  try {
    const booked = await prisma.load.findUnique({
      where: { id: loadId },
      select: { isBooked: true },
    });
    if (booked.isBooked === true) {
      return res.send({ message: "already booked by other" });
    } else {
      const truck = await prisma.Truck.findFirst({
        where: { truckEmail: truckPriceEmail },
        select: { id: true },
      });

      if (!truck) {
        return res
          .status(404)
          .json({ message: "Truck not found for the given email." });
      }

      const { id: truckId } = truck;

      const existingBid = await prisma.TruckPrice.findUnique({
        where: { loadId_truckId: { loadId, truckId } },
      });

      if (existingBid) {
        return res.status(409).json({ message: "Bidding Already Done." });
      } else {
        const truckPrice = await prisma.TruckPrice.create({
          data: {
            load: { connect: { id: loadId } },
            truck: { connect: { id: truckId } },
            truckPriceOwner: { connect: { email: truckPriceEmail } },
            quotedPrice,
          },
        });
        return res.status(201).json({ message: "Bidding Done", truckPrice });
      }
    }
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ message: "An error occurred during the bidding process." });
  }
});

export const getAllBids = asyncHandler(async (req, res) => {
  const { truckPriceEmail } = req.body;
  try {
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail: truckPriceEmail },
      select: { id: true },
    });
    if (!truck) {
      return res
        .status(404)
        .json({ message: "Truck not found for the given email." });
    }
    const { id: truckId } = truck;
    const bidsExists = await prisma.TruckPrice.findMany({
      where: { truckId: truckId },
    });
    return res.send(bidsExists);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const cancelBid = asyncHandler(async (req, res) => {
  const { loadId } = req.params;
  const { truckPriceEmail } = req.body;
  try {
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail: truckPriceEmail },
      select: { id: true },
    });
    if (!truck) {
      res.status(404).json({
        message: "no truck found on this email",
      });
    }

    const { id: truckId } = truck;

    const existingBid = await prisma.TruckPrice.findUnique({
      where: { loadId_truckId: { loadId, truckId } },
    });

    if (!existingBid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    await prisma.TruckPrice.delete({
      where: { id: existingBid.id },
    });

    res.json({ message: "Bid cancelled" });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "An error occurred while cancelling the bid" });
  }
});

export const toFav = asyncHandler(async (req, res) => {
  const { truckEmail } = req.body;
  const { loadId } = req.params;

  try {
    const truck = await prisma.truck.findFirst({
      where: { truckEmail },
      select: { id: true, favLoads: true },
    });

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    const { id: truckId, favLoads } = truck;

    const isFav = favLoads.includes(loadId);

    const updatedFavLoads = isFav
      ? favLoads.filter((id) => id !== loadId)
      : [...favLoads, loadId];

    const updatedTruck = await prisma.truck.update({
      where: { id: truckId },
      data: { favLoads: updatedFavLoads },
    });

    const message = isFav ? "Removed from favourites" : "Added to favourites";

    res.send({ message, truck: updatedTruck });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "An error occurred while updating favourites" });
  }
});

export const getAllFav = asyncHandler(async (req, res) => {
  const { truckEmail } = req.body;
  try {
    const truck = await prisma.truck.findFirst({
      where: { truckEmail },
      select: { favLoads: true },
    });

    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }

    res.json({ favLoads: truck.favLoads });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving favourites" });
  }
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const { truckEmail } = req.body;
  try {
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail },
      select: { bookedLoads: true },
    });
    if (!truck) {
      return res.status(404).json({ message: "Truck not found" });
    }
    res.send({ bookedLoads: truck.bookedLoads });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "An error occured while retriving bookedLoads" });
  }
});
