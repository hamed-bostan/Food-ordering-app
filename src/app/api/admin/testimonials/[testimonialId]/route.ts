import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/middleware/requireAdmin";
import { updateTestimonialUseCase } from "@/domain/use-cases/testimonial/updateTestimonial.usecase";
import { deleteTestimonialUseCase } from "@/domain/use-cases/testimonial/deleteTestimonial.usecase";
import { TestimonialUpdateFormSchema } from "@/application/schemas/testimonial.form.schema";
import { apiResponseErrorHandler } from "@/infrastructure/error-handlers/apiResponseErrorHandler";
import { TestimonialRepository } from "@/infrastructure/repositories/testimonials.repository";
import { ImageStorageGateway } from "@/infrastructure/storage/ImageStorageGateway";

/**
 * PUT /api/admin/testimonials/:testimonialId
 */

export async function PUT(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    await requireAdmin(req);
    const { testimonialId } = await context.params;

    let fields: { name?: string; comment?: string } = {};
    let newImage: File | undefined;

    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const rawFields: Record<string, string> = {};

      for (const [key, value] of formData.entries()) {
        if (key !== "image" && typeof value === "string") rawFields[key] = value;
      }

      fields = TestimonialUpdateFormSchema.parse(rawFields);
      const imageFile = formData.get("image");
      if (imageFile instanceof File) newImage = imageFile;
    } else {
      const body = await req.json();
      fields = TestimonialUpdateFormSchema.parse(body);
    }

    const repository = new TestimonialRepository();
    const storage = new ImageStorageGateway();
    const updated = await updateTestimonialUseCase(testimonialId, fields, repository, storage, newImage);
    return NextResponse.json({ message: "Testimonial updated successfully", result: updated }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return apiResponseErrorHandler(error, "Admin Testimonials API - PUT");
  }
}

/**
 * DELETE /api/admin/testimonials/:testimonialId
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    await requireAdmin(req);
    const { testimonialId } = await context.params;

    const repository = new TestimonialRepository();
    const storage = new ImageStorageGateway();
    await deleteTestimonialUseCase(testimonialId, repository, storage);
    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiResponseErrorHandler(error, "Admin Testimonials API - DELETE");
  }
}
