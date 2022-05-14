import { prisma } from '../../src/db.js'

export default async function startTest() {
   beforeEach(async () => await prisma.$executeRaw`TRUNCATE TABLE users`)

   afterAll(async () => await prisma.$disconnect())
}
