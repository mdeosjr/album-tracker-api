import { Request, Response } from 'express'
import { LoginData } from '../schemas/loginSchema.js'
import { authServices } from '../services/authServices.js'

export async function login(req: Request, res: Response) {
   const loginData: LoginData = req.body

   const data = await authServices.login(loginData)
   res.status(200).send(data)
}

export async function spotifyLogin(req: Request, res: Response) {
   const { code } = req.body

   const data = await authServices.loginSpotifyUser(code)
   res.send(data).status(200)
}

