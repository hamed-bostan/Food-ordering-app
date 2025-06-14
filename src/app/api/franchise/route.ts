import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    // 1. Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(); // replace with your DB name

    // 2. Parse request body
    const body = await req.json();

    // 3. Insert new document
    const result = await db.collection("franchises").insertOne(body);

    // 4. Return inserted document with _id
    const insertedDoc = { _id: result.insertedId, ...body };

    return NextResponse.json(
      { success: true, data: insertedDoc },
      { status: 201 }
    );
  } catch (error) {
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
