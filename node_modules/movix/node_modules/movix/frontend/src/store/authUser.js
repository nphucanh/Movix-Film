import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      if (response.data.success) {
        set({ user: response.data.user, isSigningUp: false });
        return response.data;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Signup error details:",
        error.response?.data || error.message
      );
      set({ isSigningUp: false, user: null });
      throw error;
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/auth/login", credentials);
      if (response.data.success) {
        set({ user: response.data.user, isLoggingIn: false });
        return response.data; 
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Login error details:", error.response?.data || error.message);
      set({ isLoggingIn: false, user: null });
      throw error;
    }
  },
  
 
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const response = await axios.post("/api/auth/logout");
      if (response.data.success) {
        set({ user: null, isLoggingOut: false });
        toast.success("Logged out successfully!");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Logout error details:",
        error.response?.data || error.message
      );
      set({ isLoggingOut: false });
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  },
  authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/auth/authCheck");

			set({ user: response.data.user, isCheckingAuth: false });
		} catch (error) {
			set({ isCheckingAuth: false, user: null });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
}));
