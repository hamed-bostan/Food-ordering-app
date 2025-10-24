import { NextRequest, NextResponse } from "next/server";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { requireAdmin } from "@/middleware/requireAdmin";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { ProductCreateDtoSchema } from "@/application/dto/products/product.dto";

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
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);

    // Extract FormData
    const formData = await req.formData();

    // Convert FormData to plain object for validation
    const fields: Record<string, unknown> = {};
    let imageFile: File | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === "image" && value instanceof File) {
        imageFile = value;
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }

    // Parse and validate using server-side DTO schema
    const validatedFields = ProductCreateDtoSchema.parse({
      ...fields,
      price: Number(fields.price),
      discount: Number(fields.discount),
      score: Number(fields.score),
      mostsale: fields.mostsale === "true" || fields.mostsale === true,
    });

    // Call use-case with validated DTO + image
    const createdProduct = await createProductWithImageUseCase(validatedFields, imageFile);

    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - POST");
  }
}
