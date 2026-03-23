import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const connectDB = async () => {
  try {
    await prisma.$connect()
    console.log('Database Connection Successful')
  } catch (error) {
    console.log('Database Connection Failed', error)
    process.exit(1)
  }
}

export { prisma, connectDB }