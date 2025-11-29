import axios from "axios";

const WORKFLOW_CHECKOUT_URL = process.env.N8N_CHECKOUT_WEBHOOK_URL!;

/**
 * Sends order data to the admin workflow (n8n)
 */
export async function notifyOrderWorkflow(orderData: unknown): Promise<boolean> {
  try {
    await axios.post(WORKFLOW_CHECKOUT_URL, orderData, {
      auth: {
        username: process.env.N8N_BASIC_AUTH_USER!,
        password: process.env.N8N_BASIC_AUTH_PASSWORD!,
      },
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    return true;
  } catch (error: any) {
    console.error("Workflow Notification Error:", error.response?.data || error.message);
    throw new Error("Failed to notify workflow");
  }
}
