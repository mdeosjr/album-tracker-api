import { jest } from '@jest/globals'
import { createUserBody } from '../factories/userFactory.js'
import { userRepository } from '../../src/repositories/userRepository.js'
import { userServices } from '../../src/services/userServices.js'

describe('User services unit tests', () => {
   beforeEach(() => {
      jest.clearAllMocks()
      jest.resetAllMocks()
   })

   it('should not create a user with repeated email', () => {
      const user = createUserBody()
      jest
         .spyOn(userRepository, 'findByEmail')
         .mockResolvedValue({ id: 1, ...user })

      const newUser = async () => await userServices.create(user)

      const create = jest.spyOn(userRepository, 'create')
      expect(newUser()).rejects.toEqual({
         message: 'User already exists!',
         type: 'conflict'
      })
      expect(create).not.toBeCalled()
   })
})
