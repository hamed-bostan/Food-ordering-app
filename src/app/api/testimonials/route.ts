import { NextResponse } from "next/server";
import {
  insertTestimonialToDb,
  fetchTestimonialsFromDb,
  mapToTestimonialType,
  TestimonialDocument,
} from "@/lib/db/testimonials.repository"; // Adjust path if needed
import { ZodError } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NewTestimonialType, testimonialInputSchema } from "@/app/branch/lib/testimonial.schema";

const BUCKET_NAME = "testimonials";

export async function GET() {
  try {
    const testimonials = await fetchTestimonialsFromDb();
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch testimonials:", error);
    return NextResponse.json({ error: "ServerError", message: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // extract text fields
    const fields: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") {
        fields[key] = value;
      }
    }

    // validate input
    const validated = testimonialInputSchema.parse(fields);

    // image upload required
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json(
        { error: "ValidationError", details: [{ message: "Image is required" }] },
        { status: 400 }
      );
    }

    // upload to supabase
    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;
    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(filePath, image);

    if (uploadError) {
      console.error("❌ Supabase upload error:", uploadError);
      throw new Error("Failed to upload image");
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    // save to db
    const testimonial: NewTestimonialType = { ...validated, image: imageUrl };
    const insertedId = await insertTestimonialToDb(testimonial);
    const testimonialDocument: TestimonialDocument = {
      ...testimonial,
      _id: insertedId,
    };

    const createdTestimonial = mapToTestimonialType(testimonialDocument);

    return NextResponse.json(createdTestimonial, { status: 201 });
  } catch (error) {
    console.error("❌ Route handler error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: "ValidationError", details: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "ServerError", message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
