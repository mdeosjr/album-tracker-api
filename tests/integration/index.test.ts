import supertest from 'supertest'
import app from '../../src/index.js'
import startTest from '../utils/startTest.js'
import { prisma } from '../../src/db.js'
import { createUserBody, createUserDatabase } from '../factories/userFactory.js'

const agent = supertest(app)

describe('POST /users/create', () => {
   startTest()

   it('should return 201 and persist user in database given a valid body', async () => {
      const body = createUserBody()

      const res = await agent.post('/users/create').send(body)
      const user = await prisma.user.findUnique({
         where: {
            email: body.email
         }
      })

      expect(res.status).toEqual(201)
      expect(user).not.toBeNull()
   })
})

describe('POST /users/login', () => {
   startTest()

   it('should return 200 and a token given a valid body', async () => {
      const body = createUserBody()
      await createUserDatabase(body)

      const res = await agent.post('/users/login').send(body)

      expect(res.status).toEqual(200)
      expect(typeof res.text).toEqual('string')
   })
})
