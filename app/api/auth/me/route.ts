import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

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

  // Return user
  return NextResponse.json(user, { status: 200 })
}
