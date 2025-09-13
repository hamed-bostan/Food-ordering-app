import { supabaseAdmin } from "@/lib/supabase/admin";
import { productInputSchema, ProductType, NewProductType } from "@/lib/schemas/product.schema";
import crypto from "crypto";
import { insertProductToDb, fetchProductsFromDb, mapToProductType } from "@/lib/db/product.repository";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth/verifyJWT";
import { handleApiError } from "@/lib/errors/handleApiError";

const BUCKET_NAME = "food-images";

/**
 * GET /api/products
 * Fetch all products
 */
export async function GET() {
  try {
    const products = await fetchProductsFromDb();
    return NextResponse.json({ message: "Products fetched successfully", result: products }, { status: 200 });
  } catch (error: unknown) {
    return handleApiError(error, "Products API - GET");
  }
}

/**
 * POST /api/products
 * Create a new product (admin only)
 */

export async function POST(req: NextRequest) {
  try {
    // Verify JWT and admin role
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    // Parse form data
    const formData = await req.formData();
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") fields[key] = value;
    }

    // Validate input schema
    const validated = productInputSchema.parse(fields);

    // Handle image upload
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "ValidationError", message: "Image is required" }, { status: 400 });
    }

    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `products/${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType: image.type });

    if (uploadError) throw new Error("Failed to upload image");

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    // Save to MongoDB
    const product: NewProductType = { ...validated, image: imageUrl };
    const insertedId = await insertProductToDb(product);
    const createdProduct: ProductType = mapToProductType(product, insertedId.toString());

    // Return response
    return NextResponse.json(
      {
        message: "Product created successfully",
        result: createdProduct,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return handleApiError(error, "Products API - POST");
  }
}
