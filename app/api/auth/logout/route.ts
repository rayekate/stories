import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  
  // Clear both potential cookie names to be safe during migration
  response.cookies.set("auth_token", "", {
    maxAge: 0,
    path: "/",
  });
  
  response.cookies.set("session", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
