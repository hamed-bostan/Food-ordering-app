import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { getUserByIdService, updateUserByIdService } from "@/services/server/user.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/user/[id]
 * Fetch a user by ID (self or admin only)
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Verify JWT
    const payload = verifyJWT(req);
    if (payload.id !== id && payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Access denied" }, { status: 403 });
    }

    const user = await getUserByIdService(id);

    return NextResponse.json({ message: "User fetched successfully", result: user }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "User API - GET");
  }
}

/**
 * PUT /api/user/[id]
 * Update a user by ID (self or admin only)
 */
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // Verify JWT
    const payload = verifyJWT(req);
    if (payload.id !== id && payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    delete body._id; // ensure _id is never updated

    const updatedUser = await updateUserByIdService(id, body);

    return NextResponse.json({ message: "User updated successfully", result: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "User API - PUT");
  }
}
