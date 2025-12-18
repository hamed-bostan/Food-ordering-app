import { NextRequest, NextResponse } from "next/server";
import { getUserByIdUseCase } from "@/domain/use-cases/user/getUserById.usecase";
import { updateUserByIdUseCase } from "@/domain/use-cases/user/updateUserById.usecase";
import { adminFormProfileSchema } from "@/application/schemas/profile-schema";
import { requireSelfOrAdmin } from "@/middleware/requireSelfOrAdmin";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { UserRepository } from "@/infrastructure/repositories/user.repository";

/**
 * GET /api/user/:id
 * Fetch a user by ID (self or admin only)
 */
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    const { id } = params;

    await requireSelfOrAdmin(req, id);

    // Inject repository
    const repo = new UserRepository();

    const user = await getUserByIdUseCase(repo, id);
    return NextResponse.json({ message: "User fetched successfully", result: user }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "User API - GET");
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

    const validatedData = adminFormProfileSchema.parse(body);

    // Inject repository
    const repo = new UserRepository();

    const updatedUser = await updateUserByIdUseCase(repo, id, validatedData);

    return NextResponse.json({ message: "User updated successfully", result: updatedUser }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "User API - PUT");
  }
}
