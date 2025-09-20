import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import {
  findProductByIdInDb,
  updateProductInDb,
  deleteProductFromDb,
} from "@/infrastructure/repositories/product.repository";
import { productInputSchema } from "@/domain/product.schema";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

// Allow partial updates (PATCH-like behavior in PUT)
const productUpdateSchema = productInputSchema.partial();

/**
 * GET /api/admin/products/[productId]
 * Admin-only: Fetch single product
 */
export async function GET(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const { productId } = await context.params;
    const product = await findProductByIdInDb(productId);
    if (!product) {
      return NextResponse.json({ error: "NotFound", message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ result: product });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET one");
  }
}

/**
 * PUT /api/admin/products/[productId]
 * Admin-only: Update a product
 * Accepts multipart/form-data with optional image
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const { productId } = await context.params;

    let fields: Record<string, string> = {};

    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await req.formData();
      formData.forEach((value, key) => {
        if (!(value instanceof File)) {
          fields[key] = value.toString();
        }
      });
    } else {
      fields = await req.json();
    }

    const validatedData = productUpdateSchema.parse(fields);

    const updatedProduct = await updateProductInDb(productId, validatedData);

    return NextResponse.json({ message: "Product updated successfully", result: updatedProduct });
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
 * DELETE /api/admin/products/[productId]
 * Admin-only: Delete a product (with image cleanup)
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ productId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const { productId } = await context.params;
    await deleteProductFromDb(productId);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - DELETE");
  }
}
