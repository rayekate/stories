// Shared in-memory session store
// Both /api/generate and /api/clear-session import from here
// so they operate on the exact same Map instance.

export type Message = { role: "system" | "user" | "assistant"; content: string };

export const sessions = new Map<string, Message[]>();
