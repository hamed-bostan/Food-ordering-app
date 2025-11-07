import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { fetchOrdersUseCase } from "@/domain/use-cases/orders/fetchOrders.usecase";

/**
 * GET /api/admin/order
 * Fetch all orders for admin
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req);

    const orders = await fetchOrdersUseCase();

    return NextResponse.json({ message: "Orders fetched successfully", result: orders }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Orders API - GET");
  }
}
