import asyncHandler from "express-async-handler";

import { prisma } from "../Config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  let { email } = req.body;

  const userExists = await prisma.User.findUnique({where : {email : email}})
  if(!userExists){
    const user = await prisma.User.create({data : req.body})
    res.send({
        message : "User Registered Successfully"
    })
  }
  else{
        res.status(201).send({message : "User already registered"})
  }
});
