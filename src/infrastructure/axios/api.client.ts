import axios from "axios";

export const api = axios.create({
  baseURL: typeof window !== "undefined" ? "/api" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // optional for JWT, harmless to leave
});

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
