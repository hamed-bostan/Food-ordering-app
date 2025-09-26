import { z } from "zod";

// Remove image validation from Zod
export const CreateTestimonialFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  date: z.string().min(1, "Date is required"),
  comment: z.string().min(1, "Comment is required"),
  image: z.any(), // accept anything, validate manually later
});

export const UpdateTestimonialFormSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  date: z.string().min(1, "Date is required").optional(),
  comment: z.string().min(1, "Comment is required").optional(),
  image: z.any().optional(),
});

// Types
export type CreateTestimonialFormType = z.infer<typeof CreateTestimonialFormSchema>;
export type UpdateTestimonialFormType = z.infer<typeof UpdateTestimonialFormSchema>;
