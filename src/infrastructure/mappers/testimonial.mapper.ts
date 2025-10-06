import { TestimonialSchema, TestimonialType } from "@/application/schemas/testimonial.schema";

/**
 * Map MongoDB document to domain entity (TestimonialType)
 */
export function mapDbTestimonialToDomain(doc: any): TestimonialType {
  const mapped = {
    id: doc._id.toString(),
    image: doc.image,
    name: doc.name,
    date: doc.date,
    comment: doc.comment,
    createdAt: new Date(doc.createdAt), // convert string -> Date
  };
  return TestimonialSchema.parse(mapped); // validate before returning
}
