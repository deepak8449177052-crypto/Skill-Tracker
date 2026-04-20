import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "" : "http://localhost:5000");

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

export { BACKEND_URL };

API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem("userInfo");
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (userInfo) {
    const parsed = JSON.parse(userInfo);
    if (parsed?.token) {
      config.headers.Authorization = `Bearer ${parsed.token}`;
    }
  }

  return config;
});

export default API;