import axios, { AxiosInstance, AxiosError } from "axios";

const BASE_URL = process.env.API_URL || "http://qr.scanalyzr.com";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

// Create axios instance for public API (with API Key)
export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-Key": API_KEY,
  },
});

// Request interceptor for logging (optional)
apiClient.interceptors.request.use(
  (config) => {
    console.log("📤 API Request:", {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Response:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error: AxiosError) => {
    console.error("❌ API Error:", {
      status: error.response?.status,
      message: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
