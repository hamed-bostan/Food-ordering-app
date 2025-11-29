import { notifyOrderWorkflowUseCase } from "@/domain/use-cases/n8n/notifyOrderWorkflow.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/notifyOrderWorkflow
 * Notify the admin workflow (n8n)
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await notifyOrderWorkflowUseCase(body);

    return NextResponse.json({ message: "Workflow notified successfully" }, { status: 200 });
  } catch (error) {
    return apiErrorHandler(error, "NotifyOrderWorkflow API - POST");
  }
}
