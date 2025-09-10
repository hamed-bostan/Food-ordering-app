import { TestimonialType } from "@/app/branch/lib/testimonial.schema";
import { ApiErrorResponse } from "@/types/api-error";
import { AxiosError } from "axios";
import api from "../axios";

export const getTestimonials = async (): Promise<TestimonialType[]> => {
  const { data } = await api.get("/testimonials");
  return data;
};

export async function createTestimonial(formData: FormData): Promise<TestimonialType> {
  try {
    const { data } = await api.post<TestimonialType>("/testimonials", formData);
    return data;
  } catch (error) {
    console.error("❌ [API] Failed to create testimonial:", error);
    if (error instanceof AxiosError) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      throw new Error(
        response?.error === "ValidationError"
          ? response.details?.map((e) => e.message).join(", ") || "Validation failed"
          : response?.message || "Failed to upload testimonial"
      );
    }
    throw error; // Rethrow unexpected errors
  }
}
