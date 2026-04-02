import { NextResponse } from "next/server";
import { verifyToken, type UserPayload } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader.split("auth_token=")[1]?.split(";")[0];
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const decoded: UserPayload | null = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        name: decoded.name || "User"
      } 
    }, { status: 200 });
  } catch (error: unknown) {
    console.error("Auth me error:", error);
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
