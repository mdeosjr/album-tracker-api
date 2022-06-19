import bcrypt from 'bcrypt'
import { UserData } from '../schemas/userDataSchema.js'
import { userRepository } from '../repositories/userRepository.js'
import { spotifyUser } from './authServices.js'

async function create(createUser: UserData) {
   const { email, password, name } = createUser

   const existentUser = await userRepository.findByEmail(email)
   if (existentUser) throw { type: 'conflict', message: 'User already exists!' }

   const hashPassword = bcrypt.hashSync(password, 8)
   await userRepository.create({
      name,
      email,
      password: hashPassword
   })
}

async function createSpotifyUser(user: spotifyUser) {
   return await userRepository.create(user)
}

export const userServices = {
   create,
   createSpotifyUser
}
