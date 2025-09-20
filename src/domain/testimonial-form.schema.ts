import { z } from "zod";
import { baseTestimonialSchema } from "./testimonial.schema";

// Client-side form schema
export const testimonialFormSchema = baseTestimonialSchema.extend({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  comment: z.string().min(1, "Comment is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

// Form type
export type TestimonialFormModel = z.infer<typeof testimonialFormSchema>;
