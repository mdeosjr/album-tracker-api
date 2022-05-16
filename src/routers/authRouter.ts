import { Router } from 'express'
import { validateSchema } from '../middlewares/validateSchema.js'
import loginSchema from '../schemas/loginSchema.js'
import * as authController from '../controllers/authController.js'
import { validateToken } from '../middlewares/validateToken.js'

const authRouter = Router()

authRouter.post('/users/login', validateSchema(loginSchema), authController.login)
authRouter.post('/validate-token', validateToken, (req, res) => res.sendStatus(200))

export default authRouter
