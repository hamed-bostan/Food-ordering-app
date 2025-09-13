import { connectToDatabase } from "@/lib/db/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth/verifyJWT";
import { handleApiError } from "@/lib/errors/handleApiError";
import { normalizeUser } from "@/lib/user/user.utils";

/**
 * POST /api/admin/set-role
 *
 * Admin-only endpoint
 * - Verifies JWT from Authorization header
 * - Updates a user's role (user or admin) by phone number
 * - Returns standardized message + result
 */

export async function POST(req: NextRequest) {
  try {
    // Verify JWT and ensure admin role
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    // Parse request body
    const { phoneNumber, role } = await req.json();

    if (!["user", "admin"].includes(role)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid role" }, { status: 400 });
    }

    // Connect to MongoDB
    const db = await connectToDatabase();
    const usersCollection = db.collection("users");

    // Update user's role
    const updateResult = await usersCollection.updateOne({ phoneNumber }, { $set: { role } });

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: "NotFound", message: "User not found" }, { status: 404 });
    }

    // Fetch the updated user
    const updatedUser = await usersCollection.findOne({ phoneNumber });
    if (!updatedUser) {
      return NextResponse.json({ error: "NotFound", message: "User not found" }, { status: 404 });
    }

    // Return standardized message + full user
    return NextResponse.json(
      {
        message: "Role updated successfully",
        result: normalizeUser(updatedUser),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleApiError(error, "SetRole API - POST");
  }
}
