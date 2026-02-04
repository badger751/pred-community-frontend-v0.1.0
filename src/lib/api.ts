import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { supabase } from "../lib/supabaseClient";

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

// Validate required environment variables
if (!import.meta.env.VITE_API_BASE_URL && import.meta.env.PROD) {
  throw new Error("VITE_API_BASE_URL is required in production");
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

/* --------------------------------------------------
   Attach Supabase access token
-------------------------------------------------- */
api.interceptors.request.use(async (config) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/* --------------------------------------------------
   Handle unauthorized responses
-------------------------------------------------- */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("[API] 401 received → logging out");
      await useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  }
);

export default api;
