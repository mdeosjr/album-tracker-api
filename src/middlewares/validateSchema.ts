import { NextFunction, Request, Response } from 'express'
import { ObjectSchema } from 'joi'

export function validateSchema(schema: ObjectSchema) {
   return (req: Request, res: Response, next: NextFunction) => {
      const validation = schema.validate(req.body)
      if (validation.error) {
         throw {
            type: 'unprocessable_entity',
            message: 'All fields must be filled!'
         }
      }

      next()
   }
}
