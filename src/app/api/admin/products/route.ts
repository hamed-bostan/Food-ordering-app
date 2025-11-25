import { NextRequest, NextResponse } from "next/server";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { requireAdmin } from "@/middleware/requireAdmin";
import { createProductWithImageUseCase } from "@/domain/use-cases/products/createProduct.usecase";
import { fetchProducts } from "@/domain/use-cases/products/fetchProducts.usecase";
import { ProductCreateDtoSchema } from "@/application/dto/products/product.dto";

/**
 * GET /api/admin/products
 * Admin & Root: Fetch all products
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req); // Admin or root

    const products = await fetchProducts();
    return NextResponse.json({ result: products }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET");
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

    const createdProduct = await createProductWithImageUseCase(validatedFields, imageFile);

    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - POST");
  }
}
