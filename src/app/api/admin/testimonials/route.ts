import { NextRequest, NextResponse } from "next/server";
import { CreateTestimonialFormSchema } from "@/application/schemas/testimonial.form.schema";
import { requireAdmin } from "@/middleware/requireAdmin";
import { fetchTestimonialsUseCase } from "@/domain/use-cases/testimonial/fetchTestimonials.usecase";
import { createTestimonialWithImageUseCase } from "@/domain/use-cases/testimonial/createTestimonial.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

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

    const validatedForm = CreateTestimonialFormSchema.parse(fieldsObj);
    const imageFile = validatedForm.image as File;

    if (!imageFile || imageFile.size === 0) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const createdTestimonial = await createTestimonialWithImageUseCase(
      {
        name: validatedForm.name,
        date: validatedForm.date,
        comment: validatedForm.comment,
      },
      imageFile
    );

    return NextResponse.json(
      { message: "Testimonial created successfully", result: createdTestimonial },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("❌ Admin Testimonials API - POST error:", error);
    return apiErrorHandler(error, "Admin Testimonials API - POST");
  }
}
