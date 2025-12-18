import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { UpdateOrderDtoSchema } from "@/application/dto/orders/order.dto";
import { updateOrderUseCase } from "@/domain/use-cases/orders/updateOrder.usecase";
import { deleteOrderUseCase } from "@/domain/use-cases/orders/deleteOrder.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { OrderRepository } from "@/infrastructure/repositories/order.repository";
import { fetchOrderByIdUseCase } from "@/domain/use-cases/orders/orderById.usecase";

/**
 * GET /api/admin/orders/:orderId
 */
export async function GET(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    await requireAdmin(req);
    const { orderId } = await context.params;

    const repository = new OrderRepository();
    const order = await fetchOrderByIdUseCase(orderId, repository);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ result: order }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Orders API - GET");
  }
}

/**
 * PUT /api/admin/orders/:orderId
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    await requireAdmin(req);
    const { orderId } = await context.params;

    const body = await req.json();
    const validatedFields = UpdateOrderDtoSchema.parse(body);

    const repository = new OrderRepository();
    const updatedOrder = await updateOrderUseCase(orderId, validatedFields, repository);

    return NextResponse.json({ message: "Order updated successfully", result: updatedOrder }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return apiResponseErrorHandler(error, "Admin Orders API - PUT");
  }
}

/**
 * DELETE /api/admin/orders/:orderId
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    await requireAdmin(req);
    const { orderId } = await context.params;

    const repository = new OrderRepository();
    await deleteOrderUseCase(orderId, repository);

    return NextResponse.json({ message: "Order deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Orders API - DELETE");
  }
}
