import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { getAllUsers } from "@/domain/use-cases/user/getAllUsers.usecase";

export async function GET(req: NextRequest) {
  try {
    // Centralized admin check
    await requireAdmin(req);

    // Use-case directly
    const users = await getAllUsers();

    return NextResponse.json({ message: "Users fetched successfully", result: users }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Users API - GET");
  }
}
