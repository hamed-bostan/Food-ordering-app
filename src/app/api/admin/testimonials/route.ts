import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { fetchTestimonialsFromDb } from "@/infrastructure/repositories/testimonials.repository";
import { createTestimonialWithImage } from "@/services/server/testimonial.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

/**
 * GET /api/admin/testimonials
 * Fetch all testimonials (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const testimonials = await fetchTestimonialsFromDb();
    return NextResponse.json({ result: testimonials });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Testimonials API - GET");
  }
}

/**
 * POST /api/admin/testimonials
 * Create new testimonial (admin only)
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

    const createdTestimonial = await createTestimonialWithImage(fields, image);

    return NextResponse.json(
      { message: "Testimonial created successfully", result: createdTestimonial },
      { status: 201 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Testimonials API - POST");
  }
}
