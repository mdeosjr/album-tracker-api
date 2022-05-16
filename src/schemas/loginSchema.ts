import { User } from '@prisma/client'
import joi from 'joi'

export type LoginData = Omit<User, 'id' | 'name'>
const loginSchema = joi.object<LoginData>({
   email: joi.string().required(),
   password: joi.string().required()
})

export default loginSchema
