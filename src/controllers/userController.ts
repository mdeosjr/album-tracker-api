import { Request, Response } from 'express'
import { UserData } from '../schemas/userDataSchema.js'
import { userServices } from '../services/userServices.js'

export async function createUser(req: Request, res: Response) {
   const user: UserData = req.body

   await userServices.create(user)
   res.sendStatus(201)
}
