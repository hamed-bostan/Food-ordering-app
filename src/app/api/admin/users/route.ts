import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { getAllUsersUseCase } from "@/domain/use-cases/user/getAllUsers.usecase";
import { UserRepository } from "@/infrastructure/repositories/user.repository";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";

export async function GET(req: NextRequest) {
  try {
    // Centralized admin check
    await requireAdmin(req);

    // Inject repository dependency
    const repo = new UserRepository();

    // Use-case with injected repo
    const users = await getAllUsersUseCase(repo);

    return NextResponse.json({ message: "Users fetched successfully", result: users }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Users API - GET");
  }
}
