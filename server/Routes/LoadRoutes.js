import express from 'express'
import { allLoads, createLoad, loadById } from '../Controllers/LoadControllers.js'

const router = express.Router()

router.post("/createLoad", createLoad)
router.get("/getAllLoads", allLoads)
router.get("/:id", loadById)

export {router as LoadRoute}