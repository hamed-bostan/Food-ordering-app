import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { fetchTestimonialsUseCase } from "@/domain/use-cases/testimonial/fetchTestimonials.usecase";
import { createTestimonialWithImageUseCase } from "@/domain/use-cases/testimonial/createTestimonial.usecase";
import { TestimonialCreateFormSchema } from "@/application/schemas/testimonial.form.schema";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { TestimonialRepository } from "@/infrastructure/repositories/testimonials.repository";
import { ImageStorageGateway } from "@/infrastructure/storage/ImageStorageGateway";

/**
 * GET /api/admin/testimonials
 * Fetch all testimonials (admin only)
 */
export async function GET(req: NextRequest) {
  try {
    await requireAdmin(req); // throws if not admin
    const repository = new TestimonialRepository();
    const testimonials = await fetchTestimonialsUseCase(repository);
    return NextResponse.json({ result: testimonials });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Testimonials API - GET");
  }
}

/**
 * POST /api/admin/testimonials
 */

export async function POST(req: NextRequest) {
  try {
    await requireAdmin(req);

    const formData = await req.formData();

    const fields: Record<string, string> = {};
    let imageFile: File | undefined;

    for (const [key, value] of formData.entries()) {
      if (key === "image" && value instanceof File) {
        imageFile = value;
      } else if (typeof value === "string") {
        fields[key] = value;
      }
    }

    const validatedFields = TestimonialCreateFormSchema.parse(fields);

    const repository = new TestimonialRepository();
    const storage = new ImageStorageGateway();
    const testimonial = await createTestimonialWithImageUseCase(
      {
        name: validatedFields.name,
        comment: validatedFields.comment,
      },
      repository,
      storage,
      imageFile
    );

    return NextResponse.json({ message: "Testimonial created successfully", result: testimonial }, { status: 201 });
  } catch (error: unknown) {
    console.error("❌ Admin Testimonials API - POST error:", error);
    return apiResponseErrorHandler(error, "Admin Testimonials API - POST");
  }
}
