// src/app/api/send-order-to-n8n/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await axios.post(
      "http://n8n:5678/webhook/nearfood", // ← Use Docker service name (internal, secure)
      body,
      {
        auth: {
          username: process.env.N8N_BASIC_AUTH_USER!,
          password: process.env.N8N_BASIC_AUTH_PASSWORD!,
        },
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("n8n webhook error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to trigger n8n", details: error.message }, { status: 500 });
  }
}
