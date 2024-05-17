import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const bidding = asyncHandler(async (req, res) => {
  const { loadId, truckId, quotedPrice, truckPriceEmail } = req.body.data;
  try {
    const biddingExists = await prisma.TruckPrice.findUnique({
      where: { loadId_truckId: { loadId: loadId, truckId: truckId } },
    });
    if (!biddingExists) {
      const truckPrice = await prisma.TruckPrice.create({
        data: {
          loadId,
          truckId,
          truckPriceEmail,
          quotedPrice,
        },
      });
      res.send({ message: "Bidding Done", truckPrice });
    } else {
      res.status(201).send({ message: "Bidding Already Done." });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});
