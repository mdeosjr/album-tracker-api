import { User } from '@prisma/client'
import joi from 'joi'

export type UserData = Omit<User, 'id'>
const userDataSchema = joi.object<UserData>({
   name: joi.string().required(),
   email: joi.string().required(),
   password: joi.string().required()
})

export default userDataSchema
