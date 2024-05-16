import express from 'express'
import { createLoad } from '../Controllers/LoadControllers.js'

const router = express.Router()

router.post("/createLoad", createLoad)

export {router as LoadRoute}