import asyncHandler from "express-async-handler";
import { prisma } from "../Config/prismaConfig.js";

export const registerUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");
  const { email } = req.body;

  const userExists = await prisma.User.findUnique({ where: { email: email } });
  if (!userExists) {
    const user = await prisma.User.create({ data: req.body });
    res.send({
      message: "User Registered Successfully",
    });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});
/**
export const userLoads = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const loads = await prisma.Load.findMany({
      where: { userEmail: email },
      select: { id: true },
    });

    if (loads.length === 0) {
      return res.status(404).json({
        message: "No Loads Found for this email",
      });
    }

    const loadIds = loads.map(load => load.id);

    // Fetch the detailed data for each load
    const userload = await prisma.Load.findMany({
      where: { id: { in: loadIds } },
    });

    res.json(userload);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});*/
export const userLoads = asyncHandler(async (req, res) => {
  const { email } = req.params; // Retrieve the email from the request parameters
  try {
    const loads = await prisma.Load.findMany({
      where: { userEmail: email },
    });

    if (loads.length === 0) {
      return res.status(404).json({
        message: "No Loads Found for this email",
      });
    }

    res.json(loads);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export const userTrucks = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail: email },
      select: { id: true },
    });

    if (!truck) {
      res.status(404).json({
        message: "No Truck Found for this email",
      });
    }

    const { id: truckId } = truck;

    const userload = await prisma.Truck.findUnique({
      where: { id: truckId },
    });
    res.send(userload);
  } catch (err) {
    throw new Error(err.message);
  }
});

export const truckPrice = asyncHandler(async (req, res) => {
  try {
    const { loadId } = req.params; // Destructure loadId from request params
    const { userEmail } = req.body; // Destructure userEmail from request body

    // Fetch the load and its owner from the database
    const load = await prisma.Load.findUnique({
      where: { id: loadId },
      select: { loadOwner: { select: { email: true } } },
    });

    // Check if the load exists and if the user is authorized
    if (!load) {
      return res.status(404).json({ error: "Load not found." });
    }

    if (load.loadOwner.email !== userEmail) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view these truck prices." });
    }

    const loadbyid = await prisma.Load.findUnique({
      where: { id: loadId },
    });

    // Fetch the truck prices for the load
    const truckPrices = await prisma.TruckPrice.findMany({
      where: { loadId },
    });

    // Return the truck prices as JSON
    //res.send(loadbyid);
    res.json({ loadbyid, truckPrices });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

/**export const selectTruck = asyncHandler(async (req, res) => {
  try {
    const { loadId, truckEmail } = req.params;
    const { userEmail } = req.body;

    // Fetch the load and its owner
    const load = await prisma.Load.findUnique({
      where: { id: loadId },
      select: {
        loadOwner: { select: { email: true } },
        isBooked: true,
      },
    });

    // Check if the load exists and if the user is authorized to view the truck prices
    if (!load || load.loadOwner.email !== userEmail) {
      return res
        .status(403)
        .json({ error: "You are not authorized to view these truck prices." });
    }

    // If the load is already booked, return the load along with the assigned truck details
    if (load.isBooked) {
      const truckDetails = await prisma.Load.findUnique({
        where: { id: loadId },
        select: {
          truck: {
            select: {
              id: true,
              driverName: true,
              truckEmail: true,
              license: true,
              truckCapacity: true,
            },
          },
        },
      });
      return res
        .status(200)
        .json({ message: "this load is already been booked ", truckDetails });
    }

    // Find truck id
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail },
      select: { id: true, bookedLoads: true },
    });

    if (!truck) {
      return res.status(404).json({ error: "Truck not found." });
    }

    // Update load model
    const updatedLoad = await prisma.Load.update({
      where: { id: loadId },
      data: { isBooked: true, truckId: truck.id },
    });

    // Load details
    const loadDetails = await prisma.Load.findUnique({
      where: { id: loadId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        fromAddress: true,
        toAddress: true,
        image: true,
        userEmail: true,
      },
    });

    if (!loadDetails) {
      return res.status(404).json({ error: "Load details not found." });
    }

    // Append new load details to the bookedLoads array
    const updatedTruck = await prisma.Truck.update({
      where: { id: truck.id },
      data: {
        bookedLoads: {
          push: {
            id: loadDetails.id,
            title: loadDetails.title,
            description: loadDetails.description,
            price: loadDetails.price,
            fromAddress: loadDetails.fromAddress,
            toAddress: loadDetails.toAddress,
            image: loadDetails.image,
            userEmail: loadDetails.userEmail,
          },
        },
      },
    });

    // Respond with updated load and truck details
    res.status(200).json({ load: updatedLoad, truck: updatedTruck });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
*/

export const selectTruck = asyncHandler(async (req, res) => {
  try {
    const { loadId, truckEmail } = req.params;
    const { userEmail } = req.body;

    console.log(`Received request with loadId: ${loadId}, truckEmail: ${truckEmail}, userEmail: ${userEmail}`);

    // Fetch the load and its owner
    const load = await prisma.Load.findUnique({
      where: { id: loadId },
      select: {
        loadOwner: { select: { email: true } },
        isBooked: true,
      },
    });

    console.log(`Fetched load: ${JSON.stringify(load)}`);

    // Check if the load exists and if the user is authorized to view the truck prices
    if (!load || load.loadOwner.email !== userEmail) {
      return res.status(403).json({ error: "You are not authorized to view these truck prices." });
    }

    // If the load is already booked, return the load along with the assigned truck details
    if (load.isBooked) {
      const truckDetails = await prisma.Load.findUnique({
        where: { id: loadId },
        select: {
          truck: {
            select: {
              id: true,
              driverName: true,
              truckEmail: true,
              license: true,
              truckCapacity: true,
            },
          },
        },
      });
      console.log(`Load is already booked. Truck details: ${JSON.stringify(truckDetails)}`);
      return res.status(200).json({ message: "This load has already been booked.", truckDetails });
    }

    // Find truck by email
    const truck = await prisma.Truck.findFirst({
      where: { truckEmail },
      select: { id: true, bookedLoads: true },
    });

    console.log(`Fetched truck: ${JSON.stringify(truck)}`);

    if (!truck) {
      return res.status(404).json({ error: "Truck not found." });
    }

    // Update load model
    const updatedLoad = await prisma.Load.update({
      where: { id: loadId },
      data: { isBooked: true, truckId: truck.id },
    });

    console.log(`Updated load: ${JSON.stringify(updatedLoad)}`);

    // Load details
    const loadDetails = await prisma.Load.findUnique({
      where: { id: loadId },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        fromAddress: true,
        toAddress: true,
        image: true,
        userEmail: true,
      },
    });

    console.log(`Fetched load details: ${JSON.stringify(loadDetails)}`);

    if (!loadDetails) {
      return res.status(404).json({ error: "Load details not found." });
    }

    // Append new load details to the bookedLoads array
    const updatedTruck = await prisma.Truck.update({
      where: { id: truck.id },
      data: {
        bookedLoads: {
          push: {
            id: loadDetails.id,
            title: loadDetails.title,
            description: loadDetails.description,
            price: loadDetails.price,
            fromAddress: loadDetails.fromAddress,
            toAddress: loadDetails.toAddress,
            image: loadDetails.image,
            userEmail: loadDetails.userEmail,
          },
        },
      },
    });

    console.log(`Updated truck: ${JSON.stringify(updatedTruck)}`);

    // Respond with updated load and truck details
    res.status(200).json({ load: updatedLoad, truck: updatedTruck });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});
