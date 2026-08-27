import { NextResponse } from "next/server";
import { aiAgentService } from "@/lib/services/aiAgentService";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message || "";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await aiAgentService.processConversationalQuery(message);
    return NextResponse.json(response);
  } catch (err: any) {
    console.error("Error in agent chat route:", err);
    return NextResponse.json({ error: err.message || "Failed to process chat query" }, { status: 500 });
  }
}
