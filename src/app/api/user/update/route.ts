import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { name, userId, phone_number, email } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const updateFields: Record<string, string> = {};

    if (typeof name === "string" && name.trim() !== "") {
      updateFields.name = name;
    }

    if (typeof phone_number === "string" && phone_number.trim() !== "") {
      updateFields.phone_number = phone_number;
    }

    if (typeof email === "string" && email.trim() !== "") {
      updateFields.email = email;
    }

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json(
        { message: "No valid fields to update." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId as string) },
      { $set: updateFields }
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
