import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.naughtytales.xyz/v1/chat/completions";
const API_KEY = process.env.BACKEND_API_KEY;

// Shared session store — imported so /api/clear-session uses the same Map instance
import { sessions, type Message } from "@/lib/sessionStore";

const SYSTEM_PROMPT =
  "You are a creative fiction writer. Write vivid, detailed, immersive stories that draw the reader in from the first sentence.";

export async function POST(req: NextRequest) {
  try {
    const sessionId = req.headers.get("X-Session-ID");
    const { prompt, genres } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    // Build the user content with genre context
    const genreTag =
      genres && genres.length > 0 ? `Genres: ${genres.join(", ")}.\n\n` : "";
    const userContent = `${genreTag}Write an immersive, vivid story based on the following prompt:\n\n${prompt}`;

    // Retrieve or initialise session history
    let history: Message[] = sessionId
      ? (sessions.get(sessionId) ?? [{ role: "system", content: SYSTEM_PROMPT }])
      : [{ role: "system", content: SYSTEM_PROMPT }];

    // Append the new user turn
    history = [...history, { role: "user", content: userContent }];

    const body = {
      model: "mistral",
      messages: history,
      max_tokens: 1000,
    };

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      return NextResponse.json(
        { error: "Story generation failed. Please try again." },
        { status: response.status }
      );
    }

    const data = await response.json();
    const storyContent = data?.choices?.[0]?.message?.content ?? "";

    if (!storyContent) {
      return NextResponse.json(
        { error: "No story content returned from the model." },
        { status: 500 }
      );
    }

    // Persist the assistant reply back into session history
    if (sessionId) {
      sessions.set(sessionId, [
        ...history,
        { role: "assistant", content: storyContent },
      ]);
    }

    return NextResponse.json({ content: storyContent });
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
