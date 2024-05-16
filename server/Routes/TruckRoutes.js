import express from 'express'
import { createTruck } from '../Controllers/TruckController.js'

const router = express.Router()

router.post("/registerTruck", createTruck)

export {router as TruckRoute}