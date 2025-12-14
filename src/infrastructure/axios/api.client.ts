import axios from "axios";

const isServer = typeof window === "undefined";

export const api = axios.create({
  baseURL: isServer
    ? "http://127.0.0.1:3000/api" // internal call inside container
    : "/api", // browser
  withCredentials: true,
});

// Optional: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
