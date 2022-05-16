import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { findById } from '../repositories/userRepository.js'

export async function validateToken(
   req: Request,
   res: Response,
   next: NextFunction
) {
   const authorization = req.headers.authorization
   const token = authorization?.replace('Bearer ', '')
   const secretKey = process.env.JWT_SECRET
   if (!token) throw { type: 'not_found', message: 'Token not found' }

   const data = jwt.verify(token, secretKey) as { userId: number }
   if (!data) throw { type: 'unauthorized', message: 'Invalid token' }

   const user = await findById(data.userId)
   if (!user) throw { type: 'unauthorized', message: 'User not found' }

   res.locals.user = user
   next()
}
