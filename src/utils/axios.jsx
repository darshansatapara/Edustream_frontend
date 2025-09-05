import axios from "axios";

const API = axios.create({
  baseURL: "https://edusteam-backend.vercel.app/",
});

// Attach JWT automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // JWT stored on login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
