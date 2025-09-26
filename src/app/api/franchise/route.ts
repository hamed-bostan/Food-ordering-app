import { NextRequest, NextResponse } from "next/server";
import { insertFranchise } from "@/domain/use-cases/franchise/insertFranchise.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * POST /api/franchise
 * Submit a new franchise
 */
export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();

    // Call use-case to insert franchise
    const insertedFranchise = await insertFranchise(body);

    return NextResponse.json(
      { message: "Franchise submitted successfully", result: insertedFranchise },
      { status: 201 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Franchise API - POST");
  }
}
