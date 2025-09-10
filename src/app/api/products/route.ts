import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { supabaseAdmin } from "@/lib/supabase/admin"; // Use centralized client
import { productInputSchema, ProductType, NewProductType } from "@/lib/schemas/product.schema";
import crypto from "crypto";
import { insertProductToDb, fetchProductsFromDb, mapToProductType } from "@/lib/db/product.repository";

const BUCKET_NAME = "food-images";

export async function GET() {
  try {
    const products = await fetchProductsFromDb();
    return NextResponse.json(products);
  } catch (error) {
    console.error("❌ Failed to fetch products:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: "ServerError", message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") {
        fields[key] = value;
      }
    }

    const validated = productInputSchema.parse(fields);

    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json(
        { error: "ValidationError", details: [{ message: "Image is required" }] },
        { status: 400 }
      );
    }

    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `products/${crypto.randomUUID()}.${fileExtension}`;
    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(filePath, image);
    if (uploadError) {
      console.error("❌ Supabase upload error:", uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    const product: NewProductType = { ...validated, image: imageUrl };

    const _id = await insertProductToDb(product);
    const createdProduct: ProductType = mapToProductType(product, _id.toString());

    return NextResponse.json(createdProduct, { status: 201 });
  } catch (error) {
    console.error("❌ Route handler error:", error);
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "ServerError", message: errorMessage || "Internal Server Error" },
      { status: 500 }
    );
  }
}
