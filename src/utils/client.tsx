import axios from "axios";
import { getAuthToken } from "./auth";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { "Content-type": "application/json" },
});

// Bearer token付きのAPIリクエストを生成
export const authInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: { "Content-type": "multipart/form-data" },
});

// instanceにBearer tokenを事前に付与
instance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// authInstanceにBearer tokenを事前に付与
authInstance.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
