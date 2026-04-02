import { SignJWT, jwtVerify, JWTPayload } from "jose";

export interface UserPayload extends JWTPayload {
  id: string;
  email: string;
  role: string;
  name?: string;
  approved?: boolean;
}

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "sanctum_secret_key_v3");

export async function signToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as UserPayload;
  } catch (err) {
    return null;
  }
}

// Aliases for compatibility with different parts of the app
export const createSession = signToken;
export const verifySession = verifyToken;
