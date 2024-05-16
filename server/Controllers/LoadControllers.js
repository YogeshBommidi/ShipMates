import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const createLoad = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    fromAddress,
    toAddress,
    image,
    userEmail,
  } = req.body.data;
  try {
    const load = await prisma.Loads.create({
      data: {
        title,
        description,
        price,
        fromAddress,
        toAddress,
        image,
        owner: { connect: { email: userEmail } },
      },
    });
    res.send({message : "Load Created Successfully", load})
  } catch (err) {
    throw new Error(err.message);
  }
});
