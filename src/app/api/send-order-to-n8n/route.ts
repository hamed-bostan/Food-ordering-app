import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    await axios.post("https://n8n.nearfood.ir:5678/webhook/nearfood", body, {
      auth: {
        username: process.env.N8N_BASIC_AUTH_USER!,
        password: process.env.N8N_BASIC_AUTH_PASSWORD!,
      },
      timeout: 10_000,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("n8n webhook proxy error:", error.message);
    return NextResponse.json({ error: "Failed to trigger n8n" }, { status: 500 });
  }
}
