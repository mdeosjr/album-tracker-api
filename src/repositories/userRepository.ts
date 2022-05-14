import { prisma } from '../db.js'
import { UserData } from '../schemas/userDataSchema.js'

async function create(createUser: UserData) {
   await prisma.user.create({ data: createUser })
}

async function findByEmail(email: string) {
   return await prisma.user.findUnique({
      where: { email }
   })
}

export const userRepository = {
   create,
   findByEmail
}