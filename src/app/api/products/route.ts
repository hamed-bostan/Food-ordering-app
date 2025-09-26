import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";

/**
 * GET /api/products
 */
export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json({ message: "Products fetched successfully", result: products }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Products API - GET");
  }
}

/**
 * POST /api/products
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authorization
    await requireAdmin(req);

    // 2. Get form data
    const formData = await req.formData();

    // 3. Call use-case (handles validation, image upload, DB insertion)
    const createdProduct = await createProductWithImageUseCase(formData);

    // 4. Return response
    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Products API - POST");
  }
}
