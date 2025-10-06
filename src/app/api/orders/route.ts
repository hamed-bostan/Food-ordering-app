import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { CreateOrderDto } from "@/application/schemas/order.schema";
import { submitOrderUseCase } from "@/domain/use-cases/orders/submitOrder.usecase";
import { fetchOrdersUseCase } from "@/domain/use-cases/orders/fetchOrders.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate against DTO schema
    const validated = CreateOrderDto.parse(body);

    const newOrder = await submitOrderUseCase(validated);

    return NextResponse.json({ message: "Order created successfully", result: newOrder }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid order input",
          details: error.errors,
        },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Orders API - POST");
  }
}

/**
 * GET /api/orders
 * Fetch all orders
 */
export async function GET() {
  try {
    const orders = await fetchOrdersUseCase();
    return NextResponse.json({ result: orders }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Orders API - GET");
  }
}
