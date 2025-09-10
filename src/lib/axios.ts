import axios from "axios";

const api = axios.create({
  // Use relative URL for browser requests
  baseURL: typeof window !== "undefined" ? "/api" : process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // send cookies automatically
});

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
