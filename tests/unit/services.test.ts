import { jest } from '@jest/globals'
import { createLoginBody, createUserBody } from '../factories/userFactory.js'
import { userRepository } from '../../src/repositories/userRepository.js'
import { userServices } from '../../src/services/userServices.js'
import { authServices } from '../../src/services/authServices.js'
import bcrypt from 'bcrypt'

describe('User services unit tests', () => {
   beforeEach(() => {
      jest.clearAllMocks()
      jest.resetAllMocks()
   })

   it('should not create a user with repeated email', () => {
      const user = createUserBody()
      jest
         .spyOn(userRepository, 'findByEmail')
         .mockResolvedValue({ id: 1, provider: null, ...user })

      const newUser = async () => await userServices.create(user)

      const create = jest.spyOn(userRepository, 'create')
      expect(newUser()).rejects.toEqual({
         message: 'User already exists!',
         type: 'conflict'
      })
      expect(create).not.toBeCalled()
   })
})

describe('Auth services unit tests', () => {
   beforeEach(() => {
      jest.clearAllMocks()
      jest.resetAllMocks()
   })

   it('should not log in given invalid credentials', async () => {
      const body = createLoginBody()
      const user = createUserBody()
      jest
         .spyOn(userRepository, 'findByEmail')
         .mockResolvedValue({ id: 1, provider: null, ...user })
      jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false)

      const login = async () => await authServices.login(body)

      expect(login()).rejects.toEqual({
         message: 'User or password incorrect!',
         type: 'unauthorized'
      })
   })
})
