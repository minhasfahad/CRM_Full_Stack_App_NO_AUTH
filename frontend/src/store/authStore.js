import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      
      // Extracting from your backend structure: { result: {id, name, role}, token }
      const { result, token } = response.data;

      localStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("token", token);

      set({ user: result, token: token, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login Failed!",
      };
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post("/auth/signup", userData);
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup Failed!",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;