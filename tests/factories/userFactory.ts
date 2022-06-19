import { faker } from '@faker-js/faker'
import { UserData } from '../../src/schemas/userDataSchema.js'
import { prisma } from '../../src/db.js'
import bcrypt from 'bcrypt'
import { LoginData } from '../../src/schemas/loginSchema.js'

export function createUserBody(): UserData {
   return {
      name: faker.lorem.words(2),
      email: faker.internet.email(),
      password: faker.internet.password(),
   }
}

export async function createUserDatabase(user: UserData) {
   await prisma.user.create({
      data: {
         ...user,
         password: bcrypt.hashSync(user.password, 8)
      }
   })
}

export function createLoginBody(): Omit<LoginData, 'provider'> {
   return {
      email: faker.internet.email(),
      password: faker.internet.password()
   }
}