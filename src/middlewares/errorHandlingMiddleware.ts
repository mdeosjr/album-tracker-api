import { Request, Response, NextFunction } from 'express'
import {
   AppError,
   isAppError,
   errorTypeToStatusCode
} from '../utils/errorUtils.js'

export default function errorHandler(
   error: Error | AppError,
   req: Request,
   res: Response,
   next: NextFunction
) {
   if (isAppError(error)) {
      return res.status(errorTypeToStatusCode(error.type)).send(error.message)
   }

   return res.sendStatus(500)
}
