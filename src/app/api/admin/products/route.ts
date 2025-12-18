import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { ProductCreateDtoSchema } from "@/application/dto/products/product.dto";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { ProductRepository } from "@/infrastructure/repositories/product.repository";
import { ImageStorageGateway } from "@/infrastructure/storage/ImageStorageGateway";

/**
 * GET /api/admin/products
 * Admin & Root: Fetch all products
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req); // Admin or root

    const repository = new ProductRepository();
    const products = await fetchProducts(repository);
    return NextResponse.json({ result: products }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Products API - GET");
  }
}

/**
 * POST /api/admin/products
 * Admin & Root: Create new product
 */
export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req); // Admin or root

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

    const validatedFields = ProductCreateDtoSchema.parse({
      ...fields,
      price: Number(fields.price),
      discount: Number(fields.discount),
      score: Number(fields.score),
      mostsale: fields.mostsale === "true" || fields.mostsale === true,
    });

    const repository = new ProductRepository();
    const storage = new ImageStorageGateway();
    const createdProduct = await createProductWithImageUseCase(validatedFields, repository, storage, imageFile);

    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Products API - POST");
  }
}
