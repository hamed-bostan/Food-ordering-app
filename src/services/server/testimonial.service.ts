import crypto from "crypto";
import { supabaseAdmin } from "@/infrastructure/supabase/supabase.client";
import { testimonialInputSchema, NewTestimonialModel, TestimonialModel } from "@/domain/testimonial.schema";
import {
  deleteTestimonialFromDb,
  findTestimonialByIdInDb,
  insertTestimonialToDb,
  mapToTestimonialType,
  updateTestimonialInDb,
} from "@/infrastructure/repositories/testimonials.repository";

const BUCKET_NAME = "testimonials";

export async function createTestimonialWithImage(
  fields: Record<string, string>,
  image: File
): Promise<TestimonialModel> {
  // Validate fields
  const validated = testimonialInputSchema.parse(fields);

  // Upload image to Supabase
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileExtension = image.name.split(".").pop() || "jpg";
  const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;

  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, { contentType: image.type });

  if (uploadError) throw new Error("Failed to upload testimonial image");

  const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  const imageUrl = urlData.publicUrl;

  // Save in DB
  const testimonial: NewTestimonialModel = { ...validated, image: imageUrl };
  const insertedId = await insertTestimonialToDb(testimonial);

  return mapToTestimonialType({ ...testimonial, _id: insertedId } as any);
}

// Add update with optional image replacement
export async function updateTestimonialWithImage(
  testimonialId: string,
  fields: Record<string, string>,
  image?: File
): Promise<TestimonialModel> {
  const validated = testimonialInputSchema.partial().parse(fields);

  let imageUrl: string | undefined;
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileExtension = image.name.split(".").pop() || "jpg";
    const filePath = `${BUCKET_NAME}/${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, { contentType: image.type });

    if (uploadError) throw new Error("Failed to upload testimonial image");

    const { data: urlData } = supabaseAdmin.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    imageUrl = urlData.publicUrl;
  }

  const updatedTestimonial = await updateTestimonialInDb(testimonialId, {
    ...validated,
    ...(imageUrl ? { image: imageUrl } : {}),
  });

  return updatedTestimonial;
}

// Add delete with Supabase cleanup
export async function deleteTestimonialWithImage(testimonialId: string): Promise<boolean> {
  const testimonial = await findTestimonialByIdInDb(testimonialId);
  if (!testimonial) throw new Error("Testimonial not found");

  // Try to delete image from Supabase
  if (testimonial.image) {
    const filePath = testimonial.image.split("/").pop();
    if (filePath) {
      await supabaseAdmin.storage.from(BUCKET_NAME).remove([`${BUCKET_NAME}/${filePath}`]);
    }
  }

  return deleteTestimonialFromDb(testimonialId);
}
