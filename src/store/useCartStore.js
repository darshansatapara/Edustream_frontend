// src/store/useCartStore.js
import { create } from "zustand";
import API from "../utils/axios";

export const useCartStore = create((set, get) => ({
  cart: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/cart");
      set({ cart: res.data });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch cart" });
    } finally {
      set({ loading: false });
    }
  },

  addToCart: async (courseId) => {
    try {
      if (!courseId) throw new Error("Course ID is required");

      const res = await API.post("/cart", { course_id: courseId });
      set((state) => ({
        cart: [...state.cart, res.data], // append new course
      }));
    } catch (err) {
      console.error(
        "❌ Add to cart failed:",
        err.response?.data || err.message
      );
      set({ error: err.response?.data?.message || "Failed to add to cart" });
    }
  },

  removeFromCart: async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      }));
    } catch (err) {
      console.error("❌ Remove failed:", err.response?.data || err.message);
      set({
        error: err.response?.data?.message || "Failed to remove from cart",
      });
    }
  },
   checkout: async () => {
    try {
      const res = await API.post("/cart/checkout");
      // Clear cart in frontend after success
      set({ cart: [] });
      return res.data; // message: "✅ Checkout successful! Courses purchased."
    } catch (err) {
      console.error("❌ Checkout error:", err);
      throw err;
    }
  },
}));
