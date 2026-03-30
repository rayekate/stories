import { NextRequest, NextResponse } from "next/server";

// Import the shared sessions store from the generate route
// We re-export it so both routes share the exact same Map instance
// by placing the store in a shared module.
import { sessions } from "@/lib/sessionStore";

export async function POST(req: NextRequest) {
  const sessionId = req.headers.get("X-Session-ID");

  if (!sessionId) {
    return NextResponse.json({ error: "X-Session-ID header is required." }, { status: 400 });
  }

  sessions.delete(sessionId);

  return NextResponse.json({ success: true, message: "Session cleared." });
}
