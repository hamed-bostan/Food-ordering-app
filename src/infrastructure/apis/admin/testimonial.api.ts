import { TestimonialModel } from "@/domain/testimonial.schema";
import axios from "axios";
import { ApiErrorResponse } from "@/types/api-error";
import { api } from "@/infrastructure/axios/api.client";

export type GetTestimonialResponse = { message: string; result: TestimonialModel };
export type GetTestimonialsResponse = { message: string; result: TestimonialModel[] };
export type CreateTestimonialResponse = { message: string; result: TestimonialModel };
export type UpdateTestimonialResponse = { message: string; result: TestimonialModel };

// Fetch all testimonials (admin)
export const getTestimonialsAdmin = async (token: string): Promise<GetTestimonialsResponse> => {
  try {
    const { data } = await api.get<GetTestimonialsResponse>("/admin/testimonials", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!Array.isArray(data.result)) throw new Error("Invalid server response");

    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to fetch testimonials (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while fetching testimonials (admin)");
  }
};

// Create testimonial (admin)
export const createTestimonialAdmin = async (formData: FormData, token: string): Promise<CreateTestimonialResponse> => {
  try {
    const { data } = await api.post<CreateTestimonialResponse>("/admin/testimonials", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    if (!data.result) throw new Error("Testimonial creation failed");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to create testimonial (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while creating testimonial (admin)");
  }
};

// Update testimonial by admin
export const updateTestimonialAdmin = async (
  id: string,
  payload: Partial<TestimonialModel> | FormData,
  token: string
): Promise<UpdateTestimonialResponse> => {
  try {
    const isFormData = payload instanceof FormData;
    const { data } = await api.put<UpdateTestimonialResponse>(`/admin/testimonials/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}`, ...(isFormData ? { "Content-Type": "multipart/form-data" } : {}) },
    });

    if (!data.result) throw new Error("Failed to update testimonial");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to update testimonial (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while updating testimonial (admin)");
  }
};

// Delete testimonial by admin
export const deleteTestimonialAdmin = async (id: string, token: string): Promise<{ message: string }> => {
  try {
    const { data } = await api.delete<{ message: string }>(`/admin/testimonials/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!data?.message) throw new Error("Failed to delete testimonial");
    return data;
  } catch (error: unknown) {
    console.error("❌ [API] Failed to delete testimonial (admin):", error);

    if (axios.isAxiosError(error)) {
      const response = error.response?.data as ApiErrorResponse | undefined;
      if (response?.error === "ValidationError" && response.details?.length) {
        throw new Error(response.details.map((d) => d.message).join(", ") || response.message);
      }
      if (response?.error === "ServerError" || response?.error === "NotFound") {
        throw new Error(response.message);
      }
    }

    throw new Error("Unexpected error while deleting testimonial (admin)");
  }
};
