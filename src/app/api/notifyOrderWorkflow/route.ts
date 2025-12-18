import { notifyOrderWorkflowUseCase } from "@/domain/use-cases/n8n/notifyOrderWorkflow.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
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
    return apiResponseErrorHandler(error, "NotifyOrderWorkflow API - POST");
  }
}
