import { create } from "zustand";
import API from "../utils/axios";

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  checkingAuth: true, // ✅ new flag

  signup: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await API.post("/auth/register", data);
      return res.data;
    } catch (err) {
      set({ error: err.response?.data?.message || "Signup failed" });
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true, error: null });
      const res = await API.post("/auth/login", data);
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      set({ error: err.response?.data?.message || "Login failed" });
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  // ✅ Check token validity on page load
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ checkingAuth: false }); // no token, mark done
      return;
    }

    try {
      const res = await API.get("/auth/me"); // API sends user info
      console.log("Token is valid, user:", res.data.user);
      set({ user: res.data.user, token, checkingAuth: false });
    } catch (err) {
      console.error("Token validation failed:", err.response?.data || err);
      // Only remove token if server rejects (invalid/expired)
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      }
      set({ checkingAuth: false });
    }
  },
}));
