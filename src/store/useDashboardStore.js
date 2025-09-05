import { create } from "zustand";
import API from "../utils/axios";

export const useDashboardStore = create((set) => ({
  stats: {},
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/dashboard");
      set({ stats: res.data });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch dashboard stats",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
