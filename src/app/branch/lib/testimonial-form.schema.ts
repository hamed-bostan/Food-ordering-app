import { z } from "zod";
import { baseTestimonialSchema } from "./testimonial.schema"; // Adjust path if needed

// Schema for client-side form validation
export const testimonialFormSchema = baseTestimonialSchema.extend({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  comment: z.string().min(1, "Comment is required"),
  image: z.instanceof(FileList).refine((files) => files.length > 0, "Image is required"),
});

// Type for form data
export type TestimonialFormType = z.infer<typeof testimonialFormSchema>;
