import { TestimonialType } from "@/app/branch/lib/testimonial.schema";
import api from "../axios";
import { ApiErrorResponse } from "@/types/api-error";
import axios from "axios";

export type GetTestimonialsResponse = { message: string; result: TestimonialType[] };
export type CreateTestimonialResponse = { message: string; result: TestimonialType };

// Fetch testimonials
export const getTestimonials = async (): Promise<GetTestimonialsResponse> => {
  try {
    const { data } = await api.get<GetTestimonialsResponse>("/testimonials");

    if (!Array.isArray(data.result)) throw new Error("Invalid server response");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch testimonials:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching testimonials");
  }
};

// Create a new testimonial
export const createTestimonial = async (
  formData: FormData,
  token?: string
): Promise<CreateTestimonialResponse> => {
  try {
    const { data } = await api.post<CreateTestimonialResponse>("/testimonials", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!data.result) throw new Error("Testimonial creation failed");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to create testimonial:", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;

      if (response?.error === "ValidationError" && response.details?.length) {
        const messages = response.details.map((d) => d.message).join(", ");
        throw new Error(messages || response.message);
      }

      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while creating testimonial");
  }
};
