import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CreateOrderDtoSchema } from "@/application/dto/orders/order.dto";
import { fetchOrdersUseCase } from "@/domain/use-cases/orders/fetchOrders.usecase";
import { createOrderUseCase } from "@/domain/use-cases/orders/createOrder.usecase";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { OrderRepository } from "@/infrastructure/repositories/order.repository";

/**
 * POST /api/orders
 * Create a new order
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate DTO
    const validated = CreateOrderDtoSchema.parse(body);

    const repository = new OrderRepository();

    // Call domain use case
    const newOrder = await createOrderUseCase(validated, repository);

    return NextResponse.json({ message: "Order created successfully", result: newOrder }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid order input", details: error.errors },
        { status: 400 }
      );
    }
    return apiResponseErrorHandler(error, "Orders API - POST");
  }
}

/**
 * GET /api/orders
 * Fetch all orders
 */
export async function GET() {
  try {
    const repository = new OrderRepository();
    const orders = await fetchOrdersUseCase(repository);
    return NextResponse.json({ result: orders }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Orders API - GET");
  }
}
