import { streamText } from "ai";
import { google } from "@ai-sdk/google";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-flash"),
    messages,
    system: `You are EnergyBot, an expert AI assistant specializing in sustainable living, clean energy, and energy-saving tips. You are part of a project supporting UN SDG 7 — Affordable and Clean Energy.

Your guidelines:
- Provide clear, actionable, and practical advice
- Use bullet points and structured formatting for readability
- Be encouraging and positive about sustainable choices
- When discussing costs or savings, provide realistic estimates
- Always consider the user's context (home, office, community)
- Keep responses concise but thorough`,
  });

  return result.toTextStreamResponse();
}
