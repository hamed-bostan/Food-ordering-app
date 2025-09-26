import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { UpdateProductDto, UpdateProductDtoType } from "@/application/schemas/product.schema";
import { z } from "zod";
import { updateProductUseCase } from "@/domain/use-cases/products/updateProduct.usecase";
import { deleteProductUseCase } from "@/domain/use-cases/products/deleteProduct.usecase";
import { fetchProductByIdUseCase } from "@/domain/use-cases/products/productById.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/admin/products/:productId
 * Admin-only: Fetch single product
 */
export async function GET(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    await requireAdmin(req);

    const params = await context.params;
    const { productId } = params;

    const product = await fetchProductByIdUseCase(productId);

    return NextResponse.json({ result: product }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET");
  }
}

/**
 * PUT /api/admin/products/:productId
 * Update a product (with optional new image)
 */

export async function PUT(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    await requireAdmin(req);

    const params = await context.params;
    const { productId } = params;

    let validatedFields: UpdateProductDtoType;
    let newImage: File | undefined;

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      const rawFields: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        if (key !== "image" && typeof value === "string") {
          rawFields[key] = value; // leave as string, schema will coerce
        }
      }

      validatedFields = UpdateProductDto.parse(rawFields);

      const imageFile = formData.get("image");
      newImage = imageFile instanceof File ? imageFile : undefined;
    } else {
      const body = await req.json();
      validatedFields = UpdateProductDto.parse(body);
      newImage = undefined;
    }

    const updatedProduct = await updateProductUseCase(productId, validatedFields, newImage);

    return NextResponse.json({ message: "Product updated successfully", result: updatedProduct }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "ValidationError",
          message: "Invalid input",
          details: error.errors,
        },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Products API - PUT");
  }
}

/**
 * DELETE /api/admin/products/:productId
 * Delete product (with optional image cleanup)
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    await requireAdmin(req);

    const params = await context.params;
    const { productId } = params;

    await deleteProductUseCase(productId);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - DELETE");
  }
}
