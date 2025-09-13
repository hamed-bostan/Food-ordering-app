import { insertTestimonialToDb, fetchTestimonialsFromDb, mapToTestimonialType } from "@/lib/db/testimonials.repository";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { NewTestimonialType, testimonialInputSchema } from "@/app/branch/lib/testimonial.schema";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/lib/auth/verifyJWT";
import { handleApiError } from "@/lib/errors/handleApiError";

const BUCKET_NAME = "testimonials";

/**
 * GET /api/testimonials
 * Fetch all testimonials
 */
export async function GET() {
  try {
    const testimonials = await fetchTestimonialsFromDb();
    return NextResponse.json({ message: "Testimonials fetched successfully", result: testimonials }, { status: 200 });
  } catch (error: unknown) {
    return handleApiError(error, "Testimonials API - GET");
  }
}

/**
 * POST /api/testimonials
 * Create a new testimonial (admin only)
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

    // Validate input
    const validated = testimonialInputSchema.parse(fields);

    // Handle image upload
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "ValidationError", message: "Image is required" }, { status: 400 });
    }

    // Convert File → Buffer (best practice)
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Unique file path
    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;

    // Upload with contentType
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType: image.type });

    if (uploadError) throw new Error("Failed to upload image");

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    const imageUrl = urlData.publicUrl;

    // Save testimonial to DB
    const testimonial: NewTestimonialType = { ...validated, image: imageUrl };
    const insertedId = await insertTestimonialToDb(testimonial);
    const createdTestimonial = mapToTestimonialType({ ...testimonial, _id: insertedId });

    // Standardized response
    return NextResponse.json(
      {
        message: "Testimonial created successfully",
        result: createdTestimonial,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return handleApiError(error, "Testimonials API - POST");
  }
}
