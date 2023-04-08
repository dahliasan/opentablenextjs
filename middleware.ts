import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

export async function middleware(request: NextRequest, response: NextResponse) {
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
    await jose.jwtVerify(token, secret)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unauthorized request',
      },
      { status: 401 }
    )
  }
}

// only call middleware on /api/auth/me
export const config = {
  matcher: ['/api/auth/me'],
}
