import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { fetchOrdersUseCase } from "@/domain/use-cases/orders/fetchOrders.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { OrderRepository } from "@/infrastructure/repositories/order.repository";

/**
 * GET /api/admin/orders
 * Admin & Root: Fetch all orders
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req); // Admin or root

    const repository = new OrderRepository();
    const orders = await fetchOrdersUseCase(repository);
    return NextResponse.json({ result: orders }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Orders API - GET");
  }
}
