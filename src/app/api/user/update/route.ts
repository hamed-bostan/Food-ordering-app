import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const userId = formData.get("userId")?.toString();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone_number = formData.get("phone_number")?.toString();
    const file = formData.get("image") as File | null;

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const updateFields: Record<string, string> = {};
    if (name?.trim()) updateFields.name = name;
    if (email?.trim()) updateFields.email = email;
    if (phone_number?.trim()) updateFields.phone_number = phone_number;

    // Handle image upload
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);
      updateFields.image = `/uploads/${fileName}`;
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "اطلاعات شما بروز رسانی شد." });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "خطای سرور" }, { status: 500 });
  }
}
