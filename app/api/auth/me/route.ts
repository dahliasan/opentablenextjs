import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { objectKeysSnakeToCamelCase } from '@/app/utils/api'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const bearerToken = request.headers.get('Authorization') as string
  const token = bearerToken?.split(' ')[1]

  const payload = jwt.decode(token) as { email: string }

  if (!payload.email) {
    return NextResponse.json(
      {
        message: 'No email found',
      },
      { status: 401 }
    )
  }
  // Fetch user from DB
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      city: true,
      created_at: true,
      updated_at: true,
    },
  })

  // Disconnect from the database
  await prisma.$disconnect()

  const userCamelCase = objectKeysSnakeToCamelCase(user)

  // Return user
  return NextResponse.json(userCamelCase, { status: 200 })
}
