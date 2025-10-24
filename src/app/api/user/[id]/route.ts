import { NextRequest, NextResponse } from "next/server";
import { getUserById } from "@/domain/use-cases/user/getUserById.usecase";
import { updateUserById } from "@/domain/use-cases/user/updateUserById.usecase";
import { adminProfileSchema } from "@/application/schemas/profile-schema";
import { requireSelfOrAdmin } from "@/middleware/requireSelfOrAdmin";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/user/:id
 * Fetch a user by ID (self or admin only)
 */
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;

    await requireSelfOrAdmin(req, id);

    const user = await getUserById(id);
    return NextResponse.json({ message: "User fetched successfully", result: user }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "User API - GET");
  }
}

/**
 * PUT /api/user/:id
 * Update a user by ID (self or admin only)
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;

    await requireSelfOrAdmin(req, id);

    const body = await req.json();
    delete body._id;

    const validatedData = adminProfileSchema.parse(body);

    const updatedUser = await updateUserById(id, validatedData);

    return NextResponse.json({ message: "User updated successfully", result: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "User API - PUT");
  }
}
