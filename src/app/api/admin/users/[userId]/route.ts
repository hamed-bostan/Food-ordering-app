import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { deleteUserFromDb, updateUserInDb } from "@/infrastructure/repositories/user.repository";
import { z } from "zod";
import { adminProfileSchema } from "@/domain/profile-schema";
import { ObjectId } from "mongodb";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * PUT /api/admin/users/[userId]
 * Admin-only: Update a user
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const params = await context.params;
    const { userId } = params;
    const body = await req.json();

    // Validate input against zod schema
    const validatedData = adminProfileSchema.parse(body);

    const updatedUser = await updateUserInDb(userId, validatedData);

    return NextResponse.json({ message: "User updated successfully", result: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Users API - PUT");
  }
}

/**
 * DELETE /api/admin/users/[userId]
 * Admin-only: Delete a user
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const params = await context.params;
    const { userId } = params;

    // Validate ID
    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid user ID" }, { status: 400 });
    }

    await deleteUserFromDb(userId);

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Users API - DELETE");
  }
}
