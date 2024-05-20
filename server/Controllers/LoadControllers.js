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
    const load = await prisma.Load.create({
      data: {
        title,
        description,
        price,
        fromAddress,
        toAddress,
        image,
        loadOwner: { connect: { email: userEmail } },
      },
    });
    res.send({ message: "Load Created Successfully", load });
  } catch (err) {
    throw new Error(err.message);
  }
});

export const allLoads = asyncHandler(async (req, res) => {
  try {
    const loads = await prisma.Load.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(loads);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const loadById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const loadbyid = await prisma.Load.findUnique({
      where: { id: id },
    });
    res.send(loadbyid);
  } catch (err) {
    throw new Error(err.message);
  }
});
