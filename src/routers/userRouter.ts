import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import userDataSchema from '../schemas/userDataSchema.js'
import * as userController from '../controllers/userController.js'

const userRouter = Router()

userRouter.post('/users/create', validateSchema(userDataSchema), userController.createUser)

export default userRouter
