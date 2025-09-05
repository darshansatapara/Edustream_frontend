import { create } from "zustand";
import API from "../utils/axios";

export const useQuizStore = create((set) => ({
  quizzes: [],
  loading: false,
  error: null,

  fetchQuizzes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await API.get("/quizzes");
      set({ quizzes: res.data });
    } catch (err) {
      set({ error: err.response?.data?.message || "Failed to fetch quizzes" });
    } finally {
      set({ loading: false });
    }
  },

  addQuiz: async (quiz) => {
    try {
      if (!quiz.title) throw new Error("Quiz title is required");
      const res = await API.post("/quizzes", quiz);
      set((state) => ({ quizzes: [res.data, ...state.quizzes] }));
    } catch (err) {
      console.error(err);
    }
  },

  deleteQuiz: async (id) => {
    try {
      await API.delete(`/quizzes/${id}`);
      set((state) => ({
        quizzes: state.quizzes.filter((q) => q.id !== id),
      }));
    } catch (err) {
      console.error(err);
    }
  },

  updateQuiz: async (id, quiz) => {
    try {
      const res = await API.patch(`/quizzes/${id}`, quiz);
      set((state) => ({
        quizzes: state.quizzes.map((q) => (q.id === id ? res.data : q)),
      }));
    } catch (err) {
      console.error(err);
    }
  },
}));
