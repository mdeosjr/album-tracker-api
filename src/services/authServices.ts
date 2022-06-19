import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { userRepository } from '../repositories/userRepository.js'
import { LoginData } from '../schemas/loginSchema.js'
import spotifyWebApi from 'spotify-web-api-node'
import { userServices } from './userServices.js'
import { User } from '@prisma/client'

export type spotifyUser = {
   name: string
   email: string
   provider: string
}

function createToken(user: User) {
   const data = { userId: user.id }
   const secretKey = process.env.JWT_SECRET
   const config = { expiresIn: 60 * 60 }

   const token = jwt.sign(data, secretKey, config)
   return token
}

async function handleSpotifyAuth(spotifyUser: spotifyUser) {
   const user = await userRepository.findByEmail(spotifyUser.email)

   if (!user) {
      const user = await userServices.createSpotifyUser(spotifyUser)
      return createToken(user)
   }

   return createToken(user)
}

async function login(userLogin: Partial<LoginData>) {
   const { email, password } = userLogin

   const user = await userRepository.findByEmail(email)
   if (!user) throw { type: 'unauthorized', message: 'User not found!' }

   if (bcrypt.compareSync(password, user.password)) return createToken(user)

   throw { type: 'unauthorized', message: 'User or password incorrect!' }
}

async function loginSpotifyUser(code: string) {
   let spotifyUser = {
      name: '',
      email: '',
      provider: ''
   }

   const spotifyApi = new spotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET
   })

   await spotifyApi.authorizationCodeGrant(code).then(data => {
      spotifyApi.setAccessToken(data.body['access_token'])
      spotifyApi.setRefreshToken(data.body['refresh_token'])
   })

   await spotifyApi.getMe().then(
      data =>
         (spotifyUser = {
            name: data.body.display_name,
            email: data.body.email,
            provider: 'spotify'
         })
   )

   const token = await handleSpotifyAuth(spotifyUser)
   return token
}

export const authServices = {
   login,
   loginSpotifyUser
}
