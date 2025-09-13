import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/mongodb";
import { MongoUser } from "@/lib/user/user.types";
import { normalizeUser } from "@/lib/user/user.utils";
import { verifyJWT } from "@/lib/auth/verifyJWT";
import { handleApiError } from "@/lib/errors/handleApiError";

/**
 * GET /api/admin/users
 *
 * Admin-only endpoint
 * - Verifies JWT from Authorization header
 * - Ensures the user has "admin" role
 * - Returns a normalized list of all users
 * - Response includes message + result for frontend consistency
 */
export async function GET(req: NextRequest) {
  try {
    // Verify token & role
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    // Connect to MongoDB
    const db = await connectToDatabase();

    // Fetch all users
    const users = await db.collection("users").find({}).toArray();

    // Normalize DB documents into safe user objects
    const normalizedUsers = users.map((u) => normalizeUser(u as MongoUser & { _id: any }));

    // ✅ Return standardized message + result
    return NextResponse.json(
      {
        message: "Users fetched successfully",
        result: normalizedUsers,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return handleApiError(error, "Users API - GET");
  }
}
