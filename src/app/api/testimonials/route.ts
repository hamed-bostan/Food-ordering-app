import { NextResponse } from "next/server";
import { insertTestimonialToDb, fetchTestimonialsFromDb, mapToTestimonialType } from "@/lib/db/testimonials"; // Adjust path if needed
import { ZodError } from "zod";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NewTestimonialType, testimonialInputSchema, TestimonialType } from "@/app/branch/lib/testimonial.schema";

const BUCKET_NAME = "testimonials";

export async function GET() {
  try {
    const testimonials = await fetchTestimonialsFromDb();
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("❌ Failed to fetch testimonials:", error);
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

    const validated = testimonialInputSchema.parse(fields);

    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json(
        { error: "ValidationError", details: [{ message: "Image is required" }] },
        { status: 400 }
      );
    }

    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `testimonials/${crypto.randomUUID()}.${fileExtension}`;
    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET_NAME).upload(filePath, image);
    if (uploadError) {
      console.error("❌ Supabase upload error:", uploadError);
      throw uploadError;
    }

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    const testimonial: NewTestimonialType = { ...validated, image: imageUrl };

    const _id = await insertTestimonialToDb(testimonial);
    const createdTestimonial: TestimonialType = mapToTestimonialType(testimonial, _id.toString());

    return NextResponse.json(createdTestimonial, { status: 201 });
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
