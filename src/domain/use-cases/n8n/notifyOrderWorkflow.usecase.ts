import { notifyOrderWorkflow } from "@/infrastructure/repositories/notifyOrderWorkflow.repository";

export async function notifyOrderWorkflowUseCase(payload: unknown): Promise<boolean> {
  return notifyOrderWorkflow(payload);
}
