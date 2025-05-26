import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import Franchise from "@/models/Franchise";

export async function POST(req: NextRequest) {
  try {
    // 1. Connect to DB
    await connectDB();

    // 2. Parse request body
    const body = await req.json();

    // 3. Create new franchise document
    const newFranchise = await Franchise.create(body);

    // 4. Return success response
    return NextResponse.json(
      { success: true, data: newFranchise },
      { status: 201 }
    );
  } catch (error) {
    // Log server error (avoid exposing sensitive details to client)
    console.error("❌ Franchise submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}
