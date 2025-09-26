import { NextRequest, NextResponse } from "next/server";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { requireAdmin } from "@/middleware/requireAdmin";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";

/**
 * GET /api/admin/products
 * Fetch all products (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    // Admin authorization
    await requireAdmin(req);

    // Fetch products via use-case
    const products = await fetchProducts();

    // Return response
    return NextResponse.json({ result: products }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET");
  }
}

/**
 * POST /api/admin/products
 * Create a new product (admin only)
 * Accepts multipart/form-data with an image
 */
export async function POST(req: NextRequest) {
  try {
    // Admin authorization
    await requireAdmin(req);

    // Delegate entire FormData to use-case (handles validation, image upload, DB insertion)
    const createdProduct = await createProductWithImageUseCase(await req.formData());

    // Return response
    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - POST");
  }
}
