import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { userId, phone_number } = await req.json();

    if (!userId || !phone_number) {
      return NextResponse.json(
        { message: "Missing user ID or phone number" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(); // defaults to the DB in your connection string
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new (require("mongodb").ObjectId)(userId) },
      { $set: { phone_number } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "اطلاعات شما بروز رسانی شد." });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
