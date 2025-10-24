import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { requireAdmin } from "@/middleware/requireAdmin";
import { updateUserById } from "@/domain/use-cases/user/updateUserById.usecase";
import { deleteUserById } from "@/domain/use-cases/user/deleteUserById.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { UserUpdateDtoSchema } from "@/application/dto/users/user.dto";

/**
 * PUT /api/admin/users/:userId
 * Admin-only: Update a user
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    await requireAdmin(req);
    const { userId } = await context.params;

    // Parse and validate incoming JSON body
    const body = await req.json();
    const validatedBody = UserUpdateDtoSchema.parse(body);

    // Update user via use case (domain logic)
    const updatedUser = await updateUserById(userId, validatedBody);

    // Convert Dates to ISO strings at API boundary
    const responseUser = {
      ...updatedUser,
      createdAt: updatedUser.createdAt?.toISOString(),
    };

    return NextResponse.json({ message: "User updated successfully", result: responseUser }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid input",
          details: error.errors,
        },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Users API - PUT");
  }
}

/**
 * DELETE /api/admin/users/:userId
 * Admin-only: Delete a user
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ userId: string }> }) {
  try {
    await requireAdmin(req);
    const { userId } = await context.params;

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "ValidationError", message: "Invalid user ID" }, { status: 400 });
    }

    await deleteUserById(userId);

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Users API - DELETE");
  }
}
