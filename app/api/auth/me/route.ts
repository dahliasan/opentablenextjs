import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  // Extract auth token from request header
  const bearerToken = request.headers.get('Authorization')
  const token = bearerToken?.split(' ')[1]

  if (!bearerToken || !token) {
    return NextResponse.json(
      {
        message: 'Unauthorized request',
      },
      { status: 401 }
    )
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  try {
    const decodedToken = await jose.jwtVerify(token, secret)
    const payload = decodedToken.payload as { email: string }

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
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unauthorized request',
      },
      { status: 401 }
    )
  }
}
