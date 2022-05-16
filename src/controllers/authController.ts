import { Request, Response } from 'express'
import { LoginData } from '../schemas/loginSchema.js'
import { authServices } from '../services/authServices.js'

export async function login(req: Request, res: Response) {
   const loginData: LoginData = req.body

   const data = await authServices.login(loginData)
   res.status(200).send(data)
}
