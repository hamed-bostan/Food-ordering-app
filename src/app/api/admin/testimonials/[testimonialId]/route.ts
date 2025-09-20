import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/infrastructure/auth/jwt.util.ts";
import { z } from "zod";
import { updateTestimonialInDb, deleteTestimonialFromDb } from "@/infrastructure/repositories/testimonials.repository";
import { testimonialInputSchema } from "@/domain/testimonial.schema";
import { createTestimonialWithImage } from "@/services/server/testimonial.service";
import { apiErrorHandler } from "@/infrastructure/apis/apiErrorHandler.ts";

// Allow partial updates (PATCH-like behavior in PUT)
const testimonialUpdateSchema = testimonialInputSchema.partial();

/**
 * POST /api/testimonials
 */
export async function POST(req: NextRequest) {
  try {
    // Verify JWT
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

    // Check for image
    const image = formData.get("image") as File | null;
    if (!image) {
      return NextResponse.json({ error: "ValidationError", message: "Image is required" }, { status: 400 });
    }

    // Delegate to service
    const createdTestimonial = await createTestimonialWithImage(fields, image);

    return NextResponse.json(
      { message: "Testimonial created successfully", result: createdTestimonial },
      { status: 201 }
    );
  } catch (error: unknown) {
    return apiErrorHandler(error, "Testimonials API - POST");
  }
}

/**
 * PUT /api/admin/testimonials/[testimonialId]
 * Admin-only: Update a testimonial
 */
export async function PUT(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const params = await context.params;
    const { testimonialId } = params;
    const body = await req.json();
    const validatedData = testimonialUpdateSchema.parse(body);

    const updatedTestimonial = await updateTestimonialInDb(testimonialId, validatedData);

    return NextResponse.json(
      {
        message: "Testimonial updated successfully",
        result: updatedTestimonial,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "ValidationError", message: "Invalid input", details: error.errors },
        { status: 400 }
      );
    }
    return apiErrorHandler(error, "Admin Testimonials API - PUT");
  }
}

/**
 * DELETE /api/admin/testimonials/[testimonialId]
 * Admin-only: Delete a testimonial
 */
export async function DELETE(req: NextRequest, context: { params: Promise<{ testimonialId: string }> }) {
  try {
    const payload = verifyJWT(req);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden", message: "Admins only" }, { status: 403 });
    }

    const params = await context.params;
    const { testimonialId } = params;
    await deleteTestimonialFromDb(testimonialId);

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error: unknown) {
    return apiErrorHandler(error, "Admin Testimonials API - DELETE");
  }
}
