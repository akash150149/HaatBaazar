import axios from "axios";
import { STORAGE_KEYS } from "../utils/constants";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 10000
});

apiClient.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (!raw) return config;
    const auth = JSON.parse(raw);
    if (auth?.token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${auth.token}`;
    }
  } catch {
    // Ignore storage parsing errors and continue unauthenticated.
  }
  return config;
});

export default apiClient;
