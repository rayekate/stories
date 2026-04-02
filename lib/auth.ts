import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sanctum_secret_key_v3";

export function signToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}

// Aliases for compatibility with different parts of the app
export const createSession = signToken;
export const verifySession = verifyToken;

