import express from 'express'
import { createUser } from '../Controllers/UserControllers.js'

const router = express.Router()

router.post("/registerUser", createUser)

export {router as userRoute}