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

export async function findById(userId: number) {
   return await prisma.user.findFirst({
      where: { id: userId }
   })
}

export const userRepository = {
   create,
   findByEmail,
   findById
}