import { TestimonialType } from "@/app/branch/lib/testimonial.schema";
import api from "../axios";
import { ApiErrorResponse } from "@/types/api-error";
import { AxiosError } from "axios";

export const getTestimonials = async (): Promise<TestimonialType[]> => {
  try {
    const { data } = await api.get<TestimonialType[]>("/testimonials");
    return data;
  } catch (error) {
    console.error("❌ [API] Failed to fetch testimonials:", error);

    if (error instanceof AxiosError) {
      const responseData = error.response?.data as ApiErrorResponse | undefined;

      if (responseData?.error === "ServerError") {
        throw new Error(responseData.message || "Failed to fetch testimonials");
      }

      if (responseData?.error === "ValidationError") {
        const validationMessages = responseData.details.map((issue) => issue.message).join(", ");
        throw new Error(validationMessages || "Validation failed");
      }
    }

    throw error;
  }
};

export const createTestimonial = async (formData: FormData): Promise<TestimonialType> => {
  try {
    const { data } = await api.post<TestimonialType>("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  } catch (error) {
    console.error("❌ [API] Failed to create testimonial:", error);

    if (error instanceof AxiosError) {
      const responseData = error.response?.data as ApiErrorResponse | undefined;

      if (responseData?.error === "ValidationError") {
        const validationMessages = responseData.details.map((issue) => issue.message).join(", ");
        throw new Error(validationMessages || "Validation failed");
      }

      if (responseData?.error === "ServerError") {
        throw new Error(responseData.message || "Failed to upload testimonial");
      }
    }

    throw error;
  }
};
