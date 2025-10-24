import { TestimonialType } from "@/application/schemas/testimonial.schema";

/**
 * DB insert type (what MongoDB expects when creating a testimonial)
 */
export type TestimonialRecordInsert = Omit<TestimonialType, "id" | "createdAt"> & {
  image: string;
  createdAt: string;
};

export type TestimonialRecordUpdate = Partial<Omit<TestimonialRecordInsert, "id">>;
