import { create } from "zustand";
import API from "../utils/axios";

export const useCourseStore = create((set) => ({
  courses: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/courses");
      set({ courses: res.data });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch courses" });
    } finally {
      set({ loading: false });
    }
  },

  addCourse: async (course) => {
    try {
      if (!course.title || !course.price)
        throw new Error("Course title and price are required");

      const res = await API.post("/courses", course);
      set((state) => ({ courses: [res.data, ...state.courses] }));
    } catch (err) {
      console.error(err);
    }
  },

  deleteCourse: async (id) => {
    try {
      await API.delete(`/courses/${id}`);
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  updateCourse: async (id, course) => {
    try {
      const res = await API.patch(`/courses/${id}`, course);
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? res.data : c)),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
