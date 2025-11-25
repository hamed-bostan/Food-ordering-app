import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateProductUseCase } from "@/domain/use-cases/products/updateProduct.usecase";
import { deleteProductUseCase } from "@/domain/use-cases/products/deleteProduct.usecase";
import { fetchProductByIdUseCase } from "@/domain/use-cases/products/productById.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { ProductUpdateDtoSchema } from "@/application/dto/products/product.dto";
import { requireAdmin } from "@/middleware/requireAdmin";
import { requireRoot } from "@/middleware/requireRoot";

/**
 * GET /api/admin/products/:productId
 * Admin & Root: Fetch single product
 */
export async function GET(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    // Require admin or root
    await requireAdmin(req);

    const { productId } = await context.params;
    const product = await fetchProductByIdUseCase(productId);

    return NextResponse.json({ result: product }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET");
  }
}

/**
 * PUT /api/admin/products/:productId
 * Only root can update products
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    // Require root
    await requireRoot(req);

    const { productId } = await context.params;

    let validatedFields: z.infer<typeof ProductUpdateDtoSchema>;
    let newImage: File | undefined;

    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const rawFields: Record<string, unknown> = {};
      for (const [key, value] of formData.entries()) {
        if (key !== "image" && typeof value === "string") rawFields[key] = value;
      }
      validatedFields = ProductUpdateDtoSchema.parse(rawFields);

      const imageFile = formData.get("image");
      if (imageFile instanceof File) newImage = imageFile;
    } else {
      const body = await req.json();
      validatedFields = ProductUpdateDtoSchema.parse(body);
      newImage = undefined;
    }

    const updatedProduct = await updateProductUseCase(productId, validatedFields, newImage);
    return NextResponse.json({ message: "Product updated successfully", result: updatedProduct }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Products API - PUT");
  }
}

/**
 * DELETE /api/admin/products/:productId
 * Only root can delete products
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    // Require root
    await requireRoot(req);

    const { productId } = await context.params;
    await deleteProductUseCase(productId);

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - DELETE");
  }
}
