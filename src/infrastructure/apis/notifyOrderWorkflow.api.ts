import { api } from "@/infrastructure/axios/api.client";
import axios from "axios";
import { ApiErrorResponse } from "@/types/api-error";

export type CheckoutWorkflowResponse = {
  message: string;
};

export const notifyOrderWorkflow = async (payload: {
  customerPhone: string;
  totalPrice: number;
  orderSummary: string;
}): Promise<CheckoutWorkflowResponse> => {
  try {
    const { data } = await api.post<CheckoutWorkflowResponse>("/notifyOrderWorkflow", payload);
    return data;
  } catch (error) {
    console.error("❌ [notifyOrderWorkflow API] Workflow error:", error);

    if (axios.isAxiosError(error)) {
      const resp = error.response?.data as ApiErrorResponse | undefined;
      if (resp?.message) throw new Error(resp.message);
    }

    throw new Error("Unexpected notifyOrderWorkflow error");
  }
};
