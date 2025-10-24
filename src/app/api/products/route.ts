import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { ProductCreateDtoSchema } from "@/application/dto/products/product.dto";

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

    // 2. Extract FormData
    const formData = await req.formData();

    const fields: Record<string, unknown> = {};
    let imageFile: File | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === "image" && value instanceof File) {
        imageFile = value;
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }

    // 3. Validate fields using server-side DTO schema
    const validatedFields = ProductCreateDtoSchema.parse({
      ...fields,
      price: Number(fields.price),
      discount: Number(fields.discount),
      score: Number(fields.score),
      mostsale: fields.mostsale === "true" || fields.mostsale === true,
    });

    // 4. Call use-case with DTO + image
    const createdProduct = await createProductWithImageUseCase(validatedFields, imageFile);

    // 5. Return response
    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Products API - POST");
  }
}
