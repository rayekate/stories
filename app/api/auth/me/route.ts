import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const token = req.headers.get("cookie")?.split("auth_token=")[1]?.split(";")[0];
    
    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({ 
      authenticated: true, 
      user: decoded 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }
}
