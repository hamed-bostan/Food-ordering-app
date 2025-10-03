import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { fetchOrderByIdUseCase } from "@/domain/use-cases/orders/orderById.usecase";
import { UpdateOrderDto } from "@/application/schemas/order.schema";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/orders/:orderId
 * Fetch a single order
 */
export async function GET(req: NextRequest, context: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await context.params;

    const order = await fetchOrderByIdUseCase(orderId);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({ result: order }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Orders API - GET /:orderId");
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

    const validated = UpdateOrderDto.parse(body);

    // TODO: implement updateOrderUseCase
    // const updatedOrder = await updateOrderUseCase(orderId, validated);

    return NextResponse.json({ message: "Order update not yet implemented", result: validated }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }
    return apiErrorHandler(error, "Orders API - PUT /:orderId");
  }
}
