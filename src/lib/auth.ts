import { SignJWT, jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'
import type { AdminSession } from '@/types'

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? 'change-me-in-production-32-chars!!'
)

const COOKIE_NAME = 'da_admin_token'
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7 // 7 days in seconds

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function signToken(payload: Omit<AdminSession, 'exp'>): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE}s`)
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as AdminSession
  } catch {
    return null
  }
}

export { COOKIE_NAME, TOKEN_MAX_AGE }
