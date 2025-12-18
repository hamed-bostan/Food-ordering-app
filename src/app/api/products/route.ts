import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { ProductCreateDtoSchema } from "@/application/dto/products/product.dto";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { ProductRepository } from "@/infrastructure/repositories/product.repository";
import { ImageStorageGateway } from "@/infrastructure/storage/ImageStorageGateway";

/**
 * GET /api/products
 */
export async function GET(req: NextRequest) {
  try {
    const repository = new ProductRepository();
    const products = await fetchProducts(repository);
    return NextResponse.json({ message: "Products fetched successfully", result: products }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Products API - GET");
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
    const repository = new ProductRepository();
    const storage = new ImageStorageGateway();
    const createdProduct = await createProductWithImageUseCase(validatedFields, repository, storage, imageFile);

    // 5. Return response
    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Products API - POST");
  }
}
