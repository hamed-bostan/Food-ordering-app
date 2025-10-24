import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { updateTestimonialUseCase } from "@/domain/use-cases/testimonial/updateTestimonial.usecase";
import { deleteTestimonialUseCase } from "@/domain/use-cases/testimonial/deleteTestimonial.usecase";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";
import { TestimonialUpdateFormSchema } from "@/application/schemas/testimonial.form.schema";
import { TestimonialUpdateDto } from "@/application/dto/testimonial/testimonial.dto";

/**
 * PUT /api/admin/testimonials/:testimonialId
 */

export async function PUT(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    await requireAdmin(req);
    const { testimonialId } = await context.params;

    let validatedFields: TestimonialUpdateDto;
    let newImage: File | undefined;

    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const rawFields: Record<string, unknown> = {};

      for (const [key, value] of formData.entries()) {
        if (key !== "image" && typeof value === "string") rawFields[key] = value;
      }

      validatedFields = TestimonialUpdateFormSchema.parse(rawFields);
      const imageFile = formData.get("image");
      if (imageFile instanceof File) newImage = imageFile;
    } else {
      const body = await req.json();
      validatedFields = TestimonialUpdateFormSchema.parse(body);
    }

    const updated = await updateTestimonialUseCase(testimonialId, validatedFields, newImage);
    return NextResponse.json({ message: "Testimonial updated successfully", result: updated }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof TestimonialUpdateFormSchema.constructor) {
      // Or z.ZodError
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: (error as any).errors },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Testimonials API - PUT");
  }
}

/**
 * DELETE /api/admin/testimonials/:testimonialId
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    await requireAdmin(req);
    const { testimonialId } = await context.params;

    await deleteTestimonialUseCase(testimonialId);
    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Testimonials API - DELETE");
  }
}
