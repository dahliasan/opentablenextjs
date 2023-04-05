import { NextResponse } from 'next/server'
import validator from 'validator'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import * as jose from 'jose'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  return new Response('Hello, Next.js!')
}

export async function POST(request: Request) {
  const data = await request.json()
  const errors: string[] = []

  const validatorSchema = [
    {
      valid: validator.isLength(data.firstName, {
        min: 2,
      }),
      errorMessage: 'First name must be at least 2 characters',
    },
    {
      valid: validator.isLength(data.lastName, { min: 2 }),
      errorMessage: 'Last name must be at least 2 characters',
    },
    {
      valid: validator.isEmail(data.email),
      errorMessage: 'Email is not valid',
    },
    {
      valid: validator.isStrongPassword(data.password),
      errorMessage: 'Password is weak',
    },
    {
      valid: validator.isMobilePhone(data.phone, 'any'),
      errorMessage: 'Phone number is not valid',
    },
    {
      valid: validator.isLength(data.city, { min: 2 }),
      errorMessage: 'City is invalid',
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

  const userWithEmail = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  })

  if (userWithEmail) {
    return NextResponse.json(
      {
        message: 'User with this email already exists',
      },
      { status: 400 }
    )
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  const user = await prisma.user.create({
    data: {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: hashedPassword,
      phone: data.phone,
      city: data.city,
    },
  })

  const algo = 'HS256'
  const secret = new TextEncoder().encode(process.env.JWT_SECRET)

  const token = await new jose.SignJWT({ email: user.email })
    .setProtectedHeader({ alg: algo })
    .setExpirationTime('1h')
    .sign(secret)

  return NextResponse.json(
    {
      token,
    },
    { status: 200 }
  )
}
