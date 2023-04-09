import { NextRequest, NextResponse } from 'next/server'
import validator from 'validator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const errors: string[] = []
  const data = await request.json()
  const validatorSchema = [
    {
      valid: validator.isEmail(data.email),
      errorMessage: 'Email is not valid',
    },
    {
      valid: validator.isLength(data.password, { min: 1 }),
      errorMessage: 'Password must be at least 1 character',
    },
  ]

  validatorSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage)
    }
  })

  if (errors.length > 0) {
    return NextResponse.json(
      {
        message: errors,
      },
      { status: 400 }
    )
  }

  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (!user) {
    return NextResponse.json(
      {
        message: 'User with this email does not exist',
      },
      { status: 401 }
    )
  }

  const passwordMatch = await bcrypt.compare(data.password, user.password)

  if (!passwordMatch) {
    return NextResponse.json(
      {
        message: 'Password is incorrect',
      },
      { status: 401 }
    )
  }

  const algo = 'HS256'
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime('1h')
    .sign(secret)

  const { password, ...userWithoutPassword } = user

  // Set json response first
  const response = NextResponse.json(
    {
      ...userWithoutPassword,
    },
    { status: 200 }
  )

  // Then set a cookie
  response.cookies.set({
    name: 'jwt',
    value: token,
    maxAge: 60 * 60,
  })

  return response
}
