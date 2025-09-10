import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, phoneNumber, image } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid or missing userId" }, { status: 400 });
    }

    const updateFields: Record<string, string> = {};
    if (name?.trim()) updateFields.name = name;
    if (email?.trim()) updateFields.email = email;
    if (phoneNumber?.trim()) updateFields.phoneNumber = phoneNumber;
    if (image?.trim()) updateFields.image = image;

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "اطلاعات شما بروز رسانی شد." });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
