import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { UpdateOrderDtoSchema } from "@/application/dto/orders/order.dto";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { updateOrderUseCase } from "@/domain/use-cases/orders/updateOrder.usecase";
import { OrderRepository } from "@/infrastructure/repositories/order.repository";
import { fetchOrderByIdUseCase } from "@/domain/use-cases/orders/orderById.usecase";

/**
 * GET /api/orders/:orderId
 * Fetch a single order
 */
export async function GET(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;

    const repository = new OrderRepository();
    const order = await fetchOrderByIdUseCase(orderId, repository);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ result: order }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Orders API - GET /:orderId");
  }
}

/**
 * PUT /api/orders/:orderId
 * Update order (optional: for admin panel or order edits)
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;
    const body = await req.json();

    const validated = UpdateOrderDtoSchema.parse(body);

    const repository = new OrderRepository();
    const updatedOrder = await updateOrderUseCase(orderId, validated, repository);

    return NextResponse.json({ message: "Order updated successfully", result: updatedOrder }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }
    return apiResponseErrorHandler(error, "Orders API - PUT /:orderId");
  }
}
