import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { fetchTestimonialsUseCase } from "@/domain/use-cases/testimonial/fetchTestimonials.usecase";
import { createTestimonialWithImageUseCase } from "@/domain/use-cases/testimonial/createTestimonial.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { TestimonialCreateFormSchema } from "@/application/schemas/testimonial.form.schema";

/**
 * GET /api/admin/testimonials
 * Fetch all testimonials (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req); // throws if not admin
    const testimonials = await fetchTestimonialsUseCase();
    return NextResponse.json({ result: testimonials });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Testimonials API - GET");
  }
}

/**
 * POST /api/admin/testimonials
 */

export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const formData = await req.formData();
    const fieldsObj: Record<string, any> = {};
    formData.forEach((value, key) => (fieldsObj[key] = value));

    // Validate & normalize FormData using unified form schema
    const validatedForm = TestimonialCreateFormSchema.parse(fieldsObj);

    // Pass clean data to use case
    const testimonial = await createTestimonialWithImageUseCase(
      {
        name: validatedForm.name,
        comment: validatedForm.comment,
      },
      validatedForm.image
    );

    return NextResponse.json({ message: "Testimonial created successfully", result: testimonial }, { status: 201 });
  } catch (error: unknown) {
    console.error("❌ Admin Testimonials API - POST error:", error);
    return apiErrorHandler(error, "Admin Testimonials API - POST");
  }
}
