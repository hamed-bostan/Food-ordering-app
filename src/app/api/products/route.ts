import { NextRequest, NextResponse } from "next/server";
import { fetchProductsFromDb } from "@/infrastructure/repositories/product.repository";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { createProductWithImage } from "@/services/server/product.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/products
 */
export async function GET() {
  try {
    const products = await fetchProductsFromDb();
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
    return apiErrorHandler(error, "Products API - POST");
  }
}
