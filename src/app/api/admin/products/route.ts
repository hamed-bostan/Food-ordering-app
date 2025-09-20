import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { fetchProductsFromDb } from "@/infrastructure/repositories/product.repository";
import { createProductWithImage } from "@/services/server/product.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/admin/products
 * Fetch all products (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const products = await fetchProductsFromDb();
    return NextResponse.json({ result: products });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - GET");
  }
}

/**
 * POST /api/admin/products
 * Create new product (admin only)
 * Accepts multipart/form-data with an image
 */
export async function POST(req: NextRequest) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const formData = await req.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") fields[key] = value;
    }

    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "ValidationError", message: "Image is required" }, { status: 400 });
    }

    const createdProduct = await createProductWithImage(fields, image);

    return NextResponse.json({ message: "Product created successfully", result: createdProduct }, { status: 201 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Products API - POST");
  }
}
