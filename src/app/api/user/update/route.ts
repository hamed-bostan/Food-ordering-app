import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db/mongodb";
import { ObjectId } from "mongodb";
import { handleApiError } from "@/lib/errors/handleApiError";

/**
 * POST /api/user/update
 *
 * Updates a user's profile information.
 * - Validates userId and optional fields
 * - Updates the user in MongoDB
 * - Returns standardized message and updated fields
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, name, email, phoneNumber, image } = body;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid or missing userId" }, { status: 400 });
    }

    const updateFields: Record<string, string> = {};
    if (name?.trim()) updateFields.name = name;
    if (email?.trim()) updateFields.email = email;
    if (phoneNumber?.trim()) updateFields.phoneNumber = phoneNumber;
    if (image?.trim()) updateFields.image = image;

    if (Object.keys(updateFields).length === 0) {
      return NextResponse.json({ error: "ValidationError", message: "No valid fields to update" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "NotFound", message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "اطلاعات شما با موفقیت بروزرسانی شد.",
      result: { userId, ...updateFields },
    });
  } catch (error: unknown) {
    return handleApiError(error, "User Update API - POST");
  }
}
